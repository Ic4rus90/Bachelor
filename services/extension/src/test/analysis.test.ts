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
		// Stub the activeTextEditor method to return undefined
        sandbox.stub(vscode.window, 'activeTextEditor').value(undefined);

		// Create a spy for the showErrorMessage method
        const showErrorMessageSpy = sandbox.spy(vscode.window, 'showErrorMessage');

		// Create pseudo output channel and context
		// The output channel is a mock object that has a show method and an appendLine method
        const pseudoOutputChannel: any = { show: sinon.stub(), appendLine: sinon.stub() };

		// The context is a mock object that has a secrets property that is a mock object that has a get method
		// The get method is a stub that resolves to a fake token
        const pseudoContext: any = { secrets: { get: sinon.stub().resolves('fake-token') } };

        await analyzeCode(pseudoOutputChannel, pseudoContext);
		// Assert that the showErrorMessage method was called with the expected message
        assert.ok(showErrorMessageSpy.calledWith("No active editor found. Please try again."));
    });
	
	test('Shows error message when file is not saved', async () => {
		sandbox.stub(vscode.window, 'activeTextEditor').value({ 
			// The document in the active text editor is stubbed to have an untitled document
			document: {
				isUntitled: true,
				uri: { fsPath: '' } 
			} 
		});
		const showErrorSpy = sandbox.spy(vscode.window, 'showErrorMessage');
		const mockOutputChannel: any = { show: sinon.stub(), appendLine: sinon.stub() };
		const mockContext: any = { secrets: { get: sinon.stub().resolves('fake-token') } };

		await analyzeCode(mockOutputChannel, mockContext);
		assert.ok(showErrorSpy.calledWith("No active editor found or file is not saved. Please try again."));
	});

	test('Shows error message when file type is not supported', async () => {
		sandbox.stub(vscode.window, 'activeTextEditor').value({ 
			// Document in the active text editor is stubbed to have a file path with an unsupported extension
			document: {
				isUntitled: false,
				uri: { fsPath: 'fake-path.lol' }, 
			} 
		});
		const showErrorSpy = sandbox.spy(vscode.window, 'showErrorMessage');
		const mockOutputChannel: any = { show: sinon.stub(), appendLine: sinon.stub() };
		const mockContext: any = { secrets: { get: sinon.stub().resolves('fake-token') } };

		await analyzeCode(mockOutputChannel, mockContext);
		assert.ok(showErrorSpy.calledWith("Unsupported file type. Supported file types: C, C++, C# and Python."));
	});

	/*
	test('Shows information message when code is sent for analysis', async () => {
		sandbox.stub(vscode.window, 'activeTextEditor').value({ 
			document: {
				isUntitled: false,
				uri: { fsPath: 'fake-path.c' },
				// Stub the getText method to return a fake code
				getText: sinon.stub().returns('const testing_is_fun = true')
			} 
		});

		// Create a spy for the showInformationMessage method
		const showInfoSpy = sandbox.spy(vscode.window, 'showInformationMessage');
		const mockOutputChannel: any = { show: sinon.stub(), appendLine: sinon.stub() };
		const mockContext: any = { secrets: { get: sinon.stub().resolves('fake-token') } };

		await analyzeCode(mockOutputChannel, mockContext);
		assert.ok(showInfoSpy.calledWith('Your code is sent for analysis.'));
	});

	test('Shows output channel when code is sent for analysis', async () => {
		sandbox.stub(vscode.window, 'activeTextEditor').value({ 
			document: {
				isUntitled: false,
				uri: { fsPath: 'fake-path.c' },
				getText: sinon.stub().returns('const testing_is_fun = true')
			} 
		});
		const mockOutputChannel: any = { show: sinon.stub(), appendLine: sinon.stub() };
		const mockContext: any = { secrets: { get: sinon.stub().resolves('fake-token') } };

		await analyzeCode(mockOutputChannel, mockContext);
		// Assert that outputChannel.show was called
		assert.ok(mockOutputChannel.show.called);
	});

	test('Appends analysis result to output channel', async () => {
		sandbox.stub(vscode.window, 'activeTextEditor').value({ 
			document: {
				isUntitled: false,
				uri: { fsPath: 'fake-path.c' },
				getText: sinon.stub().returns('const testing_is_fun = true')
			} 
		});
		const mockOutputChannel: any = { show: sinon.stub(), appendLine: sinon.stub() };
		const mockContext: any = { secrets: { get: sinon.stub().resolves('fake-token') } };

		await analyzeCode(mockOutputChannel, mockContext);
		// Assert that outputChannel.appendLine was called
		assert.ok(mockOutputChannel.appendLine.called);
	});
	*/
});