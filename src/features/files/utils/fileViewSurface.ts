import {
  shouldUseLowCostPreview,
  type FilePreviewMetrics,
  type FileRenderProfile,
} from "./fileRenderProfile";

export type FileViewMode = "preview" | "edit";

export type FileViewSurfaceKind =
  | "image"
  | "binary-unsupported"
  | "editor"
  | "markdown-preview"
  | "structured-preview"
  | "code-preview";

export type FileViewSurface = {
  kind: FileViewSurfaceKind;
  useLowCostPreview: boolean;
};

export function resolveDefaultFileViewMode(
  renderProfile: FileRenderProfile,
  initialMode: FileViewMode,
): FileViewMode {
  return renderProfile.kind === "markdown" ? "preview" : initialMode;
}

export function resolveFileViewSurface(
  renderProfile: FileRenderProfile,
  mode: FileViewMode,
  metrics: FilePreviewMetrics,
): FileViewSurface {
  const useLowCostPreview = shouldUseLowCostPreview(renderProfile, metrics);

  if (renderProfile.kind === "image") {
    return {
      kind: "image",
      useLowCostPreview: false,
    };
  }

  if (renderProfile.kind === "binary-unsupported") {
    return {
      kind: "binary-unsupported",
      useLowCostPreview: false,
    };
  }

  if (mode === "edit") {
    return {
      kind: "editor",
      useLowCostPreview,
    };
  }

  if (renderProfile.kind === "markdown" && !useLowCostPreview) {
    return {
      kind: "markdown-preview",
      useLowCostPreview: false,
    };
  }

  if (renderProfile.structuredKind && !useLowCostPreview) {
    return {
      kind: "structured-preview",
      useLowCostPreview: false,
    };
  }

  return {
    kind: "code-preview",
    useLowCostPreview,
  };
}
