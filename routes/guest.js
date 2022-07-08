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
        let guestId = req.params.guestid;

        let query = `SELECT * FROM guests WHERE id =${guestId}`;
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            console.log(result);
            const guestData = result[0];
            guestData.check_in = guestData.check_in.toISOString().split('T')[0]
            guestData.check_out = guestData.check_out ? guestData.check_out.toISOString().split('T')[0] : null
            console.log(guestData);
            res.render('editguest.ejs', {
                title: 'Edit Guest Data',
                guest: guestData,
            });
        });

    },

    editGuest: (req, res) => {
        console.log(req.body);
        let guestId = req.body.guest_id;

        let name = req.body.name;
        let address = req.body.address;
        let email = req.body.email;
        let phone_number = req.body.phone_number;
        let nid = req.body.nid;
        let room_num = req.body.room_num;
        let check_in = req.body.check_in;
        let check_out = req.body.check_out;

        let query = ` UPDATE guests SET
                                       name = '${name}',
                                       address = '${address}',
                                       email = '${email}',
                                       phone_number = '${phone_number}',
                                       nid = '${nid}',
                                       room_num = '${room_num}',
                                       check_in = '${check_in}',
                                       check_out = '${check_out}'
                      WHERE id = ${guestId} `;
        console.log(query);

        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            console.log(result);
            res.redirect('/guestdata');
        });

    },

    deleteGuest:(req, res) => {
        let guestId = req.params.guestid;
        let query = `DELETE FROM guests WHERE id =${guestId}`;

        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            console.log(result);
            res.redirect('/guestdata');
        });
    }

};