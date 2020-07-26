import * as vscode from "vscode";
import { basename, join, dirname } from "path";
import { Bloc } from "../model/bloc";
import { appendToFile } from "../util/edit_functions";
import { EventArgument } from "../model/event_argument";
import { toPascalCase } from "../util/string_functions";

export const createNewBlocEvent = async (uri: vscode.Uri) => {
  const editor = vscode.window.activeTextEditor;
  if (editor != undefined) {
    const { document } = editor;
    const eventName = await promptForEventName(document);
    if (eventName != undefined) {
      const args = await promptForArguments();
      const bloc = Bloc.fromDocument(document);
      const blocFilePath = join(dirname(document.fileName), bloc.blocFileName);
      const eventFilePath = join(
        dirname(document.fileName),
        bloc.eventFileName
      );
      const pEventName = "_" + toPascalCase(eventName);
      editBlocFile(blocFilePath, bloc, eventName, pEventName);
      editEventFile(eventFilePath, bloc, eventName, pEventName, args);
    } else {
      vscode.window.showErrorMessage(
        "Unable to locate current bloc folder. please make sure you are editing file inside a bloc folder"
      );
    }
  }
};

async function editBlocFile(
  blocFilePath: string,
  bloc: Bloc,
  eventName: string,
  pEventname: string
) {
  let content = `  Stream<${bloc.stateNameAsPascal}> _${eventName}ToState(${pEventname} event) {\n}`;
  await appendToFile(blocFilePath, content);
}

async function editEventFile(
  eventFilePath: string,
  bloc: Bloc,
  eventName: string,
  pEventName: string,
  args: EventArgument[]
) {
  let arg = args.length > 0 ? args.join(", ") : "";
  let content = `  const factory ${bloc.eventAsPascal}.${eventName}(${arg}) = ${pEventName};\n`;
  await appendToFile(eventFilePath, content);
}

function promptForArguments(): Promise<EventArgument[]> {
  let options: vscode.InputBoxOptions = {
    placeHolder: "String arg, String arg2",
  };
  return new Promise(async (res, rej) => {
    let args = await vscode.window.showInputBox(options);
    if (args != undefined) {
      if (args.length == 0) {
        res([]);
        return;
      }
      let result: EventArgument[] = [];
      args.split(",").forEach((arg) => {
        let a = arg.trim().split(" ");
        result.push(new EventArgument(a[0], a[1]));
      });
      res(result);
    } else {
      res([]);
    }
  });
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
