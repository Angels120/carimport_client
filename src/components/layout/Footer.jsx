import React, { Component } from "react";
import { withRouter } from "react-router";
import { NavLink } from "react-router-dom";
import Login from "../components/Login";
import SignUp from "../components/SignUp";
// import DogDetail from '../components/DogDetail';

class Footer extends Component {
  render() {
    return (
      <>
        <footer id="colophon">
          <div className="theme-footer-info">
            <div className="textwidget">
              {/* <div>Copyright 2020 © | <a href="/">UK Car Imports</a> | Built with <svg className="svg-inline--fa fa-heart fa-w-16" aria-hidden="true" focusable="false" data-prefix="far" data-icon="heart" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M458.4 64.3C400.6 15.7 311.3 23 256 79.3 200.7 23 111.4 15.6 53.6 64.3-21.6 127.6-10.6 230.8 43 285.5l175.4 178.7c10 10.2 23.4 15.9 37.6 15.9 14.3 0 27.6-5.6 37.6-15.8L469 285.6c53.5-54.7 64.7-157.9-10.6-221.3zm-23.6 187.5L259.4 430.5c-2.4 2.4-4.4 2.4-6.8 0L77.2 251.8c-36.5-37.2-43.9-107.6 7.3-150.7 38.9-32.7 98.9-27.8 136.5 10.5l35 35.7 35-35.7c37.8-38.5 97.8-43.2 136.5-10.6 51.1 43.1 43.5 113.9 7.3 150.8z"></path></svg> at  <a href="https://capslockdigital.io/" target="_blank" rel="noopener noreferrer">Capslock Digital</a> */}
              <div>
                Copyright 2024 © | <a href="/">UK Car Imports</a>
              </div>
            </div>
          </div>
          <div className="theme-footer-menu w3-container w3-row w3-center">
            <ul
              id="menu-footer-menu"
              className="menu w3-ul w3-bar w3-small w3-center"
            >
              <li
                id="menu-item-1606"
                className="menu-item w3-bar-item menu-item-type-post_type menu-item-object-page menu-item-1606"
              >
                <NavLink rel="nofollow" to="/about-us/">
                  About Us
                </NavLink>
              </li>
              <li
                id="menu-item-1605"
                className="menu-item w3-bar-item menu-item-type-post_type menu-item-object-page menu-item-1605"
              >
                <NavLink rel="nofollow" to="/terms-and-conditions/">
                  Terms and Conditions
                </NavLink>
              </li>
              <li
                id="menu-item-1604"
                className="menu-item w3-bar-item menu-item-type-post_type menu-item-object-page menu-item-1604"
              >
                <NavLink rel="nofollow" to="/privacy-policy/">
                  Privacy Policy
                </NavLink>
              </li>
            </ul>
          </div>
        </footer>
      </>
    );
  }
}

export default withRouter(Footer);
