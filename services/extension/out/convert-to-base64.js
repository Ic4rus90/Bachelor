"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeFromBase64 = exports.encodeToBase64 = void 0;
function encodeToBase64(string) {
    // 
    const encoded_string = btoa(string);
    return encoded_string;
}
exports.encodeToBase64 = encodeToBase64;
function decodeFromBase64(encoded_string) {
    // 
    const decoded_string = atob(encoded_string);
    return decoded_string;
}
exports.decodeFromBase64 = decodeFromBase64;
//# sourceMappingURL=convert-to-base64.js.map