import { DocumentSymbol } from "vscode";

export function getMapEventToStateSymbol(
  blocClass: DocumentSymbol
): DocumentSymbol | undefined {
  for (const f of blocClass.children) {
    if (f.name == blocClass.name) {
      return f;
    }
  }
  return undefined;
}
