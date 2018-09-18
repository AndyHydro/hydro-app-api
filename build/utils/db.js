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
const Signature_1 = require("../entity/Signature");
exports.withConnection = (connectionFunction) => __awaiter(this, void 0, void 0, function* () {
    const databaseOptions = {
        type: "mysql",
        host: process.env.db_host,
        port: Number(process.env.db_port),
        username: process.env.db_username,
        password: process.env.db_password,
        database: process.env.db_database,
        entities: [
            Signature_1.Signature
        ]
    };
    const connectionManager = typeorm_1.getConnectionManager();
    const connection = connectionManager.create(databaseOptions);
    let connectionError;
    const connecting = connection.connect()
        .then(error => {
        connectionError = error;
        return null;
    });
    yield connecting;
    if (connecting === null)
        throw connectionError;
    return connectionFunction(connection);
});
