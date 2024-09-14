import React, { useState, Component } from "react";
import { withRouter } from "react-router-dom";
import { Collapse } from "react-bootstrap";
import { Button } from "react-bootstrap";

class SideNavBar extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      Locationtoggle: false,
      Pricetoggle: false,
      Breedtoggle: false,
      Agetoggle: false,
      Sextoggle: false,
      Littretoggle: false,
      Colortoggle: false,
      Sizetoggle: false,
    };
  }
  toggle = (toggler) => {
    let togglerStatus = this.state[toggler];
    console.log(toggler);
    this.setState({
      [toggler]: !togglerStatus, // change the status only for the toggle you clicked
    });
  };
  render() {
    return (
      <>
        <div className="left-sec loggedoutpc">
          <div className="filter-sec">
            <h2 className="title">Filter by</h2>
            <li
              className={`filter-list-item ${
                this.state.Locationtoggle ? "active" : ""
              }`}
              onClick={() => this.toggle("Locationtoggle")}
            >
              Location
            </li>
            <Collapse in={this.state.Locationtoggle}>
              <div>
                Anim pariatur cliche reprehenderit, enim eiusmod high life
                accusamus terry richardson ad squid. Nihil anim keffiyeh
                helvetica, craft beer labore wes anderson cred nesciunt sapiente
                ea proident.
              </div>
            </Collapse>
            <li
              className={`filter-list-item ${
                this.state.Pricetoggle ? "active" : ""
              }`}
              onClick={() => this.toggle("Pricetoggle")}
            >
              Price
            </li>
            <Collapse in={this.state.Pricetoggle}>
              <div>
                Anim pariatur cliche reprehenderit, enim eiusmod high life
                accusamus terry richardson ad squid. Nihil anim keffiyeh
                helvetica, craft beer labore wes anderson cred nesciunt sapiente
                ea proident.
              </div>
            </Collapse>
            <li
              className={`filter-list-item ${
                this.state.Breedtoggle ? "active" : ""
              }`}
              onClick={() => this.toggle("Breed toggle")}
            >
              Breed
            </li>
            <Collapse in={this.state.Breedtoggle}>
              <div>
                Anim pariatur cliche reprehenderit, enim eiusmod high life
                accusamus terry richardson ad squid. Nihil anim keffiyeh
                helvetica, craft beer labore wes anderson cred nesciunt sapiente
                ea proident.
              </div>
            </Collapse>
            <li
              className={`filter-list-item ${
                this.state.Agetoggle ? "active" : ""
              }`}
              onClick={() => this.toggle("Agetoggle")}
            >
              Age
            </li>
            <Collapse in={this.state.Agetoggle}>
              <div>
                Anim pariatur cliche reprehenderit, enim eiusmod high life
                accusamus terry richardson ad squid. Nihil anim keffiyeh
                helvetica, craft beer labore wes anderson cred nesciunt sapiente
                ea proident.
              </div>
            </Collapse>
            <li
              className={`filter-list-item ${
                this.state.Sextoggle ? "active" : ""
              }`}
              onClick={() => this.toggle("Sextoggle")}
            >
              Sex
            </li>
            <Collapse in={this.state.Sextoggle}>
              <div>
                Anim pariatur cliche reprehenderit, enim eiusmod high life
                accusamus terry richardson ad squid. Nihil anim keffiyeh
                helvetica, craft beer labore wes anderson cred nesciunt sapiente
                ea proident.
              </div>
            </Collapse>
            <li
              className={`filter-list-item ${
                this.state.Littretoggle ? "active" : ""
              }`}
              onClick={() => this.toggle("Littretoggle")}
            >
              Littre
            </li>
            <Collapse in={this.state.Littretoggle}>
              <div>
                Anim pariatur cliche reprehenderit, enim eiusmod high life
                accusamus terry richardson ad squid. Nihil anim keffiyeh
                helvetica, craft beer labore wes anderson cred nesciunt sapiente
                ea proident.
              </div>
            </Collapse>
            <li
              className={`filter-list-item ${
                this.state.Colortoggle ? "active" : ""
              }`}
              onClick={() => this.toggle("Colortoggle")}
            >
              Color
            </li>
            <Collapse in={this.state.Colortoggle}>
              <div>
                Anim pariatur cliche reprehenderit, enim eiusmod high life
                accusamus terry richardson ad squid. Nihil anim keffiyeh
                helvetica, craft beer labore wes anderson cred nesciunt sapiente
                ea proident.
              </div>
            </Collapse>
            <li
              className={`filter-list-item ${
                this.state.Sizetoggle ? "active" : ""
              }`}
              onClick={() => this.toggle("Sizetoggle")}
            >
              Size
            </li>
            <Collapse in={this.state.Sizetoggle}>
              <div>
                Anim pariatur cliche reprehenderit, enim eiusmod high life
                accusamus terry richardson ad squid. Nihil anim keffiyeh
                helvetica, craft beer labore wes anderson cred nesciunt sapiente
                ea proident.
              </div>
            </Collapse>
          </div>
        </div>
      </>
    );
  }
}

export default withRouter(SideNavBar);
