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
            res.status(200).json({code: 200, message: "successfully saved"});
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
                                    res.status(200).json({code: 401, message: "Invalid Foramt"});

                                    break;
                                case "unique":
                                    count++;
                                    res.status(200).json({code: 402, message: " Already Exists"});

                                    break;
                                case "user defined":
                                    count++;
                                    res.status(200).json({code: 401, message: "invalid format"});

                                    break;
                                case "required":
                                    count++;
                                    res.status(200).json({code: 201, message: "Fields Required"});

                                    break;
                                default :
                                    res.status(200).json({code: 500, message: err});


                            }
                        }
                    }
                    break;
                default:
                    res.status(200).json({code: 500, message: err});

            }
        });
    },
    update: (req, res) => {
        //update
        let id = req.params.id;
        let data = new Course(req.body);

        Course.findByIdAndUpdate({_id: id}, {
                cId: data.cID,
                title: data.title,
                fee: data.fee,
                duration: data.duration,
                desc: data.desc
            }, {upsert: true}, //id id exits it wil update the objec, if id doesn't exits it will crate a new object
            (err, result) => {
            if (err)
            {
                assert.deepStrictEqual(null,err);
                res.status(200).json({code :301,message : "unable to update"});
            }
            else
            {
                res.status(200).json({code :200,message: "successfully updated"});
            }

            });
    },
    delete: (req, res) => {
        let id = req.params.id;
        Course.findByIdAndDelete({_id : id},(err,result)=>{
            if (err)
            {
                assert.deepStrictEqual(null,err);
                res.status(200).json({code :301,message : "unable to delete"});
            }
            else
            {
                res.status(200).json({code :200,message: "successfully deleted"});
            }
        })
    }
};
