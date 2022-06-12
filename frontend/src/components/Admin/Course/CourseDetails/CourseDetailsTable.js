
const  CourseDetailsTable = (props) => {
    const {sem} = props;
    const data = sem.value;
    
     return(
         <div className="course-details-table">
             <p>{sem.semNo}</p>
            <table className="course-details-list-table">
            <thead>
            <tr>
                <th>Subject Name</th>
                <th>Subject Code</th>
            </tr>
            </thead>
            <tbody>
                {data.map(obj =>{
                    return(
                        <tr>
                            <td>{obj.subj_name}</td>
                            <td>{obj.subj_code}</td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    </div>
     )
}

export default CourseDetailsTable;