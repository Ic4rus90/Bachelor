"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSelectedCode = exports.languageIsSupported = exports.getFileExtension = void 0;
function getFileExtension(editor) {
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
//# sourceMappingURL=utils.js.map