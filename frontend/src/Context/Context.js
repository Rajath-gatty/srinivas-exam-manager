import React, { useState } from "react";

export const Context = React.createContext();

const state = {
  isAuth: true,
<<<<<<< HEAD
  role: "admin",
=======
  role: "faculty",
>>>>>>> 5f1d3b5f812950d687627bb19d2dd0c1b038585d
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