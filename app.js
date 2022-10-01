const express = require('express');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');
const {getHomePage} = require('./routes/index');
const {registrationPage, adduser,userdata, editUserPage, editUser, deleteUser} = require('./routes/auth');
const {loginPage,userIn, logOut} = require('./routes/verify');
const {addguestpage, addguest, guestdata, editGuestPage, editGuest, deleteGuest } = require('./routes/guest');
const session = require('express-session');



const app = express();
const port = 5000;
app.use(session({
    secret: '2C44-4D44-WppQ38S',
    resave: true,
    saveUninitialized: true
}));

// create connection to database
// the mysql.createConnection function takes in a configuration object which contains host, user, password and the database name.
const db = mysql.createConnection ({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'Hotel_Managment'
});

// connect to database
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to database');
});
global.db = db;

// configure middleware
app.set('port', process.env.port || port); // set express to use this port
app.set('views', __dirname + '/views'); // set express to look in this folder to render our view
app.set('view engine', 'ejs'); // configure template engine
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // parse form data client
app.use(express.static(path.join(__dirname, 'public'))); // configure express to use public folder
app.use(fileUpload()); // configure fileupload

// routes for the app

app.get('/', getHomePage);
app.get('/registration', registrationPage );
app.get('/addguest', addguestpage);
app.get('/login', loginPage );
app.get('/logout', logOut );
app.get('/edituser/:userid', editUserPage);
app.get('/editguest/:guestid', editGuestPage);
app.get('/deleteuser/:userid', deleteUser);
app.get('/deleteguest/:guestid', deleteGuest);
app.get('/userdata', userdata);
app.get('/guestdata', guestdata);
app.post('/registration', adduser);
app.post('/addguest', addguest);
app.post('/login', userIn);
app.post('/edituser/:userid', editUser);
app.post('/editguest/:guestid', editGuest);


// set the app to listen on the port
app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});