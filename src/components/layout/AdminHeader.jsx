import React, { Component } from "react";
import Favicon from "react-favicon";
import { withRouter } from "react-router";
import parseJwt from "../../store/helpers/common";

class AdminHeader extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if (localStorage.getItem("token")) {
      const currdetails = parseJwt(localStorage.getItem("token"));
      const role = currdetails.urxrs;
      // console.log(JSON.stringify(currdetails));
      if (currdetails.urxrs === "$aHF667#79+57h%45") {
        this.setState({ loggedin: true });
      } else {
        localStorage.clear("token");
        this.props.history.push("/sign-in");
      }
    } else {
      this.setState({ loggedin: false });
      localStorage.clear("token");
      this.props.history.push("/sign-in");
    }
  }

  logout = () => {
    localStorage.clear("token");
    window.location.replace("/sign-in");
    // this.props.history.push('/sign-in');
  };
  render() {
    return (
      <>
        <Favicon url="/assets/images/ukcarimport.png" />
        <div className="row border-bottom">
          <nav className="navbar navbar-static-top white-bg" role="navigation">
            <div className="navbar-header"></div>
            <ul className="dashboard nav navbar-top-links navbar-right">
              <li>
                <span className="m-r-sm text-muted welcome-message">
                  Welcome to Auto Merchant.
                </span>
              </li>

              <li>
                <a
                  className="p-2 login-item"
                  href="#"
                  role="button"
                  onClick={() => this.logout()}
                >
                  <i className="fa fa-sign-out"></i> Logout
                </a>
                {/*<a href="login.html">
                                    <i className="fa fa-sign-out"></i> Log out
                                </a>*/}
              </li>
            </ul>
          </nav>
        </div>
      </>
    );
  }
}

export default withRouter(AdminHeader);
