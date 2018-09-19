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
const cloud_config_client_1 = require("cloud-config-client");
const java_properties_1 = require("java-properties");
const _1 = require("./");
const localConfig = new java_properties_1.PropertiesFile('application.properties');
let config = localConfig;
let cloudConfigStatus;
function fetchCloudConfig(environment) {
    return __awaiter(this, void 0, void 0, function* () {
        if (cloudConfigStatus !== environment) {
            yield cloud_config_client_1.load({
                endpoint: config.get('config.server.endpoint'),
                name: config.get('config.server.name'),
                profiles: `eks${environment}`,
                auth: {
                    user: config.get('config.server.user'),
                    pass: config.get('config.server.pass')
                }
            })
                .then((cloudConfig) => {
                cloudConfig.forEach((key, value) => {
                    config.set(key, value);
                });
                cloudConfigStatus = environment;
            })
                .catch((error) => {
                console.error(error);
                cloudConfigStatus = undefined;
            });
        }
    });
}
function getConfig(req, variables) {
    return __awaiter(this, void 0, void 0, function* () {
        const environment = _1.getEnvironment(req);
        console.log(environment);
        if (environment !== 'test') {
            yield fetchCloudConfig(environment);
            if (cloudConfigStatus === undefined) {
                throw Error('Could not fetch cloud config.');
            }
        }
        return Array.isArray(variables) ? variables.map(v => config.get(v)) : config.get(variables);
    });
}
exports.getConfig = getConfig;
