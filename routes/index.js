module.exports = {
    getHomePage: (req, res) => {

        res.render('index.ejs', {
            title: 'Welcome to ABC Hotel Int.',


        });
    },
};