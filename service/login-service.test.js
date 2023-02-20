const { loginValidation } = require('./login-service');
const { retrieveUserName } = require('../dao-files/customer_dao.js');
const UsernameNotInDatabaseError = require('../errors/username-not-in-database-error');
const PasswordNotInDatabaseError = require('../errors/password-not-in-database-error');
jest.mock('../dao-files/customer_dao.js', function() {
    return {
        retrieveUserName: jest.fn(),
    }
});

describe('Registration tests', () => {
    test('Username does not match username in database' , async () => {
        retrieveUserName.mockReturnValueOnce(Promise.resolve({}));
        await expect(loginValidation('username1', 'password1')).rejects.toThrow(UsernameNotInDatabaseError);
    });

    test('Password does not match password in database', async () => {
        retrieveUserName.mockReturnValueOnce(Promise.resolve({
            Item: {
                password: '$2b$10$nXIRtXl5U5m849VKSs7PkeYwdZQlqu',
                profile_picture: 'URL',
                role: 'user',
                phone_number: 1111111111,
                username: 'username1',
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
        await expect(loginValidation('username1', 'password1')).rejects.toThrow(PasswordNotInDatabaseError);
    })

    test('Everything ok', async () => {
        retrieveUserName.mockReturnValueOnce(Promise.resolve({
            Item: {
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
        await loginValidation('another', 'another1');
    });
});