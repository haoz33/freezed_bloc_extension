import { join } from "path";
import {
  getBlocContent,
  getBlocEventContent,
  getBlocStateContent,
} from "../content_function";
import { BlocFile } from "./bloc_file";

export class Bloc {
  private name: string;
  private blocName: string;
  private stateName: string;
  private eventName: string;

  constructor(blocName: string) {
    if (blocName.includes("_bloc")) {
      this.name = blocName.replace("_bloc", "");
    } else {
      this.name = blocName;
    }
    this.blocName = blocName;
    this.stateName = this.name + "_state";
    this.eventName = this.name + "_event";
  }

  getBlocName() {
    return this.blocName;
  }

  getBlocFileName() {
    return this.toFileName(this.blocName);
  }

  getStateFileName() {
    return this.toFileName(this.stateName);
  }

  getEventFileName() {
    return this.toFileName(this.eventName);
  }

  getBlocClass() {
    return this.toPascalCase(this.blocName);
  }

  getStateClass() {
    return this.toPascalCase(this.stateName);
  }

  getEventClass() {
    return this.toPascalCase(this.eventName);
  }

  getBlocFiles(rootPath: string): BlocFile[] {
    let r: BlocFile[] = [];
    r.push(
      new BlocFile(
        this.toPathName(rootPath, this.getBlocFileName()),
        getBlocContent(this)
      )
    );
    r.push(
      new BlocFile(
        this.toPathName(rootPath, this.getEventFileName()),
        getBlocEventContent(this)
      )
    );
    r.push(
      new BlocFile(
        this.toPathName(rootPath, this.getStateFileName()),
        getBlocStateContent(this)
      )
    );
    return r;
  }

  toFileName(name: string) {
    return name + ".dart";
  }

  toPathName(rootPath: string, filename: string) {
    return join(rootPath, filename);
  }

  toPascalCase(string: string) {
    return `${string}`
      .replace(new RegExp(/[-_]+/, "g"), " ")
      .replace(new RegExp(/[^\w\s]/, "g"), "")
      .replace(
        new RegExp(/\s+(.)(\w+)/, "g"),
        ($1, $2, $3) => `${$2.toUpperCase() + $3.toLowerCase()}`
      )
      .replace(new RegExp(/\s/, "g"), "")
      .replace(new RegExp(/\w/), (s) => s.toUpperCase());
  }
}
