import './App.css';
import React from 'react';
import { Outlet, Route, BrowserRouter as Router, Routes, } from 'react-router-dom';

import MainNav from './Components/MainNav';
import Footer from './Components/Footer';
import { links, mainNav } from "./Utils/Routes";

/**
 * This is where each page will be rendered in
 * @component
 * @author Zhi Heng
 * @param {object} props Component props 
 * @param {JSX.Element} props.children Child elements that will be rendered
 * @returns {JSX.Element} An JSX element
 */
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

/**
 * This is contains the router for routing and the layout for rendering
 * @component
 * @author Zhi Heng
 * @param {object} props Component props
 * @param {RouterProps} props.history Used in testing
 * @returns {JSX.Element} An JSX element
 */
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
