module.exports = class PasswordNotInDatabaseError extends Error {
    constructor(message) {
        super(message);
        this.name = "PasswordNotInDatabaseError";
    }
}