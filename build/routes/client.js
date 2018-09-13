"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const check_1 = require("express-validator/check");
const db_1 = require("../db");
const Signature_1 = require("../entity/Signature");
const router = express_1.Router();
const args = [
    check_1.body('signature').isLength({ min: 132, max: 132 }),
    check_1.body('username').isLength({ min: 4 }),
    check_1.body('application_id').isUUID()
];
router.post('/signature', args, (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    const errors = check_1.validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    db_1.withConnection((connection) => {
        const signatureRepository = connection.manager.getRepository(Signature_1.Signature);
        const newSignature = signatureRepository.create(req.body);
        return signatureRepository.save(newSignature)
            .then(() => {
            return res.json(newSignature);
        });
    })
        .catch((error) => {
        return next(error);
    });
}));
exports.default = router;
