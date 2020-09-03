import {
  CodeAction,
  CodeActionProvider,
  TextDocument,
  CodeActionContext,
  CancellationToken,
  window,
} from "vscode";

export class FreezedBlocActionProvider implements CodeActionProvider {
  provideCodeActions(
    document: TextDocument,
    range: import("vscode").Range | import("vscode").Selection,
    context: CodeActionContext,
    token: CancellationToken
  ): import("vscode").ProviderResult<
    (import("vscode").Command | CodeAction)[]
  > {
    const editor = window.activeTextEditor;

    if (!editor) return [];
    if (!editor.document.fileName.endsWith("_bloc.ts")) return [];
    return [
      {
        command: "extension.add-return-map",
        title: "add return ",
      },
    ];
  }
}
