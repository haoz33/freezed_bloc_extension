import * as vscode from "vscode";
import { newFreezedBloc } from "./command/new_freezed_bloc";
import { createNewBlocEvent } from "./command/create_new_event";

export function activate(context: vscode.ExtensionContext) {
  vscode.commands.registerCommand(
    "extension.createFreezedBloc",
    newFreezedBloc
  );
  vscode.commands.registerCommand(
    "extension.createNewBlocEvent",
    createNewBlocEvent
  );
}

// this method is called when your extension is deactivated
export function deactivate() {}
