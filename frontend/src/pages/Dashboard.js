import {useLocation} from "react-router-dom";

const Dashboard = () => {
  console.log(window.location.pathname);

  const {state} = useLocation();
  console.log(state);

  return (
    <>
    <h1>Dashboard</h1>
      {/* <TextInput label="Username" placeholder="Enter First Name" />
      <TextInput label="Password" placeholder="Enter Pass " /> */}
      
    </>
    );
};

export default Dashboard;
