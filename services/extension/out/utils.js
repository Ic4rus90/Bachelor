"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LLMStub = exports.getSelectedCode = exports.languageIsSupported = exports.getFileExtension = void 0;
function getFileExtension(editor) {
    const file_path = editor.document.uri.fsPath;
    // If the file is unsaved, return null
    if (!file_path) {
        return null;
    }
    // Returns file extension from path
    return file_path.substring(file_path.lastIndexOf('.') + 1);
}
exports.getFileExtension = getFileExtension;
function languageIsSupported(language) {
    const allowed_languages = ["py", "c", "cpp", "cs"];
    return allowed_languages.includes(language);
}
exports.languageIsSupported = languageIsSupported;
function getSelectedCode(editor) {
    const selection = editor.selection;
    return editor.document.getText(selection);
}
exports.getSelectedCode = getSelectedCode;
function LLMStub(code, file_extension) {
    const length_of_code = code.length;
    return `Hello,\nI am Greg v2\nYou provided the following code:\n${code}\nThe length is ${length_of_code}\nThe file is ${file_extension}.\nEverything looks okay\nFOR NOW.`;
}
exports.LLMStub = LLMStub;
//# sourceMappingURL=utils.js.map