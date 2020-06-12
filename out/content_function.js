"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBlocEventContent = exports.getBlocStateContent = exports.getBlocContent = void 0;
function getBlocContent(bloc) {
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
exports.getBlocContent = getBlocContent;
function getBlocStateContent(bloc) {
    return `part of '${bloc.getBlocFileName()}';

@freezed
abstract class ${bloc.getStateClass()} with _\$${bloc.getStateClass()} {
  const factory ${bloc.getStateClass()}.inital() = _Inital;
  const factory ${bloc.getStateClass()}.loadSuccess() = _LoadSuccess;
  const factory ${bloc.getStateClass()}.loadFailure() = _LoadFailure;

}`;
}
exports.getBlocStateContent = getBlocStateContent;
function getBlocEventContent(bloc) {
    return `part of '${bloc.getBlocFileName()}';

@freezed
abstract class ${bloc.getEventClass()} with _\$${bloc.getEventClass()} {
  const factory ${bloc.getEventClass()}.event1() = Event1;
}`;
}
exports.getBlocEventContent = getBlocEventContent;
//# sourceMappingURL=content_function.js.map