import "./Course.css"

const Course = () => {
  return (
    <div className="course-main">
      <div className="course-search-wrapper">
        <form>
          <input type="text" />
        </form>
        <button className="btn">
          Create
        </button>
      </div>
      <table className="course-list-table">
        <thead>
          <tr>
            <th>Course</th>
            <th>Duration</th>
            <th>Semesters</th>
          </tr>
        </thead>
        <tbody>
        
        </tbody>
      </table>
    </div>

  );
};

export default Course;
