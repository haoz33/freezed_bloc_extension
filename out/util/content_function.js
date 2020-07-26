"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBlocEventContent = exports.getBlocStateContent = exports.getBlocContent = void 0;
function getBlocContent(bloc) {
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
exports.getBlocContent = getBlocContent;
function getBlocStateContent(bloc) {
    return `part of '${bloc.blocFileName}';

@freezed
abstract class ${bloc.stateNameAsPascal} with _\$${bloc.stateNameAsPascal} {
  const factory ${bloc.stateNameAsPascal}.inital() = _Inital;
  const factory ${bloc.stateNameAsPascal}.loadInProgress() = _LoadInProgress;
  const factory ${bloc.stateNameAsPascal}.loadSuccess() = _LoadSuccess;
  const factory ${bloc.stateNameAsPascal}.loadFailure() = _LoadFailure;

}`;
}
exports.getBlocStateContent = getBlocStateContent;
function getBlocEventContent(bloc) {
    return `part of '${bloc.blocFileName}';

@freezed
abstract class ${bloc.eventAsPascal} with _\$${bloc.eventAsPascal} {
  const factory ${bloc.eventAsPascal}.event1() = Event1;
}`;
}
exports.getBlocEventContent = getBlocEventContent;
//# sourceMappingURL=content_function.js.map