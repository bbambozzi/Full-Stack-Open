import React , {useState} from "react";
import ReactDOM from 'react-dom/client'
import App from './App'

let counter = 0;
ReactDOM.createRoot(document.getElementById('root')).render(
    <App counter={counter}/>
);


