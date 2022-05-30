const {validationResult} = require('express-validator');

exports.postStudent = (req, res) => {
    const data = req.body;
    const err = validationResult(req).errors;
    if(err.length>0) {
       return res.status(400).send({sucess:false,err});
    }
    res.status(200).send(data);
}

exports.postFaculty = (req, res) => {
    const data = req.body;
    const err = validationResult(req).errors;
    if(err.length>0) {
       return res.status(400).send({sucess:false,err});
    }
    res.status(200).send(data);
}

exports.postStaff = (req, res) => {
    const data = req.body;
    const err = validationResult(req).errors;
    if(err.length>0) {
       return res.status(400).send({sucess:false,err});
    }
    res.status(200).send(data);
}
