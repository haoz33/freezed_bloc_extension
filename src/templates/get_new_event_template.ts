import { pascalCase } from "change-case";
import BlocEvent from "../model/bloc_event";

export function getNewEventTemplate(
  blocName: string,
  event: BlocEvent,
  eventArugments: String
) {
  let pBloc = pascalCase(blocName);
  return `  const factory ${pBloc}Event.${event.name}(${eventArugments}) = ${event.pSealedClass};\n`;
}
