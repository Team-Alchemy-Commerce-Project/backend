const LengthValidationError = require('../errors/length-validation-error');
const UsernameAlreadyTakenError = require('../errors/username-already-taken-error');
const EmailAlreadyTakenError = require('../errors/email-already-taken-error');
const PasswordMatchingError = require('../errors/password-matching-error');
const { retrieveUserName, retrieveUserEmail, registerNewUser } = require('../dao-files/customer_dao');
const bcrypt = require('bcrypt');
// Business logic:
// 1. Username must be at least 4 characters
// 2. Password must be at least 4 characters
// 3. Username must not already be taken
// 4. Email must not already be taken
// 5. password must match confirmPassword
async function registerValidation(username, street_address, city, state,
    zipcode1, email, full_name, profile_picture, 
    password, confirmPassword, phone_number) {

    // Logic 1 and 2
    if (username.length < 4 || password.length < 4) {
        throw new LengthValidationError("Username and password must be at least 4 characters");
    }

    // Logic 3
    let data = await retrieveUserName(username);
    if (data.Item) {
        throw new UsernameAlreadyTakenError('This username is already taken, please try again.');
    }

    // Logic 4
    let userEmail = await retrieveUserEmail(email);
    if (userEmail.Items[0]) {
        throw new EmailAlreadyTakenError('This email is already taken, please try again.');
    }

    // Logic 5
    if (password !== confirmPassword) {
        throw new PasswordMatchingError("password and confirm password must match");
    }

    // If we pass all checks, then add the user
    const hashPassword = await bcrypt.hash(password, 10);

    await registerNewUser(username, street_address, city, state,
        zipcode1, email, full_name, profile_picture, 
        hashPassword, phone_number);
}

module.exports = {
    registerValidation
};