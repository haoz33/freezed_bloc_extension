import * as vscode from "vscode";
import * as fs from "fs";
import { join, dirname } from "path";
import { Bloc } from "../model/bloc";

export const newFreezedBloc = async (uri: vscode.Uri) => {
  let options: vscode.InputBoxOptions = {
    value: "_bloc",
    valueSelection: [0, 0],
  };

  let dName = await vscode.window.showInputBox(options);

  if (dName != null) {
    let bloc = new Bloc(dName);
    let targetDir: String;

    if (uri != undefined) {
      targetDir = uri.fsPath;
      let rootDir = join(targetDir.toString(), bloc.getBlocName());
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
