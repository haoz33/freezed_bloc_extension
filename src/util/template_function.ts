import { Bloc } from "../model/bloc";
import { pascalCase } from "change-case";
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
  eventArugments: String,
) {
  let pBloc = pascalCase(blocName);
  return `  const factory ${pBloc}Event.${event.name}(${eventArugments}) = ${event.pSealedClass};\n`;
}

export function getNewEmitterFunctionTemplate(blocName: string, event: BlocEvent) {
  let statePascal = pascalCase(blocName + "State");
  let eventClass = event.pSealedClass;

  return `  void ${getMethodName(event)}(${eventClass} event, Emitter<${statePascal}> emit) {
  }\n`;
}

export function getEventHandlerTemplate(event: BlocEvent) {
  return `\n    on<${event.pSealedClass}>(${getMethodName(event)});`;
}

function getMethodName(event: BlocEvent){
  let eventClassName = event.sealedClass;
  return `_map${eventClassName}ToState`;
}
