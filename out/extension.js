"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = require("vscode");
const new_freezed_bloc_1 = require("./command/new_freezed_bloc");
function activate(context) {
    vscode.commands.registerCommand("extension.createFreezedBloc", new_freezed_bloc_1.newFreezedBloc);
}
exports.activate = activate;
// this method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map