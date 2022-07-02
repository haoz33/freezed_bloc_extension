import { pascalCase } from "change-case";
import BlocEvent from "../model/bloc_event";
import { getMethodName } from "./get_method_name";

export function getNewEmitterFunctionTemplate(
  blocName: string,
  event: BlocEvent
) {
  let statePascal = pascalCase(blocName + "State");
  let eventClass = event.pSealedClass;

  return `  void ${getMethodName(
    event
  )}(${eventClass} event, Emitter<${statePascal}> emit) {
  }\n`;
}
