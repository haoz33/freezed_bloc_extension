"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNewBlocEvent = void 0;
const vscode = require("vscode");
const path_1 = require("path");
const bloc_1 = require("../model/bloc");
const edit_functions_1 = require("../util/edit_functions");
const event_argument_1 = require("../model/event_argument");
const string_functions_1 = require("../util/string_functions");
exports.createNewBlocEvent = (uri) => __awaiter(void 0, void 0, void 0, function* () {
    const editor = vscode.window.activeTextEditor;
    if (editor != undefined) {
        const { document } = editor;
        const eventName = yield promptForEventName(document);
        if (eventName != undefined) {
            const args = yield promptForArguments();
            const bloc = bloc_1.Bloc.fromDocument(document);
            const blocFilePath = path_1.join(path_1.dirname(document.fileName), bloc.blocFileName);
            const eventFilePath = path_1.join(path_1.dirname(document.fileName), bloc.eventFileName);
            const pEventName = "_" + string_functions_1.toPascalCase(eventName);
            editBlocFile(blocFilePath, bloc, eventName, pEventName);
            editEventFile(eventFilePath, bloc, eventName, pEventName, args);
        }
        else {
            vscode.window.showErrorMessage("Unable to locate current bloc folder. please make sure you are editing file inside a bloc folder");
        }
    }
});
function editBlocFile(blocFilePath, bloc, eventName, pEventname) {
    return __awaiter(this, void 0, void 0, function* () {
        let content = `  Stream<${bloc.stateNameAsPascal}> _${eventName}ToState(${pEventname} event) {\n}`;
        yield edit_functions_1.appendToFile(blocFilePath, content);
    });
}
function editEventFile(eventFilePath, bloc, eventName, pEventName, args) {
    return __awaiter(this, void 0, void 0, function* () {
        let arg = args.length > 0 ? args.join(", ") : "";
        let content = `  const factory ${bloc.eventAsPascal}.${eventName}(${arg}) = ${pEventName};\n`;
        yield edit_functions_1.appendToFile(eventFilePath, content);
    });
}
function promptForArguments() {
    let options = {
        placeHolder: "String arg, String arg2",
    };
    return new Promise((res, rej) => __awaiter(this, void 0, void 0, function* () {
        let args = yield vscode.window.showInputBox(options);
        if (args != undefined) {
            if (args.length == 0) {
                res([]);
                return;
            }
            let result = [];
            args.split(",").forEach((arg) => {
                let a = arg.trim().split(" ");
                result.push(new event_argument_1.EventArgument(a[0], a[1]));
            });
            res(result);
        }
        else {
            res([]);
        }
    }));
}
function promptForEventName(currentDoc) {
    let options = {
        placeHolder: "event name",
    };
    return new Promise((res, rej) => __awaiter(this, void 0, void 0, function* () {
        const fileName = path_1.basename(currentDoc.fileName);
        if (fileName.endsWith("bloc.dart") ||
            fileName.endsWith("event.dart") ||
            fileName.endsWith("state.dart")) {
            let eventName = yield vscode.window.showInputBox(options);
            if (eventName != undefined) {
                res(eventName);
            }
            else {
                vscode.window.showErrorMessage("event name cannot be empty");
                res(undefined);
            }
        }
        else {
            vscode.window.showErrorMessage("Your are not in a valid bloc file. Unable to create new event");
            res(undefined);
        }
    }));
}
//# sourceMappingURL=create_new_event.js.map