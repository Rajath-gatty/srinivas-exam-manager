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

import Register from "./components/Sidebar/Register";
import Create from "./components/Sidebar/Create";
import Users from "./components/Sidebar/Users";

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
            <Route path="/registration" element={<Registration />} />
            <Route path="/registration/student" element={<Student />} />
            <Route path="/registration/faculty" element={<Faculty />} />
            <Route path="/registration/staff" element={<Staff />} />
            <Route path="/registration/evaluator" element={<Evaluator />} />

        {/* Protected Routes */}
            {/* Sub Admin Routes */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/register" element={<Register />} />
            <Route path="/create" element={<Create />} />
            <Route path="/users" element={<Users />} />

            {/* Page Not Found Route */}
            <Route path="*" element={<PageNotFound/>}></Route>
          </Routes>
        </Browser>
      </div>
    </ThemeProvider>
  );
}

export default App;
