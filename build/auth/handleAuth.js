"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_jwt_1 = __importDefault(require("express-jwt"));
const publicKey_1 = __importDefault(require("./publicKey"));
const router = express_1.Router();
router.all('*', express_jwt_1.default({ secret: publicKey_1.default, requestProperty: 'auth' }), (_req, _res, next) => {
    next();
});
exports.default = router;
