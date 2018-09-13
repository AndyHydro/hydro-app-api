"use strict";
/* app/controllers/welcome.controller.ts */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import only what we need from express
var express_1 = require("express");
var check_1 = require("express-validator/check");
var mysql_1 = __importDefault(require("mysql"));
// Assign router to the express.Router() instance
var router = express_1.Router();
// The / here corresponds to the route that the WelcomeController
// is mounted on in the server.ts file.
// In this case it's /welcome
router.post('/signature', [
    check_1.body('signature').isLength({ min: 132, max: 132 }),
    check_1.body('hydro_id').isLength({ min: 4 }),
    check_1.body('application_id').isUUID()
], function (req, res) {
    var errors = check_1.validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    var sign = req.body.signature;
    var id = req.body.hydro_id;
    var app = req.body.application_id;
    var connection = mysql_1.default.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'project_hydro'
    });
    connection.connect();
    connection.query("INSERT INTO signature (application_id, signature, username) VALUES (0xd718dcbfac8c4d228df89292132586c2, '0xfcafa4c4e909b30ddb947fab4790510913a4c75f6a8c5e32a62b4e7c8fa501b364c1912760494d0380a09e343acf95d49ebb330694c5eba70822afed3224a1951b', 'h1xsduq')", function (err, result) {
        if (err)
            throw err;
        console.log(result);
    });
    // Reply with a hello world when no name param is provided
    res.send(req.body.signature);
});
// Export the express.Router() instance to be used by server.ts
exports.ClientController = router;
//# sourceMappingURL=client.controller.js.map