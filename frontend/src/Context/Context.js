import React, { useState } from "react";

export const Context = React.createContext();

const state = {
  isAuth: true,
<<<<<<< HEAD
  role: "admin",
=======
  role: "faculty",
>>>>>>> 4a09352be1a5cf5014a8d1100f6acd49380f64e2
};

const ContextProvider = (props) => {
  const [approve, setApprove] = useState("");
  const [approveText, setApproveText] = useState("Approve");
  const [rejectText, setRejectText] = useState("Reject");

  return (
    <Context.Provider
      value={{
        ...state,
        approve,
        setApprove,
        approveText,
        setApproveText,
        rejectText,
        setRejectText,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export default ContextProvider;
