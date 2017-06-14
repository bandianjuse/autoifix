import crypto from 'crypto';

export default class extends think.service.base {
    init(http){
        super.init(http);
    }

    /**
     * 加密
     */
    encrypt(str, secret){
        let cipher = crypto.createCipher('aes192', secret);
        let enc = cipher.update(str, 'utf8', 'hex');
        enc += cipher.final('hex');
        return enc;
    }

    /**
     * 解密
     */
    decrypt(str, secret) {
        var decipher = crypto.createDecipher('aes192', secret);
        var dec = decipher.update(str, 'hex', 'utf8');
        dec += decipher.final('utf8');
        return dec;
    }



}