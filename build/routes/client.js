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
const db_1 = require("../utils/db");
const Signature_1 = require("../entity/Signature");
const router = express_1.Router();
const signatureArguments = [
    check_1.body('signature').isLength({ min: 132, max: 132 }).withMessage('Please pass a signature of the correct length.'),
    check_1.body('username').isByteLength({ min: 4, max: 30 }).withMessage('Please pass a username of the correct byte length.'),
    check_1.body('application_id').isUUID()
];
router.post('/signature', signatureArguments, (req, res, next) => {
    const errors = check_1.validationResult(req);
    if (!errors.isEmpty())
        res.status(422).json(errors.array());
    db_1.withConnection((connection) => __awaiter(this, void 0, void 0, function* () {
        const signatureRepository = connection.manager.getRepository(Signature_1.Signature);
        let existingSignature = yield signatureRepository.findOne({ username: req.body.username, application_id: req.body.application_id });
        if (existingSignature) {
            existingSignature.signature = req.body.signature;
            yield signatureRepository.save(existingSignature);
            return res.json(existingSignature);
        }
        else {
            const newSignature = signatureRepository.create(req.body);
            yield signatureRepository.save(newSignature);
            return res.json(newSignature);
        }
    })).catch((error) => {
        return next(error);
    });
});
exports.default = router;
