import getImport from "./get_import";
import { parse } from "yaml";
import { FileSystemWatcher, workspace } from "vscode";
import { getWorkspacePath } from "../util/get_workspace_file_path";
import StateClassConfig from "./state_class_config";

class Config {
  public packageImport: string | undefined;

  public stateClassConfig: StateClassConfig;
  private watcher: FileSystemWatcher | undefined;

  constructor() {
    this.stateClassConfig = new StateClassConfig();
  }

  async initialization() {
    this.packageImport = await this.getImportDirective();
    this.watcher = workspace.createFileSystemWatcher(
      "**/pubspec.yaml",
      false,
      false,
      false
    );
    this.watcher.onDidChange(async (uri) => {
      this.packageImport = await this.getImportDirective();
    });
  }

  async getImportDirective() {
    const file = await workspace.openTextDocument(
      getWorkspacePath("pubspec.yaml")!
    );
    const yaml = parse(file.getText());
    return getImport(yaml);
  }

  async dispose() {
    this.watcher?.dispose();
    this.stateClassConfig.dispose();
  }
}

const extensionConfig = new Config();

export default extensionConfig;
