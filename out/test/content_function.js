"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBlocContent = void 0;
const pascal_case_converter_1 = require("../util/pascal_case_converter");
function getBlocContent(blocFileName, stateFileName, eventFileName) {
    let stateName = pascal_case_converter_1.toPascalCase(pascal_case_converter_1.removeDartExtension(stateFileName));
    let eventName = pascal_case_converter_1.toPascalCase(pascal_case_converter_1.removeDartExtension(eventFileName));
    let blocName = pascal_case_converter_1.toPascalCase(pascal_case_converter_1.removeDartExtension(blocFileName));
    return `import 'package:bloc/bloc.dart';
import 'package:freezed_annotation/freezed_annotation.dart';

part '${eventFileName}';
part '${stateFileName}';
part 'order_bloc.freezed.dart';

class ${blocName} extends Bloc<${eventName},${stateName}>{
  @override
  OrderState get initialState => ${stateName}.inital();

  @override
  Stream<OrderState> mapEventToState(OrderEvent event) async* {
    yield* event.when(
    );
  }
}`;
}
exports.getBlocContent = getBlocContent;
//# sourceMappingURL=content_function.js.map