var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('MusicApp', ['Users']);
var bodyParser = require('body-parser');
var passwordHash = require('password-hash');
var crypto = require('crypto'),
    algorithm = 'aes-256-ctr',
    password = 'd6F3Efeq';

var multer = require('multer');

var fs = require('fs');
var busboy = require('connect-busboy');
app.use(busboy());

function encrypt(text) {
    var cipher = crypto.createCipher(algorithm, password)
    var crypted = cipher.update(text, 'utf8', 'hex')
    crypted += cipher.final('hex');
    return crypted;
}

app.use(express.static(__dirname));

app.use(bodyParser.json());

app.post('/addUser', function(req, res) {
    req.body.password = encrypt(req.body.password)
    db.Users.findOne({
        email: req.body.email
    }, function(err, docs) {
        if (docs == null) {
            db.Users.insert(req.body, function(Ndocs) {
                res.json(Ndocs);
            })
        } else {
            res.json({
                "error": "Email already used."
            });
        }
    })
});

app.post('/login', function(req, res) {
    req.body.password = encrypt(req.body.password)
    db.Users.findOne({
        "email": req.body.email,
        "password": req.body.password,
    }, function(error, docs) {
        if (docs) {
            res.json(docs);
            
        } else
            res.json({
                    "error": "invalid credentials."
        });
    })
});


//app.use(express.static(__dirname + "/app/views"));
app.listen(3000);
console.log("server running on port 3000");




