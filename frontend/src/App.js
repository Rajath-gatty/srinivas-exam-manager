import "./App.css";
import "./pages/Registration/Registration.css";

import { BrowserRouter as Browser, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import Registration from "./pages/Registration/Registration";
import Student from "./pages/Registration/Student";
import Faculty from "./pages/Registration/Faculty";
import Staff from "./pages/Registration/Staff";
import Evaluator from "./pages/Registration/Evaluator";

import ProtectedRoute from "./components/ProtectedRoute";

import Register from "./components/Sidebar/Register";
import Courses from "./components/Sidebar/Courses";
import TimeTable from "./components/Sidebar/TimeTable";
import Layout from "./components/Layout";

function App() {
  //MUI Components Fonts
  const theme = createTheme({
    typography: {
      fontFamily: ["Lato"].join(","),
    },
  });
  //MUI Components Fonts[/]

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Browser>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Login />} />
            <Route path="registration" element={<Registration />} />
            <Route path="registration/student" element={<Student />} />
            <Route path="registration/faculty" element={<Faculty />} />
            <Route path="registration/staff" element={<Staff />} />
            <Route path="registration/evaluator" element={<Evaluator />} />

            <Route element={<Layout/>}>
                {/* Admin Access */}
                <Route element={<ProtectedRoute allowedRole={['admin']} />}>
                    <Route path="register" element={<Register />} />
                    <Route path="courses" element={<Courses />} />
                    <Route path="timetable" element={<TimeTable />} />
                </Route>

                {/* Staff Access*/}
                <Route element={<ProtectedRoute allowedRole={['staff']}/>}>
                    <Route path="approve/student" element={<TimeTable />} />
                    <Route path="approve/faculty" element={<TimeTable />} />
                    <Route path="approve/staff" element={<TimeTable />} />
                    <Route path="approve/evaluator" element={<TimeTable />} />
                </Route>

                {/* Admin and Staff Access */}
                <Route element={<ProtectedRoute allowedRole={['admin','staff']}/>}>
                    <Route path="users/student" element={<TimeTable />} />
                    <Route path="users/faculty" element={<TimeTable />} />
                    <Route path="users/staff" element={<TimeTable />} />
                    <Route path="users/evaluator" element={<TimeTable />} />
                </Route>

                {/*Common Protected Routes */}
                <Route element={<ProtectedRoute allowedRole={["admin", "student", "staff"]} />}>
                  <Route path="/dashboard" element={<Dashboard />} />
                </Route>
            </Route>
            {/* Page Not Found Route */}
            <Route path="*" element={<PageNotFound />}></Route>
          </Routes>
        </Browser>
      </div>
    </ThemeProvider>
  );
}

export default App;
