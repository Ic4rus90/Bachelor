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
// Importing sinon for mocking
const sinon_1 = __importDefault(require("sinon"));
const utils_1 = require("../utils");
suite('Extension Test Suite', () => {
    let sandbox;
    setup(() => {
        sandbox = sinon_1.default.createSandbox();
    });
    teardown(() => {
        sandbox.restore();
    });
    test('Returns null if the file is not saved', () => {
        // Create a mock text editor with an untitled document
        const mockTextEditor = {
            document: {
                uri: {
                    fsPath: ''
                },
                isUntitled: true
            },
        }; // Cast as any to avoid needing to stub every property
        const extension = (0, utils_1.getFileExtension)(mockTextEditor);
        // 
        assert.strictEqual(extension, null);
    });
    // TODO: Implement fix, as path has no '.' 
    test('Returns empty string if the file has no extension', () => {
        const mockTextEditor = {
            document: {
                uri: {
                    fsPath: '/test/path'
                },
                isUntitled: false
            },
        }; // Cast as any to avoid needing to stub every property
        const extension = (0, utils_1.getFileExtension)(mockTextEditor);
        assert.strictEqual(extension, '');
    });
    test('Returns extension string if the file has an extension', () => {
        const mockTextEditor = {
            document: {
                uri: {
                    fsPath: '/test/path.txt'
                },
                isUntitled: false
            },
        }; // Cast as any to avoid needing to stub every property
        const extension = (0, utils_1.getFileExtension)(mockTextEditor);
        assert.strictEqual(extension, 'txt');
    });
});
//# sourceMappingURL=utils.test.js.map