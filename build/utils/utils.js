"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEnvironment = (req) => {
    return req.apiGateway.context.invokedFunctionArn.replace(/.*:/g, '');
};
