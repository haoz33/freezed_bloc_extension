import { TextDocument, DocumentSymbol, Position, Range } from "vscode";

export function findYieldRange(doc: TextDocument, mapFunction: DocumentSymbol) {
  let mapRange = mapFunction.range;
  for (let y = mapRange.start.line; y < mapRange.end.line; y++) {
    let startPos = new Position(y, 0);
    let endPos = new Position(y, 30);
    let r = new Range(startPos, endPos);

    if (doc.getText(r).includes("gEvent.map(")) {
      return new Position(y, doc.getText(r).length);
    }
  }
  return undefined;
}
