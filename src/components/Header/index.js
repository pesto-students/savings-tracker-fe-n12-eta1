import {
    BrowserRouter as Router,
    Link,
  } from "react-router-dom";
  import './index.css';
  import logo from '../../logo.png';

  const Header = ({token=null, active='home'}) => {

    return (
      <>

      <header className="w-100 fixed" >

        <nav className="navbar py-0 navbar-transparent navbar-color-on-scroll fixed-top navbar-expand-lg blur border-radius-xl shadow my-3 mx-7" color-on-scroll="100" id="sectionsNav">
          <div className="container">
            <div className="navbar-translate">
                <Link className="nav-link navbar-brand" to="/">
                  <img src={logo} className="App-logo" alt="logo" />
                </Link>
              <button className="navbar-toggler" type="button" data-toggle="collapse" aria-expanded="false" aria-label="Toggle navigation">
                <span className="sr-only">Toggle navigation</span>
                <span className="navbar-toggler-icon"></span>
                <span className="navbar-toggler-icon"></span>
                <span className="navbar-toggler-icon"></span>
              </button>
            </div>
            <div className="collapse navbar-collapse">
              <ul className="navbar-nav ml-auto nav-ul">
                <li className={active === 'home'?'nav-item active pr-2':'nav-item pr-2'}>
                  <Link className="nav-link flex align-item-center" to="/">
                  <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-4p" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                    <span>Home</span>  
                </Link>
                </li>
                <li className={active === 'home'?'nav-item pr-2':'nav-item pr-2'}>
                  <Link className="nav-link flex align-item-center" to="/">
                  <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-4p" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                    <span>Contact US</span>  
                </Link>
                </li>

                <li className='nav-item'>
                  <Link className="nav-link btn shadow glob-btn bg-gradient-primary text-white" to="/contact">Sign in</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        </header>
  
      </>
  
    )
  
  }
  
  export default Header;
  