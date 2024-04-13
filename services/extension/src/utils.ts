import * as vscode from 'vscode';


function getFileExtension(editor: vscode.TextEditor ): string | null {
	const file_path = editor.document.uri.fsPath;
	
	// If the file is unsaved, return null
	if (!file_path) { 
		return null; 
	} 

	// If the file has no extension, return empty string
	if (file_path.indexOf('.') === -1) {
		 return ''; 
		}
	
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


function getLineNumber(editor: vscode.TextEditor): number {
	const selection = editor.selection;
	console.log(selection.start.line + 1);
	return selection.start.line + 1;
}


export { getFileExtension, languageIsSupported, getSelectedCode, getLineNumber };