import { workspace } from "vscode";
import { join } from "path";

export function getWorkspacePath(fileName: string): string | undefined {
  if (workspace.workspaceFolders && workspace.workspaceFolders.length > 0) {
    return join(`${workspace.workspaceFolders[0].uri.path}`, fileName);
  }
}
