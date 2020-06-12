import { Bloc } from "./model/bloc";

export function getBlocContent(bloc: Bloc): string {
  return `import 'package:bloc/bloc.dart';
import 'package:freezed_annotation/freezed_annotation.dart';

part '${bloc.getStateFileName()}';
part '${bloc.getEventFileName()}';
part '${bloc.getBlocName()}.freezed.dart';

class ${bloc.getBlocClass()} extends Bloc<${bloc.getEventClass()},${bloc.getStateClass()}>{
  @override
  ${bloc.getStateClass()} get initialState => ${bloc.getStateClass()}.inital();

  @override
  Stream<${bloc.getStateClass()}> mapEventToState(${bloc.getEventClass()} event) async* {
    
  }
}`;
}

export function getBlocStateContent(bloc: Bloc) {
  return `part of '${bloc.getBlocFileName()}';

@freezed
abstract class ${bloc.getStateClass()} with _\$${bloc.getStateClass()} {
  const factory ${bloc.getStateClass()}.inital() = _Inital;
  const factory ${bloc.getStateClass()}.loadSuccess() = _LoadSuccess;
  const factory ${bloc.getStateClass()}.loadFailure() = _LoadFailure;

}`;
}

export function getBlocEventContent(bloc: Bloc) {
  return `part of '${bloc.getBlocFileName()}';

@freezed
abstract class ${bloc.getEventClass()} with _\$${bloc.getEventClass()} {
  const factory ${bloc.getEventClass()}.event1() = Event1;
}`;
}
