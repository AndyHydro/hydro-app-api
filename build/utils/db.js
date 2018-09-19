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
const typeorm_1 = require("typeorm");
const utils_1 = require("../utils");
const Signature_1 = require("../entity/Signature");
const ApplicationClientMapping_1 = require("../entity/ApplicationClientMapping");
const VerificationLog_1 = require("../entity/VerificationLog");
function withConnection(req, connectionFunction) {
    return __awaiter(this, void 0, void 0, function* () {
        const dbConfigVars = [
            'hydro.apiDataSource.driverType',
            'hydro.db.host',
            'hydro.db.port',
            'hydro.apiDataSource.username',
            'hydro.apiDataSource.password',
            'db.name.hydro_api'
        ];
        const configVars = yield utils_1.getConfig(req, dbConfigVars)
            .catch((error) => error);
        if (configVars instanceof Error)
            throw configVars;
        const [driver, host, port, user, pass, database] = configVars;
        const environment = utils_1.getEnvironment(req);
        const manager = typeorm_1.getConnectionManager();
        let connection;
        if (manager.has(environment)) {
            connection = manager.get(environment);
        }
        else {
            const databaseOptions = {
                name: environment,
                type: driver,
                host: host,
                port: Number(port),
                username: user,
                password: pass,
                database: database,
                entities: [
                    Signature_1.Signature,
                    ApplicationClientMapping_1.ApplicationClientMapping,
                    VerificationLog_1.VerificationLog
                ]
            };
            connection = manager.create(databaseOptions);
            yield connection.connect();
        }
        return connectionFunction(connection);
    });
}
exports.withConnection = withConnection;
