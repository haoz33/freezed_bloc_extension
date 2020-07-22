import * as vscode from "vscode";
import { newFreezedBloc } from "./command/new_freezed_bloc";

export function activate(context: vscode.ExtensionContext) {
  vscode.commands.registerCommand(
    "extension.createFreezedBloc",
    newFreezedBloc
  );
}

// this method is called when your extension is deactivated
export function deactivate() {}
