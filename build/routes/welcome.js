"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
router.get('/:name', (req, res) => {
    let { name } = req.params;
    return res.send(`Hello, ${name}! What's up?`);
});
exports.default = router;
