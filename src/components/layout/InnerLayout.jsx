import React, { Component } from "react";
import Header from "./Header";
import Footer from "./Footer";
import SideNavBar from "./SideNavBar";

class InnerLayout extends Component {
  render() {
    return (
      <>
        <Header />
        <div className="container">
          <div className="row">
            <div className="col-sm-3">
              <SideNavBar />
            </div>
            <div className="col-sm-9">
              <div className="page_content">
                <div className="main-content w-100 mt-2 text-center">
                  <div className="container">
                    <div className="games-list">{this.props.children}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }
}

export default InnerLayout;
