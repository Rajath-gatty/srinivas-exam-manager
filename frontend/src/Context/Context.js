import React, { useState } from "react";

export const Context = React.createContext();

const ContextProvider = (props) => {

  const [approve, setApprove] = useState("");
  const [approveText, setApproveText] = useState("Approve");
  const [rejectText, setRejectText] = useState("Reject");
  const [role,setRole] = useState('admin');

  return (
    <Context.Provider
      value={{
        role,
        setRole,
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