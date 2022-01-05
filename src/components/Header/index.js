import {
    BrowserRouter as Router,
    Link,
  } from "react-router-dom";
  import './index.css';
  import logo from '../../logo.png';

  const Header = ({token=null, active='home'}) => {

    return (
      <>
      <header classNameName="w-100 fixed">
        <nav
        className="navbar navbar-expand-lg navbar-dark bg-gradient-dark z-index-3 py-3">
        <div className="container">
          <a className="navbar-brand text-white" href="" rel="tooltip" title="Designed and Coded by Creative Tim" data-placement="bottom" target="_blank">
            Material Kit
          </a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navigation" aria-controls="navigation" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navigation">
            <ul className="navbar-nav navbar-nav-hover mx-auto">
              <li className="nav-item px-3">
                <a className="nav-link text-white opacity-8">
                  Pages
                </a>
              </li>

              <li className="nav-item px-3">
                <a className="nav-link text-white opacity-8">
                  Utilities
                </a>
              </li>

              <li className="nav-item px-3">
                <a className="nav-link text-white opacity-8">
                  Blocks
                </a>
              </li>

              <li className="nav-item px-3">
                <a className="nav-link text-white opacity-8">
                  Docs
                </a>
              </li>
            </ul>

            <ul className="navbar-nav ms-auto">
              <button className="btn bg-gradient-primary mb-0">Buy Now</button>
            </ul>
          </div>
        </div>
      </nav>

        </header>
  
      </>
  
    )
  
  }
  
  export default Header;
  