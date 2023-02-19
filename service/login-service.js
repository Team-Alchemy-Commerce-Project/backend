
const UsernameNotInDatabaseError = require('../errors/username-not-in-database-error');
const PasswordNotInDatabaseError = require('../errors/password-not-in-database-error');
const { retrieveUserName } = require('../dao-files/customer_dao');
const bcrypt = require('bcrypt');
// Business logic:
// 1. Username must match what's in the database for the user
// 2. Password must match the bcrypted version in the database

async function loginValidation(username, password) {

    // Logic 1
    let data = await retrieveUserName(username);
    if (!data.Item) {
        throw new UsernameNotInDatabaseError('Invalid username');
    }

    // Logic 2
    const isValid = await bcrypt.compare(password, data.Item.password)
    if (!isValid) {
        throw new PasswordNotInDatabaseError("Invalid password");
    }
}

module.exports = {
    loginValidation
};