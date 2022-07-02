import * as vscode from "vscode";
import { getBlocFiles } from "../util/get_bloc_files";
import { appendNewEvent } from "../util/append_new_event";
import BlocEvent from "../model/bloc_event";
import { appendNewMapFunction } from "../util/append_new_map_function";
import { getNewEmitterFunctionTemplate } from "../templates/get_new_emitter_function_template";
import { getEventHandlerTemplate } from "../templates/get_event_handler_template";
import { getNewEventTemplate } from "../templates/get_new_event_template";

export const createNewBlocEvent = async (uri: vscode.Uri) => {
  let blocFiles = getBlocFiles();
  if (blocFiles != null) {
    const eventName = await promptForEventName();
    if (eventName != undefined) {
      const eventArgs = await promptForStringArguments();
      const e = new BlocEvent(eventName);
      let newEvent = getNewEventTemplate(blocFiles.blocName, e, eventArgs);
      let mapFunctionn = getNewEmitterFunctionTemplate(blocFiles.blocName, e);
      let mapTemplate = getEventHandlerTemplate(e);
      await appendNewEvent(blocFiles.event, newEvent);
      await appendNewMapFunction(blocFiles.bloc, mapFunctionn, mapTemplate);
    }
  } else {
    vscode.window.showErrorMessage(
      "Unable to locate current bloc folder. please make sure you are editing file inside a bloc folder"
    );
  }
};

function promptForStringArguments(): Promise<String> {
  let options: vscode.InputBoxOptions = {
    placeHolder: "type the event parameters",
  };
  return new Promise(async (res, rej) => {
    let args = await vscode.window.showInputBox(options);
    if (args != undefined) {
      res(args);
    } else {
      res("");
    }
  });
}

function promptForEventName(): Promise<string | undefined> {
  let options: vscode.InputBoxOptions = {
    placeHolder: "event name",
  };
  return new Promise(async (res, rej) => {
    let eventName = await vscode.window.showInputBox(options);
    if (eventName != undefined) {
      res(eventName);
    } else {
      vscode.window.showErrorMessage("event name cannot be empty");
      res(undefined);
    }
  });
}
