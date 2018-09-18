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
const strEnum = (o) => {
    return o.reduce((res, key) => {
        res[key] = key;
        return res;
    }, Object.create(null));
};
const Variables = strEnum(['info.app.version', "hydro.apiDataSource.driverType"]);
let validationError;
const validateProperties = (properties) => {
    const propertiesKeys = properties.getKeys();
    const missingKeys = Object.keys(Variables)
        .filter((key) => !propertiesKeys.includes(key));
    if (missingKeys.length !== 0) {
        validationError = Error(`Required key(s) missing from config: '${missingKeys.join("', '")}'`);
    }
};
const config = new java_properties_1.PropertiesFile('application.properties');
validateProperties(config);
let cloudConfigStatus;
const fetchCloudConfig = (environment) => __awaiter(this, void 0, void 0, function* () {
    if (cloudConfigStatus !== environment) {
        yield cloud_config_client_1.load({
            endpoint: config.get('config.server.endpoint'),
            name: config.get('config.server.name'),
            profiles: `eks${environment}`,
            auth: { user: config.get('config.server.user'), pass: config.get('config.server.pass') }
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
exports.getConfig = (environment, variables) => __awaiter(this, void 0, void 0, function* () {
    if (validationError !== undefined) {
        throw validationError;
    }
    if (environment !== 'test') {
        yield fetchCloudConfig(environment);
        if (cloudConfigStatus === undefined) {
            throw Error('Could not fetch cloud config.');
        }
    }
    return Array.isArray(variables) ? variables.map(v => config.get(v)) : config.get(variables);
});
