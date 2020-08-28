import * as vscode from "vscode";
import { EventArgument } from "../model/event_argument";
import { getBlocFiles } from "../util/get_bloc_files";
import { appendNewEvent } from "../util/append_new_event";
import {
  getNewEvent,
  getNewMapFunctionTemplate,
} from "../util/template_function";
import BlocEvent from "../model/bloc_event";
import { appendNewMapFunction } from "../util/append_new_map_function";

export const createNewBlocEvent = async (uri: vscode.Uri) => {
  let blocFiles = getBlocFiles();
  if (blocFiles != null) {
    const eventName = await promptForEventName();
    if (eventName != undefined) {
      const eventArgs = await promptForArguments();
      const e = new BlocEvent(eventName);
      let newEvent = getNewEvent(blocFiles.blocName, e, eventArgs);
      let mapFunctionn = getNewMapFunctionTemplate(blocFiles.blocName, e);
      await appendNewEvent(blocFiles.event, newEvent);
      await appendNewMapFunction(blocFiles.bloc, mapFunctionn);
    }
  } else {
    vscode.window.showErrorMessage(
      "Unable to locate current bloc folder. please make sure you are editing file inside a bloc folder"
    );
  }
};

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
