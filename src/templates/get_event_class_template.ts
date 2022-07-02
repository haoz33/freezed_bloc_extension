import { Bloc } from "../model/bloc";

export function getBlocEventContent(bloc: Bloc) {
  return `part of '${bloc.blocFileName}';

@freezed
class ${bloc.eventAsPascal} with _\$${bloc.eventAsPascal} {
}`;
}
