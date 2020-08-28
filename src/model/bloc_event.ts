import IBlocEvent from "../interface/bloc_event_interface";
import { camelCase, pascalCase } from "change-case";

export default class BlocEvent implements IBlocEvent {
  name: string;
  sealedClass: string;
  pSealedClass: string;

  constructor(eventName: string) {
    this.name = eventName;
    this.sealedClass = pascalCase(eventName);
    this.pSealedClass = "_" + this.sealedClass;
  }
}
