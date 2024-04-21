"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const env_1 = require("config/env");
exports.default = (server) => {
    try {
        server.listen(env_1.PORT, () => console.info(`INFO - Server started on port: ${env_1.PORT} [${env_1.NODE_ENV}]`));
    }
    catch (error) {
        console.error('ERROR - Unable to start server.', error);
    }
};
