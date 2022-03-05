import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import {
  Layout
} from './App';
import links from './Utils/Routes';

ReactDOM.render(
  <Router>
    <Layout>
    <Routes>
      {
        links.map((route, index) => {
          return <Route path={route.to} element={route.element} key={index}/>
        })
      }
    </Routes>
    </Layout>
  </Router>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
