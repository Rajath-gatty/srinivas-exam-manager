import React from 'react';
import * as ReactDOMClient from "react-dom/client";
import App from './App';
import ContextProvider from "./Context/Context";
import axios from "axios";

axios.defaults.baseURL = 'https://g4ywozov85.execute-api.ap-south-1.amazonaws.com/prod';
// axios.defaults.baseURL = 'http://localhost:8080';
//Backup url - 'https://srinivas-exam-manager.onrender.com';
const rootElement = document.getElementById("root");
const root = ReactDOMClient.createRoot(rootElement);

root.render(<ContextProvider><App /></ContextProvider>);
