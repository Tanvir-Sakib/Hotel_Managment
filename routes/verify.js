module.exports = {
    
    loginPage: (req, res) => {
        res.render('login.ejs', {
            title: 'Login Page'
            ,message: ''
        });
    },
    userIn: (req, res) => {
        console.log(req.body);

        let email = req.body.email;
        let password = req.body.pwd;

        let query = `INSERT INTO userin SET 
                    email = '${email}' ,
                    password = '${password}'`;
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.redirect('/userprofile');
        });
    },
    userProfile: (req, res) => {
         let query = `SELECT * FROM userin`;

        db.query(query, (err, result) => {
            if (err) {
                res.redirect('/');
            }
            res.render('userprofile.ejs', {
                title: 'User Profile',
                userProfile: result,
            });
        });
    },

    userOut: (req, res) => {
        console.log(req.body);

        let email = req.body.email;
        let password = req.body.pwd;
        let query = `INSERT INTO userin SET 
                    email = '${email}' ,
                    password = '${password}'`;
       
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.redirect('/userpro');
        });
    },

    userPro: (req, res) => {
        let query = `SELECT * FROM userin`;

            db.query(query, (err, result) => {
                if (err) {
                    res.redirect('/');
                }
                res.render('userpro.ejs', {
                    title: 'User Pro',
                    userPro: result,
                });
            });
    },
}