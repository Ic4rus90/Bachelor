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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert = __importStar(require("assert"));
// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
const vscode = __importStar(require("vscode"));
// Importing sinon for mocking
const sinon_1 = __importDefault(require("sinon"));
const analysis_1 = require("../analysis");
suite('Extension Test Suite', () => {
    vscode.window.showInformationMessage('Starting tests');
    let sandbox;
    setup(() => {
        sandbox = sinon_1.default.createSandbox();
    });
    teardown(() => {
        sandbox.restore();
    });
    test('Shows error message when no active editor is found', async () => {
        sandbox.stub(vscode.window, 'activeTextEditor').value(undefined);
        const showErrorSpy = sandbox.spy(vscode.window, 'showErrorMessage');
        const mockOutputChannel = { show: sinon_1.default.stub(), appendLine: sinon_1.default.stub() };
        const mockContext = { secrets: { get: sinon_1.default.stub().resolves('fake-token') } };
        await (0, analysis_1.analyzeCode)(mockOutputChannel, mockContext);
        assert.ok(showErrorSpy.calledWith("No active editor found. Please try again."));
    });
    test('Shows error message when file is not saved', async () => {
        sandbox.stub(vscode.window, 'activeTextEditor').value({
            document: {
                isUntitled: true,
                uri: { fsPath: '' }
            }
        });
        const showErrorSpy = sandbox.spy(vscode.window, 'showErrorMessage');
        const mockOutputChannel = { show: sinon_1.default.stub(), appendLine: sinon_1.default.stub() };
        const mockContext = { secrets: { get: sinon_1.default.stub().resolves('fake-token') } };
        await (0, analysis_1.analyzeCode)(mockOutputChannel, mockContext);
        assert.ok(showErrorSpy.calledWith("No active editor found or file is not saved. Please try again."));
    });
    test('Shows error message when file type is not supported', async () => {
        sandbox.stub(vscode.window, 'activeTextEditor').value({
            document: {
                isUntitled: false,
                uri: { fsPath: 'fake-path.lol' },
            }
        });
        const showErrorSpy = sandbox.spy(vscode.window, 'showErrorMessage');
        const mockOutputChannel = { show: sinon_1.default.stub(), appendLine: sinon_1.default.stub() };
        const mockContext = { secrets: { get: sinon_1.default.stub().resolves('fake-token') } };
        await (0, analysis_1.analyzeCode)(mockOutputChannel, mockContext);
        assert.ok(showErrorSpy.calledWith("Unsupported file type. Supported file types: C, C++, C# and Python."));
    });
    test('Shows information message when code is sent for analysis', async () => {
        sandbox.stub(vscode.window, 'activeTextEditor').value({
            document: {
                isUntitled: false,
                uri: { fsPath: 'fake-path.c' },
                getText: sinon_1.default.stub().returns('const testing_is_fun = true')
            }
        });
        const showInfoSpy = sandbox.spy(vscode.window, 'showInformationMessage');
        const mockOutputChannel = { show: sinon_1.default.stub(), appendLine: sinon_1.default.stub() };
        const mockContext = { secrets: { get: sinon_1.default.stub().resolves('fake-token') } };
        await (0, analysis_1.analyzeCode)(mockOutputChannel, mockContext);
        assert.ok(showInfoSpy.calledWith('Your code is sent for analysis.'));
    });
    test('Shows output channel when code is sent for analysis', async () => {
        sandbox.stub(vscode.window, 'activeTextEditor').value({
            document: {
                isUntitled: false,
                uri: { fsPath: 'fake-path.c' },
                getText: sinon_1.default.stub().returns('const testing_is_fun = true')
            }
        });
        const mockOutputChannel = { show: sinon_1.default.stub(), appendLine: sinon_1.default.stub() };
        const mockContext = { secrets: { get: sinon_1.default.stub().resolves('fake-token') } };
        await (0, analysis_1.analyzeCode)(mockOutputChannel, mockContext);
        assert.ok(mockOutputChannel.show.called);
    });
    test('Appends analysis result to output channel', async () => {
        sandbox.stub(vscode.window, 'activeTextEditor').value({
            document: {
                isUntitled: false,
                uri: { fsPath: 'fake-path.c' },
                getText: sinon_1.default.stub().returns('const testing_is_fun = true')
            }
        });
        const mockOutputChannel = { show: sinon_1.default.stub(), appendLine: sinon_1.default.stub() };
        const mockContext = { secrets: { get: sinon_1.default.stub().resolves('fake-token') } };
        await (0, analysis_1.analyzeCode)(mockOutputChannel, mockContext);
        assert.ok(mockOutputChannel.appendLine.called);
    });
});
//# sourceMappingURL=analysis.test.js.map