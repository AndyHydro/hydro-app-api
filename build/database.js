"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mysql_1 = __importDefault(require("@types/mysql"));
var connection = mysql_1.default.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'project_hydro'
});
var SaveSignature = /** @class */ (function () {
    function SaveSignature() {
    }
    SaveSignature.prototype.save = function (signature, username, application_id) {
        connection.connect();
        connection.query('SELECT * FROM signature', function (err, rows, fields) {
            if (err)
                throw err;
            return rows;
        });
    };
    return SaveSignature;
}());
exports.SaveSignature = SaveSignature;
