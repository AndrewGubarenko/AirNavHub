let CryptoJS = require("crypto-js");
const passwordPhrase = "yHZ724fk2E";

  let AesUtil = function(keySize, iterationCount) {
    this.keySize = keySize / 32;
    this.iterationCount = iterationCount;
  };

  AesUtil.prototype.generateKey = function(salt) {
    let key = CryptoJS.PBKDF2(
        passwordPhrase,
        CryptoJS.enc.Hex.parse(salt),
        { keySize: this.keySize, iterations: this.iterationCount });
    return key;
  }

  AesUtil.prototype.encrypt = function(salt, iv, plainText) {
    let key = this.generateKey(salt);
    let encrypted = CryptoJS.AES.encrypt(
        plainText,
        key,
        { iv: CryptoJS.enc.Hex.parse(iv) });
    return encrypted.ciphertext.toString(CryptoJS.enc.Base64);
  }

  AesUtil.prototype.decrypt = function(salt, iv, cipherText) {
    let key = this.generateKey(salt);
    let cipherParams = CryptoJS.lib.CipherParams.create({
      ciphertext: CryptoJS.enc.Base64.parse(cipherText)
    });
    let decrypted = CryptoJS.AES.decrypt(
        cipherParams,
        key,
        { iv: CryptoJS.enc.Hex.parse(iv) });
    return decrypted.toString(CryptoJS.enc.Utf8);
  }

export default AesUtil;
