// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import path from "path";
import * as vscode from "vscode";

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "magicconsole" is now active!');
  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerCommand(
    "magicconsole.generateConsoleLog",
    async () => {
      // Get the text editor
      const editor = vscode.window.activeTextEditor;
      if (editor) {
        // Get the current selection
        const selection = editor.selection;

        // Get the text within the selection
        const selectedText = editor.document.getText(selection);

        // Get the file name and its folder
        const fileName = editor.document.fileName;
        const workspaceFolder = vscode.workspace.getWorkspaceFolder(
          editor.document.uri
        );

        if (workspaceFolder) {
          // Check if the workspace has a parent folder
          const parentFolder = path.dirname(workspaceFolder.uri.fsPath);

          if (parentFolder !== workspaceFolder.uri.fsPath) {
            // Generate the console.log statement with file and folder information
            const consoleLogStatement = `\n 🚀  console.log('${path.basename(
              parentFolder
            )}/${path.basename(path.dirname(fileName))}/${path.basename(
              fileName
            )}:', '${selectedText}:🌸', ${selectedText});\n`;

            // Insert the console.log statement on the next line after the current line
            await editor.edit(async (editBuilder) => {
              const position = new vscode.Position(selection.end.line + 1, 0);
              editBuilder.insert(position, consoleLogStatement);
            });

            // Show an information message with the selected text
            vscode.window.showInformationMessage(
              `Selected text: ${selectedText}`
            );
          } else {
            vscode.window.showInformationMessage(
              "File is at the root level; no parent folder."
            );
          }
        } else {
          vscode.window.showInformationMessage(
            "File is not part of a workspace."
          );
        }
      }
    }
  );

  context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
