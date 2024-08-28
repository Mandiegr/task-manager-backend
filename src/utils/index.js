const cryptoJs = require("crypto-js");

const unDecrypted = (encryptedPassword, secretKey) => {

    const decryptedPasswordBytes = cryptoJs.AES.decrypt(encryptedPassword, secretKey);
    const decryptedPassword = decryptedPasswordBytes.toString(cryptoJs.enc.Utf8);

    return decryptedPassword

}
const encrypt = (password, secretKey) =>  cryptoJs.AES.encrypt(password, secretKey).toString();

module.exports= { unDecrypted, encrypt }