import * as vscode from "vscode";
import { basename, join, dirname } from "path";
import {
  capitalizeFirstLetter,
  toPascalCase,
  removeDartExtension,
} from "../util/string_functions";
import { Bloc } from "../model/bloc";

export const createNewBlocEvent = async (uri: vscode.Uri) => {
  const editor = vscode.window.activeTextEditor;
  if (editor != undefined) {
    const { document } = editor;
    const eventName = await promptForEventName(document);
    if (eventName != undefined) {
      const bloc = Bloc.fromDocument(document);
      const blocFilePath = join(dirname(document.fileName), bloc.blocFileName);
      editBlocFile(blocFilePath);
    }
  }
};

async function editBlocFile(blocFilePath: string) {
  let blocFile = await vscode.workspace.openTextDocument(blocFilePath);

  let blocEdit = new vscode.WorkspaceEdit();
  blocEdit.insert(
    blocFile.uri,
    new vscode.Position(blocFile.lineCount, 0),
    "//comment"
  );
  vscode.workspace.applyEdit(blocEdit);
}

function getEventContent(eventName: string, fileName: string) {
  let className = toPascalCase(removeDartExtension(fileName));
  let pName = capitalizeFirstLetter(eventName);
  let result = `const factory ${className}.${eventName}() = _${pName};`;
  return result;
}

function promptForEventName(
  currentDoc: vscode.TextDocument
): Promise<string | undefined> {
  let options: vscode.InputBoxOptions = {
    placeHolder: "event name",
  };
  return new Promise(async (res, rej) => {
    const fileName = basename(currentDoc.fileName);
    if (
      fileName.endsWith("bloc.dart") ||
      fileName.endsWith("event.dart") ||
      fileName.endsWith("state.dart")
    ) {
      let eventName = await vscode.window.showInputBox(options);
      if (eventName != undefined) {
        res(eventName);
      } else {
        vscode.window.showErrorMessage("event name cannot be empty");
        res(undefined);
      }
    } else {
      vscode.window.showErrorMessage(
        "Your are not in a valid bloc file. Unable to create new event"
      );
      res(undefined);
    }
  });
}
