import * as vscode from "vscode";
import { basename } from "path";
import {
  capitalizeFirstLetter,
  toPascalCase,
  removeDartExtension,
} from "../util/string_functions";

export const createNewBlocEvent = async (uri: vscode.Uri) => {
  let options: vscode.InputBoxOptions = {
    placeHolder: "event name",
  };

  let eventName = await vscode.window.showInputBox(options);
  if (eventName != undefined) {
    let editor = vscode.window.activeTextEditor;
    if (editor != undefined) {
      let fileName = basename(editor.document.fileName);
      if (fileName.endsWith("event.dart")) {
        if (!editor.document.isDirty) {
          let editPos: vscode.Position;
          for (let i = editor.document.lineCount; i > 0; i--) {
            let p1 = new vscode.Position(i, 0);
            let p2 = new vscode.Position(i, 10);
            let r = new vscode.Range(p1, p2);
            if (editor.document.getText(r).startsWith("}")) {
              editPos = p1;
              i = 0;
            }
          }
          editor.edit((edit) => {
            let event = getEventContent(eventName!, fileName);
            edit.insert(editPos, `  ${event}\n`);
          });
        } else {
          vscode.window.showErrorMessage(
            "Please save current file before using this command."
          );
        }
      } else {
        vscode.window.showErrorMessage("Not in a bloc event file.");
      }
    }
  }
};

function getEventContent(eventName: string, fileName: string) {
  let className = toPascalCase(removeDartExtension(fileName));
  let pName = capitalizeFirstLetter(eventName);
  let result = `const factory ${className}.${eventName}() = _${pName};`;
  return result;
}

function createMapEventToState(eventName: string) {}
