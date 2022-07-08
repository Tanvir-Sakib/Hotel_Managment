module.exports = {

    addguestpage: (req, res) => {
        res.render('addguest.ejs', {
            title: 'Add Guest Page',
            message: ''
        });
    },

    addguest: (req, res) => {
        console.log(req.body);

        let name = req.body.name;
        let address = req.body.address;
        let email = req.body.email;
        let phone_number = req.body.phone_number;
        let nid = req.body.nid;
        let room_num = req.body.room_num;
        let check_in = req.body.check_in;
        let check_out = req.body.check_out;

        let query = `
            INSERT INTO guests (name, address, email, phone_number, nid, room_num, check_in, check_out ) VALUES ('
            ${name}', ' ${address}', ' ${email}', ' ${phone_number}', ' ${nid}', ' ${room_num}', ' ${check_in}', ' ${check_out}')
        `;
        console.log(query);
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.redirect('/addguest');
        });
    },

    guestdata: (req, res) => {
        let query = "SELECT * FROM `guests` "; // query database to get all the user

        // execute query
        db.query(query, (err, result) => {
            if (err) {
                res.redirect('/');
            }
            res.render('guestlist.ejs', {
                title: 'Guest data',
                guestlist: result,
            });
        });

    },

    editGuestPage: (req, res) => {
        let userid = req.params.userid;

        let query = "SELECT * FROM `guests` WHERE id = '" + userid + "' ";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            console.log(result);
            let userdata = result[0];
            userdata.dob = userdata.dob.toISOString().split('T')[0]
            res.render('editguestr.ejs', {
                title: 'Edit Guest Data',
                guest: guestdata,
            });
        });

    },

};