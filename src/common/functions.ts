import * as crypto from 'crypto';

export class Common {
  static async md5(input) {
    return crypto.createHash('md5').update(input).digest('hex');
  }
}
