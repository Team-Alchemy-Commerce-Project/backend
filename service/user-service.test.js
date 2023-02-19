const { registerValidation } = require('./user-service');
const { retrieveUserName, retrieveUserEmail, registerNewUser } = require('../dao-files/customer_dao.js');
const LengthValidationError = require('../errors/length-validation-error');
const UsernameAlreadyTakenError = require('../errors/username-already-taken-error');
const EmailAlreadyTakenError = require('../errors/email-already-taken-error');
const PasswordMatchingError = require('../errors/password-matching-error');
jest.mock('../dao-files/customer_dao.js', function() {
    return {
        retrieveUserName: jest.fn(),
        retrieveUserEmail: jest.fn(),
        registerNewUser: jest.fn()
    }
});

// Keep in mind register is an async function
//  Whatever you throw or return from an async function is wrapped inside of a promise
// If an async function fails, it is considered a "rejected" promise
// If an async function succeeds, it is considered a "resolved" promise
describe('Registration tests', () => {
    test('Username provided is 3 characters', async () => {
        await expect(registerValidation('abc', '1 Park Dr', 'Cleveland', 'Ohio',
        '11111', 'newuser@email.com', 'New User', 'URL', 
            'password1', 'password1', '1112223333')).rejects.toThrow(LengthValidationError);
    });

    test('Password provided is 3 characters', async () => {
        await expect(registerValidation('username1', '1 Park Dr', 'Cleveland', 'Ohio',
        '11111', 'newuser@email.com', 'New User', 'URL', 
            'pas', 'pas', '1112223333')).rejects.toThrow(LengthValidationError);
    });

    test('Username is already taken' , async () => {
        retrieveUserName.mockReturnValueOnce(Promise.resolve(
            { Item: {
                password: '$2b$10$nXIRtXl5U5m849VKSs7PkeYwKZE7pVJbkPeUlUdtAAa7mFtdZQlqu',
                profile_picture: 'URL',
                role: 'user',
                phone_number: 1111111111,
                username: 'another',
                address: {
                  zipcode1: 11111,
                  street_address: '1 Road St',
                  state: 'OH',
                  city: 'Cleveland'
                },
                full_name: 'Another Person',
                email: 'another@email.com',
                credit_card_info: {
                  expiration: 126,
                  security_code: 238,
                  card_number: 78534934394,
                  zipcode2: 12321
                }
              } 
        }));

        await expect(registerValidation('username1', '1 Park Dr', 'Cleveland', 'Ohio',
        '11111', 'newuser@email.com', 'New User', 'URL', 
            'password1', 'password1', '1112223333')).rejects.toThrow(UsernameAlreadyTakenError);
    });

    test('Email is already taken' , async () => {
        retrieveUserName.mockReturnValueOnce(Promise.resolve({}));
        retrieveUserEmail.mockReturnValueOnce(Promise.resolve(
            { Items: [
                {
                  password: 'password1',
                  profile_picture: 'URL',
                  role: 'user',
                  phone_number: 1111111111,
                  username: 'newPerson10',
                  address: {
                    zipcode1: 11111,
                    street_address: '1 Road St',
                    state: 'OH',
                    city: 'Cleveland'
                  },
                  full_name: 'Different Person',
                  email: 'newuser@email.com',
                  credit_card_info: {
                    expiration: 126,
                    security_code: 238,
                    card_number: 78534934394,
                    zipcode2: 12321
                  }
                }
              ] 
        }));

        await expect(registerValidation('username10', '1 Park Dr', 'Cleveland', 'Ohio',
        '11111', 'newuser@email.com', 'New User', 'URL', 
            'password1', 'password1', '1112223333')).rejects.toThrow(EmailAlreadyTakenError);
    });

    test('Password does not match confirmPassword', async () => {
        retrieveUserName.mockReturnValueOnce(Promise.resolve({}));
        retrieveUserEmail.mockReturnValueOnce(Promise.resolve({ Items: [], Count: 0, ScannedCount: 0 }));

        await expect(registerValidation('username10', '1 Park Dr', 'Cleveland', 'Ohio',
        '11111', 'newuser@email.com', 'New User', 'URL', 
            'password', 'password1', '1112223333')).rejects.toThrow(PasswordMatchingError);
    });

    test('Everything ok', async () => {
        retrieveUserName.mockReturnValueOnce(Promise.resolve({}));
        retrieveUserEmail.mockReturnValueOnce(Promise.resolve({ Items: [], Count: 0, ScannedCount: 0 }));

        await registerValidation('username10', '1 Park Dr', 'Cleveland', 'Ohio',
        '11111', 'newuser@email.com', 'New User', 'URL', 
            'password1', 'password1', '1112223333');
    });
});