var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var sql = require('mssql'); // MS Sql Server client

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

// //CORS Middleware
// app.use(function (req, res, next) {
//     //Enabling CORS 
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, contentType,Content-Type, Accept, Authorization");
//     next();
// });

// Connection string parameters.
var sqlConfig = {
    user: 'sa',
    password: 'testy1',
    server: 'localhost\\sqlexpress',
    database: 'test'
}

// Start server and listen on http://localhost:8081/
var server = app.listen(8080, function () {
    var host = server.address().address
    var port = server.address().port

    console.log("app listening at http://%s:%s", host, port)
});

// *** queries ***

// GET (select)
app.get('/names', function (req, res) {
    sql.connect(sqlConfig, function(err) {
        if (!err) {
            console.log("Request successful");
            var request = new sql.Request();
            request.query('select name from users where id=2', function(err, recordset) {
                if(err) console.log(err);
                res.end(JSON.stringify(recordset)); // Result in JSON format
            });
        } 
        else {
            console.log("Error while connecting to database: " + err);
        }
        
    });
})

// POST (insert)
app.post('/names/new', function (req, res) {

    var email = req.body.email;
    console.log("Email to be inserted: " + email);
    
    sql.connect(sqlConfig, function(err) {
        if (!err) {
            console.log("Request successful");
            var request = new sql.Request();
            request.query("INSERT INTO [users] (email) VALUES ('" + email + "')", function(err, recordset) {
                if(err) console.log(err);
                res.end(JSON.stringify(recordset)); // Result in JSON format
            });
        } 
        else {
            console.log("Error while connecting to database: " + err);
        }
        
    });
})

// PUT (update)


// DELETE (delete)