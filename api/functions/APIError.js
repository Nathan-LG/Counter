// Custom APIError
// Status = 500 if not specified

module.exports = class APIError extends Error {
	constructor (message, userMessage, status) {
		super(message);
		this.name = this.constructor.name;
		Error.captureStackTrace(this, this.constructor);
		this.userMessage = userMessage;
		this.status = status || 500;
	}
};