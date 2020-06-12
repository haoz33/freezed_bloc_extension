"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bloc = void 0;
const path_1 = require("path");
const content_function_1 = require("../content_function");
const bloc_file_1 = require("./bloc_file");
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
    toPascalCase(string) {
        return `${string}`
            .replace(new RegExp(/[-_]+/, "g"), " ")
            .replace(new RegExp(/[^\w\s]/, "g"), "")
            .replace(new RegExp(/\s+(.)(\w+)/, "g"), ($1, $2, $3) => `${$2.toUpperCase() + $3.toLowerCase()}`)
            .replace(new RegExp(/\s/, "g"), "")
            .replace(new RegExp(/\w/), (s) => s.toUpperCase());
    }
}
exports.Bloc = Bloc;
//# sourceMappingURL=bloc.js.map