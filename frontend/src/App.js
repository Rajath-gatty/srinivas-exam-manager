import "./App.css";
import "./pages/Registration/Registration.css";

import { BrowserRouter as Browser, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import React, { useState, useEffect } from "react";
import { useContextData } from "./hooks/useContextData";

import Login from "./pages/Login/Login";
import SpecialLogin from "./pages/Login/SpecialLogin";
import ForgotPassword from "./pages/Login/ForgotPassword/ForgotPassword";
import ResetPassword from "./pages/Login/ForgotPassword/ResetPassword";

import Dashboard from "./pages/Dashboard/Dashboard";
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
import SemesterMarks from "./components/Faculty/SemesterMarks/SemesterMarks";
import SemesterList from "./components/Faculty/SemesterMarks/SemesterList";

// import IndentRegular from "./components/Staff/Indent/IndentRegular";
// import IndentRepeater from "./components/Staff/Indent/IndentRepeater";
import PaymentsRegular from "./components/Staff/Payments/PaymentsRegular/PaymentsRegular";
// import PaymentsRepeater from "./components/Staff/Payments/PaymentsRepeater/PaymentsRepeater";
import ApplicationRegular from "./components/Student/Application/ApplicationRegular";
import ApplicationRepeater from "./components/Student/Application/ApplicationRepeater";
// import Promote from "./components/Staff/Promote/Promote";

import Profile from "./pages/Profile/Profile";
import PaymentsRegularApproval from "./components/Staff/Payments/PaymentsRegular/PaymentsRegularApproval";
import PaymentsRegularApproved from "./components/Staff/Payments/PaymentsRegular/PaymentsRegularApproved";
import Coding from "./components/Evaluator/Coding/Coding";

import ExamAttendance from "./components/Staff/ExamAttendance/ExamAttendance";
import AttendanceStatement from "./components/Evaluator/AttendanceStatement/AttendanceStatement";
import Evaluators from "./components/Evaluator/Evaluators/Evaluators";
import ExamcordTimeTable from "./components/Evaluator/ExamcordTimeTable/ExamcordTimeTable";
import StudentTimeTable from "./components/Student/StudentTimeTable/StudentTimeTable";
import AssignFaculty from "./components/Evaluator/Evaluators/AssignFaculty/AssignFaculty";

import Departments from "./components/AdminSuper/Departments/Departments";
import NewDepartment from "./components/AdminSuper/Departments/NewDepartment/NewDepartment";

import ExamCoordinator from "./components/AdminSuper/Examcoordinator/ExamCoordinator";
import NewExamCoordinator from "./components/AdminSuper/Examcoordinator/NewCoordinator/NewCoordinator";
import FacultySubjects from "./components/Staff/FacultySubjects/FacultySubjects";
import Classroom from "./components/Users/Classroom/Classroom";
import StudentUsers from "./components/Users/Classroom/StudentUsers";
import CreateClass from "./components/Users/Classroom/Create/Create";
import CodingSheet from "./components/Admin/CodingSheet/CodingSheet";
import SemMarkDisplay from "./components/Faculty/SemesterMarks/SemMarkDisplay";

import axios from "axios";
import { CircularProgress } from "@mui/material";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Pwa from "./util/Pwa";

function App() {
  const { setRole, setUser, setToken, token } = useContextData();

  const [loading, setLoading] = useState(true);
  axios.defaults.headers.common['Authorization'] = token;

  //MUI Components Fonts
  const theme = createTheme({
    typography: {
      fontFamily: ["Lato"].join(","),
    },
  });
  //MUI Components Fonts[/]

  //Check previous login credentials
  useEffect(() => {
    let prevUser = localStorage.getItem("user");
    prevUser = JSON.parse(prevUser);

    if (prevUser) {
      setToken(prevUser.token);
      setRole(prevUser.user.role);
      setUser(prevUser.user);
      setLoading(false);
    }
    setLoading(false);
    Pwa();
  }, [setToken, setRole, setUser])


  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Browser>
          <Routes>
            {/* Public Routes */}
            {!loading && <Route path="/login" element={!token ? <Login /> : <Navigate to="/" />} />}\
            <Route path="/special" element={!token ? <SpecialLogin /> : <Navigate to="/" />} />
            <Route path="registration" element={!token ? <Registration /> : <Navigate to="/" />} />
            <Route path="registration/student" element={!token ? <Student /> : <Navigate to="/" />} />
            <Route path="registration/faculty" element={!token ? <Faculty /> : <Navigate to="/" />} />
            <Route path="registration/staff" element={!token ? <Staff /> : <Navigate to="/" />} />
            <Route path="forgotpassword" element={!token ? <ForgotPassword /> : <Navigate to="/" />} />
            <Route path="reset-password/:resetId" element={<ResetPassword />} />

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
                <Route path="approve/staff" element={<Approval type="staff" />} />
                <Route
                  path="approve/staff/:id"
                  element={<ApprovalDetailsView />}
                />
                <Route path="users/examcoordinator" element={<TotalUsers type="examcoordinator" />} />
                <Route path="users/examcoordinator/:userId" element={<UserDetails />} />
                <Route path="codingsheet" element={<CodingSheet />} />
              </Route>

              {/* Staff Access*/}
              <Route element={<ProtectedRoute allowedRole={["staff"]} />}>
                <Route path="approve/student" element={<Approval type="student" />} />
                <Route path="approve/faculty" element={<Approval type="faculty" />} />
                <Route
                  path="approve/student/:id"
                  element={<UserDetails />}
                />
                <Route
                  path="approve/faculty/:id"
                  element={<UserDetails />}
                />
                {/* <Route path="indent/regular" element={<IndentRegular />} />
                <Route path="indent/repeater" element={<IndentRepeater />} /> */}
                <Route path="payments/regular" element={<PaymentsRegular type="regular"/>}>
                  <Route path="pending" element={<PaymentsRegularApproval type="regular"/>} />
                  <Route
                    path="approved"
                    element={<PaymentsRegularApproved type="regular"/>}
                  />
                </Route>
                <Route path="payments/repeater" element={<PaymentsRegular type="repeater"/>}>
                  <Route
                    path="pending"
                    element={<PaymentsRegularApproval type="repeater"/>}
                  />
                  <Route
                    path="approved"
                    element={<PaymentsRegularApproved type="repeater"/>}
                  />
                </Route>
                <Route path="/exam-attendance" element={<ExamAttendance />} />
                {/* <Route path="/promote" element={<Promote />} /> */}
              </Route>

              {/* Faculty Access*/}
              <Route element={<ProtectedRoute allowedRole={["faculty"]} />}>
                <Route path="semester" element={<SemesterList />} />
                <Route path="semester/new" element={<SemesterMarks />} />
                <Route path="semester/marks/:id" element={<SemMarkDisplay/>}/>
                {/* <Route path="/classrooms/create" element={<CreateClass />} /> */}
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
                <Route path="/studenttimetable" element={<StudentTimeTable />} />
              </Route>

              {/* Faculty and Student access*/}
              <Route
                element={
                  <ProtectedRoute allowedRole={["student", "faculty"]} />
                }
              >
                <Route
                  path="dashboard"
                  element={<Dashboard />}
                />
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
                {/* <Route path="users/student" element={<TotalUsers type="student" />} /> */}
                <Route path="users/faculty" element={<TotalUsers type="faculty" />} />
                <Route path="users/staff" element={<TotalUsers type="staff" />} />

                {/* <Route path="users/student/:userId" element={<UserDetails />} /> */}
                <Route path="users/faculty/:userId" element={<UserDetails />} />
                <Route path="users/staff/:userId" element={<UserDetails />} />
                <Route path="/users/faculty/subjects/:facultyId" element={<FacultySubjects />} />
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
                <Route path="/examcordtimetable" element={<ExamcordTimeTable />} />
              </Route>
              
              {/* Admin and Staff and Faculty Access */}
              <Route element={<ProtectedRoute allowedRole={["admin", "staff", "faculty"]} />}>
                <Route path="/classrooms" element={<Classroom />} />
                <Route path="/classrooms/student" element={<StudentUsers />} />
                <Route path="/classrooms/student/:userId" element={<UserDetails />} />
                <Route path="/classrooms/create" element={<CreateClass />} />
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
                <Route path="/" element={token ? <Dashboard /> : <Navigate to="/login" />} />
                <Route path="/profile" element={token ? <Profile /> : <Navigate to="/login" />} />
              </Route>
            </Route>

            {/* Page Not Found Route */}
            <Route path="*" element={!loading ? <PageNotFound /> : <div style={{ height: '90v',marginTop:250 }} className="flex"><CircularProgress size={80} /></div>}></Route>
          </Routes>
        </Browser>

        <ToastContainer
          position="bottom-center"
          autoClose={3000}
          hideProgressBar
          closeOnClick
          pauseOnFocusLoss
          draggable
          pauseOnHover
          limit={3}
        />
      </div>
    </ThemeProvider>
  );
}

export default App;
