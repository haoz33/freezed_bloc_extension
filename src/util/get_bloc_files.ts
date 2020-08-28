import { BlocFiles } from "../interface/bloc_files";
import { window } from "vscode";
import { basename, dirname, join } from "path";
import { getBlocNameFromFile } from "./get_bloc_name_from_file";

export function getBlocFiles(): BlocFiles | undefined {
  const editor = window.activeTextEditor;
  if (editor != null) {
    const baseName = basename(editor.document.fileName);
    const parentDir = dirname(editor.document.fileName);

    if (isValidBlocFile(baseName)) {
      let blocName = getBlocNameFromFile(baseName);
      let result: BlocFiles = {
        bloc: join(parentDir, blocName + "_bloc.dart"),
        state: join(parentDir, blocName + "_state.dart"),
        event: join(parentDir, blocName + "_event.dart"),
        blocName: blocName ?? "",
      };
      return result;
    }
  }
  return undefined;
}

function isValidBlocFile(fileName: string) {
  if (
    fileName.endsWith("_state.dart") ||
    fileName.endsWith("_event.dart") ||
    fileName.endsWith("_bloc.dart")
  )
    return true;
  return false;
}
