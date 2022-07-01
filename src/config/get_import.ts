import { workspace } from "vscode";

export default function getImport(yaml: any): string | undefined {
  let config = workspace.getConfiguration("freezedBloc").get("import");

  switch (config) {
    case "auto":
      if ("bloc" in yaml.dependencies) {
        return "import 'package:bloc/bloc.dart';";
      }
      if ("flutter_bloc" in yaml.dependencies) {
        return "import 'package:flutter_bloc/flutter_bloc.dart';";
      }
      return undefined;
    case "bloc":
      return "import 'package:bloc/bloc.dart';";
    case "flutter_bloc":
      return "import 'package:flutter_bloc/flutter_bloc.dart';";
  }
  return undefined;
}
