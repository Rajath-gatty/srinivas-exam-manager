import "./Dashboard.css";
import {SrinivasLogo, SEMSLogo, Chancellor} from "../../Assets"
import {BsGlobe, BsInstagram, BsLinkedin, BsGithub} from "react-icons/bs"
import {FaFacebook, FaTwitter, FaYoutube} from "react-icons/fa"
// import {SiGooglescholar} from "react-icons/si"
import { useContextData } from "../../hooks/useContextData"

// import SuperDash from "../../components/Dashboard/SuperDash"
import AdminDash from "../../components/Dashboard/AdminDash"
// import CoordDash from "../../components/Dashboard/CoordDash"
// import StaffDash from "../../components/Dashboard/StaffDash"
// import FacultyDash from "../../components/Dashboard/FacultyDash"
// import StudentDash from "../../components/Dashboard/StudentDash"

const Dashboard = () => {
  const { role } = useContextData();
  return (
    <div className='dashboard-container flex'>
      <div className="dashboard-header flex">
        <img src={SrinivasLogo} alt="SIMSLogo" width="60px" height="auto" />
        <h1>SRINIVAS UNIVERSITY</h1>
      </div>

      {role === 'admin' || role === 'staff' || role === 'faculty' ? <AdminDash/> : null }

      {/* {role === 'superadmin' ? <SuperDash/> :
      role === 'examcoord' ? <CoordDash/> :
      role === 'admin' || role === 'staff' || role === 'faculty' ? <AdminDash/> 
      : <StudentDash/>} */}

      <div className="dashboard-AboutTitle">About Srinivas University</div>
      <div className="dashboard-suInfo flex">
        <img src={SEMSLogo} alt="SEMSLogo" width="100px" height="auto" />
        <p><span></span> Srinivas University, Mangalore, is a Private Research and skill focused University in Mangalore, Karnataka, India established in 2013 by Karnataka State Act. Srinivas University is the flagship of 18 Srinivas Group of Institutions started by A.Shama Rao Foundation, Mangalore, India, a private Charitable Trust founded in 1988 by an Eminent Chartered Accountant A.Raghavendra Rao. A.Shama Rao Foundation has started many professional colleges in Mangalore which include Srinivas Institute of Medical Sciences and Research Center, Srinivas Institute of Dental Sciences, Srinivas Institute of Technology, Srinivas College of Pharmacy, Srinivas Institute of Nursing Sciences, A Shama Rao Nursing School, Srinivas Integrated Campus, Srinivas College of Hotel Management, Vijayalakshmi Institute of Hospitality Sciences, Srinivas First Grade College, Srinivas School of Engineering, Srinivas Institute of Management Studies, Srinivas College of Physiotherapy, Srinivas School of Business, Srinivas School of Management, Srinivas College of Education, Srinivas Institute of Social Work.</p>
      </div>
      
      <div className="dashboard-chancellor flex">
        <img src={Chancellor} alt="SEMSLogo" width="120px" height="auto" />
        <p><span className="chancellor-name">Shri Dr. CA. Raghavendra Rao</span> <br />
          <span className="chancellor-post">Chancellor of Srinivas University</span> <br /><br />
          <span className="para-gap"></span> "My aim is to transform Society through education by setting up academic institutions in dynamic equilibrium with its social, ecological and economic environment striving continuously for excellence in education, research and technological service to the nation."</p>
      </div>

      <div className="dashboard-footer flex">
        <div className="footer-section flex">
          <div className="dashboard-footerLeft">
            <div className="footer-logo flex">
              <img src={SrinivasLogo} alt="SIMSLogo" width="80px" height="auto" />
              <div className="footer-details">
                <h3>SRINIVAS UNIVERSITY</h3>
                <p><span>Address : </span><br />
                  &emsp; VR3R+78H, SRINIVAS UNIVERSITY CITY CAMPUS,
                  Pandeshwar, Mangaluru, Karnataka 575001
                </p>
                <p><span>Phone : </span><br />&emsp; 0824 244 1022</p>
              </div>
            </div>

            <div className="footer-links flex">
              <a id="web" href='https://srinivasuniversity.edu.in/' target="_blank" rel="noopener noreferrer" title="Website"><BsGlobe size={20}/></a>
              <a id="fb" href='https://www.facebook.com/srinivasuniversityofficial' target="_blank" rel="noopener noreferrer" title="Facebook"><FaFacebook size={20}/></a>
              <a id="twt" href='https://twitter.com/SrinivasGroup' target="_blank" rel="noopener noreferrer" title="Twitter"><FaTwitter size={20}/></a>
              <a id="inst" href='https://www.instagram.com/srinivas.university/' target="_blank" rel="noopener noreferrer" title="Instagram"><BsInstagram size={20}/></a>
              <a id="lnkin" href='https://www.linkedin.com/in/srinivasgroup/' target="_blank" rel="noopener noreferrer" title="LinkedIn"><BsLinkedin size={20}/></a>
              <a id="yt" href='https://www.youtube.com/channel/UCaCiqp52mEfnA9BG0RA8wcA/featured' target="_blank" rel="noopener noreferrer" title="Youtube"><FaYoutube size={20}/></a>
            </div>
          </div>

          <div className="dashboard-footerRight">
              <h3>Developed By:</h3>
            <div className="footer-devs">
              <a href='https://github.com/ChiragChrg' target="_blank" rel="noopener noreferrer"> <BsGithub/> Chirag</a>
              <a href='https://github.com/Rajath-gatty' target="_blank" rel="noopener noreferrer"> <BsGithub/> Rajath Gatty</a>
              <a href='https://github.com/naveej' target="_blank" rel="noopener noreferrer"> <BsGithub/> V Jeevan Kumar</a>
              <a href='https://github.com/siddharthkm121' target="_blank" rel="noopener noreferrer"> <BsGithub/> Siddharth KM</a>
            </div>

            {/* <div className="footer-guide">
              <h3>Under the Guidance of:</h3>
              <a href='https://scholar.google.co.in/citations?user=7XbB_3EAAAAJ&hl=en' target="_blank" rel="noopener noreferrer" className='DevName'> <SiGooglescholar/> Prof. Shridhar Acharya P</a>
            </div> */}
          </div>
        </div>

        <p className="footer-copyright">&copy; 2022 Srinivas University</p>
      </div>
    </div>
  )
}

export default Dashboard