// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeAll, describe, expect, it, vi } from "vitest";

const invokeMock = vi.fn(async () => null);

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

vi.mock("@tauri-apps/api/core", () => ({
  convertFileSrc: (value: string) => value,
  invoke: (...args: any[]) => (invokeMock as any)(...args),
}));

vi.mock("@tauri-apps/api/menu", () => ({
  Menu: { new: vi.fn(async () => ({ popup: vi.fn(), close: vi.fn() })) },
  MenuItem: { new: vi.fn(async (options: any) => options) },
}));

vi.mock("@tauri-apps/api/dpi", () => ({
  LogicalPosition: class {},
}));

vi.mock("@tauri-apps/api/window", () => ({
  getCurrentWindow: vi.fn(() => ({
    scaleFactor: vi.fn(async () => 1),
  })),
}));

vi.mock("@tauri-apps/plugin-opener", () => ({
  revealItemInDir: vi.fn(async () => undefined),
}));

vi.mock("@tauri-apps/plugin-dialog", () => ({
  confirm: vi.fn(async () => true),
}));

let FileTreePanel: typeof import("./FileTreePanel").FileTreePanel;

beforeAll(async () => {
  ({ FileTreePanel } = await import("./FileTreePanel"));
});

afterEach(() => {
  cleanup();
  invokeMock.mockClear();
});

describe("FileTreePanel detached explorer action", () => {
  it("keeps the embedded panel available while exposing the detached explorer control", () => {
    const onOpenDetachedExplorer = vi.fn();

    render(
      <FileTreePanel
        workspaceId="workspace-1"
        workspaceName="workspace"
        workspacePath="/tmp/workspace"
        files={["src/index.ts"]}
        directories={["src"]}
        isLoading={false}
        filePanelMode="files"
        onFilePanelModeChange={() => undefined}
        onOpenFile={() => undefined}
        openTargets={[]}
        openAppIconById={{}}
        selectedOpenAppId=""
        onSelectOpenAppId={() => undefined}
        gitStatusFiles={[]}
        gitignoredFiles={new Set<string>()}
        gitignoredDirectories={new Set<string>()}
        onOpenSpecHub={() => undefined}
        onOpenDetachedExplorer={onOpenDetachedExplorer}
      />,
    );

    expect(screen.getByTitle("sidebar.specHub")).not.toBeNull();
    fireEvent.click(screen.getByTitle("files.openDetachedExplorer"));
    expect(onOpenDetachedExplorer).toHaveBeenCalledWith(null);
  });
});
