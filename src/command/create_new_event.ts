import * as vscode from "vscode";
import { basename } from "path";

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
          let p1 = new vscode.Position(editor.document.lineCount, 0);
          let p2 = new vscode.Position(editor.document.lineCount, 10);

          let r = new vscode.Range(p1, p2);
          console.log(editor.document.getText(r));
          console.log(editor.document.lineCount);

          const editPostion = new vscode.Position(editor.document.lineCount, 0);
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
