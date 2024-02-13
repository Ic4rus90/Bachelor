import * as vscode from 'vscode';

// Preliminary testing of insertion capabilities 

async function insertCommentAtLine(editor: vscode.TextEditor, line: number, comment: string): Promise<void> {

    // Compensate for 0-indexation of VS Code
    const zero_indexed_line_number = line - 1;
    
    const position = new vscode.Position(zero_indexed_line_number, 0);

    await editor.edit((editBuilder) => {
    
    editBuilder.insert(position, `\n${comment}`);
    });

    await editor.document.save();
}

/* 
    In order for this to work properly, the secretary should return the line numbers and comments.
    The line numbers must be 1-indexed, and the comments must be strings.
    These comments should be sorted in descending order of line number, in order to prevent skewing the line numbers.  
*/