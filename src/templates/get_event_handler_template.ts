import BlocEvent from "../model/bloc_event";
import { getMethodName } from "./get_method_name";

export function getEventHandlerTemplate(event: BlocEvent) {
  return `  on<${event.pSealedClass}>(${getMethodName(event)});\n  `;
}
