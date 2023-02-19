module.exports = class UsernameNotInDatabaseError extends Error {
    constructor(message) {
        super(message);
        this.name = "UsernameNotInDatabaseError";
    }
}
