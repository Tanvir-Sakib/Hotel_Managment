const express = require('express');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');
const {getHomePage} = require('./routes/index');
const {addPlayerPage, addPlayer, deletePlayer, editPlayer, editPlayerPage} = require('./routes/player');
const {registrationPage, adduser,userdata, editUserPage, editUser} = require('./routes/auth');
const {loginPage,userProfile,userIn,userOut,userPro,open} = require('./routes/verify');
const {addguestpage, addguest, guestdata, editGuestPage, editGuest } = require('./routes/guest');
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
    database: 'Socar'
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
app.get('/edituser/:userid', editUserPage);
app.get('/editguest/:guestid', editGuestPage);
app.get('/add', addPlayerPage);
app.get('/edit/:id', editPlayerPage);
app.get('/delete/:id', deletePlayer);
app.get('/userdata', userdata);
app.get('/guestdata', guestdata);
app.get('/userprofile', userProfile);
app.get('/userpro', userPro);
app.get('/open', open);
app.post('/addguest', addguest);
app.post('/login', userIn);
app.post('/add', addPlayer);
app.post('/edit/:id', editPlayer);
app.post('/edituser/:userid', editUser);
app.post('/editguest/:guestid', editGuest);


// set the app to listen on the port
app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});