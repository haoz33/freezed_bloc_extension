import { Uri, commands, DocumentSymbol } from "vscode";

export function getMapEventToStateSymbol(
  blocClass: DocumentSymbol
): DocumentSymbol | undefined {
  for (const f of blocClass.children) {
    if (f.name == "mapEventToState") {
      return f;
    }
  }
  return undefined;
}
