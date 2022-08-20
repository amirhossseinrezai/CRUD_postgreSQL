const {Client} = require("pg");
const config = require("config");

const client = new Client({
    host: config.get("db.host"),
    user: config.get("db.user"),
    port: config.get("db.port"),
    password: config.get("db.password"),
    database: config.get("db.database")
});
client.connect();
module.exports = client;