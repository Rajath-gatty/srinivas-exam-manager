import React, { useState } from "react";

export const Context = React.createContext();

const state = {
  isAuth: true,
  role: "student",
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