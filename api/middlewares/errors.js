// Error handling

require("../functions/APIError");
const APIDisplay = require("../functions/APIDisplay");

module.exports = (err, req, res, next) => {

	console.log(err);

	if (res.headersSent) {
		return next(err);
	} 	

	if (err.name === "UnauthorizedError") {
		APIDisplay(req, res, {"error": {"userMessage": "Action non autorisée", "devMessage": "Token invalid or missing"}}, 401, false);
	} else if (err.name === "APIError") {
		APIDisplay(req, res, {"error": {"userMessage": err.userMessage, "devMessage": err.message }}, err.status, false);
	} else {
		APIDisplay(req, res, {"error": {"userMessage": "Erreur interne", "devMessage": "Server error"}}, 500, false);
	}

};