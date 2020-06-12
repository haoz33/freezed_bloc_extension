import { Bloc } from "./model/bloc";

export function getBlocContent(bloc: Bloc): string {
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
