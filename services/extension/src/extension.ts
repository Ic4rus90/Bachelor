// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "security-seal" is now active!');

	const auth = require('../js/authentication.js');

	// Register authentication command
	let auth_disposable = vscode.commands.registerCommand('security-seal.authenticate', () => {
		// Call the authentication function
		auth.authenticate().then(() => {
			vscode.window.showInformationMessage('You are now authenticated.');
		}).catch((error: any) => {
			vscode.window.showErrorMessage('Authentication failed. Please try again.');
		});
	});

	context.subscriptions.push(auth_disposable);

	// Create output channel once
	const output_channel = vscode.window.createOutputChannel('Seal Output Channel');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('security-seal.analyze_code', () => analyzeCode(output_channel));		

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}


async function analyzeCode(output_channel: vscode.OutputChannel) {

	// Check if the user is authenticated
	const authenticated = await vscode.secrets.get("security-seal.authenticated");
	
	
	if (!authenticated) {
		console.log("You are not authenticated. Please authenticate first.");
		vscode.window.showErrorMessage("You are not authenticated. Please authenticate first.");
		return;
	}
	
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

	// Display message to the user. Kept for now for future development.
	vscode.window.showInformationMessage('Your code is sent for analysis.');

	const text = LLMStub(code, file_extension);
	
	output_channel.show();
	output_channel.clear();
	output_channel.appendLine(text);
};


function getFileExtension(editor: vscode.TextEditor ): string | null {
	const file_path = editor.document.uri.fsPath;
	// If the file is unsaved, return null
	if (!file_path) { return null; } 
	
	// Returns file extension from path
	return file_path.substring(file_path.lastIndexOf('.') + 1);
}


function languageIsSupported(language: string): boolean {
	const allowed_languages = ["py", "c", "cpp", "cs"];
	return allowed_languages.includes(language);
}


function getSelectedCode(editor: vscode.TextEditor): string {
	const selection = editor.selection;
	return editor.document.getText(selection);  
}


function LLMStub(code: string, file_extension: string): string {
	const length_of_code = code.length;
	
	return `Hello,\nI am Greg v2\nYou provided the following code:\n${code}\nThe length is ${length_of_code}\nThe file is ${file_extension}.\nEverything looks okay\nFOR NOW.`;
}

