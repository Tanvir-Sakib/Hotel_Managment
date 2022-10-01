module.exports = {
    getHomePage: (req, res) => {
        const sessionData = req.session
        if (!sessionData.user) {
            res.redirect('/login');
            return;
        }

        res.render('index.ejs', {
            title: 'Welcome to ABC Hotel Int.',
        });
    },
};