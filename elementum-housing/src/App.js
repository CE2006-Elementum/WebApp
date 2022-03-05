import './App.css';
import { Outlet, } from 'react-router-dom';

import MainNav from './Components/MainNav';
import Footer from './Components/Footer';
import { mainNav } from "./Utils/Routes";

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

function App() {
  return (
      <Layout>
        <Outlet />
      </Layout>
  );
}

export default App;
