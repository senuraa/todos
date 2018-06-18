require('dotenv').config();
require('dotenv').load();
require('./server/model/auth_model.js');
require('./server/model/user_model.js');
require('./server/model/task_model.js');

var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressSession = require('express-session');
var mongoStore = require('connect-mongo')({ session: expressSession });
var mongoose = require('mongoose');

var config = require('./server/config.js');

var app = express();
var server = require('http').Server(app);

if (!config.API_KEY) {
    console.log("Please set your ACCOUNT_SECURITY_API_KEY environment variable before proceeding.");
    process.exit(1);
}


/**
 * Setup MongoDB connection.
 */

const options = {
    user: process.env.MONGOUSER,
    pass: process.env.MONGOPASS
}
mongoose.connect(process.env.MONGODB,options);
var db = mongoose.connection;

app.use(cookieParser());
app.use(
    expressSession(
        {
            'secret': config.SECRET,
            resave: true,
            saveUninitialized: true
        }
    )
);

app.use(bodyParser.json({}));
app.use(bodyParser.urlencoded({
    extended: true
}));

/**
 * Open the DB connection.
 */
db.once('open', function (err) {
    if (err) {
        console.log("Error Opening the DB Connection: ", err);
        return;
    }
    app.use(expressSession({
        secret: config.SECRET,
        cookie: { maxAge: 60 * 60 * 1000 },
        store: new mongoStore({
            db: mongoose.connection.db,
            collection: 'sessions'
        }),
        resave: true,
        saveUninitialized: true
    }));
    var port = config.PORT || 5151;
    server.listen(port);
    console.log("Magic happening on port " + port);
});

db.on('error', console.error.bind(console, 'Connection Error:'));

var router = express.Router();

var auth = require('./server/controllers/auth.js');
var users = require('./server/controllers/users.js');
var tasks = require('./server/controllers/tasks.js');

/**
 * Authentication activities
 */
router.route('/auth/register').post(auth.register);
router.route('/auth/login').post(auth.login);
router.route('/auth/loggedIn').post(auth.loggedIn);
router.route('/auth/logout').get(auth.logout);

/**
 * Task activities
 */
router.route('/task/selectedTask').post(tasks.taskdata);
router.route('/task/addTask').post(tasks.addtask);
router.route('/task/allTasks').post(tasks.alltasks);
router.route('/task/tasksOfUser').post(tasks.tasksofuser);
router.route('/task/upcomingTasks').post(tasks.upcomingtasks);

/**
 * Account Security Authentication API
 */
router.route('/accountsecurity/sms').post(auth.sms);
router.route('/accountsecurity/voice').post(auth.voice);
router.route('/accountsecurity/verify').post(auth.verify);
router.route('/accountsecurity/onetouchstatus').post(auth.checkonetouchstatus);
router.route('/accountsecurity/onetouch').post(auth.createonetouch);

/**
 * User Activities
 */
router.route('/users/allusers').post(users.allUsers);
router.route('/accountsecurity/start').post(users.requestPhoneVerification);
router.route('/accountsecurity/verifyPhoneToken').post(users.verifyPhoneToken);


/**
 * Require user to be logged in and authenticated with 2FA
 *
 * @param req
 * @param res
 * @param next
 */
function requirePhoneVerification(req, res, next) {
    if (req.session.ph_verified) {
        console.log("Phone Verified");
        next();
    } else {
        console.log("Phone Not Verified");
        res.redirect("/verification");
    }
}
/**
 * Require user to be logged in and authenticated with 2FA
 *
 * @param req
 * @param res
 * @param next
 */
function requireLoginAnd2FA(req, res, next) {
    if (req.session.loggedIn && req.session.authy) {
        console.log("RL2FA:  User logged and 2FA");
        next();
    } else if (req.session.loggedIn && !req.session.authy) {
        console.log("RL2FA:  User logged in but no 2FA");
        res.redirect("/2fa");
    } else {
        console.log("RL2FA:  User not logged in.  Redirecting.");
        res.redirect("/login");
    }
}

/**
 * Require user to be logged in.
 *
 * @param req
 * @param res
 * @param next
 */
function requireLogin(req, res, next) {
    if (req.session.loggedIn) {
        console.log("RL:  User logged in");
        next();
    } else {
        console.log("RL:  User not logged in.  Redirecting.");
        res.redirect("/login");
    }
}

/**
 * Test for 200 response.  Useful when setting up Twilio callback.
 */
router.route('/test').post(function (req, res) {
    return res.status(200).send({ "connected": true });
});

/**
 * All pages under protected require the user to be both logged in and authenticated via 2FA
 */
app.all('/protected/*', requireLoginAnd2FA, function (req, res, next) {
    next();
});

/**
 * Require user to be logged in to view 2FA page.
 */
app.all('/2fa/*', requireLogin, function (req, res, next) {
    next();
});

/**
 * Prefix all router calls with 'api'
 */
app.use('/api', router);
// app.use('/', express.static(__dirname + '/public'));
app.use('/app', express.static(__dirname + '/app'));
