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
exports.analyzeCode = void 0;
const vscode = __importStar(require("vscode"));
const utils_1 = require("./utils");
const auth_1 = require("./auth");
const llm_stub_1 = require("./llm-stub");
async function analyzeCode(output_channel, context) {
    // Check if the user is authenticated
    const authenticated = await context.secrets.get('security-seal-access-token');
    // If the user is not authenticated or the access token has expired, show the authentication prompt
    if (!authenticated || await (0, auth_1.isAccessTokenExpired)(context)) {
        (0, auth_1.showAuthenticationPrompt)(context);
        return;
    }
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
        vscode.window.showErrorMessage("No active editor found. Please try again.");
        return;
    }
    const file_extension = (0, utils_1.getFileExtension)(editor);
    if (!file_extension) {
        vscode.window.showErrorMessage("No active editor found or file is not saved. Please try again.");
        return;
    }
    if (!(0, utils_1.languageIsSupported)(file_extension)) {
        vscode.window.showErrorMessage("Unsupported file type. Supported file types: C, C++, C# and Python.");
        return;
    }
    // Get the code the user selected in the editor
    const code = (0, utils_1.getSelectedCode)(editor);
    if (!code) {
        vscode.window.showErrorMessage("No code selected.");
        return;
    }
    // Display message to the user. Kept for now for future development.
    vscode.window.showInformationMessage('Your code is sent for analysis.');
    const text = (0, llm_stub_1.LLMStub)(code, file_extension);
    output_channel.show();
    output_channel.appendLine(text);
}
exports.analyzeCode = analyzeCode;
;
//# sourceMappingURL=analysis.js.map