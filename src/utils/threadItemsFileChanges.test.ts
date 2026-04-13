import { describe, expect, it } from "vitest";
import type { ConversationItem } from "../types";
import {
  inferFileChangesFromPayload,
  mergeToolChanges,
  normalizeFileChangeKind,
} from "./threadItemsFileChanges";

type ToolChanges = NonNullable<Extract<ConversationItem, { kind: "tool" }>["changes"]>;

describe("threadItemsFileChanges.mergeToolChanges", () => {
  it("prefers local specific kind when remote kind is modified", () => {
    const remote: ToolChanges = [
      { path: "src/App.tsx", kind: "modified" },
    ];
    const local: ToolChanges = [
      { path: "src/App.tsx", kind: "add" },
    ];

    const merged = mergeToolChanges(remote, local);

    expect(merged?.[0]?.kind).toBe("add");
  });

  it("keeps remote add/delete/rename kinds when already specific", () => {
    const remote: ToolChanges = [
      { path: "src/App.tsx", kind: "delete" },
    ];
    const local: ToolChanges = [
      { path: "src/App.tsx", kind: "modified" },
    ];

    const merged = mergeToolChanges(remote, local);

    expect(merged?.[0]?.kind).toBe("delete");
  });

  it("falls back to local normalized kind when remote kind is unknown", () => {
    const remote: ToolChanges = [
      { path: "src/App.tsx", kind: "unknown-kind" },
    ];
    const local: ToolChanges = [
      { path: "src/App.tsx", kind: "D" },
    ];

    const merged = mergeToolChanges(remote, local);

    expect(merged?.[0]?.kind).toBe("delete");
  });

  it("normalizes U to modified", () => {
    expect(normalizeFileChangeKind("U")).toBe("modified");
  });

  it("parses concise status lines from string payload", () => {
    const inferred = inferFileChangesFromPayload(
      [
        "(A) src/new-file.ts",
        "(U) src/existing-file.ts",
        "(D) src/removed-file.ts",
      ].join("\n"),
    );

    expect(inferred).toEqual([
      { path: "src/new-file.ts", kind: "add", diff: undefined },
      { path: "src/existing-file.ts", kind: "modified", diff: undefined },
      { path: "src/removed-file.ts", kind: "delete", diff: undefined },
    ]);
  });
});
