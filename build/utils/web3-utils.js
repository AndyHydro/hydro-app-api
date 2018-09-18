"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const web3_1 = __importDefault(require("web3"));
function parseSignature(provider, signature) {
    const web3 = new web3_1.default(provider);
    let noHex = signature.substr(2);
    return {
        r: '0x' + noHex.slice(0, 64),
        s: '0x' + noHex.slice(64, 128),
        v: web3.utils.hexToNumber(noHex.slice(128, 130))
    };
}
exports.parseSignature = parseSignature;
