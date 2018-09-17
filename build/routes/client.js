"use strict";
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
    db_1.withConnection((connection) => {
        const signatureRepository = connection.manager.getRepository(Signature_1.Signature);
        const newSignature = signatureRepository.create(req.body);
        return signatureRepository.save(newSignature)
            .then((signatures) => {
            res.json(signatures);
        });
    })
        .catch((error) => {
        next(error);
    });
});
exports.default = router;
