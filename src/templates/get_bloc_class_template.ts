import extensionConfig from "../config/config";
import { Bloc } from "../model/bloc";

export function getBlocClassTemplate(bloc: Bloc): string {
  return `${extensionConfig.packageImport}
import 'package:freezed_annotation/freezed_annotation.dart';

part '${bloc.stateFileName}';
part '${bloc.eventFileName}';
part '${bloc.blocName}.freezed.dart';

class ${bloc.blocAsPascal} extends Bloc<${bloc.eventAsPascal},${bloc.stateNameAsPascal}>{
  ${bloc.blocAsPascal}() : super(const ${bloc.stateNameAsPascal}.${extensionConfig.stateClassConfig.initialState}()){
    
  }
}`;
}
