"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const yaml = require("js-yaml");
const path = require("path");
exports.default = () => {
    const configEnv = `config.${process.env.NODE_ENV}.yaml`;
    const pathEnv = process.env.NODE_ENV ? configEnv : 'config.yaml';
    const pathFile = path.join(process.cwd(), pathEnv);
    return yaml.load((0, fs_1.readFileSync)(pathFile, 'utf8'));
};
//# sourceMappingURL=configuration.js.map