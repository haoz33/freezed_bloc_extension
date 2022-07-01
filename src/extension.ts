import * as vscode from "vscode";
import { newFreezedBloc } from "./command/new_freezed_bloc";
import { createNewBlocEvent } from "./command/create_new_event";
import extensionConfig from "./config/config";

export async function activate(context: vscode.ExtensionContext) {
  await extensionConfig.initialization();
  vscode.commands.registerCommand(
    "extension.createFreezedBloc",
    newFreezedBloc
  );
  vscode.commands.registerCommand(
    "extension.createNewBlocEvent",
    createNewBlocEvent
  );
}

export async function deactivate() {
  await extensionConfig.dispose();
}
