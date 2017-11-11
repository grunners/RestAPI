var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));


app.listen(8888);

app.post('/update', function(req, res) {
    console.log(req.body); // the posted data
});