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
    let disposable = vscode.commands.registerCommand('security-seal.analyze_code', () => analyzeCode(output_channel));
    context.subscriptions.push(disposable);
}
exports.activate = activate;
// This method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
function analyzeCode(output_channel) {
    // Display message to the user. Kept for now for future development.
    vscode.window.showInformationMessage('Your code is sent for analysis.');
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
        vscode.window.showErrorMessage("No active editor found. Please try again.");
        return;
    }
    const file_extension = getFileExtension(editor);
    if (!file_extension) {
        vscode.window.showErrorMessage("No active editor found or file is not saved. Please try again.");
        return;
    }
    if (!languageIsSupported(file_extension)) {
        vscode.window.showErrorMessage("Unsupported file type. Supported file types: C, C++, C# and Python.");
        return;
    }
    const code = getSelectedCode(editor);
    if (!code) {
        vscode.window.showErrorMessage("No code selected.");
        return;
    }
    const text = LLMStub(code, file_extension);
    output_channel.show();
    output_channel.appendLine(text);
}
;
function getFileExtension(editor) {
    const file_path = editor.document.uri.fsPath;
    // If the file is unsaved, return null
    if (!file_path)
        return null;
    // Returns file extension from path
    return file_path.substring(file_path.lastIndexOf('.') + 1);
}
function languageIsSupported(language) {
    const allowed_languages = ["py", "c", "cpp", "cs"];
    return allowed_languages.includes(language);
}
function getSelectedCode(editor) {
    const selection = editor.selection;
    return editor.document.getText(selection);
}
function LLMStub(code, file_extension) {
    const length_of_code = code.length;
    return `Hello,\nI am Greg v2\nYou provided the following code:${code}\nThe length is ${length_of_code}\nThe file is ${file_extension}.\nEverything looks okay\nFOR NOW.`;
}
//# sourceMappingURL=extension.js.map