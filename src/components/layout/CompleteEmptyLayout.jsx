import React, { Component } from "react";
import { NavLink, Redirect } from "react-router-dom";

class AdminSidebar extends Component {
  render() {
    return (
      <>
        <nav className="navbar-default navbar-static-side" role="navigation">
          <div className="sidebar-collapse">
            <ul className="nav metismenu" id="side-menu">
              <li className="nav-header">
                <div className="dropdown profile-element">
                  <img
                    alt="image"
                    className="rounded-circle"
                    src="/assets/images/Richard.jpg"
                  />
                  <a
                    data-toggle="dropdown"
                    className="dropdown-toggle"
                    href="#"
                  >
                    <span className="block m-t-xs font-bold">
                      Richard Smith
                    </span>
                    <span className="text-muted text-xs block">CEO</span>
                  </a>
                  <ul className="dropdown-menu animated fadeInRight m-t-xs">
                    <li>
                      <a className="dropdown-item" href="profile.html">
                        Profile
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="contacts.html">
                        Contacts
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="mailbox.html">
                        Mailbox
                      </a>
                    </li>
                    <li className="dropdown-divider"></li>
                    <li>
                      <a className="dropdown-item" href="login.html">
                        Logout
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="logo-element">IN+</div>
              </li>
              <li className="">
                <NavLink className="nav-link" to="/dashboard">
                  <i className="fa fa-th-large"></i>
                  <span className="nav-label">Dashboards</span>
                </NavLink>
              </li>
              <li>
                <NavLink className="nav-link" to="/used-cars">
                  <i className="fa fa-car"></i>
                  <span className="nav-label">Cars</span>
                </NavLink>
              </li>
              <li>
                <NavLink className="nav-link" to="/leads">
                  <i className="fa fa-bar-chart-o"></i>
                  <span className="nav-label">Leads</span>
                </NavLink>
              </li>
              <li>
                <NavLink className="nav-link" to="/queries">
                  <i className="fa fa-bar-chart-o"></i>
                  <span className="nav-label">User Queries</span>
                </NavLink>
              </li>
              <li>
                <NavLink className="nav-link" to="/vrt-transactions">
                  <i className="fa fa-bar-chart-o"></i>
                  <span className="nav-label">VRT Transactions</span>
                </NavLink>
              </li>
              <li>
                <NavLink className="nav-link" to="/dealer-transactions">
                  <i className="fa fa-bar-chart-o"></i>
                  <span className="nav-label">Dealer Transactions</span>
                </NavLink>
              </li>
              <li>
                <NavLink className="nav-link" to="/carsourcing-transactions">
                  <i className="fa fa-bar-chart-o"></i>
                  <span className="nav-label">Car Sourcing Transactions</span>
                </NavLink>
              </li>

              <li>
                <NavLink className="nav-link" to="/blogs">
                  <i className="fa fa-bar-chart-o"></i>
                  <span className="nav-label">Blogs</span>
                </NavLink>
              </li>
              <li>
                <NavLink className="nav-link" to="/pages">
                  <i className="fa fa-bar-chart-o"></i>
                  <span className="nav-label">Pages</span>
                </NavLink>
              </li>
              <li>
                <NavLink className="nav-link" to="/faqs">
                  <i className="fa fa-bar-chart-o"></i>
                  <span className="nav-label">FAQs</span>
                </NavLink>
              </li>
              <li>
                <NavLink className="nav-link" to="/settings">
                  <i className="fa fa-bar-chart-o"></i>
                  <span className="nav-label">Settings</span>
                </NavLink>
              </li>
            </ul>
          </div>
        </nav>
      </>
    );
  }
}

export default AdminSidebar;
