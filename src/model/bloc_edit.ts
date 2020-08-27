import { TextDocument, workspace, Uri, DocumentSymbol } from "vscode";
import { getMapEventToStateSymbol } from "../util/get_map_event_to_state_function";
import { replaceMapEventToState } from "../util/replace_map_event_to_state_content";

export default class BlocEdit {
  private uri: Uri;
  private document: TextDocument | undefined;
  private mapFunction: DocumentSymbol | undefined;
  constructor(filePath: string) {
    this.uri = Uri.file(filePath);
  }

  async init() {
    this.document = await workspace.openTextDocument(this.uri);
    this.mapFunction = await getMapEventToStateSymbol(this.uri);
  }

  get mapFunctionContent() {
    let content = this.document?.getText(this.mapFunction?.range);
    if (content != undefined) {
      return replaceMapEventToState(content, "");
    }
    return "";
  }

  async appendToMapFucntion(map: string) {}
}
