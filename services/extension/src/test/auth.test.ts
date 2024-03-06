import * as assert from 'assert';
import * as vscode from 'vscode';
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

  test('Return true if no access token is found', async () => {
    const mockContext: any = {
      secrets: {
        get: sandbox.stub().resolves(undefined),
        store: sandbox.stub(),
        delete: sandbox.stub(),
      },
    };

    const expired = await isAccessTokenExpired(mockContext);
    assert.strictEqual(expired, true);
  });

  test('Return true if access token is expired', async () => {
    const mockContext: any = {
      secrets: {
        get: sandbox.stub().resolves('3'),
        store: sandbox.stub(),
        delete: sandbox.stub(),
      },
    };

    const expired = await isAccessTokenExpired(mockContext);
    assert.strictEqual(expired, true);
  });

  test('Return true if access token is not expired', async () => {
    const mockContext: any = {
      secrets: {
        get: sandbox.stub().resolves('999999999999999999'),
        store: sandbox.stub(),
        delete: sandbox.stub(),
      },
    };

    const expired = await isAccessTokenExpired(mockContext);
    assert.strictEqual(expired, false);
  });
});