import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import App from './App';
import reportWebVitals from './reportWebVitals';
import Home from './home/Home';
import Scan from './scan/Scan';
import Token from './token/token';
import { BrowserRouter, Route, Routes } from 'react-router-dom'


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} ></Route>
        <Route path='/step1' element={<Scan />} ></Route>
        <Route path='/step2' element={<Scan />} ></Route>
        <Route path='/step3' element={<Token />} ></Route>
      </Routes>
    </BrowserRouter>
  )
}


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
