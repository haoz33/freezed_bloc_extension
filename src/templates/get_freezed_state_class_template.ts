import { pascalCase } from "change-case";
import extensionConfig from "../config/config";
import { Bloc } from "../model/bloc";

export function getFreezedStateClassTemplate(bloc: Bloc) {
  return `part of '${bloc.blocFileName}';

@freezed
class ${bloc.stateNameAsPascal} with _\$${bloc.stateNameAsPascal} {
  ${generateStates(bloc)}
}`;
}

function generateStates(bloc: Bloc): string {
  const isPrivate = extensionConfig.stateClassConfig.isPrivate;
  const result = extensionConfig.stateClassConfig.defaultStates.map(
    (e) =>
      `const factory ${bloc.stateNameAsPascal}.${e}() = ${
        isPrivate ? "_" : ""
      }${pascalCase(e)};`
  );

  return result.join("\n  ");
}
