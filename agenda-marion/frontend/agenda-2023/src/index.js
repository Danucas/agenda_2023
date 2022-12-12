import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Year from "./pages/Year/Year";
import Cover from './pages/Cover/Cover';
import Month from "./pages/Month/Month";
import Day from "./pages/Day/Day.js";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes path="/">
        <Route index element={<Cover></Cover>}></Route>
        <Route path="calendar" element={<Year></Year>}></Route>
        <Route path="month" element={<Month></Month>}></Route>
        <Route path="day" element={<Day></Day>}></Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
