module.exports = {
    
    registrationPage: (req, res) => {
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
        let gender = req.body.gender;
        let email = req.body.email;
        let password = req.body.pwd;

        let query = "INSERT INTO `users` (name, username, address, dob, phonenumber, gender, email, password ) VALUES ('" +
        name + "', '" + username + "', '" + address + "', '" + dob + "', '" + phonenumber + "', '" + gender + "' , '" + email + "' , '" + password + "')";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.redirect('/registration');
        });
    },

    userdata: (req, res) => {
        let query = "SELECT * FROM `users` "; // query database to get all the user

        // execute query
        db.query(query, (err, result) => {
            if (err) {
                res.redirect('/');
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
                    gender = '${gender}' ,
                    email = '${email}' ,
                    password = '${password}' 
                    WHERE id = ${userid} `;


        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            console.log(result);
            res.redirect('/userdata');
        });
        
    },
    
};