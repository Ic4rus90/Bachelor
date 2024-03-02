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
const vscode = __importStar(require("vscode"));
// Importing sinon for mocking
const sinon_1 = __importDefault(require("sinon"));
const auth_1 = require("../auth");
suite('Auth Suite', () => {
    vscode.window.showInformationMessage('Starting tests');
    let sandbox;
    setup(() => {
        sandbox = sinon_1.default.createSandbox();
    });
    teardown(() => {
        sandbox.restore();
    });
    // Testing for expiration of access tokens
    test('Return true if no access token is found', async () => {
        const mockContext = { secrets: { get: sinon_1.default.stub().resolves(undefined) } };
        const expired = await (0, auth_1.isAccessTokenExpired)(mockContext);
        assert.strictEqual(expired, true);
    });
    test('Return true if access token is expired', async () => {
        const mockContext = { secrets: { get: sinon_1.default.stub().resolves('3') } };
        const expired = await (0, auth_1.isAccessTokenExpired)(mockContext);
        assert.strictEqual(expired, true);
    });
    test('Return true if access token is not expired', async () => {
        const mockContext = { secrets: { get: sinon_1.default.stub().resolves('999999999999999999') } };
        const expired = await (0, auth_1.isAccessTokenExpired)(mockContext);
        assert.strictEqual(expired, false);
    });
});
//# sourceMappingURL=auth.test.js.map