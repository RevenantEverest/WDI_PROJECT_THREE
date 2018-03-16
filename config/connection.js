//Require pg-promise and initiate it

const pgp = require(`pg-promise`)();
const dbConfig = require(`../config/dbConfig`)

module.exports = pgp(dbConfig);
