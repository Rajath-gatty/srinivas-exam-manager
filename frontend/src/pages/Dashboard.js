import {useLocation} from "react-router-dom";
import {TextInput, SelectInput} from "../components/Input";

const Dashboard = () => {
  console.log(window.location.pathname);

  const {state} = useLocation();
  console.log(state);

  return (
    <>
      <TextInput label="Username" placeholder="Enter First Name" />
      <TextInput label="Password" placeholder="Enter Pass " />
      
    </>
    );
};

export default Dashboard;
