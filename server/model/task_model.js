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
},{ toJSON: { virtuals: true } });

TaskSchema.virtual('assignedUsers',{
    ref:'User',
    localField:'assigned_user',
    foreignField:'phone_number',
    justOne:true
})
mongoose.model('Task', TaskSchema);

