module.exports = {
    chatIndex: (req, res) => {
        res.render('login.ejs', {
            title: 'Login Page'
            , message: ''
        });
    }
}