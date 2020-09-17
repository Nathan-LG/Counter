const APIStart = require("../../functions/APIStart");
const APIDisplay = require("../../functions/APIDisplay");
const APIError = require("../../functions/APIError");

const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('db/persons.json')
const db = low(adapter)

// GET /persons

exports.getPersons = (req, res, next) => {
	res.locals.parameters = "";
	res.locals.level = 0;

	let APIPromise = APIStart.get(req, res);

	let APIStartOK = (req, res) => {
		const persons = db.get("persons").value()
		APIDisplay(req, res, {"persons": persons}, 200, true);
	};

	APIPromise.then((reqRes) => APIStartOK(reqRes[0], reqRes[1])).catch(next);
};

// POST /persons/:id

exports.addPersons = (req, res, next) => {
	res.locals.parameters = "";
	res.locals.level = 0;

	let APIPromise = APIStart.post(req, res);

	let APIStartOK = (req, res) => {
		const number = parseInt(req.params.number)

		db.update('persons.actual', n => n + number)
		  .update('persons.entries', n => n + number)
		  .write();
		
		const persons = db.get("persons").value();

		APIDisplay(req, res, {"persons": persons}, 201, true);
	};

	APIPromise.then((reqRes) => APIStartOK(reqRes[0], reqRes[1])).catch(next);
};

// DELETE /persons/:id

exports.deletePersons = (req, res, next) => {
	res.locals.parameters = "";
	res.locals.level = 0;

	let APIPromise = APIStart.delete(req, res);

	let APIStartOK = (req, res) => {
		const number = parseInt(req.params.number)

		db.update('persons.actual', n => n - number)
		  .update('persons.leaves', n => n + number)
		  .write();
		
		const persons = db.get("persons").value();

		APIDisplay(req, res, {"persons": persons}, 201, true);

	};

	APIPromise.then((reqRes) => APIStartOK(reqRes[0], reqRes[1])).catch(next);
};