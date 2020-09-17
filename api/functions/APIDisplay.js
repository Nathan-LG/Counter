let APIDisplay = (req, res, content, status, success) => {
	res.set("X-Content-Type-Options", "nosniff");
	res.set("X-Frame-Options", "deny");
	res.set("Content-Security-Policy", "default-src");
	res.set("Content-Type", "application/json");
	res.status(status);

	res.json({"success": success, content});
};

module.exports = APIDisplay;