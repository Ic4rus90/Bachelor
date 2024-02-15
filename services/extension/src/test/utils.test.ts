import * as assert from 'assert';

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from 'vscode';

// Importing sinon for mocking
import sinon from 'sinon';

import { getFileExtension  } from '../utils';


suite('Extension Test Suite', () => {
	let sandbox: sinon.SinonSandbox;

	setup(() => {
		sandbox = sinon.createSandbox();
	});

	teardown(() => {
		sandbox.restore();
	});

	
    test('Returns null if the file is not saved', () => {
      // Create a mock text editor with an untitled document
        const mockTextEditor: vscode.TextEditor = {
          document: {
            uri: {
              fsPath: ''
            },
            isUntitled: true
          },
        } as any; // Cast as any to avoid needing to stub every property
    
        const extension = getFileExtension(mockTextEditor);
        // 
        assert.strictEqual(extension, null);
    });

    // TODO: Implement fix, as path has no '.' 
    test('Returns empty string if the file has no extension', () => {
        const mockTextEditor: vscode.TextEditor = {
          document: {
            uri: {
              fsPath: '/test/path'
            },
            isUntitled: false
          },
        } as any; // Cast as any to avoid needing to stub every property
    
        const extension = getFileExtension(mockTextEditor);
        assert.strictEqual(extension, '');
    });
    

    test('Returns extension string if the file has an extension', () => {
        const mockTextEditor: vscode.TextEditor = {
          document: {
            uri: {
              fsPath: '/test/path.txt'
            },
            isUntitled: false
          },
        } as any; // Cast as any to avoid needing to stub every property
    
        const extension = getFileExtension(mockTextEditor);
        assert.strictEqual(extension, 'txt');
    });
});