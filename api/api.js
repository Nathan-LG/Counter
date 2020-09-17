// Packages

const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const JWT = require("express-jwt");
const errors = require("./middlewares/errors");
const APIError = require("./functions/APIError");

// Services

const persons = require("./routes/persons");

const API = require("./config/API");

let app = express();

// Middleware

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(morgan("dev"));

// Routes

app.use("/persons", persons);

// 404

app.use((req, res, next) => {
	Promise.resolve().then(() => {
		throw new APIError ("File not found or method not allowed", "Erreur interne", 404);
	}).catch(next);
});

// Errors

app.use(errors);

// Server

app.listen(API.port);
console.log("API Server started on " + API.port);

module.exports = app;