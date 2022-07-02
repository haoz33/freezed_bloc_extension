import { Disposable, window, workspace } from "vscode";

export default class StateClassConfig {
  public initialState!: string;
  public defaultStates!: string[];
  public isPrivate!: boolean;
  private watcher!: Disposable;
  constructor() {
    this.setConfig();
    this.addListener();
  }

  addListener() {
    this.watcher = workspace.onDidChangeConfiguration((event) => {
      const affected = event.affectsConfiguration("freezedBloc");
      if (affected) {
        this.setConfig();
      }
    });
  }

  setConfig() {
    this.initialState = workspace
      .getConfiguration("freezedBloc")
      .get("initialState") as string;
    this.defaultStates = workspace
      .getConfiguration("freezedBloc")
      .get("defaultStates") as string[];

    this.isPrivate = workspace
      .getConfiguration("freezedBloc")
      .get("privateDefaultStates") as boolean;

    if (this.defaultStates.includes(this.initialState) === false) {
      window.showErrorMessage(
        "Unable to match initial State to any state in Default States. Please check settings for any typo or errors."
      );
      return;
    }
  }

  dispose() {
    this.watcher.dispose();
  }
}
