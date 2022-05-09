module.exports = {
    
    loginPage: (req, res) => {
        res.render('login.ejs', {
            title: 'Login Page'
            ,message: ''
        });
    },
    userIn: (req, res) => {

        let email = req.body.email;
        let password = req.body.pwd;

        console.log(req.body)

        const query = `SELECT * FROM users WHERE email='${email}' AND password='${password}' LIMIT 1`;
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }

            if (result.length > 0) {
                req.session.user = result[0];
                res.redirect('/userprofile');
            }
            else {
                res.render('login.ejs', {
                    title: 'Login Page',
                    message: 'Invalid Username or Password'
                });
            }
        });
    },
    userProfile: (req, res) => {
         let query = `SELECT * FROM userin`;

         const sessionData = req.session

        if (!sessionData.user) {
            res.redirect('/login');
        }

        console.log(sessionData)

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

    open: (req, res) => {

            res.render('open.ejs', {
                title: 'Open Page',
            });
    },

}