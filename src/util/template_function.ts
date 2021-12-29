import { Bloc } from "../model/bloc";
import { toSealedClass } from "./string_functions";
import { pascalCase } from "change-case";
import { EventArgument } from "../model/event_argument";
import IBlocEvent from "../interface/bloc_event_interface";
import BlocEvent from "../model/bloc_event";

export function getBlocContent(bloc: Bloc): string {
  return `import 'package:bloc/bloc.dart';
import 'package:freezed_annotation/freezed_annotation.dart';

part '${bloc.stateFileName}';
part '${bloc.eventFileName}';
part '${bloc.blocName}.freezed.dart';

class ${bloc.blocAsPascal} extends Bloc<${bloc.eventAsPascal},${bloc.stateNameAsPascal}>{
  ${bloc.blocAsPascal}() : super(const ${bloc.stateNameAsPascal}.initial()) {

  }
}`;
}

export function getBlocStateContent(bloc: Bloc) {
  return `part of '${bloc.blocFileName}';

@freezed
class ${bloc.stateNameAsPascal} with _\$${bloc.stateNameAsPascal} {
  const factory ${bloc.stateNameAsPascal}.initial() = _Initial;
  const factory ${bloc.stateNameAsPascal}.loadInProgress() = _LoadInProgress;
}`;
}

export function getBlocEventContent(bloc: Bloc) {
  return `part of '${bloc.blocFileName}';

@freezed
class ${bloc.eventAsPascal} with _\$${bloc.eventAsPascal} {
}`;
}

export function getNewEvent(
  blocName: string,
  event: BlocEvent,
  eventArugments: EventArgument[] = []
) {
  let pBloc = pascalCase(blocName);
  if (eventArugments.length == 0) {
    return `  const factory ${pBloc}Event.${event.name}() = ${event.pSealedClass};\n`;
  } else {
    let args = eventArugments.join(", ");
    return `  const factory ${pBloc}Event.${event.name}(${args}) = ${event.pSealedClass};\n`;
  }
}

export function getNewMapFunctionTemplate(blocName: string, event: BlocEvent) {
  let statePascal = pascalCase(blocName + "State");
  return `  Stream<${statePascal}> ${event.pMapFunction}(${event.pSealedClass} event) async* {
  }\n`;
}

export function getMapTemplate(event: BlocEvent) {
  return `\n      ${event.name}: (event) => ${event.pMapFunction}(event),\n`;
}
