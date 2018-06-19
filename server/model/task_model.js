var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var TaskSchema = new Schema({
    phone_number: {type: String, required: true},
    title: String,
    description: String,
    status: String,
    assigned_user: String,
    created_date: Date,
    due_date: Date,
    project: String
});

mongoose.model('Task', TaskSchema);

