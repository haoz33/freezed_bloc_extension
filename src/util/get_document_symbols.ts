import { Uri, commands, DocumentSymbol } from "vscode";

export async function getDocumentSymbols(uri: Uri) {
  const symbols = await commands.executeCommand<DocumentSymbol[]>(
    "vscode.executeDocumentSymbolProvider",
    uri
  );
  return symbols;
}
