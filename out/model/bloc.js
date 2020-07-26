"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bloc = void 0;
const path_1 = require("path");
const content_function_1 = require("../util/content_function");
const bloc_file_1 = require("./bloc_file");
const string_functions_1 = require("../util/string_functions");
class Bloc {
    constructor(blocName) {
        if (blocName.includes("_bloc")) {
            this.name = blocName.replace("_bloc", "");
        }
        else {
            this.name = blocName;
        }
        this.blocName = blocName;
        this.stateName = this.name + "_state";
        this.eventName = this.name + "_event";
    }
    static fromDocument(doc) {
        let blocName = "";
        const filename = path_1.basename(doc.fileName);
        if (filename.endsWith("_bloc.dart"))
            blocName = filename.replace("_bloc.dart", "");
        else if (filename.endsWith("_state.dart"))
            blocName = filename.replace("_state.dart", "");
        else if (filename.endsWith("_event.dart"))
            blocName = filename.replace("_event.dart", "");
        return new this(blocName + "_bloc");
    }
    getBlocName() {
        return this.blocName;
    }
    get blocFileName() {
        return this.toFileName(this.blocName);
    }
    getBlocFileName() {
        return this.toFileName(this.blocName);
    }
    get stateFileName() {
        return this.toFileName(this.stateName);
    }
    getStateFileName() {
        return this.toFileName(this.stateName);
    }
    get eventFileName() {
        return this.toFileName(this.eventName);
    }
    getEventFileName() {
        return this.toFileName(this.eventName);
    }
    get blocAsPascal() {
        return string_functions_1.toPascalCase(this.blocName);
    }
    getBlocClass() {
        return string_functions_1.toPascalCase(this.blocName);
    }
    get stateNameAsPascal() {
        return string_functions_1.toPascalCase(this.stateName);
    }
    getStateClass() {
        return string_functions_1.toPascalCase(this.stateName);
    }
    get eventAsPascal() {
        return string_functions_1.toPascalCase(this.eventName);
    }
    getEventClass() {
        return string_functions_1.toPascalCase(this.eventName);
    }
    getBlocFiles(rootPath) {
        let r = [];
        r.push(new bloc_file_1.BlocFile(this.toPathName(rootPath, this.getBlocFileName()), content_function_1.getBlocContent(this)));
        r.push(new bloc_file_1.BlocFile(this.toPathName(rootPath, this.getEventFileName()), content_function_1.getBlocEventContent(this)));
        r.push(new bloc_file_1.BlocFile(this.toPathName(rootPath, this.getStateFileName()), content_function_1.getBlocStateContent(this)));
        return r;
    }
    toFileName(name) {
        return name + ".dart";
    }
    toPathName(rootPath, filename) {
        return path_1.join(rootPath, filename);
    }
}
exports.Bloc = Bloc;
//# sourceMappingURL=bloc.js.map