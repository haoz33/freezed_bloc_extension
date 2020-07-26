import { WorkspaceEdit, Position, workspace } from "vscode";

export async function insertToFile(
  filePath: string,
  position: Position,
  content: string
) {
  let file = await workspace.openTextDocument(filePath);

  let fileEdit = new WorkspaceEdit();
  fileEdit.insert(file.uri, position, content);
  workspace.applyEdit(fileEdit);
}
