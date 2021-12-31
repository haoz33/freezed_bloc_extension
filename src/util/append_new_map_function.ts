import { getDocumentSymbols } from "./get_document_symbols";
import { WorkspaceEdit, workspace, Uri, commands, window } from "vscode";
import { getMapEventToStateSymbol } from "./get_map_event_to_state_function";
import { findOnRange} from "./find_yield_range";

export async function appendNewMapFunction(
  blocFileName: string,
  toFunction: string,
  mapTemplate: string
) {
  const uri = Uri.file(blocFileName);
  const symbols = await getDocumentSymbols(uri);
  if (symbols != null) {
    let symbol = symbols.filter((s) => s.name.endsWith("Bloc"))[0];
    let fileEdit = new WorkspaceEdit();
    let toFunctionInsertPosition = symbol.range.end.translate(0, -1);
    let mapFunction = getMapEventToStateSymbol(symbol);
    if (mapFunction != undefined) {
      const doc = await workspace.openTextDocument(uri);
      let r = findOnRange(doc, mapFunction);
      if (r != undefined) {
        fileEdit.insert(uri, r, mapTemplate);
      } else {
        window.showErrorMessage(
          'Unable to find the constructor (adding on<>)'
        );
      }
    } else {
      window.showErrorMessage(
        'Unable to find the constructor'
      );
    }

    fileEdit.insert(uri, toFunctionInsertPosition, toFunction);
    await workspace.applyEdit(fileEdit);
  }
}
