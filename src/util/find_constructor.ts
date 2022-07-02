import { DocumentSymbol, Position, Range, TextDocument } from "vscode";

export default function findConstructor(
  doc: TextDocument,
  symbols: DocumentSymbol[]
): Position | undefined {
  const c = symbols
    .filter((e) => e.name.endsWith("Bloc"))[0]
    .children.filter((e) => e.name.endsWith("Bloc"))[0];

  const str = doc.getText(c.range);
  console.log(doc.getText(c.range));
  console.log(c.range.start);
  console.log(c.range.end);
  const result = c.range.end.translate(0, -1);

  console.log(
    doc.getText(new Range(c.range.end, c.range.end.translate(0, -1)))
  );
  return result;
}
