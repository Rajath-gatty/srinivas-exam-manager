import React, { useState } from "react";

export const Context = React.createContext();

const ContextProvider = (props) => {
  // const [serverUrl] = useState('https://exam-manager-backend.herokuapp.com');
  // const [serverUrl] = useState('http://localhost:8080');
  const [role, setRole] = useState('');
  const [user, setUser] = useState({});
  const [token, setToken] = useState('');
  
  return (
    <Context.Provider
      value={{
        token,
        setToken,
        role,
        setRole,
        user,
        setUser,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export default ContextProvider;