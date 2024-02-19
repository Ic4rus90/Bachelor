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
const vscode = __importStar(require("vscode"));
// Preliminary testing of insertion capabilities 
async function insertCommentAtLine(editor, line, comment) {
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
//# sourceMappingURL=insert-comment-at-line.js.map