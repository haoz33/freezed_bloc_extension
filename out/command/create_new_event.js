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
exports.createNewBlocEvent = (uri) => __awaiter(void 0, void 0, void 0, function* () {
    let options = {
        placeHolder: "event name",
    };
    let eventName = yield vscode.window.showInputBox(options);
    if (eventName != undefined) {
        let editor = vscode.window.activeTextEditor;
        if (editor != undefined) {
            let fileName = path_1.basename(editor.document.fileName);
            if (fileName.endsWith("event.dart")) {
                if (!editor.document.isDirty) {
                    let editPos;
                    for (let i = editor.document.lineCount; i > 0; i--) {
                        let p1 = new vscode.Position(i, 0);
                        let p2 = new vscode.Position(i, 10);
                        let r = new vscode.Range(p1, p2);
                        if (editor.document.getText(r).startsWith("}")) {
                            editPos = p1;
                            i = 0;
                        }
                    }
                    editor.edit((edit) => {
                        let event = getEventContent(eventName, fileName);
                        edit.insert(editPos, `  ${event}\n`);
                    });
                }
                else {
                    vscode.window.showErrorMessage("Please save current file before using this command.");
                }
            }
            else {
                vscode.window.showErrorMessage("Not in a bloc event file.");
            }
        }
    }
});
function getEventContent(eventName, fileName) {
    let className = string_functions_1.toPascalCase(string_functions_1.removeDartExtension(fileName));
    let pName = string_functions_1.capitalizeFirstLetter(eventName);
    let result = `const factory ${className}.${eventName}() = _${pName};`;
    return result;
}
function createMapEventToState(eventName) { }
//# sourceMappingURL=create_new_event.js.map