import * as assert from 'assert';
import * as vscode from 'vscode';

// Importing sinon for mocking
import sinon from 'sinon';

import { isAccessTokenExpired } from '../auth';


suite('Auth Suite', () => {
	vscode.window.showInformationMessage('Starting tests');

	let sandbox: sinon.SinonSandbox;

	setup(() => {
		sandbox = sinon.createSandbox();
	});

	teardown(() => {
		sandbox.restore();
	});

  // Testing for expiration of access tokens
  test('Return true if no access token is found', async () => {
    const mockContext: any = { secrets: { get: sinon.stub().resolves(undefined) } };
    const expired = await isAccessTokenExpired(mockContext);
    assert.strictEqual(expired, true);
  });


  test('Return true if access token is expired', async () => {
    const mockContext: any = { secrets: { get: sinon.stub().resolves('3') } };
    const expired = await isAccessTokenExpired(mockContext);
    assert.strictEqual(expired, true);
  });


  test('Return true if access token is not expired', async () => {
    const mockContext: any = { secrets: { get: sinon.stub().resolves('999999999999999999') } };
    const expired = await isAccessTokenExpired(mockContext);
    assert.strictEqual(expired, false);
  });
});