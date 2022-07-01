import getImport from "./get_import";
import { parse } from "yaml";
import { promises as fs } from "fs";
import { FileSystemWatcher, window, workspace } from "vscode";
import { getWorkspacePath } from "../util/get_workspace_file_path";

class Config {
  public packageImport: string | undefined;
  private watcher: FileSystemWatcher | undefined;
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
  }
}

const extensionConfig = new Config();

export default extensionConfig;
