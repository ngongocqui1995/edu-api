"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Common = void 0;
const crypto = require("crypto");
class Common {
    static async md5(input) {
        return crypto.createHash('md5').update(input).digest('hex');
    }
}
exports.Common = Common;
//# sourceMappingURL=functions.js.map