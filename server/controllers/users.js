var mongoose = require('mongoose');
var User = mongoose.model('User');
var config = require('../config.js');
var phoneReg = require('../lib/phone_verification')(config.API_KEY);


/**
 * Register a phone
 *
 * @param req
 * @param res
 */
exports.requestPhoneVerification = function (req, res) {
    var phone_number = req.body.phone_number;
    var country_code = req.body.country_code;
    var via = 'sms';

    console.log("body: ", req.body);

    if (phone_number && country_code && via) {
        phoneReg.requestPhoneVerification(phone_number, country_code, via, function (err, response) {
            if (err) {
                console.log('error creating phone reg request', err);
                res.status(500).json(err);
            } else {
                console.log('Success register phone API call: ', response);
                res.status(200).json(response);
            }
        });
    } else {
        console.log('Failed in Register Phone API Call', req.body);
        res.status(500).json({message: "Fields are missing"});
    }

};

/**
 * Confirm a phone registration token
 *
 * @param req
 * @param res
 */
exports.verifyPhoneToken = function (req, res) {
    var country_code = req.body.country_code;
    var phone_number = req.body.phone_number;
    var token = req.body.token;
    var firstname = req.body.firstname;
    var lastname = req.body.lastname;

    if (phone_number && country_code && token) {
        phoneReg.verifyPhoneToken(phone_number, country_code, token, function (err, response) {
            if (err) {
                console.log('error creating phone reg request', err);
                res.status(500).json(err);
            } else {
                console.log('Confirm phone success confirming code: ', response);
                if (response.success) {

                        User.findOne({ phone_number: phone_number }).exec(function (err, user) {
                            if (err) {
                                console.log('find existing user error', err);
                                res.status(500).json(err);
                                return;
                            }
                            if (user) {
                                User.findOneAndUpdate({ phone_number: phone_number }, { $set: { country_code: country_code, firstname: firstname, lastname: lastname } },{new: true}, function(err, doc){
                                    if (err) {
                                        console.log('Error Updating User', err);
                                        res.status(500).json(err);
                                    } else {
                                        res.status(200).json(doc);
                                    }
                                });
                            } else {
                                user = new User({ phone_number: phone_number });
                                user.set('country_code', country_code);
                                user.set('firstname', firstname);
                                user.set('lastname', lastname);
                                user.save(function (err, doc) {
                                    if (err) {
                                        console.log('Error Creating User', err);
                                        res.status(500).json(err);
                                    } else {
                                        res.status(200).json(doc);
                                    }
                                });
                            }
                        });
                        
                        req.session.ph_verified = true;
                }else{
                    res.status(200).json(response);
                }
            }

        });
    } else {
        console.log('Failed in Confirm Phone request body: ', req.body);
        res.status(500).json({message: "Missing fields"});
    }
};

/**
 * All users
 *
 * @param req
 * @param res
 */
exports.allUsers = function (req, res) {
    User.find().exec(function (err, users) {
        if (err) {
            console.log('find existing user error', err);
            res.status(500).json(err);
            return;
        }
        res.status(200).json(users);
    });
};

