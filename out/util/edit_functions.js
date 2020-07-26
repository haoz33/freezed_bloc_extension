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
exports.appendToFile = void 0;
const vscode_1 = require("vscode");
function appendToFile(filePath, content) {
    return __awaiter(this, void 0, void 0, function* () {
        let file = yield vscode_1.workspace.openTextDocument(filePath);
        let pos = findLastbracketPos(file);
        if (!content.endsWith("\n")) {
            content += "\n";
        }
        if (pos != undefined) {
            let fileEdit = new vscode_1.WorkspaceEdit();
            fileEdit.insert(file.uri, pos, content);
            vscode_1.workspace.applyEdit(fileEdit);
            file.save();
        }
        else {
            vscode_1.window.showErrorMessage("Unable to find position to insert the content.");
        }
    });
}
exports.appendToFile = appendToFile;
function findLastbracketPos(doc) {
    for (let line = doc.lineCount; line > 0; line--) {
        let pos1 = new vscode_1.Position(line, 0);
        let pos2 = new vscode_1.Position(line, 5);
        if (doc.getText(new vscode_1.Range(pos1, pos2)).startsWith("}")) {
            return pos1;
        }
    }
    return undefined;
}
//# sourceMappingURL=edit_functions.js.map