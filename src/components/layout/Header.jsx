import React, { Component } from "react";
import { withRouter } from "react-router";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import parseJwt from "../../store/helpers/common";
import jwt_decode from "jwt-decode";
// import { getUserdetails } from "../../store/actions/userActions";
import Favicon from "react-favicon";
import $ from "jquery";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      role: "",
      isLoggedIn: false,
      username: "",
      user_id: "",
      userrole: "",
      singleuser: [],
    };
  }
  componentDidMount() {
    if (localStorage.getItem("token")) {
      const currdetails = parseJwt(localStorage.getItem("token"));
      const role = currdetails.urxrs;
      // console.log('token : '+JSON.stringify(currdetails));
      if (currdetails.urxrs) {
        this.setState({ isLoggedIn: true, userrole: currdetails.urxrs });
      }
    }
  }
  logout = () => {
    localStorage.clear("token");
    this.props.history.push("/");
    window.location.reload();
  };
  togglemenu = () => {
    $("#head-navbar").toggle();
  };
  render() {
    const { isLoggedIn, userrole } = this.state;
    return (
      <>
        <Favicon url="/assets/images/ukcarimport.png" />
        <header className="header new_navigation_innermenu p-0">
          <nav
            className="navbar navbar-expand-md navbar-dark p-0"
            data-spy="affix"
            data-offset-top="200"
            role="navigation"
          >
            <div className="container-fluid">
              {/* <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#head-navbar">
                                <span className="navbar-toggler-icon"></span>
                            </button>  */}
              <button className="navbar-toggler navbar-toggler-right mobile_menu">
                <span
                  onClick={(e) => this.togglemenu()}
                  className="navbar-toggler-icon"
                ></span>
              </button>
              <NavLink className="navbar-brand text-white" to="/">
                <img
                  width="60"
                  height="60"
                  className="main_logo"
                  src="/assets/images/logo.png"
                />
              </NavLink>
              <div className="collapse navbar-collapse" id="head-navbar">
                <ul className="navbar-nav new_menu_class ml-md-auto">
                  <li className="nav-item" onClick={(e) => this.togglemenu()}>
                    <NavLink className="nav-link" to="/">
                      HOME
                    </NavLink>
                  </li>
                  { <li className="nav-item" onClick={(e) => this.togglemenu()}>
                    <NavLink className="nav-link" to="/used-cars">
                      USED CARS
                    </NavLink>
                  </li> }
                  <li className="nav-item" onClick={(e) => this.togglemenu()}>
                    <NavLink className="nav-link" to="/car-sourcing">
                      Car Sourcing
                    </NavLink>
                  </li>
                  {/* <li className="nav-item">
                                            <a className="nav-link" href="/financing">FINANCE YOUR CAR</a>						   
                                    </li> */}
                  <li className="nav-item" onClick={(e) => this.togglemenu()}>
                    <NavLink className="nav-link" to="/about-us">
                      ABOUT US
                    </NavLink>
                  </li>
                  <li className="nav-item" onClick={(e) => this.togglemenu()}>
                    <NavLink className="nav-link" to="/contact">
                      CONTACT
                    </NavLink>
                  </li>
                  <li className="nav-item" onClick={(e) => this.togglemenu()}>
                    <NavLink className="nav-link" to="/faq">
                      FAQ
                    </NavLink>
                  </li>
                  <li className="nav-item" onClick={(e) => this.togglemenu()}>
                    <a className="nav-link" href="/blog">
                      BLOG
                    </a>
                  </li>
                  {/* <li className="nav-item" onClick={(e) => this.togglemenu()}>
                    <NavLink className="nav-link" to="/dealer-signup">
                      UK DEALER SIGN UP
                    </NavLink>
                  </li> */}
                  {/* {
                                        isLoggedIn
                                        ?
                                            userrole === '$aHF667#79+57h%45'
                                            ?
                                                <>
                                                    <li className="nav-item" onClick={e=>this.togglemenu()}>
                                                        <NavLink className="nav-link" to="/dashboard">Dashboard</NavLink>  
                                                    </li>
                                                    <li className="nav-item" onClick={e=>this.togglemenu()}>
                                                        <NavLink className="nav-link" to="/logout" onClick={e => this.logout(e)}>Logout</NavLink>  
                                                    </li>
                                                </>
                                            :
                                                <li className="nav-item" onClick={e=>this.togglemenu()}>
                                                    <NavLink className="nav-link" to="/logout" onClick={e => this.logout(e)}>Logout</NavLink>  
                                                </li>
                                            
                                        : 
                                            <>
                                                <li className="nav-item" onClick={e=>this.togglemenu()}>
                                                    <NavLink className="nav-link" to="/sign-in">Login</NavLink>	  
                                                </li>
                                                <li className="nav-item" onClick={e=>this.togglemenu()}>
                                                    <NavLink className="nav-link" to="/sign-up">Register</NavLink>	  
                                                </li> 
                                            </>
                                    } */}
                  <li className="nav-item phone">
                    <i className="fa fa-phone"></i>{" "}
                    <a className="phone-txt" href="tel:01-556 8261">
                      01-556 8261
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </header>
      </>
    );
  }
}

export default Header;
