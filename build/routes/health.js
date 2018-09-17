"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
router.get('/', (_req, res) => {
    return res.sendStatus(200);
});
exports.default = router;
