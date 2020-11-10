const assert = require('assert');
const Course = require('../model').course;

module.exports = {
    readAll: (req, res) => {
        // to read all data
        Course.find((err, result) => {
            if (err) assert.deepStrictEqual(null, err);
            res.json(result);
        });
    },
    readSingle: (req, res) => {
        let id = req.params.id;
        Course.findById({_id: id}, (err, result) => {
            if (err) assert.deepStrictEqual(null, err);
            res.json(result);
        });
    },
    create: (req, res) => {
        // add new content to db
        let course = new Course(req.body);
        course.save().then(result => {
            res.status(200).json({code: 200, message: "Successfully saved"});
        }).catch(err => {
            let count = 0;
            switch (err.name) {
                case "ValidationError":
                    for (field in err.errors) {
                        //individual errors
                        if (count == 0) {
                            switch (err.errors[field].properties.type) {
                                case "invalid":
                                    count++;
                                    res.status(200).json({code: 401, message: "Invalid Format"});
                                    break;
                                case "unique":
                                    count++;
                                    res.status(200).json({code: 402, message: " Already Exists"});
                                    break;
                                case "user defined":
                                    count++;
                                    res.status(200).json({code: 401, message: "Invalid Format"});
                                    break;
                                case "required":
                                    count++;
                                    res.status(200).json({code: 201, message: "fields required"});
                                    break;
                                default:
                                    res.status(200).json({code: 500, message: err});
                            }
                        }
                    }
                    break;
                default:
                    res.status(200).json({code: 500, message: err});
                    break;
            }
        });
    },
    delete: (req, res) => {
        let id = req.params.id;
        Course.findByIdAndDelete({_id: id}, (err, result) => {
            if (err) {
                assert.deepStrictEqual(null, err);
                res.status(200).json({code: 301, message: "unable to delete"});
            } else {
                res.status(200).json({code: 200, message: "successfully deleted"});
            }
        })
    }
};
