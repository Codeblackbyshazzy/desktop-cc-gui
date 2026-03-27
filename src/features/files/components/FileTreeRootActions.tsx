import { useTranslation } from "react-i18next";
import FilePlus from "lucide-react/dist/esm/icons/file-plus";
import FolderPlus from "lucide-react/dist/esm/icons/folder-plus";
import LayoutDashboard from "lucide-react/dist/esm/icons/layout-dashboard";
import Maximize2 from "lucide-react/dist/esm/icons/maximize-2";
import SquareMinus from "lucide-react/dist/esm/icons/square-minus";
import Trash2 from "lucide-react/dist/esm/icons/trash-2";

type FileTreeRootActionsProps = {
  allVisibleExpanded: boolean;
  canTrashSelectedNode: boolean;
  hasFolders: boolean;
  isSpecHubActive?: boolean;
  selectedParentFolder: string | null;
  onOpenDetachedExplorer?: (initialFilePath?: string | null) => void;
  detachedInitialFilePath?: string | null;
  onOpenNewFile: (parentFolder: string | null) => void;
  onOpenNewFolder: (parentFolder: string | null) => void;
  onToggleAllFolders: () => void;
  onTrashSelected: () => void;
  onOpenSpecHub?: () => void;
  showDetachedExplorerAction?: boolean;
  showSpecHubAction?: boolean;
};

export function FileTreeRootActions({
  allVisibleExpanded,
  canTrashSelectedNode,
  hasFolders,
  isSpecHubActive = false,
  selectedParentFolder,
  onOpenDetachedExplorer,
  detachedInitialFilePath,
  onOpenNewFile,
  onOpenNewFolder,
  onToggleAllFolders,
  onTrashSelected,
  onOpenSpecHub,
  showDetachedExplorerAction = false,
  showSpecHubAction = true,
}: FileTreeRootActionsProps) {
  const { t } = useTranslation();

  return (
    <div className="file-tree-root-actions">
      {showDetachedExplorerAction ? (
        <button
          type="button"
          className="ghost icon-button file-tree-root-action"
          onClick={() => onOpenDetachedExplorer?.(detachedInitialFilePath)}
          disabled={!onOpenDetachedExplorer}
          aria-label={t("files.openDetachedExplorer")}
          title={t("files.openDetachedExplorer")}
        >
          <Maximize2 aria-hidden />
        </button>
      ) : null}
      {showSpecHubAction ? (
        <button
          type="button"
          className={`ghost icon-button file-tree-root-action${isSpecHubActive ? " is-active" : ""}`}
          onClick={onOpenSpecHub}
          disabled={!onOpenSpecHub}
          aria-label={t("sidebar.specHub")}
          title={t("sidebar.specHub")}
        >
          <LayoutDashboard aria-hidden />
        </button>
      ) : null}
      <button
        type="button"
        className="ghost icon-button file-tree-root-action"
        onClick={() => onOpenNewFile(selectedParentFolder)}
        aria-label={t("files.newFile")}
        title={t("files.newFile")}
      >
        <FilePlus aria-hidden />
      </button>
      <button
        type="button"
        className="ghost icon-button file-tree-root-action"
        onClick={() => onOpenNewFolder(selectedParentFolder)}
        aria-label={t("files.newFolder")}
        title={t("files.newFolder")}
      >
        <FolderPlus aria-hidden />
      </button>
      <button
        type="button"
        className="ghost icon-button file-tree-root-action"
        onClick={onToggleAllFolders}
        disabled={!hasFolders}
        aria-label={allVisibleExpanded ? t("files.collapseAllFolders") : t("files.expandAllFolders")}
        title={allVisibleExpanded ? t("files.collapseAllFolders") : t("files.expandAllFolders")}
      >
        <SquareMinus aria-hidden />
      </button>
      <button
        type="button"
        className="ghost icon-button file-tree-root-action file-tree-root-action-danger"
        onClick={onTrashSelected}
        disabled={!canTrashSelectedNode}
        aria-label={t("files.deleteItem")}
        title={t("files.deleteItem")}
      >
        <Trash2 aria-hidden />
      </button>
    </div>
  );
}
