module.exports = {
    chatIndex: (req, res) => {
        const sessionData = req.session
        if (!sessionData.user) {
            res.redirect('/login');
            return;
        }
        res.render('liveChat.ejs', {
            title: 'Live Chat Page',
            message: '',
        });
    }
}