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
const string_functions_1 = require("../util/string_functions");
const bloc_1 = require("../model/bloc");
exports.createNewBlocEvent = (uri) => __awaiter(void 0, void 0, void 0, function* () {
    const editor = vscode.window.activeTextEditor;
    if (editor != undefined) {
        const { document } = editor;
        const eventName = yield promptForEventName(document);
        if (eventName != undefined) {
            const bloc = bloc_1.Bloc.fromDocument(document);
            const blocFilePath = path_1.join(path_1.dirname(document.fileName), bloc.blocFileName);
            editBlocFile(blocFilePath);
        }
    }
});
function editBlocFile(blocFilePath) {
    return __awaiter(this, void 0, void 0, function* () {
        let blocFile = yield vscode.workspace.openTextDocument(blocFilePath);
        let blocEdit = new vscode.WorkspaceEdit();
        blocEdit.insert(blocFile.uri, new vscode.Position(blocFile.lineCount, 0), "//comment");
        vscode.workspace.applyEdit(blocEdit);
    });
}
function getEventContent(eventName, fileName) {
    let className = string_functions_1.toPascalCase(string_functions_1.removeDartExtension(fileName));
    let pName = string_functions_1.capitalizeFirstLetter(eventName);
    let result = `const factory ${className}.${eventName}() = _${pName};`;
    return result;
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