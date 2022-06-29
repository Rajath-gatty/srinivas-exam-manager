const AttendanceStudentList = ({item}) => {
    return (
        <tr className="attendance-table">
            <td>{item.subj_name}</td>
            <td>{item.subj_code}</td>
            <td>{item.marks}</td>
            <td>{item.attendence}</td>
        </tr>

    )
}

export default AttendanceStudentList;