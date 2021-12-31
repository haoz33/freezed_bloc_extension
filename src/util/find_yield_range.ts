import { TextDocument, DocumentSymbol, Position, Range } from "vscode";

export function findOnRange(doc: TextDocument, mapFunction: DocumentSymbol) {
  let mapRange = mapFunction.range;
  for (let y = mapRange.start.line; y < mapRange.end.line; y++) {
    let startPos = new Position(y, 0);
    let endPos = new Position(y, 120);
    let r = new Range(startPos, endPos);

    let text = doc.getText(r);
    if (text.includes("super(")) {
      let pos = doc.getText(r).indexOf("{") + 1;
      return new Position(y, pos);
    }
  }
  return undefined;
}