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
                res.redirect('/');
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
         let query = `SELECT * FROM users`;

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

}