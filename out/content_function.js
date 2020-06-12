"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBlocContent = void 0;
function getBlocContent(bloc) {
    return `import 'package:bloc/bloc.dart';
import 'package:freezed_annotation/freezed_annotation.dart';

part '${bloc.getStateFileName()}';
part '${bloc.getEventFileName()}';
part '${bloc.getBlocName()}.freezed.dart';

class ${bloc.getBlocClass()} extends Bloc<${bloc.getEventClass()},${bloc.getStateClass()}>{
  @override
  OrderState get initialState => ${bloc.getStateClass()}.inital();

  @override
  Stream<OrderState> mapEventToState(OrderEvent event) async* {
    yield* event.when(
    );
  }
}`;
}
exports.getBlocContent = getBlocContent;
//# sourceMappingURL=content_function.js.map