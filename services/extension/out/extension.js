"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = __importStar(require("vscode"));
// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
function activate(context) {
    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "security-seal" is now active!');
    // Create output channel once
    const output_channel = vscode.window.createOutputChannel('Seal Output Channel');
    // The command has been defined in the package.json file
    // Now provide the implementation of the command with registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand('security-seal.analyze_code', () => {
        // The code you place here will be executed every time your command is executed
        // Display a message box to the user
        vscode.window.showInformationMessage('Your code is sent for analysis.');
        // Fetch file extension
        const user_editor = vscode.window.activeTextEditor;
        if (!user_editor) {
            //TODO: Add additional information here. Not sure how doing this without an editor would be possible. 
            return;
        }
        // This only works if the file is saved. Should we add another way of checking if the file is not saved?
        const file_path = user_editor.document.uri.fsPath;
        const file_extension = file_path.substring(file_path.lastIndexOf('.') + 1);
        const allowed_extensions = ["py", "c", "cpp", "cs"];
        if (!allowed_extensions.includes(file_extension)) {
            output_channel.show();
            output_channel.appendLine("The file is not supported.\nPlease select code in a c, cpp, cs or py file.");
            return;
        }
        // TODO: Implement sending and receiving of code
        let text = `Your code is in ${file_extension}.\nAnalyzing code ... `;
        output_channel.show();
        output_channel.appendLine(text);
    });
    context.subscriptions.push(disposable);
}
exports.activate = activate;
// This method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map