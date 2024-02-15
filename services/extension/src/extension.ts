// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { analyzeCode } from './analysis';
import { authenticate } from './auth';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "security-seal" is now active!');

	// Register authentication command
	let auth_disposable = vscode.commands.registerCommand('security-seal.authenticate', async () => {
		// Call the authentication function
		try {
			await authenticate(context);
			vscode.window.showInformationMessage('Authentication successful.');
		} catch(error: any) {
			vscode.window.showErrorMessage('Authentication failed. Please try again.');
		}
	});

	context.subscriptions.push(auth_disposable);

	// Create output channel once
	const output_channel = vscode.window.createOutputChannel('Seal Output Channel');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('security-seal.analyze_code', () => analyzeCode(output_channel, context));
	
	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}







