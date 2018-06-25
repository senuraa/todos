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
    var phone_number = req.body.phone_number;
    var title = req.body.formValues.title;
    var description = req.body.formValues.description;
    var status = req.body.formValues.status;
    var assigned_user = req.body.formValues.assigned_to;
    var created_date = new Date();

    var due_UnformattedDate = req.body.formValues.date;
    var due_date = new Date(due_UnformattedDate);

    var project = req.body.formValues.project;
    var task = new Task({ phone_number: phone_number });
    task.set('title', title);
    task.set('description', description);
    task.set('status', status);
    task.set('assigned_user', assigned_user);
    task.set('created_date', created_date);
    if(due_UnformattedDate == ""){

    }else{
        task.set('due_date', due_date);
    }
    task.set('project', project);
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
    Task.find( {$and : [ {$or:[ {phone_number: phone_no}, {assigned_user: phone_no}]},{status: { $ne: "Deleted" }}] }).exec(function (err, tasks) {
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
    // var n = new Date().toLocaleDateString();
    // var today = new Date(n);
    // var tomorrow = new Date(n);
    // tomorrow.setDate(tomorrow.getDate() + 1);
    // Task.find({ "due_date": { "$gte": today, "$lt": tomorrow }, "assigned_user": phone_no, "status": status }).exec(function (err, tasks) {
    //     if (err) {
    //         console.log('Tasks retrieve error', err);
    //         res.status(500).json(err);
    //         return;
    //     }
    //     if (tasks) {
    //         res.status(200).json(tasks)
    //     }
    // });
        Task.find({ "assigned_user": phone_no, "status": status }).exec(function (err, tasks) {
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

/**
 * @param req
 * @param res
 */
exports.deleteTask = function (req, res) {
    var phone_no = req.body.phone_number;
    var id = req.body.taskId;
    var status = req.body.status;
    Task.findOneAndUpdate({ "_id": new ObjectId(id), assigned_user : phone_no }, { $set: { status: status } },{new: true}, function(err, doc){
        if (err) {
            console.log('Error Updating User', err);
            res.status(500).json(err);
        } else {
            res.status(200).json(doc);
        }
    });
}

/**
 * @param req
 * @param res
 */
exports.updateTask = function (req, res) {
    var title = req.body.title;
    var description = req.body.description;
    var status = req.body.status;
    var assigned_user = req.body.assigned_to;

    var due_UnformattedDate = req.body.date;
    var due_date = new Date(due_UnformattedDate);

    var project = req.body.project;

    if(due_UnformattedDate == ""){
        Task.findOneAndUpdate({ "_id": new ObjectId(id) }, { $set: { title: title, description: description, assigned_user: assigned_user, project: project, status : status } },{new: true}, function(err, doc){
            if (err) {
                console.log('Error Updating User', err);
                res.status(500).json(err);
            } else {
                res.status(200).json(doc);
            }
        });
    }else{
        Task.findOneAndUpdate({ "_id": new ObjectId(id) }, { $set: { title: title, description: description, assigned_user: assigned_user, due_date: due_date, project: project, status : status } },{new: true}, function(err, doc){
            if (err) {
                console.log('Error Updating User', err);
                res.status(500).json(err);
            } else {
                res.status(200).json(doc);
            }
        });
    }
}

/**
 * @param req
 * @param res
 */
exports.Test = function (req, res) {
    res.status(200).json({tasks: "test"})
}