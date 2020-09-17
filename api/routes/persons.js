const express = require("express");
const persons = require("../services/persons/persons.ctrl.js");
let app = express();

app.get("/", persons.getPersons);
app.post("/:number", persons.addPersons);
app.delete("/:number", persons.deletePersons);

module.exports = app;