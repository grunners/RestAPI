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
    //***home***
    // user: 'sa',
    // password: 'testy1',
    // server: 'localhost\\sqlexpress',
    // database: 'test'

    //***NCL website***
    // user: 'ncluser',
    // password: 'N0v4services',
    // server: '82.113.145.162\\SQLEXPRESS',
    // database: 'NCL'

}

//***NovaMaster***Because of domain security we connect like this***
// sqlConfig = "Data Source=nclsqlsrv001,1433;User Id=NCS\\Administrator;Password=fru2upat;Initial Catalog=NovaMaster;Integrated Security=True"
//sqlConfig = "Data Source=localhost\\sqlexpress;User Id=NCS\\Administrator;Password=fru2upat;Initial Catalog=NBSA;Integrated Security=True"
sqlConfig = "Data Source=192.168.1.97;User Id=NCS\\Administrator;Password=fru2upat;Initial Catalog=NovaMaster;Integrated Security=True"

// Start server and listen on http://localhost:8081/
var server = app.listen(8080, function () {
    var host = server.address().address
    var port = server.address().port

    console.log("app listening at http://%s:%s", host, port)
});

// *** queries ***

// GET (select) - refs
app.get('/refs', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', 'null');
    //vars
    var ref = req.query.ref;
    console.log(ref);
    sql.connect(sqlConfig, function(err) {
        if (!err) {
            console.log("Request successful");
            var request = new sql.Request();
            request.query("select * from Jedds_Data where [Gabem reference Number]='" + ref + "'", function(err, recordset) {
                if(err) console.log(err);
                res.end(JSON.stringify(recordset)); // Result in JSON format
            });
        } 
        else {
            console.log("Error while connecting to database: " + err);
        }
        
    });
})

// GET (select) - extensions
app.get('/extensions', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', 'null');
    //vars
    var name = req.query.name;
    console.log(name);
    sql.connect(sqlConfig, function(err) {
        if (!err) {
            console.log("Request successful");
            var request = new sql.Request();
            request.query("select extension from tblExtensions where name='" + name + "'", function(err, recordset) {
                if(err) console.log(err);
                res.end(JSON.stringify(recordset)); // Result in JSON format
            });
        } 
        else {
            console.log("Error while connecting to database: " + err);
        }
        
    });
})

// GET (select) - client refs
app.get('/refs', function (req, res) {
    sql.connect(sqlConfig, function(err) {
        if (!err) {
            console.log("Request successful");
            var request = new sql.Request();
            request.query('select ClientRef from tblPersonal', function(err, recordset) {
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

    var name = req.query.name;
    var email = req.query.email;
    console.log(name + " " + email);
    
    sql.connect(sqlConfig, function(err) {
        if (!err) {
            var request = new sql.Request();
            request.query("INSERT INTO tblTest (name, email) VALUES ('" + name + "', '" + email + "')", function(err, recordset) {
                if(err) console.log(err);
                res.end(JSON.stringify(recordset)); // Result in JSON format
            });
            console.log("Request successful");
        } 
        else {
            console.log("Error while connecting to database: " + err);
        }
        
    });
})

// PUT (update)
app.put('/names/update', function (req, res) {
    var name = req.query.name;

    sql.connect(sqlConfig, function(err) {
        if (!err) {
            var request = new sql.Request();
            request.query("UPDATE users SET name='" + name + "'", function(err, recordset) {
                if(err) console.log(err);
                res.end(JSON.stringify(recordset));
            });
            console.log("UPDATE successful");
        }
        else {
            console.log("Error while connecting to database: " + err);
        }
    })
})


// DELETE (delete)