
const  CourseDetailsTable = (props) => {
    const {sem} = props;
    const data = sem.value;
    
     return(
         <div className="course-details-table">
             <p>SEM {sem.semName}</p>
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
                        <tr key={Math.random()+Date.now()}>
                            <td>{obj.subName}</td>
                            <td>{obj.subCode}</td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    </div>
     )
}

export default CourseDetailsTable;