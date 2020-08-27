import { Uri, commands, DocumentSymbol } from "vscode";

export async function getMapEventToStateSymbol(
  uri: Uri
): Promise<DocumentSymbol | undefined> {
  const definitions = await commands.executeCommand<DocumentSymbol[]>(
    "vscode.executeDocumentSymbolProvider",
    uri
  );
  if (definitions != null) {
    for (const definition of definitions) {
      for (const f of definition.children) {
        if (f.name == "mapEventToState") {
          return f;
        }
      }
    }
  }
  return undefined;
}
