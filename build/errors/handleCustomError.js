"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function customError(message, status, res) {
    console.error(message);
    res.status(status || 400).json(message);
}
exports.customError = customError;
