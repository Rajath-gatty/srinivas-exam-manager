import "./App.css";
import "./pages/Registration/Registration.css";

import { BrowserRouter as Browser, Routes, Route,Navigate} from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import React,{useState,useEffect} from "react";
import {useContextData} from "./hooks/useContextData";

import Login from "./pages/Login/Login";
import SpecialLogin from "./pages/Login/SpecialLogin";

import Dashboard from "./pages/Dashboard";
import Attendance from "./pages/Attendance";
import TimeTable from "./pages/TimeTable";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import Registration from "./pages/Registration/Registration";
import Student from "./pages/Registration/Student";
import Faculty from "./pages/Registration/Faculty";
import Staff from "./pages/Registration/Staff";

import ProtectedRoute from "./components/ProtectedRoute";

import Courses from "./components/Admin/Course/Course";
import Layout from "./components/Layout";
import Approval from "./components/Approval/Approval";
import ApprovalDetailsView from "./components/Approval/ApprovalDetailsView";
import TotalUsers from "./components/Users/TotalUsers";
import UserDetails from "./components/Users/UserDetails/UserDetails";
import Create from "./components/Admin/Course/Create/Create";
import CourseDetails from "./components/Admin/Course/CourseDetails/CourseDetails";
import InternalMarks from "./components/Faculty/InternalMarks/InternalMark";
import SemesterMarks from "./components/Faculty/SemesterMarks/SemesterMarks";
import IndentRegular from "./components/Staff/Indent/IndentRegular";
import IndentRepeater from "./components/Staff/Indent/IndentRepeater";
import PaymentsRegular from "./components/Staff/Payments/PaymentsRegular/PaymentsRegular";
import PaymentsRepeater from "./components/Staff/Payments/PaymentsRepeater/PaymentsRepeater";
import ApplicationRegular from "./components/Student/Application/ApplicationRegular";
import ApplicationRepeater from "./components/Student/Application/ApplicationRepeater";
import Promote from "./components/Staff/Promote/Promote";

import Profile from "./pages/Profile/Profile";
import PaymentsRegularApproval from "./components/Staff/Payments/PaymentsRegular/PaymentsRegularApproval";
import PaymentsRegularApproved from "./components/Staff/Payments/PaymentsRegular/PaymentsRegularApproved";
import PaymentsRepeaterApproval from "./components/Staff/Payments/PaymentsRepeater/PaymentsRepeaterApproval";
import PaymentsRepeaterApproved from "./components/Staff/Payments/PaymentsRepeater/PaymentsRepeaterApproved";
import Coding from "./components/Evaluator/Coding/Coding";


import ExamAttendance from "./components/Staff/ExamAttendance/ExamAttendance";
import AttendanceStatement from "./components/Evaluator/AttendanceStatement/AttendanceStatement";
import Evaluators from "./components/Evaluator/Evaluators/Evaluators";
import AssignFaculty from "./components/Evaluator/Evaluators/AssignFaculty/AssignFaculty";
import PaymentRegular from "./components/Student/Application/Payment/Payment";


import Departments from "./components/AdminSuper/Departments/Departments";
import NewDepartment from "./components/AdminSuper/Departments/NewDepartment/NewDepartment";

import ExamCoordinator from "./components/AdminSuper/Examcoordinator/ExamCoordinator";
import NewExamCoordinator from "./components/AdminSuper/Examcoordinator/NewCoordinator/NewCoordinator";
import { CircularProgress } from "@mui/material";
import axios from "axios";

function App() {
  const {setRole,setUser,setToken,token} = useContextData();
  const [loading, setLoading] = useState(true);

  axios.defaults.headers.common['Authorization'] = token;
  //MUI Components Fonts
  const theme = createTheme({
    typography: {
      fontFamily: ["Lato"].join(","),
    },
  });
  //MUI Components Fonts[/]

  useEffect(() => {
    let prevUser = localStorage.getItem("user");
    prevUser = JSON.parse(prevUser);

    if(prevUser) {
      setToken(prevUser.token);
      setRole(prevUser.user.role);
      setUser(prevUser.user);
      setLoading(false);
    }
    setLoading(false);
  }, [setToken,setRole,setUser])

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Browser>
          <Routes>
            {/* Public Routes */}
            {!loading &&<Route path="/login" element={!token?<Login />:<Navigate to="/"/>}/>}
            {/* {!token&&<Route path="/login" element={<Login />}/>} */}
            {/* <Route element={<Layout />}><Route path="/" element={<Dashboard/>}/></Route>} */}
            {/* <Route path="/login" element={!token?<Login/>:<Navigate to="/dashboard"/>} /> */}
            <Route path="/special" element={!token?<SpecialLogin />:<Navigate to="/"/>} />
            <Route path="registration" element={!token?<Registration />:<Navigate to="/"/>} />
            <Route path="registration/student" element={!token?<Student />:<Navigate to="/"/>} />
            <Route path="registration/faculty" element={!token?<Faculty />:<Navigate to="/"/>} />
            <Route path="registration/staff" element={!token?<Staff />:<Navigate to="/"/>} />

            <Route element={<Layout />}>
              {/* Super Admin Access */}
              <Route element={<ProtectedRoute allowedRole={["super admin"]} />}>
                <Route path="departments" element={<Departments />} />
                <Route path="departments/create" element={<NewDepartment />} />
                <Route path="examcoordinator" element={<ExamCoordinator />} />
                <Route path="examcoordinator/create" element={<NewExamCoordinator />} />
              </Route>

              {/* Admin Access */}
              <Route element={<ProtectedRoute allowedRole={["admin"]} />}>
                <Route path="courses" element={<Courses />} />
                <Route
                  path="courses/course-details/:courseId"
                  element={<CourseDetails />}
                />
                <Route path="courses/new-course" element={<Create />} />
                <Route path="approve/staff" element={<Approval type="staff"/>} />
                <Route
                  path="approve/staff/:id"
                  element={<ApprovalDetailsView />}
                />
                 <Route path="users/examcoordinator" element={<TotalUsers type="examcoordinator" />} />
              </Route>

              {/* Staff Access*/}
              <Route element={<ProtectedRoute allowedRole={["staff"]} />}>
                <Route path="approve/student" element={<Approval type="student" />} />
                <Route path="approve/faculty" element={<Approval type="faculty"/>} />
                <Route
                  path="approve/student/:id"
                  element={<ApprovalDetailsView />}
                />
                <Route
                  path="approve/faculty/:id"
                  element={<ApprovalDetailsView />}
                />
                <Route path="indent/regular" element={<IndentRegular />} />
                <Route path="indent/repeater" element={<IndentRepeater />} />
                <Route path="payments/regular" element={<PaymentsRegular />}>
                  <Route path="pending" element={<PaymentsRegularApproval />} />
                  <Route
                    path="approved"
                    element={<PaymentsRegularApproved />}
                  />
                </Route>
                <Route path="payments/repeater" element={<PaymentsRepeater />}>
                  <Route
                    path="pending"
                    element={<PaymentsRepeaterApproval />}
                  />
                  <Route
                    path="approved"
                    element={<PaymentsRepeaterApproved />}
                  />
                </Route>
                <Route path="/exam-attendance" element={<ExamAttendance />} />
                <Route path="/promote" element={<Promote />} />

              </Route>

              {/* Faculty Access*/}
              <Route element={<ProtectedRoute allowedRole={["faculty"]} />}>
                <Route path="internal" element={<InternalMarks />} />
                <Route path="semester" element={<SemesterMarks />} />
              </Route>

              {/* Student Access*/}
              <Route element={<ProtectedRoute allowedRole={["student"]} />}>
                <Route
                  path="application/regular"
                  element={<ApplicationRegular />}
                />
                <Route
                  path="application/repeater"
                  element={<ApplicationRepeater />}
                />

                <Route path="/application/regular/payment" element={<PaymentRegular />} />
                <Route path="/application/repeater/payment" element={<PaymentRegular />} />
              </Route>



              {/* Faculty and Student access*/}
              <Route
                element={
                  <ProtectedRoute allowedRole={["student", "faculty"]} />
                }
              >
                <Route path="attendance" element={<Attendance />} />
              </Route>

              {/*Admin, Student and Evaluator access*/}
              <Route
                element={
                  <ProtectedRoute
                    allowedRole={["student", "exam coord", "faculty", "admin"]}
                  />
                }
              >
                <Route path="timetable" element={<TimeTable />} />
              </Route>

              {/* Admin and Staff Access */}
              <Route
                element={<ProtectedRoute allowedRole={["admin", "staff"]} />}
              >
                <Route path="users/student" element={<TotalUsers type="student" />} />
                <Route path="users/faculty" element={<TotalUsers type="faculty" />} />
                <Route path="users/staff" element={<TotalUsers type="staff"/>} />

                <Route path="users/student/:userId" element={<UserDetails />} />
                <Route path="users/faculty/:userId" element={<UserDetails />} />
                <Route path="users/staff/:userId" element={<UserDetails />} />
              </Route>

              {/* Exam Coordinator Access */}
              <Route element={<ProtectedRoute allowedRole={["exam coord"]} />}>
                <Route path="coding" element={<Coding />} />
                <Route
                  path="/attendance-statement"
                  element={<AttendanceStatement />}
                />
                <Route path="/evaluators" element={<Evaluators />} />
                <Route path="/evaluators/assign" element={<AssignFaculty />} />
              
              </Route>

              {/*Common Protected Routes */}
              <Route
                element={
                  <ProtectedRoute
                    allowedRole={[
                      "super admin",
                      "admin",
                      "student",
                      "exam coord",
                      "faculty",
                      "staff",
                    ]}
                  />
                }
              >
                {/* {token?<Route path="/" element={<Dashboard />}/>:<Route path="/login" element={<Login/>}/>} */}
                {/* {token&&<Route path="/" element={<Dashboard />}/>} */}
                {/* <Route path="/" element={<Dashboard />}/> */}
                {/* <Route>{token?<Route path="/" element={<Dashboard/>}/>:<Route element={<Navigate to="/login"/>}/>}</Route> */}

                <Route path="/" element={token?<Dashboard />:<PageNotFound/>}/>
                <Route path="profile" element={<Profile />} />

                {/* Testing Route */}
                {/* <Route path="testing" element={<AnyTestComponent />} /> */}
              </Route>
            </Route>
            {/* Page Not Found Route */}
            <Route path="*" element={!loading?<PageNotFound />:<div style={{height:'90v'}} className="flex"><CircularProgress size={80}/></div>}></Route>
          </Routes>
        </Browser>
      </div>
    </ThemeProvider >
  );
}

export default App;
