import * as vscode from 'vscode';
import { getFileExtension, languageIsSupported, getSelectedCode } from './utils';
import { showAuthenticationPrompt, isAccessTokenExpired } from './auth';
import { LLMStub } from './llm-stub';

async function analyzeCode(output_channel: vscode.OutputChannel, context: vscode.ExtensionContext) {

	// Check if the user is authenticated
    const authenticated = await context.secrets.get('security-seal-access-token');

    // If the user is not authenticated or the access token has expired, show the authentication prompt
	if (!authenticated || await isAccessTokenExpired(context)) {
		showAuthenticationPrompt(context);
		return;
	}    
	
	const editor = vscode.window.activeTextEditor;
		
	if (!editor) {
		vscode.window.showErrorMessage("No active editor found. Please try.");
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

	// Get the code the user selected in the editor
	const code = getSelectedCode(editor);

	if (!code) {
		vscode.window.showErrorMessage("No code selected.");
		return;
	}

	// Display message to the user. Kept for now for future development.
	vscode.window.showInformationMessage('Your code is sent for analysis.');

	const text = LLMStub(code, file_extension);
	
	output_channel.show();
	output_channel.appendLine(text);
};

export { analyzeCode };
