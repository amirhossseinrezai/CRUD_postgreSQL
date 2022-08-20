const express = require("express");
const winston = require("winston");
const config = require("config");

const app = express();

// db connection
require("./src/model/db");

// routes
const routes = require("./src/routes/routes");

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use("/api/users", routes);

process.on('uncaughtException', (ex)=>{
    console.log("we got an uncaughtException");
    winston.error(ex.message, ex);
});


process.on('unhandledRejection', (ex)=>{
    console.log('got an unhandledRejection...');
    winston.error(ex.message, ex);
});

winston.add(new winston.transports.File({
    filename: "./src/log/info.log",
    level: "info"
}));
winston.add(new winston.transports.File({
    filename: "./src/log/errors.log",
    level: "error",
    handleExceptions: true,
    handleRejections: true
}));


port = process.env.PORT || 3000;
app.listen(port, (req, res)=>{
    winston.log("info", `This app is started at port ${port}`);
});