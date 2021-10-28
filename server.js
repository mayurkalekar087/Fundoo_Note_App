//import express library
const express = require('express');
require("dotenv").config;
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger/swagger.json");

//create app
const app = express();

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// parse requests of content-type - application/json
app.use(express.json())
// route
app.get('/', (req, res) => {
    res.json({"message": "Welcome to Fundoo Notes App"});
});

require('./app/routes/user.routes')(app)

// listen to the request
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});
module.exports = app;