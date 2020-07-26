import { join, basename } from "path";
import {
  getBlocContent,
  getBlocEventContent,
  getBlocStateContent,
} from "../util/content_function";
import { BlocFile } from "./bloc_file";
import { toPascalCase } from "../util/string_functions";
import { TextDocument } from "vscode";

export class Bloc {
  private name: string;
  public blocName: string;
  public stateName: string;
  public eventName: string;

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

  static fromDocument(doc: TextDocument): Bloc {
    let blocName = "";
    const filename = basename(doc.fileName);
    if (filename.endsWith("_bloc.dart"))
      blocName = filename.replace("_bloc.dart", "");
    else if (filename.endsWith("_state.dart"))
      blocName = filename.replace("_state.dart", "");
    else if (filename.endsWith("_event.dart"))
      blocName = filename.replace("_event.dart", "");
    return new this(blocName + "_bloc");
  }

  get blocFileName() {
    return this.toFileName(this.blocName);
  }
  get stateFileName() {
    return this.toFileName(this.stateName);
  }
  get eventFileName() {
    return this.toFileName(this.eventName);
  }

  get blocAsPascal() {
    return toPascalCase(this.blocName);
  }
  get stateNameAsPascal() {
    return toPascalCase(this.stateName);
  }
  get eventAsPascal() {
    return toPascalCase(this.eventName);
  }

  getBlocFiles(rootPath: string): BlocFile[] {
    let r: BlocFile[] = [];
    r.push(
      new BlocFile(
        this.toPathName(rootPath, this.blocFileName),
        getBlocContent(this)
      )
    );
    r.push(
      new BlocFile(
        this.toPathName(rootPath, this.eventFileName),
        getBlocEventContent(this)
      )
    );
    r.push(
      new BlocFile(
        this.toPathName(rootPath, this.stateFileName),
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
}
