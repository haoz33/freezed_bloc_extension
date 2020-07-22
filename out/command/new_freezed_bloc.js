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
exports.newFreezedBloc = void 0;
const vscode = require("vscode");
const fs = require("fs");
const path_1 = require("path");
const bloc_1 = require("../model/bloc");
exports.newFreezedBloc = (uri) => __awaiter(void 0, void 0, void 0, function* () {
    let options = {
        value: "_bloc",
        valueSelection: [0, 0],
    };
    let blocName = yield vscode.window.showInputBox(options);
    if (blocName != null) {
        let bloc = new bloc_1.Bloc(blocName);
        let targetDir;
        if (uri != undefined) {
            targetDir = uri.fsPath;
            let rootDir = path_1.join(targetDir.toString(), bloc.getBlocName());
            fs.mkdirSync(rootDir);
            let files = bloc.getBlocFiles(rootDir);
            files.map((file) => __awaiter(void 0, void 0, void 0, function* () {
                fs.writeFile(file.path, file.content, (err) => {
                    if (err)
                        return vscode.window.showErrorMessage(err.message);
                });
            }));
        }
    }
});
//# sourceMappingURL=new_freezed_bloc.js.map