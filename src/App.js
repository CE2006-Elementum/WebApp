import './App.css';
import React from 'react';
import { Outlet, Route, BrowserRouter as Router, Routes, } from 'react-router-dom';

import MainNav from './Components/MainNav';
import Footer from './Components/Footer';
import links, { mainNav } from "./Utils/Routes";

export function Layout({children}) {
  return (
    <div className="app">
      <MainNav data={mainNav}/>
      <section className="main-body">
        {children}
      </section>
      <section className="footer">
        <Footer/>
      </section>
    </div>
  )
}

function App({history}) {
  return (
    <Router history={history}>
      <Layout>
        <Outlet/>
        <Routes>
          {
            links.map((route, index) => {
              return <Route path={route.to} element={route.element} key={index}/>
            })
          }
        </Routes>
      </Layout>
  </Router>
  );
}

export default App;
