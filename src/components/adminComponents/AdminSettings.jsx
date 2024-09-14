import React, { Component } from "react";
import { connect } from "react-redux";
import { getMakeModels, getsettings } from "../../store/actions/commonActions";
import { apiBaseUrl } from "../../store/helpers/common";
import toastr from "reactjs-toastr";
import SimpleReactValidator from "simple-react-validator";
import { NavLink, Redirect } from "react-router-dom";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import { Button, Form, Col, Row } from "react-bootstrap";
import $ from "jquery";

class AdminSettings extends Component {
  constructor(props) {
    super(props);
    this.formValidator = new SimpleReactValidator();
    this.state = {
      settings: "",
      currency: "",
      transport_charges: "",
      commission_range_1: "",
      commission_range_2: "",
      commission_range_3: "",
      commission_range_4: "",
      commission_range_5: "",
      auction_cost_range_1: "",
      auction_cost_range_2: "",
      auction_cost_range_3: "",
      isSubmit: false,
      makemodels: [],
      makesData: [],
      is_make_checked: false,
      makesFinalArray: [],
    };
  }
  componentDidMount() {
    // this.props.dispatch(getLeads());
    this.props.dispatch(getsettings());
    this.props.dispatch(getMakeModels());
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  componentWillReceiveProps(nextProps) {
    this.setState({
      settings: nextProps.settings,
      currency: nextProps.settings.currency,
      transport_charges: nextProps.settings.transport_charges,
      commission_range_1: nextProps.settings.commission_range_1,
      commission_range_2: nextProps.settings.commission_range_2,
      commission_range_3: nextProps.settings.commission_range_3,
      commission_range_4: nextProps.settings.commission_range_4,
      commission_range_5: nextProps.settings.commission_range_5,
      auction_cost_range_1: nextProps.settings.auction_cost_range_1,
      auction_cost_range_2: nextProps.settings.auction_cost_range_2,
      auction_cost_range_3: nextProps.settings.auction_cost_range_3,
      makemodels: nextProps.makemodels.data,
      makesData: nextProps.makemodels.make,
    });
    // console.log('settings:'+JSON.stringify(nextProps.settings));
  }
  formsubmit = (ev) => {
    let validate = this.formValidator;
    if (validate.allValid()) {
      this.setState({ isSubmit: true });
      const {
        currency,
        transport_charges,
        commission_range_1,
        commission_range_2,
        commission_range_3,
        commission_range_4,
        commission_range_5,
        auction_cost_range_1,
        auction_cost_range_2,
        auction_cost_range_3,
      } = this.state;
      const request = new Request(`${apiBaseUrl}/save-settings`, {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json",
          "X-Auth-Token": `${localStorage.getItem("token")}`,
        }),
        body: JSON.stringify({
          currency,
          transport_charges,
          commission_range_1,
          commission_range_2,
          commission_range_3,
          commission_range_4,
          commission_range_5,
          auction_cost_range_1,
          auction_cost_range_2,
          auction_cost_range_3,
        }),
      });
      return fetch(request)
        .then((res) => res.json())
        .then((data) => {
          // console.log('data :'+JSON.stringify(data.ResponseCode));
          if (data.ResponseCode == 1) {
            toastr.success(data.ResponseText, { displayDuration: 3000 });
            this.setState({ isSubmit: false });
            callVrtCron();
            // window.location.reload();
          }
        })
        .catch((err) => {
          this.setState({ isSubmit: false });
          console.log("err :" + err);
        });
    } else {
      validate.showMessages();
      this.forceUpdate();
    }
  };
  // handlecheckbox =(e) => {
  //     let isChecked = e.target.checked;
  //     if(isChecked){
  //         e.target.
  //     }else{

  //     }
  // }
  formsave = (event) => {
    event.preventDefault();
    const form = event.target;
    const data = new FormData(form);
    // Display the values
    const { makesFinalArray } = this.state;
    var selected_models = [];
    for (var value of data.values()) {
      selected_models.push(value);
      console.log(" value", value);
    }
    // data.values();
    // console.log(selected_models);
    this.setState({ isSubmit: true });
    const request = new Request(`${apiBaseUrl}/save-MakeModels`, {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
        "X-Auth-Token": `${localStorage.getItem("token")}`,
      }),
      body: JSON.stringify({ selected_models, makes: makesFinalArray }),
    });
    return fetch(request)
      .then((res) => res.json())
      .then((data) => {
        // console.log('data :'+JSON.stringify(data.ResponseCode));
        if (data.ResponseCode == 1) {
          toastr.success(data.ResponseText, { displayDuration: 3000 });
          this.setState({ isSubmit: false });
          callVrtCron();
          // window.location.reload();
        }
      })
      .catch((err) => {
        this.setState({ isSubmit: false });
        console.log("err :" + err);
      });
  };

  handleChangeOnCheck = (e, carName) => {
    // e.preventDefault();
    let { makesFinalArray } = this.state;
    // const newValue = e.target.checked ? 1 : 0;
    // this.setState((prevState) => {
    //   let newArray = prevState.makesFinalArray.map((item) => {
    //     // console.log("previous", item);
    //     if (item.carName === carName) {
    //       // update the element
    //       item.carValue = newValue;
    //       console.log("car value update", item);
    //     }
    //     return item;
    //   });
    //   return makesFinalArray;
    //   // return { makesFinalArray: [...prevState.makesFinalArray] };
    // });
    const { name, checked } = e.target;
    this.setState({
      makesFinalArray: this.state.makesFinalArray.map((item) =>
        item.carName === name
          ? { ...item, carValue: checked === true ? 1 : 0 }
          : item
      ),
    });
    // console.log(makesFinalArray);
  };

  render() {
    const { settings, makemodels, makesFinalArray, makesData } = this.state;

    if (makesData && makesFinalArray.length === 0) {
      Object.entries(makesData)
        .map(([key, value]) => {
          makesFinalArray.push({ carName: key, carValue: value });
        })
        .filter((use) => use);
    }

    console.log(makesFinalArray);
    return (
      <>
        <div className="row wrapper border-bottom white-bg page-heading">
          <div className="col-lg-12">
            <h2>Leads</h2>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <NavLink className="nav-link" to="/dashboard">
                  Dashboard
                </NavLink>
              </li>
              <li className="breadcrumb-item active">
                <NavLink className="nav-link" to="/settings">
                  Settings
                </NavLink>
              </li>
            </ol>
          </div>
          <div className="col-lg-2"></div>
        </div>
        <div className="wrapper wrapper-content animated fadeInRight">
          <div className="row">
            <div className="col-lg-12">
              <div className="ibox ">
                <div className="ibox-title">
                  <h5>Settings</h5>
                  <div className="ibox-tools"></div>
                </div>
                <div className="ibox-content">
                  {/* <form className="setting_form"> */}
                  <div className="form-group">
                    <label for="">Currency Differece</label>
                    <input
                      className="form-control"
                      type="text"
                      name="currency"
                      value={this.state.currency}
                      onChange={(e) => this.handleChange(e)}
                    />
                    {this.formValidator.message(
                      "Currency",
                      this.state.currency,
                      "required|numeric"
                    )}
                  </div>
                  <div className="form-group">
                    <label for="">Transport Charges</label>
                    <input
                      className="form-control"
                      type="text"
                      name="transport_charges"
                      value={this.state.transport_charges}
                      onChange={(e) => this.handleChange(e)}
                    />
                    {this.formValidator.message(
                      "Transport Charges",
                      this.state.transport_charges,
                      "required|numeric"
                    )}
                  </div>
                  <div className="form-group">
                    <label for="">Margin Settings</label>
                    <br />
                    <label>{"Carprice >= 0"}</label>
                    <input
                      className="form-control"
                      type="text"
                      name="commission_range_1"
                      value={this.state.commission_range_1}
                      onChange={(e) => this.handleChange(e)}
                    />
                    {this.formValidator.message(
                      "Commission1",
                      this.state.commission_range_1,
                      "required|numeric"
                    )}
                    <label>{"Carprice >= 7,500"}</label>
                    <input
                      className="form-control"
                      type="text"
                      name="commission_range_2"
                      value={this.state.commission_range_2}
                      onChange={(e) => this.handleChange(e)}
                    />
                    {this.formValidator.message(
                      "Commission2",
                      this.state.commission_range_2,
                      "required|numeric"
                    )}
                    <label>{"Carprice >= 12,000"}</label>
                    <input
                      className="form-control"
                      type="text"
                      name="commission_range_3"
                      value={this.state.commission_range_3}
                      onChange={(e) => this.handleChange(e)}
                    />
                    {this.formValidator.message(
                      "Commission3",
                      this.state.commission_range_3,
                      "required|numeric"
                    )}
                    <label>{"Carprice >= 20,000"}</label>
                    <input
                      className="form-control"
                      type="text"
                      name="commission_range_4"
                      value={this.state.commission_range_4}
                      onChange={(e) => this.handleChange(e)}
                    />
                    {this.formValidator.message(
                      "Commission4",
                      this.state.commission_range_4,
                      "required|numeric"
                    )}
                    <label>{"Carprice >= 30,000"}</label>
                    <input
                      className="form-control"
                      type="text"
                      name="commission_range_5"
                      value={this.state.commission_range_5}
                      onChange={(e) => this.handleChange(e)}
                    />
                    {this.formValidator.message(
                      "Commission5",
                      this.state.commission_range_5,
                      "required|numeric"
                    )}
                    <br />

                    <label for="">Auction Cost</label>
                    <br />
                    <label>{"Carprice <= 20,000"}</label>
                    <input
                      className="form-control"
                      type="text"
                      name="auction_cost_range_1"
                      value={this.state.auction_cost_range_1}
                      onChange={(e) => this.handleChange(e)}
                    />
                    {this.formValidator.message(
                      "auction cost range 1",
                      this.state.auction_cost_range_1,
                      "required|numeric"
                    )}
                    <label>{"Carprice <= 30,000"}</label>
                    <input
                      className="form-control"
                      type="text"
                      name="auction_cost_range_2"
                      value={this.state.auction_cost_range_2}
                      onChange={(e) => this.handleChange(e)}
                    />
                    {this.formValidator.message(
                      "auction cost range 2",
                      this.state.auction_cost_range_2,
                      "required|numeric"
                    )}
                    <label>{"Carprice > 30,000"}</label>
                    <input
                      className="form-control"
                      type="text"
                      name="auction_cost_range_3"
                      value={this.state.auction_cost_range_3}
                      onChange={(e) => this.handleChange(e)}
                    />
                    {this.formValidator.message(
                      "auction cost range 3",
                      this.state.auction_cost_range_3,
                      "required|numeric"
                    )}
                    <br />
                    <button
                      className="btn btn-info"
                      type="button"
                      onClick={(ev) => this.formsubmit(ev)}
                      disabled={this.state.isSubmit}
                    >
                      {this.state.isSubmit ? "Please wait.." : "Save"}
                    </button>
                  </div>

                  {/* </form> */}
                </div>
              </div>
              {/* <div className="ibox ">
                <div className="ibox-title">
                  <h5>Models Selection for Fixed Margin</h5>
                  <div className="ibox-tools"></div>
                </div>
                <div className="ibox-content">
                  <form
                    onSubmit={(e) => this.formsave(e)}
                    id="fixed_commission"
                  >
                    <Card>
                      <Card.Body>
                        {makesFinalArray
                          ? makesFinalArray?.map((list, index) => {
                              // console.log("list", list);
                              return (
                                <span className="checks_section" key={index}>
                                  <input
                                    type="checkbox"
                                    className="m-2"
                                    name={list.carName}
                                    // checked={list.carValue === 1 ? true : false}
                                    defaultChecked={
                                      list.carValue === 1 ? true : false
                                    }
                                    // value={list.carValue}
                                    onChange={(e) =>
                                      this.handleChangeOnCheck(e)
                                    }
                                  />
                                  {list.carName}
                                </span>
                              );
                            })
                          : ""}
                      </Card.Body>
                    </Card>

                    <br />
                    <Accordion defaultActiveKey="0">
                      {makemodels
                        ? // makemodels.map((model) => {
                          //     console.log(model)
                          // })
                          Object.keys(makemodels).map((key, index) => {
                            return (
                              <Card>
                                <Card.Header
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                  }}
                                >
                                  <Accordion.Toggle
                                    as={Button}
                                    variant="link"
                                    eventKey={index}
                                  >
                                    {key}
                                  </Accordion.Toggle>
                                </Card.Header>
                                <Accordion.Collapse eventKey={index}>
                                  <Card.Body>
                                    {makemodels[key].map((model) => (
                                      <span className="checks_section">
                                        <input
                                          type="checkbox"
                                          name={`model[]`}
                                          value={model.id}
                                          defaultChecked={
                                            model.is_fixed_commission === 1
                                              ? "true"
                                              : ""
                                          }
                                        />
                                        {model.car_model}
                                      </span>
                                    ))}
                                  </Card.Body>
                                </Accordion.Collapse>
                              </Card>
                              // console.log(typeof(makemodels[key]))
                              // <p>dsadasdasd</p>
                              // console.log(makemodels[key])
                            );
                          })
                        : "no"}
                    </Accordion>
                    <br />
                    <button className="btn btn-info ">Save</button>
                    {/* <button className="btn btn-info" type="button" disabled={ this.state.isSubmit }>{this.state.isSubmit ? 'Please wait..' : 'Save'}</button> 
                  </form>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </>
    );
  }
}

const callVrtCron =  () => {
  const request = new Request(`${apiBaseUrl}/vrt?refresh=all`, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        "X-Auth-Token": `${localStorage.getItem("token")}`,
      }),
    });
    return fetch(request)
      .then((res) => res.json())
      .catch((err) => {
        console.log("err :" + err);
      });
}

const mapStateToProps = (state) => ({
  settings: state.common.settings,
  settingsloading: state.common.settingsloading,
  makemodels: state.common.makemodels,
  makemodelsloading: state.common.makemodelsloading,
});
export default connect(mapStateToProps)(AdminSettings);
