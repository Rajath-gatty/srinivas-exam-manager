import './App.css';
import {
  BrowserRouter as Browser,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import Login from './pages/Login';
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <div className="App">
     <Browser>
       <Routes>
         <Route path='/' exact element={<Login/>}></Route>
         <Route path='/dashboard' exact element={<Dashboard/>}></Route>
         <Route path='/registration' exact element={<Login/>}></Route>
         <Route path='/registration/student' exact element={<Login/>}></Route>
         <Route path='/registration/faculty' exact element={<Login/>}></Route>
         <Route path='/registration/staff' exact element={<Login/>}></Route>
         <Route path='/registration/evaluator' exact element={<Login/>}></Route>

         {/* <Route path="/" element={<Navigate replace to="/login"/>}/> */}
       </Routes>
     </Browser>
    </div>
  );
}

export default App;
