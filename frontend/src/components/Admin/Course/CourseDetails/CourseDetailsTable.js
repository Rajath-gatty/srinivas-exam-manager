
const  CourseDetailsTable = () => {
     return(
         <div className="course-details-table">
             <p>SEM 2</p>
            <table className="course-details-list-table">
            <thead>
            <tr>
                <th>Subject Name</th>
                <th>Subject Code</th>
            </tr>
            </thead>
            <tbody>
                <tr>
                    <td>HTML</td>
                    <td>19BCASD34</td>
                </tr>
                <tr>
                    <td>C++</td>
                    <td>19BCASD34</td>
                </tr>
                <tr>
                    <td>Java</td>
                    <td>19BCASD34</td>
                </tr>
                <tr>
                    <td>Python</td>
                    <td>19BCASD34</td>
                </tr>
                <tr>
                    <td>DataStructures</td>
                    <td>19BCASD34</td>
                </tr>
            </tbody>
        </table>
    </div>
     )
}

export default CourseDetailsTable;