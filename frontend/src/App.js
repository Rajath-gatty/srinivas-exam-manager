import './App.css';
import {
  BrowserRouter as Browser,
  Routes,
  Route
} from "react-router-dom";

import Login from './pages/Login/Login';
import Dashboard from "./pages/Dashboard";
import Registration from "./pages/Registration/Registration";
import Student from "./pages/Registration/Student";
import Faculty from "./pages/Registration/Faculty";
import Staff from "./pages/Registration/Staff";
import Evaluator from "./pages/Registration/Evaluator";

function App() {
  return (
    <div className="App">
     <Browser>
       <Routes>
         <Route path='/' element={<Login/>}/>
         <Route path='/dashboard' element={<Dashboard/>}/>
         <Route path='/registration' element={<Registration/>}/>
         <Route path='/registration/student' element={<Student/>}/>
         <Route path='/registration/faculty' element={<Faculty/>}/>
         <Route path='/registration/staff' element={<Staff/>}/>
         <Route path='/registration/evaluator' element={<Evaluator/>}/>

         {/* <Route path="/" element={<Navigate replace to="/login"/>}/> */}
       </Routes>
     </Browser>
    </div>
  );
} 

export default App;
