"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (err, _req, res, _next) => {
    console.error(err);
    res.sendStatus(err.status || 500);
};
