"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LLMStub = void 0;
function LLMStub(code, file_extension) {
    const length_of_code = code.length;
    return `Hello,\nI am Greg v2\nYou provided the following code:\n${code}\nThe length is ${length_of_code}\nThe file is ${file_extension}.\nEverything looks okay\nFOR NOW.`;
}
exports.LLMStub = LLMStub;
//# sourceMappingURL=llmStub.js.map