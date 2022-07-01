import * as vscode from "vscode";
import * as fs from "fs";
import { join } from "path";
import { Bloc } from "../model/bloc";
import extensionConfig from "../config/config";

export const newFreezedBloc = async (uri: vscode.Uri) => {
  if (extensionConfig.packageImport == undefined) {
    vscode.window.showErrorMessage(
      "Unable to found bloc package used in the project. Please add bloc/flutter_bloc to the pubspec.yaml."
    );
    return;
  }

  let options: vscode.InputBoxOptions = {
    value: "_bloc",
    valueSelection: [0, 0],
  };

  let blocName = await vscode.window.showInputBox(options);

  if (blocName != null) {
    let bloc = new Bloc(blocName);
    let targetDir: String;

    if (uri != undefined) {
      targetDir = uri.fsPath;
      let rootDir = join(targetDir.toString(), bloc.name);
      fs.mkdirSync(rootDir);
      let files = bloc.getBlocFiles(rootDir);
      files.map(async (file) => {
        fs.writeFile(file.path, file.content, (err) => {
          if (err) return vscode.window.showErrorMessage(err.message);
        });
      });
    }
  }
};
