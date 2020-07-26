import { Bloc } from "../model/bloc";

export function getBlocContent(bloc: Bloc): string {
  return `import 'package:bloc/bloc.dart';
import 'package:freezed_annotation/freezed_annotation.dart';

part '${bloc.stateFileName}';
part '${bloc.eventFileName}';
part '${bloc.blocName}.freezed.dart';

class ${bloc.blocAsPascal} extends Bloc<${bloc.eventAsPascal},${bloc.stateNameAsPascal}>{
  ${bloc.blocAsPascal}() : super(_Inital());

  @override
  Stream<${bloc.stateNameAsPascal}> mapEventToState(${bloc.eventAsPascal} gEvent) async* {
    
  }
}`;
}

export function getBlocStateContent(bloc: Bloc) {
  return `part of '${bloc.blocFileName}';

@freezed
abstract class ${bloc.stateNameAsPascal} with _\$${bloc.stateNameAsPascal} {
  const factory ${bloc.stateNameAsPascal}.inital() = _Inital;
  const factory ${bloc.stateNameAsPascal}.loadInProgress() = _LoadInProgress;
  const factory ${bloc.stateNameAsPascal}.loadSuccess() = _LoadSuccess;
  const factory ${bloc.stateNameAsPascal}.loadFailure() = _LoadFailure;

}`;
}

export function getBlocEventContent(bloc: Bloc) {
  return `part of '${bloc.blocFileName}';

@freezed
abstract class ${bloc.eventAsPascal} with _\$${bloc.eventAsPascal} {
  const factory ${bloc.eventAsPascal}.event1() = Event1;
}`;
}
