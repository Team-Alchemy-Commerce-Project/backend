module.exports = class EmailAlreadyTakenError extends Error {
    constructor(message) {
        super(message);
        this.name = "EmailAlreadyTakenError";
    }
}