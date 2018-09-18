"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.applicationClientMappingDoesntExist = { message: 'The given hydro_id is not mapped to the given application', type: 'ApplicationClientMappingException' };
exports.signatureDoesntExist = { message: 'The given hydro_id does not have a signature for the given application', type: 'SignatureException' };
exports.hydroIdDoesntExist = { message: 'The given hydro_id does not exist in the smart contract', type: 'HydroIdException' };
