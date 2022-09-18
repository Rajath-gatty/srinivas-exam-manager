import React from 'react';
import * as ReactDOMClient from "react-dom/client";
import App from './App';
import ContextProvider from "./Context/Context";
import axios from "axios";

axios.defaults.baseURL = 'https://exam-manager-backend.herokuapp.com';
// axios.defaults.baseURL = 'http://localhost:8080';

const rootElement = document.getElementById("root");
const root = ReactDOMClient.createRoot(rootElement);

root.render(<ContextProvider><App /></ContextProvider>);