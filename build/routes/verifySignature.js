"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const check_1 = require("express-validator/check");
const utils_1 = require("../utils");
const Signature_1 = require("../entity/Signature");
const ApplicationClientMapping_1 = require("../entity/ApplicationClientMapping");
const VerificationLog_1 = require("../entity/VerificationLog");
const handleCustomError_1 = require("../errors/handleCustomError");
const Errors = __importStar(require("../constants/errors"));
const router = express_1.Router();
const verifyArguments = [
    check_1.body('message').isLength({ min: 6, max: 6 }).withMessage('Please pass a message of the correct length.'),
    check_1.body('hydro_id').isByteLength({ min: 4, max: 30 }).withMessage('Please pass a username of the correct byte length.'),
    check_1.body('application_id').isUUID()
];
router.post('/', verifyArguments, (req, res, next) => {
    const errors = check_1.validationResult(req);
    console.log(errors);
    if (!errors.isEmpty())
        return handleCustomError_1.customError(errors.array(), 400, res);
    utils_1.withConnection(req, (connection) => __awaiter(this, void 0, void 0, function* () {
        const applicationClientMappingRepository = connection.manager.getRepository(ApplicationClientMapping_1.ApplicationClientMapping);
        const signatureRepository = connection.manager.getRepository(Signature_1.Signature);
        const verificationLogRespository = connection.manager.getRepository(VerificationLog_1.VerificationLog);
        const [provider, clientRaindropAddress, clientRaindropABI] = yield utils_1.getConfig(req, ['url.networkURL.infura', 'clientRaindrop.address', 'clientRaindrop.ABI']);
        console.log(provider, clientRaindropAddress, clientRaindropABI);
        console.log(applicationClientMappingRepository, signatureRepository, verificationLogRespository);
        let mapping = yield applicationClientMappingRepository.findOne({ hydro_id: req.body.username, application_id: req.body.application_id });
        if (!mapping) {
            return handleCustomError_1.customError(Errors.applicationClientMappingDoesntExist, 400, res);
        }
        let existingSignature = yield signatureRepository.findOne({ username: req.body.hydro_id, application_id: req.body.application_id });
        if (!existingSignature) {
            return handleCustomError_1.customError(Errors.signatureDoesntExist, 400, res);
        }
    })).catch((error) => {
        return next(error);
    });
});
exports.default = router;
