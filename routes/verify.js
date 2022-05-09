module.exports = {
    
    loginPage: (req, res) => {
        res.render('login.ejs', {
            title: 'Login Page'
            ,message: ''
        });
    },
}