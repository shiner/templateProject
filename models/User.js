/**
 * Created by annarita on 12/08/15.
 */

"use strict";

var pg = require('pg');
var connectionString = "pg://postgres:postgres@localhost:5432/database";

var client = new pg.Client(connectionString);

client.connect(function(err) {
    if(err) {
        return console.error('could not connect to postgres', err);
    }

    client.query("CREATE TABLE IF NOT EXISTS emps(id BIGSERIAL PRIMARY KEY, firstname varchar(64), lastname varchar(64))");
    client.query("INSERT INTO emps(firstname, lastname) values($1, $2)", ['Ronald', 'McDonald']);
    client.query("INSERT INTO emps(firstname, lastname) values($1, $2)", ['Mayor', 'McCheese']);

    var query = client.query("SELECT firstname, lastname FROM emps ORDER BY lastname, firstname");
    query.on("row", function (row, result) {
        result.addRow(row);
    });
    query.on("end", function (result) {
        console.log(JSON.stringify(result.rows, null, "    "));
        client.end();
    });
});

