import { Uri } from "vscode";
import { getDocumentSymbols } from "./get_document_symbols";
import EventFile from "../interface/event_file_interface";
import { toSealedClass } from "./string_functions";
export async function getExistEvents(uri: Uri): Promise<EventFile | undefined> {
  const symbols = await getDocumentSymbols(uri);
  if (symbols != undefined) {
    let result: EventFile = {
      names: [],
      sealedClasses: [],
    };

    for (const symbol of symbols) {
      for (const c of symbol.children) {
        let name = c.name.split(".")[1];
        let sealedClass = toSealedClass(name);
        result.names.push(name);
        result.sealedClasses.push(sealedClass);
      }
      return result;
    }
  }
  return undefined;
}
