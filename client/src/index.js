import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Navbar from './Navbar';
import reportWebVitals from './reportWebVitals';
// import MyGroupsGrid from './MyGroupsGrid';
// import CreateAGroup from './CreateAGroup';
import App from './App';
import { HashRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HashRouter>
      <Navbar />
      <App />
    </HashRouter>
    {/* <ScheduleSS /> */}
    {/* <CreateAGroup />
    <MyGroupsGrid /> */}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
