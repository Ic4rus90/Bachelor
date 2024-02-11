import * as assert from 'assert';

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from 'vscode';

// Importing sinon for mocking
import sinon from 'sinon';

import { analyzeCode } from '../analysis';


suite('Extension Test Suite', () => {
	vscode.window.showInformationMessage('Starting tests');

	let sandbox: sinon.SinonSandbox;

	setup(() => {
		sandbox = sinon.createSandbox();
	});

	teardown(() => {
		sandbox.restore();
	});

	test('Shows error message when no active editor is found', async () => {
        sandbox.stub(vscode.window, 'activeTextEditor').value(undefined);
        const showErrorSpy = sandbox.spy(vscode.window, 'showErrorMessage');
        const mockOutputChannel: any = { show: sinon.stub(), appendLine: sinon.stub() };
        const mockContext: any = { secrets: { get: sinon.stub().resolves('fake-token') } };

        await analyzeCode(mockOutputChannel, mockContext);
        assert.ok(showErrorSpy.calledWith("No active editor found. Please try again."));
    });
	
	test('Shows error message when file is not saved', async () => {
		sandbox.stub(vscode.window, 'activeTextEditor').value({ document: { isUntitled: true } });
		const showErrorSpy = sandbox.spy(vscode.window, 'showErrorMessage');
		const mockOutputChannel: any = { show: sinon.stub(), appendLine: sinon.stub() };
		const mockContext: any = { secrets: { get: sinon.stub().resolves('fake-token') } };

		await analyzeCode(mockOutputChannel, mockContext);
		assert.ok(showErrorSpy.calledWith("No active editor found or file is not saved. Please try again."));
	});

	test('Shows error message when file type is not supported', async () => {
		sandbox.stub(vscode.window, 'activeTextEditor').value({ document: { isUntitled: false, languageId: 'plaintext' } });
		const showErrorSpy = sandbox.spy(vscode.window, 'showErrorMessage');
		const mockOutputChannel: any = { show: sinon.stub(), appendLine: sinon.stub() };
		const mockContext: any = { secrets: { get: sinon.stub().resolves('fake-token') } };

		await analyzeCode(mockOutputChannel, mockContext);
		assert.ok(showErrorSpy.calledWith("Unsupported file type. Supported file types: C, C++, C# and Python."));
	});

	test('Shows error message when no code is selected', async () => {
		sandbox.stub(vscode.window, 'activeTextEditor').value({ document: { isUntitled: false, languageId: 'c' }, selection: { isEmpty: true } });
		const showErrorSpy = sandbox.spy(vscode.window, 'showErrorMessage');
		const mockOutputChannel: any = { show: sinon.stub(), appendLine: sinon.stub() };
		const mockContext: any = { secrets: { get: sinon.stub().resolves('fake-token') } };

		await analyzeCode(mockOutputChannel, mockContext);
		assert.ok(showErrorSpy.calledWith("No code selected."));
	});

	test('Shows information message when code is sent for analysis', async () => {
		sandbox.stub(vscode.window, 'activeTextEditor').value({ document: { isUntitled: false, languageId: 'c' }, selection: { isEmpty: false } });
		const showInfoSpy = sandbox.spy(vscode.window, 'showInformationMessage');
		const mockOutputChannel: any = { show: sinon.stub(), appendLine: sinon.stub() };
		const mockContext: any = { secrets: { get: sinon.stub().resolves('fake-token') } };

		await analyzeCode(mockOutputChannel, mockContext);
		assert.ok(showInfoSpy.calledWith('Your code is sent for analysis.'));
	});

	test('Shows output channel when code is sent for analysis', async () => {
		sandbox.stub(vscode.window, 'activeTextEditor').value({ document: { isUntitled: false, languageId: 'c' }, selection: { isEmpty: false } });
		const mockOutputChannel: any = { show: sinon.stub(), appendLine: sinon.stub() };
		const mockContext: any = { secrets: { get: sinon.stub().resolves('fake-token') } };

		await analyzeCode(mockOutputChannel, mockContext);
		assert.ok(mockOutputChannel.show.called);
	});

	test('Appends analysis result to output channel', async () => {
		sandbox.stub(vscode.window, 'activeTextEditor').value({ document: { isUntitled: false, languageId: 'c' }, selection: { isEmpty: false } });
		const mockOutputChannel: any = { show: sinon.stub(), appendLine: sinon.stub() };
		const mockContext: any = { secrets: { get: sinon.stub().resolves('fake-token') } };

		await analyzeCode(mockOutputChannel, mockContext);
		assert.ok(mockOutputChannel.appendLine.called);
	});
});