import flureenjs from '@fluree/flureenjs';
import cryptoUtils from '@fluree/crypto-utils';
import env from 'dotenv';

env.config();

async function promiseWrapper (cb) {
  try {
    await cb();
  } catch (err) {
    console.log(err);
    throw err;
  }
}

const { USER, PASSWORD, EXPIRE, LDGER, FLUREE, AUTH } = process.env;

export class Db {
  static connection;
  static getConnection () {
    return promiseWrapper(async () => {
      this.connection = await flureenjs.connect(FLUREE);
      return this.connection
    })
  }

  static generateUserIdentity () {
    const keyPairs = cryptoUtils.generateKeyPair();
    const userId = cryptoUtils.getSinFromPublicKey(keyPairs.publicKey);
    return { keyPairs, userId };
  }

  static generateAuthRecord (userId) {
    return `
      [{
        "_id": "_auth",
        "id": "${userId}",
        "doc": "${userId}-temp-doc"
      }]
    `
  }

  static makeQuery (qStr) {
    return promiseWrapper(() => flureenjs.query(this.connection, qStr));
  }

  static createLedger () {
    return promiseWrapper(() => flureenjs.newLedger(this.connection, LDGER));
  }

  static login (auth) {
     return promiseWrapper(() => flureenjs.passwordLogin(this.connection, LDGER, PASSWORD, USER, auth, EXPIRE));
  }
}
