import BlocEvent from "../model/bloc_event";

export function getMethodName(event: BlocEvent) {
  let eventClassName = event.sealedClass;
  return `_on${eventClassName}`;
}
