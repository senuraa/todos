var mongoose = require('mongoose');
var userFile = require('./users');
var Task = mongoose.model('Task');
var User = mongoose.model('User');
var qs = require('qs');
var request = require('request');
var ObjectId = require('mongoose').Types.ObjectId;

/**
 * @param req
 * @param res
 */
exports.addtask = function (req, res) {
    //console.log(req.body);
    var phone_number = req.body.mobilePhone;
    var title = req.body.data.inputFields[0].model;
    var description = req.body.data.inputFields[1].model;
    var status = req.body.data.optionFields[0].model;
    var assigned_user = req.body.data.inputFields[2].model;
    var created_date = new Date();
    var due_UnformattedDate = req.body.data.dateFields[0].model;
    var due_date = new Date(due_UnformattedDate);
    var project = req.body.data.inputFields[3].model;
    var task = new Task({ phone_number: phone_number });
    task.set('title', title);
    task.set('description', description);
    task.set('status', status);
    task.set('assigned_user', assigned_user);
    task.set('created_date', created_date);
    task.set('due_date', due_date);
    task.set('project', project);
    console.log(task);
    task.save(function (err, doc) {
        if (err) {
            console.log('Error Creating Task', err);
            res.status(500).json(err);
        } else {
            User.findOne({ phone_number: assigned_user }).exec(function (err, user) {

                if (err) {
                    console.log('find existing user error', err);
                    res.status(500).json(err);
                    return;
                }
                res.status(200).json(user);
            });
        }
    });

}

/**
 * @param req
 * @param res
 */
exports.tasksofuser = function (req, res) {
    var phone_no = req.body.phone_number;
    Task.find({ assigned_user: phone_no }).exec(function (err, tasks) {
        if (err) {
            console.log('Tasks retrieve error', err);
            res.status(500).json(err);
            return;
        }
        if (tasks) {
            res.status(200).json(tasks);
        }
    });
}

/**
 * @param req
 * @param res
 */
exports.alltasks = function (req, res) {
    Task.find().exec(function (err, tasks) {
        if (err) {
            console.log('Tasks retrieve error', err);
            res.status(500).json(err);
            return;
        }
        if (tasks) {
            res.status(200).json(tasks)
        }
    });
}

/**
 * @param req
 * @param res
 */
exports.upcomingtasks = function (req, res) {
    var phone_no = req.body.phone_number;
    var status = req.body.status;
    var n = new Date().toLocaleDateString();
    var today = new Date(n);
    var tomorrow = new Date(n);
    tomorrow.setDate(tomorrow.getDate() + 1);
    Task.find({ "due_date": { "$gte": today, "$lt": tomorrow }, "assigned_user": phone_no, "status": status }).exec(function (err, tasks) {
        if (err) {
            console.log('Tasks retrieve error', err);
            res.status(500).json(err);
            return;
        }
        if (tasks) {
            res.status(200).json(tasks)
        }
    });
}

/**
 * @param req
 * @param res
 */
exports.taskdata = function (req, res) {
    var id = req.body._id;
    Task.find({ "_id": new ObjectId(id) }).exec(function (err, task) {
        if (err) {
            console.log('Tasks retrieve error', err);
            res.status(500).json(err);
            return;
        }
        if (task) {
            res.status(200).json(task)
        }
    });
}

/**
 * @param req
 * @param res
 */
exports.changetaskstatus = function (req, res) {
    var id = req.body._id;
    Task.findOneAndUpdate({ "_id": new ObjectId(id) }, { $set: { status: req.body.status } },{new: true}, function(err, doc){
        if (err) {
            console.log('Error Updating User', err);
            res.status(500).json(err);
        } else {
            res.status(200).json(doc);
        }
    });
}