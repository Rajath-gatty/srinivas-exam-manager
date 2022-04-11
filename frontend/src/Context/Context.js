import React from "react";

export const Context = React.createContext();

const state = {
    isAuth: true,
    role: 'admin'
}

const ContextProvider = (props) => {
    return <Context.Provider value={{
        ...state
    }}>
        {props.children}
    </Context.Provider>
}

export default ContextProvider;