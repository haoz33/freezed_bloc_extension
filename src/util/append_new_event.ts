import { Uri, workspace, Range, WorkspaceEdit } from "vscode";
import { getDocumentSymbols } from "./get_document_symbols";

export async function appendNewEvent(fileName: string, event: string) {
  const uri = Uri.file(fileName);
  const symbols = await getDocumentSymbols(uri);
  if (symbols != null) {
    let symbol = symbols.filter((s) => s.name.endsWith("Event"))[0];
    let fileEdit = new WorkspaceEdit();
    let insertPosition = symbol.range.end.translate(0, -1);
    fileEdit.insert(uri, insertPosition, event);
    await workspace.applyEdit(fileEdit);
  }
}
