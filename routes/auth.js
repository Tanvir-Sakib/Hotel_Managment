const { formatDate } = require('../utils/DateFormatUtil')
module.exports = {
    
    registrationPage: (req, res) => {
        const sessionData = req.session
        if (!sessionData.user) {
            res.redirect('/login');
            return;
        }

        res.render('registration.ejs', {
            title: 'Registration Page'
            ,message: ''
        });
    },

    adduser: (req, res) => {
        console.log(req.body);

        let name = req.body.name;
        let username = req.body.username;
        let address = req.body.address;
        let phonenumber = req.body.tel;
        let dob = req.body.dob;
        let email = req.body.email;
        let password = req.body.pwd;

        let query = "INSERT INTO `users` (name, username, address, dob, phonenumber, email, password ) VALUES ('" +
        name + "', '" + username + "', '" + address + "', '" + dob + "', '" + phonenumber + "', '"  + email + "' , '" + password + "')";

        const sessionData = req.session

        if (!sessionData.user) {
            res.redirect('/login');
        }

        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.redirect('/registration');
        });
    },

    userdata: (req, res) => {
        let query = "SELECT * FROM `users` "; // query database to get all the user

        const sessionData = req.session

        if (!sessionData.user) {
            res.redirect('/login');
        }
        // execute query
        db.query(query, (err, result) => {
            if (err) {
                res.redirect('/');
                return;
            }

            for (let i = 0; i < result.length; i++) {
                const userdata = result[i];
                if (userdata.dob) {
                    userdata.dob = formatDate(userdata.dob);
                }
            }

            res.render('userlist.ejs', {
                title: 'User data',
                userlist: result,   
            });
        });

    },

    editUserPage: (req, res) => {
        let userid = req.params.userid;

        let query = "SELECT * FROM `users` WHERE id = '" + userid + "' ";

        const sessionData = req.session

        if (!sessionData.user) {
            res.redirect('/login');
        }

        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            console.log(result);
            let userdata = result[0];
            userdata.dob = userdata.dob.toISOString().split('T')[0]
            console.log(userdata);
            res.render('edituser.ejs', {
                title: 'Edit User Pager',
                user: userdata,
            });
        });

    },

    editUser: (req, res) => {
        let userid = req.body.userid;

        let name = req.body.name;
        let username = req.body.username;
        let address = req.body.address;
        let phonenumber = req.body.tel;
        let dob = req.body.dob;
        let gender = req.body.gender;
        let email = req.body.email;
        let password = req.body.pwd;

        let query = ` UPDATE users SET 
                    name = '${name}', 
                    username = '${username}', 
                    address = '${address}', 
                    phonenumber = '${phonenumber}', 
                    dob = '${dob}', 
                    email = '${email}' ,
                    password = '${password}' 
                    WHERE id = ${userid} `;

        const sessionData = req.session

        console.log(query);
        if (!sessionData.user) {
            res.redirect('/login');
        }

        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send({...err, key: "error"});
            }
            console.log(result);
            res.redirect('/userdata');
        });
        
    },

    deleteUser:(req, res) => {
        let userid = req.params.userid;
        console.log("delete user" + userid);
        let query = `DELETE FROM users WHERE id =${userid}`;



        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            console.log(result.body);
           res.redirect('/userdata');
        });
    }
    
};