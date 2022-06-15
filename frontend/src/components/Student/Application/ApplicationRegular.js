import { Checkbox } from "@mui/material";
import "./Application.css";
import { Link } from "react-router-dom";

const ApplicationRegular = () => {
  return (
    <div className="application-regular flex">
      <h2>Current Semester</h2>
      <div className="application-semester">SEM II</div>

      <div className="application-form flex">
        <div className="application-row header">
          <span>Subject Name</span>
          <span>Subject Code</span>
        </div>
        <div className="application-row">
          <div className="subject-checkbox">
            <Checkbox value="HTML" disabled checked /> <span>HTML</span>
          </div>
          <span>19BCASD55</span>
        </div>
        <div className="application-row">
          <div className="subject-checkbox">
            <Checkbox value="CSS" disabled checked /> <span>CSS</span>
          </div>
          <span>19BCASD56</span>
        </div>
        <div className="application-row">
          <div className="subject-checkbox">
            <Checkbox value="React" disabled checked /> <span>React</span>
          </div>
          <span>19BCASD57</span>
        </div>
        <div className="application-row">
          <div className="subject-checkbox">
            <Checkbox value="Node.js" disabled checked /> <span>Node.js</span>
          </div>
          <span>19BCASD58</span>
        </div>
        <div className="application-row">
          <div className="subject-checkbox">
            <Checkbox value="OS" disabled checked /> <span>OS</span>
          </div>
          <span>19BCASD59</span>
        </div>
        <div className="application-row">
          <div className="subject-checkbox">
            <Checkbox value="AI" disabled checked /> <span>AI</span>
          </div>
          <span>19BCASD60</span>
        </div>
        <div className="application-row">
          <div className="subject-checkbox">
            <Checkbox value="SE" disabled checked /> <span>SE</span>
          </div>
          <span>19BCASD61</span>
        </div>
        <div className="application-row">
          <div className="subject-checkbox">
            <Checkbox value="Java" disabled checked /> <span>Java</span>
          </div>
          <span>19BCASD62</span>
        </div>
      </div>

      <div className="application-total">
        <span>Total Amount</span> <span>Rs.1600</span>
      </div>
      <Link to="/application/regular/payment">
        <button className="application-submit">Apply</button>
      </Link>
    </div>
  );
};

export default ApplicationRegular;
