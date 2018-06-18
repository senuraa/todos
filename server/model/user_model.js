var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var UserSchema = new Schema({
    phone_number: {type: String, required: true, unique: true},
    country_code: {type: String, required: true},
    firstname: String,
    lastname: String
});

mongoose.model('User', UserSchema);

