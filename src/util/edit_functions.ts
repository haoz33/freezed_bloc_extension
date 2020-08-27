import {
  WorkspaceEdit,
  Position,
  workspace,
  TextDocument,
  Range,
  window,
} from "vscode";

export async function appendToFile(filePath: string, content: string) {
  let file = await workspace.openTextDocument(filePath);
  let pos = findLastbracketPos(file);
  if (!content.endsWith("\n")) {
    content += "\n";
  }
  if (pos != undefined) {
    let fileEdit = new WorkspaceEdit();
    fileEdit.insert(file.uri, pos, content);
    workspace.applyEdit(fileEdit);
    file.save();
  } else {
    window.showErrorMessage("Unable to find position to insert the content.");
  }
}

function findLastbracketPos(doc: TextDocument): Position | undefined {
  for (let line = doc.lineCount; line > 0; line--) {
    let pos1 = new Position(line, 0);
    let pos2 = new Position(line, 5);
    if (doc.getText(new Range(pos1, pos2)).startsWith("}")) {
      return pos1;
    }
  }
  return undefined;
}

export async function editMapEventToStateFunction(range: Range) {}
