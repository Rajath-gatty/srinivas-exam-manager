const db = require('../db');

exports.getTimetables = async(req,res) => {
        const deptId = req.deptId;
        const sql = `select course_name,t_id,semester,count(subj_name) as total_subjects,date_format(convert_tz(created_at,@@session.time_zone,'+05:30'),'%d %b %Y %l:%i %p') created_at,status from timetable join course on timetable.course_id=course.course_id where timetable.dept_id=${deptId} and timetable.status='pending' group by t_id;`;
        try {
            const result = await db.execute(sql);
            res.status(200).send(result[0]);
        } catch(err) {
            console.log(err);
            res.status(500).send({success:false})
        }
}

exports.getTimetableDetails = async(req,res) => {
        const deptId = req.deptId;
        const tId = req.params.tId;
        const sql = `select subj_name,subj_code,exam_date,exam_time from timetable join course on timetable.course_id=course.course_id where timetable.dept_id=${deptId} and t_id='${tId}' order by exam_date`;
        try {
            const result = await db.execute(sql);
            res.status(200).send(result[0]);
        } catch(err) {
            console.log(err);
            res.status(500).send({success:false})
        }
}

exports.postApproveTimetable = async(req,res) => {
    const deptId = req.deptId;
    const tId = req.params.tId;
    const sql = `update timetable set status='approved' where dept_id=${deptId} and t_id='${tId}'`;
    try {
        const result = await db.execute(sql);
        res.status(200).send(result[0]);
    } catch(err) {
        console.log(err);
        res.status(500).send({success:false})
    }
}

exports.postRejectTimetable = async(req,res) => {
    const deptId = req.deptId;
    const tId = req.params.tId;
    const sql = `update timetable set status='rejected' where dept_id=${deptId} and t_id='${tId}'`;
    try {
        const result = await db.execute(sql);
        res.status(200).send(result[0]);
    } catch(err) {
        console.log(err);
        res.status(500).send({success:false})
    }
}

