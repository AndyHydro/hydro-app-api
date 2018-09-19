"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getEnvironment(req) {
    return req.apiGateway.context.invokedFunctionArn.replace(/.*:/g, '');
}
exports.getEnvironment = getEnvironment;
