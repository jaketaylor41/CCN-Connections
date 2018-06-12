require('dotenv').config();
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var expressValidator = require('express-validator');
var flash = require('connect-flash');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongo = require('mongodb');
var mongoose = require('mongoose');
var bootbox = require('bootbox');
var mocha = require('mocha');
var db = mongoose.connection;

// const dbURI = process.env.DB_STRING;
// mongoose.connect(dbURI);

mongoose.connect('mongodb://localhost/loginapp');

db.once('open', function () {
    console.log('Connected to MongoDB');
});

db.on('error', function (err) {
    console.log(err);
});


var routes = require('./routes/index');
var users = require('./routes/users');
var contacts = require('./routes/contacts');
var ccn = require('./routes/ccn');

// Init App
var app = express();

// View Engine
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({defaultLayout:'layout'}));
app.set('view engine', 'handlebars');

// BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Express Session
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));

//Express Message MiddleWare
app.use(require('connect-flash')());
app.use(function (req, res, next) {
   res.locals.messages = require('express-messages')(req, res);
   next();
});


// Passport init
app.use(passport.initialize());
app.use(passport.session());

// Express Validator
app.use(expressValidator({
    errorFormatter: function(param, msg, value) {
        var namespace = param.split('.')
            , root    = namespace.shift()
            , formParam = root;

        while(namespace.length) {
            formParam += '[' + namespace.shift() + ']';
        }
        return {
            param : formParam,
            msg   : msg,
            value : value
        };
    }
}));

// Connect Flash
app.use(flash());

// Connect Mocha
// app.use(mocha());

// Global Vars
app.use(function (req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    res.locals.contact = req.contact || null;

    next();
});

app.use(function(req,res,next){
    req.db = db;
    next();
});

app.use('/users', users);
app.use('/contacts', contacts);
app.use('/ccn', ccn);
app.use('/', routes);


// Set Port
app.set('port', (process.env.PORT || 3000));

app.listen(app.get('port'), function(){
    console.log('Server started on port '+app.get('port'));
});

module.exports = app;

