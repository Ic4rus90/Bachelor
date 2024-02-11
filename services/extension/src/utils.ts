import * as vscode from 'vscode';



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


export { getFileExtension, languageIsSupported, getSelectedCode, LLMStub };