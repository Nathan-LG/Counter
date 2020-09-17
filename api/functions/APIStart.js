const APIError = require("./APIError");
const API = require("../config/API");

function APIStart (req, res, resolve, reject, level, parameters, parametersWanted) {

	const APIKey = req.get("API-Key");

	// Check Header API-Key exists

	if (APIKey === undefined)
		reject(new APIError ("No API Key", "Erreur interne", 401));
	
	// Check API Key exists

	if (!(APIKey == API["key"]))
		reject(new APIError ("Wrong API Key", "Erreur interne", 401));
		
	// Check params

	let allParamsAreHere = true;
	let missingParams = "";

	if (parametersWanted !== "") {
		const paramsArray = parametersWanted.split(";");

		paramsArray.forEach((paramWanted) => {
			if (!(paramWanted in parameters)) {
				allParamsAreHere = false;
				missingParams = missingParams + paramWanted + ";";
			}
		});
	} else
		allParamsAreHere = true;

	if (!allParamsAreHere)
		reject(new APIError ("Missing parameters : " + missingParams, "Erreur interne", 400));

	// All good

	resolve([req, res]);
}

function get (req, res) {
	return new Promise((resolve, reject) => {
		APIStart(req, res, resolve, reject, res.locals.level, req.query, res.locals.parameters);
	});
}

function post (req, res) {
	return new Promise((resolve, reject) => {
		APIStart(req, res, resolve, reject, res.locals.level, req.body, res.locals.parameters);
	});
}

function put (req, res) {
	return new Promise((resolve, reject) => {
		APIStart(req, res, resolve, reject, res.locals.level, req.body, res.locals.parameters);
	});
}

function patch (req, res) {
	return new Promise((resolve, reject) => {
		APIStart(req, res, resolve, reject, res.locals.level, req.body, res.locals.parameters);
	});
}

function deleteFunction (req, res) {
	return new Promise((resolve, reject) => {
		APIStart(req, res, resolve, reject, res.locals.level, req.body, res.locals.parameters);
	});
}

module.exports = {
	get: get,
	post: post,
	put: put,
	patch: patch,
	delete: deleteFunction
};