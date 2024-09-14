import React, { Component } from "react";
import { connect } from "react-redux";
import { getfiltersnew } from "../../store/actions/carActions";
import { gethomepage, getpage } from "../../store/actions/commonActions";
import {
  getfilterdyear,
  getfilterdmake,
  getfilterdmodel,
  getfilterdfuel,
  getfilterdcondition,
  getfilterdbodystyles,
  getfilterdMileage,
  getfilterdtransmission,
  getfilterdengine,
  getfilterdcolor,
} from "../../store/actions/filterActions";
import { Helmet } from "react-helmet";
import ReactHtmlParser from "react-html-parser";
import SimpleReactValidator from "simple-react-validator";

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.formValidator = new SimpleReactValidator();
    this.state = {
      Year: "",
      Make: "",
      Model: "",
      Fuel: "",
      body_style: "",
      Condition: "",
      Mileage: "",
      transmission_type: "",
      engine: "",
      color: [],
      filterdata: "",
      Make: "",
      premium_car: 0,
      is_manheim_car: 0,
      makefilter: "",
      fuelfilter: "",
      bodystylefilter: "",
      transmissionfilter: "",
      Fuel: "",
      modelfilter: "",
      minYear: "",
      maxYear: "",
      minPrice: "",
      maxPrice: "",
      minMileage: "",
      maxMileage: "",
      page: "",
      homepagedata: "",
      showvideo: false,
    };
    this.handleOnload = this.handleOnload.bind(this);
    this.loadDone = this.loadDone.bind(this);
    this.wrapperRef = React.createRef();
  }
  componentDidMount() {
    var slug = "homepage";
    this.props.dispatch(getpage(slug));
    this.props.dispatch(gethomepage(slug));
    // Filters update
    let {
      is_manheim_car,
      premium_car,
      minPrice,
      maxPrice,
      minYear,
      maxYear,
      Make,
      Model,
      Fuel,
      body_style,
      transmission_type,
      Condition,
      minMileage,
      maxMileage,
      engine,
      color,
    } = this.state;
    this.props.dispatch(
      getfilterdmake(
        is_manheim_car,
        premium_car,
        minPrice,
        maxPrice,
        minYear,
        maxYear,
        Make,
        Model,
        Fuel,
        body_style,
        Condition,
        minMileage,
        maxMileage,
        transmission_type,
        engine,
        color,
        "Yes"
      )
    );
    this.props.dispatch(
      getfilterdfuel(
        is_manheim_car,
        premium_car,
        minPrice,
        maxPrice,
        minYear,
        maxYear,
        Make,
        Model,
        Fuel,
        body_style,
        Condition,
        minMileage,
        maxMileage,
        transmission_type,
        engine,
        color
      )
    );
    this.props.dispatch(
      getfilterdtransmission(
        is_manheim_car,
        premium_car,
        minPrice,
        maxPrice,
        minYear,
        maxYear,
        Make,
        Model,
        Fuel,
        body_style,
        Condition,
        minMileage,
        maxMileage,
        transmission_type,
        engine,
        color
      )
    );
    // this.props.dispatch(getfilterdbodystyles(minPrice,maxPrice,minYear,maxYear,Make,Model,Fuel,body_style,Condition,minMileage,maxMileage,transmission_type,engine,color));
    // this.props.dispatch(getfilterdmodel(minPrice,maxPrice,minYear,maxYear,Make,Model,Fuel,body_style,Condition,minMileage,maxMileage,transmission_type,engine,color));
    // Filters update
    document.addEventListener("scroll", this.handleOnload);
    document.addEventListener("DOMContentLoaded", this.loadDone);
  }
  componentDidUpdate() {}
  handleOnload(event) {
    // this.setState({
    //   showvideo:true
    // })
    if (this.wrapperRef && this.wrapperRef.current) {
      this.setState({
        showvideo: true,
      });
    }
  }
  loadDone(e) {
    console.log("dsadasdasdsd");
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      page: nextProps.page,
      homepagedata: nextProps.homepagedata,
      makefilter: nextProps.makedata,
      fuelfilter: nextProps.fueldata,
      bodystylefilter: nextProps.bodystyledata,
      transmissionfilter: nextProps.transmissiondata,
      modelfilter: nextProps.modeldata,
    });
  }
  onfilterChange = (ev) => {
    this.setState({
      [ev.target.name]: ev.target.value,
    });
  };
  search = () => {
    let validate = this.formValidator;
    if (validate.allValid()) {
      const { Model, Make, Fuel, transmission_type, body_style } = this.state;
      var url =
        "/used-cars?filter=true&Make=" +
        Make +
        "&Model=" +
        Model +
        "&Fuel=" +
        Fuel +
        "&transmission_type=" +
        transmission_type +
        "&body_style=" +
        body_style;
      this.props.history.push(url);
    } else {
      validate.showMessages();
      this.forceUpdate();
    }
  };
  // filterSelect = (name) => {
  //   let {minPrice,maxPrice,minYear,maxYear,Make,Model,Fuel,body_style,transmission_type,Condition,minMileage,maxMileage,engine,color} = this.state;
  //   if(name === 'Make'){
  //     this.props.dispatch(getfilterdmake(minPrice,maxPrice,minYear,maxYear,Make,Model,Fuel,body_style,Condition,minMileage,maxMileage,transmission_type,engine,color));
  //   }else if(name === 'Fuel'){
  //     this.props.dispatch(getfilterdfuel(minPrice,maxPrice,minYear,maxYear,Make,Model,Fuel,body_style,Condition,minMileage,maxMileage,transmission_type,engine,color));
  //   }else if(name === 'transmission_type'){
  //     this.props.dispatch(getfilterdtransmission(minPrice,maxPrice,minYear,maxYear,Make,Model,Fuel,body_style,Condition,minMileage,maxMileage,transmission_type,engine,color));
  //   }else if(name === 'body_style'){
  //     this.props.dispatch(getfilterdbodystyles(minPrice,maxPrice,minYear,maxYear,Make,Model,Fuel,body_style,Condition,minMileage,maxMileage,transmission_type,engine,color));
  //   }else if(name === 'Model'){
  //     this.props.dispatch(getfilterdmodel(minPrice,maxPrice,minYear,maxYear,Make,Model,Fuel,body_style,Condition,minMileage,maxMileage,transmission_type,engine,color));
  //   }
  // }
  selectOption = (name, value) => {
    this.setState({
      [name]: value,
    });
    let {
      is_manheim_car,
      premium_car,
      minPrice,
      maxPrice,
      minYear,
      maxYear,
      Make,
      Model,
      Fuel,
      body_style,
      transmission_type,
      Condition,
      minMileage,
      maxMileage,
      engine,
      color,
    } = this.state;
    if (name === "Make") {
      Make = value;
    }
    if (name === "Model") {
      Model = value;
    }
    if (name === "Fuel") {
      Fuel = value;
    }
    if (name === "body_style") {
      body_style = value;
    }
    if (name === "transmission_type") {
      transmission_type = value;
    }
    if (name !== "Make" && !Make) {
      this.props.dispatch(
        getfilterdmake(
          is_manheim_car,
          premium_car,
          minPrice,
          maxPrice,
          minYear,
          maxYear,
          Make,
          Model,
          Fuel,
          body_style,
          Condition,
          minMileage,
          maxMileage,
          transmission_type,
          engine,
          color,
          "Yes"
        )
      );
    }
    if (name !== "Model" && !Model) {
      this.props.dispatch(
        getfilterdmodel(
          is_manheim_car,
          premium_car,
          minPrice,
          maxPrice,
          minYear,
          maxYear,
          Make,
          Model,
          Fuel,
          body_style,
          Condition,
          minMileage,
          maxMileage,
          transmission_type,
          engine,
          color,
          "Yes"
        )
      );
    }
    if (name !== "Fuel" && !Fuel) {
      this.props.dispatch(
        getfilterdfuel(
          is_manheim_car,
          premium_car,
          minPrice,
          maxPrice,
          minYear,
          maxYear,
          Make,
          Model,
          Fuel,
          body_style,
          Condition,
          minMileage,
          maxMileage,
          transmission_type,
          engine,
          color,
          "Yes"
        )
      );
    }
    if (name !== "body_style" && !body_style) {
      this.props.dispatch(
        getfilterdbodystyles(
          is_manheim_car,
          premium_car,
          minPrice,
          maxPrice,
          minYear,
          maxYear,
          Make,
          Model,
          Fuel,
          body_style,
          Condition,
          minMileage,
          maxMileage,
          transmission_type,
          engine,
          color,
          "Yes"
        )
      );
    }
    if (name !== "transmission_type" && !transmission_type) {
      this.props.dispatch(
        getfilterdtransmission(
          is_manheim_car,
          premium_car,
          minPrice,
          maxPrice,
          minYear,
          maxYear,
          Make,
          Model,
          Fuel,
          body_style,
          Condition,
          minMileage,
          maxMileage,
          transmission_type,
          engine,
          color,
          "Yes"
        )
      );
    }
  };
  clearOption = (name) => {
    let {
      is_manheim_car,
      premium_car,
      minPrice,
      maxPrice,
      minYear,
      maxYear,
      Make,
      Model,
      Fuel,
      body_style,
      transmission_type,
      Condition,
      minMileage,
      maxMileage,
      engine,
      color,
    } = this.state;

    this.setState({
      [name]: "",
    });
    if (name === "Make") {
      this.setState({
        Model: "",
        body_style: "",
      });
    }
    if (name === "Model") {
      this.setState({
        body_style: "",
      });
    }
    if (name === "Make") {
      Make = "";
    }
    if (name === "Model") {
      Model = "";
    }
    if (name === "Fuel") {
      Fuel = "";
    }
    if (name === "body_style") {
      body_style = "";
    }
    if (name === "transmission_type") {
      transmission_type = "";
    }
    this.props.dispatch(
      getfilterdmake(
        is_manheim_car,
        premium_car,
        minPrice,
        maxPrice,
        minYear,
        maxYear,
        Make,
        Model,
        Fuel,
        body_style,
        Condition,
        minMileage,
        maxMileage,
        transmission_type,
        engine,
        color,
        "Yes"
      )
    );
    this.props.dispatch(
      getfilterdmodel(
        is_manheim_car,
        premium_car,
        minPrice,
        maxPrice,
        minYear,
        maxYear,
        Make,
        Model,
        Fuel,
        body_style,
        Condition,
        minMileage,
        maxMileage,
        transmission_type,
        engine,
        color,
        "Yes"
      )
    );
    this.props.dispatch(
      getfilterdfuel(
        is_manheim_car,
        premium_car,
        minPrice,
        maxPrice,
        minYear,
        maxYear,
        Make,
        Model,
        Fuel,
        body_style,
        Condition,
        minMileage,
        maxMileage,
        transmission_type,
        engine,
        color,
        "Yes"
      )
    );
    this.props.dispatch(
      getfilterdbodystyles(
        is_manheim_car,
        premium_car,
        minPrice,
        maxPrice,
        minYear,
        maxYear,
        Make,
        Model,
        Fuel,
        body_style,
        Condition,
        minMileage,
        maxMileage,
        transmission_type,
        engine,
        color,
        "Yes"
      )
    );
    this.props.dispatch(
      getfilterdtransmission(
        is_manheim_car,
        premium_car,
        minPrice,
        maxPrice,
        minYear,
        maxYear,
        Make,
        Model,
        Fuel,
        body_style,
        Condition,
        minMileage,
        maxMileage,
        transmission_type,
        engine,
        color,
        "Yes"
      )
    );
  };
  render() {
    const {
      homepagedata,
      page,
      modelfilter,
      Model,
      makefilter,
      fuelfilter,
      bodystylefilter,
      transmissionfilter,
      filterdata,
      Make,
      Fuel,
      body_style,
      transmission_type,
    } = this.state;
    // console.log('makefilter'+makefilter)
    // console.log('fuelfilter'+fuelfilter)
    return (
      <>
        <Helmet>
          <title>
            Leading Irish Importer of Quality UK Used Cars - UK Car Imports
          </title>
          <meta
            name="title"
            content="Leading Irish Importer of Quality UK Used Cars - UK Car Imports"
          />
          <meta
            name="description"
            content="Safe and easy way to buy UK used cars from Ireland - VRT &amp; NOx fees due per car. Optional mechanical &amp; condition inspection reports. Optional warranty cover &amp; VRT processing. Let our professionals do the work - UK Car Imports"
          />
        </Helmet>
        <section className="homepage_top_banner">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-6">
                <h2 className="text-uppercase find-car">
                  Let's Find A Car For You
                </h2>
              </div>
              <div className="col-md-6">
                <div className="vehicle_filter">
                  <h3 className="mb-2">Start Your Search Here</h3>
                  <div className="inner_filter">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <div className="dropdown">
                            {/* <button className="btn btn-secondary dropdown-toggle" onClick={e => this.filterSelect('Make')} type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> */}
                            <button
                              className="btn btn-secondary dropdown-toggle"
                              type="button"
                              id="dropdownMenuButton"
                              data-toggle="dropdown"
                              aria-haspopup="true"
                              aria-expanded="false"
                            >
                              {Make ? (
                                <span className="selected">{Make}</span>
                              ) : (
                                "Make"
                              )}
                            </button>
                            {Make ? (
                              <a
                                className="inbtn"
                                onClick={(e) => this.clearOption("Make")}
                              >
                                <i className="fa fa-times"></i>
                              </a>
                            ) : (
                              ""
                            )}
                            <div
                              className="dropdown-menu"
                              aria-labelledby="dropdownMenuButton"
                            >
                              {this.props.makeloading ? (
                                <a className="dropdown-item">
                                  <i className="fa-li fa fa-spinner fa-spin"></i>
                                </a>
                              ) : makefilter.make ? (
                                makefilter.make.map((item, key) => (
                                  <a
                                    key={key}
                                    className="dropdown-item"
                                    onClick={(e) =>
                                      this.selectOption(`Make`, item.make)
                                    }
                                  >
                                    {item.make} ({item.total})
                                  </a>
                                ))
                              ) : (
                                <a className="dropdown-item">
                                  <i className="fa-li fa fa-spinner fa-spin"></i>
                                </a>
                              )}
                            </div>
                            {this.formValidator.message(
                              "Make",
                              this.state.Make,
                              "required"
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <div className="dropdown">
                            {/* <button className="btn btn-secondary dropdown-toggle" onClick={e => this.filterSelect('Model')} type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" disabled={Make ? false : true}> */}
                            <button
                              className="btn btn-secondary dropdown-toggle"
                              type="button"
                              id="dropdownMenuButton"
                              data-toggle="dropdown"
                              aria-haspopup="true"
                              aria-expanded="false"
                              disabled={Make ? false : true}
                            >
                              {Model ? (
                                <span className="selected">{Model}</span>
                              ) : (
                                "Model"
                              )}
                            </button>
                            {Model ? (
                              <a
                                className="inbtn"
                                onClick={(e) => this.clearOption("Model")}
                              >
                                <i className="fa fa-times"></i>
                              </a>
                            ) : (
                              ""
                            )}
                            <div
                              className="dropdown-menu"
                              aria-labelledby="dropdownMenuButton"
                            >
                              {this.props.modelloading ? (
                                <a className="dropdown-item">
                                  <i className="fa-li fa fa-spinner fa-spin"></i>
                                </a>
                              ) : modelfilter.model ? (
                                modelfilter.model.map((item) => (
                                  <a
                                    className="dropdown-item"
                                    onClick={(e) =>
                                      this.selectOption(`Model`, item.car_model)
                                    }
                                  >
                                    {item.car_model} ({item.total})
                                  </a>
                                ))
                              ) : (
                                <a className="dropdown-item">
                                  <i className="fa-li fa fa-spinner fa-spin"></i>
                                </a>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <div className="dropdown">
                            {/* <button className="btn btn-secondary dropdown-toggle" onClick={e => this.filterSelect('body_style')} type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" disabled={Model ? false : true}> */}
                            <button
                              className="btn btn-secondary dropdown-toggle"
                              type="button"
                              id="dropdownMenuButton"
                              data-toggle="dropdown"
                              aria-haspopup="true"
                              aria-expanded="false"
                              disabled={Model ? false : true}
                            >
                              {body_style ? (
                                <span className="selected">{body_style}</span>
                              ) : (
                                "Body Type"
                              )}
                            </button>
                            {body_style ? (
                              <a
                                className="inbtn"
                                onClick={(e) => this.clearOption("body_style")}
                              >
                                <i className="fa fa-times"></i>
                              </a>
                            ) : (
                              ""
                            )}
                            <div
                              className="dropdown-menu"
                              aria-labelledby="dropdownMenuButton"
                            >
                              {this.props.bodystyleloading ? (
                                <a className="dropdown-item">
                                  <i className="fa-li fa fa-spinner fa-spin"></i>
                                </a>
                              ) : bodystylefilter.body_style ? (
                                bodystylefilter.body_style.map((item) => (
                                  <a
                                    className="dropdown-item"
                                    onClick={(e) =>
                                      this.selectOption(
                                        `body_style`,
                                        item.body_style
                                      )
                                    }
                                  >
                                    {item.body_style} ({item.total})
                                  </a>
                                ))
                              ) : (
                                <a className="dropdown-item">
                                  <i className="fa-li fa fa-spinner fa-spin"></i>
                                </a>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <div className="dropdown">
                            {/* <button className="btn btn-secondary dropdown-toggle" onClick={e => this.filterSelect('Fuel')} type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> */}
                            <button
                              className="btn btn-secondary dropdown-toggle"
                              type="button"
                              id="dropdownMenuButton"
                              data-toggle="dropdown"
                              aria-haspopup="true"
                              aria-expanded="false"
                            >
                              {Fuel ? (
                                <span className="selected">{Fuel}</span>
                              ) : (
                                "Fuel Type"
                              )}
                            </button>
                            {Fuel ? (
                              <a
                                className="inbtn"
                                onClick={(e) => this.clearOption("Fuel")}
                              >
                                <i className="fa fa-times"></i>
                              </a>
                            ) : (
                              ""
                            )}
                            <div
                              className="dropdown-menu"
                              aria-labelledby="dropdownMenuButton"
                            >
                              {this.props.fuelloading ? (
                                <a className="dropdown-item">
                                  <i className="fa-li fa fa-spinner fa-spin"></i>
                                </a>
                              ) : fuelfilter.fuel_type ? (
                                fuelfilter.fuel_type.map((item, key) => (
                                  <a
                                    key={key}
                                    className="dropdown-item"
                                    onClick={(e) =>
                                      this.selectOption(`Fuel`, item.fuel_type)
                                    }
                                  >
                                    {item.fuel_type} ({item.total})
                                  </a>
                                ))
                              ) : (
                                <a className="dropdown-item">
                                  <i className="fa-li fa fa-spinner fa-spin"></i>
                                </a>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="form-group">
                          <div className="dropdown">
                            {/* <button className="btn btn-secondary dropdown-toggle" onClick={e => this.filterSelect('transmission_type')} type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> */}
                            <button
                              className="btn btn-secondary dropdown-toggle"
                              type="button"
                              id="dropdownMenuButton"
                              data-toggle="dropdown"
                              aria-haspopup="true"
                              aria-expanded="false"
                            >
                              {transmission_type ? (
                                <span className="selected">
                                  {transmission_type}
                                </span>
                              ) : (
                                "GearBox"
                              )}
                            </button>
                            {transmission_type ? (
                              <a
                                className="inbtn"
                                onClick={(e) =>
                                  this.clearOption("transmission_type")
                                }
                              >
                                <i className="fa fa-times"></i>
                              </a>
                            ) : (
                              ""
                            )}
                            <div
                              className="dropdown-menu"
                              aria-labelledby="dropdownMenuButton"
                            >
                              {this.props.transmissionloading ? (
                                <a className="dropdown-item">
                                  <i className="fa-li fa fa-spinner fa-spin"></i>
                                </a>
                              ) : transmissionfilter.transmission ? (
                                transmissionfilter.transmission.map(
                                  (item, key) => (
                                    // console.log(item+' : '+key)
                                    <a
                                      key={key}
                                      className="dropdown-item"
                                      onClick={(e) =>
                                        this.selectOption(
                                          `transmission_type`,
                                          item.car_transmission
                                        )
                                      }
                                    >
                                      {item.car_transmission} ({item.total})
                                    </a>
                                  )
                                )
                              ) : (
                                <a className="dropdown-item">
                                  <i className="fa-li fa fa-spinner fa-spin"></i>
                                </a>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-12 views">
                        <button
                          type="button"
                          className="btn btn-danger"
                          onClick={(e) => this.search()}
                        >
                          Search Vehicles
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {homepagedata.aboutus ? ReactHtmlParser(homepagedata.aboutus) : ""}
        {homepagedata.howitworks ? (
          <section ref={this.wrapperRef} className="how-it-works py-5">
            <div className="container">
              <div className="row">
                <div className="col-md-12 text-center">
                  <h2 className="mb-2">HOW IT WORKS?</h2>
                  {this.state.showvideo
                    ? ReactHtmlParser(homepagedata.howitworks)
                    : ""}
                </div>
              </div>
            </div>
          </section>
        ) : (
          ""
        )}
        {homepagedata.ourtrade ? (
          <section className="how-it-works py-4">
            <div className="container">
              <div className="row">
                <div className="col-md-12 text-center">
                  <h2 className="mb-2">Our Trade In Service</h2>
                  {this.state.showvideo
                    ? ReactHtmlParser(homepagedata.ourtrade)
                    : ""}
                </div>
              </div>
            </div>
          </section>
        ) : (
          ""
        )}
        {homepagedata.whyus ? ReactHtmlParser(homepagedata.whyus) : ""}

        <div className="reviews">
          <img width="200" height="60" src="assets/images/Reviewsicon.webp" />
          see what other are saying about us on google
        </div>
        <div className="footer_new">
          <div className="left_half_box">
            <h2>OUR OFFICES</h2>
            <div className="footer_box">
              <div className="left_foot_box">
                <img width="60" height="60" src="assets/images/icon-4.png" />
              </div>
              <div className="right_foot_box">
                <h5>ADDRESS</h5>
                <p>
                  51 Bracken Rd, Sandyford Business Park, Sandyford, Dublin, D18
                  CV48, Ireland
                </p>
              </div>
            </div>
            <div className="footer_box">
              <div className="left_foot_box">
                <img width="60" height="60" src="assets/images/icon-5.png" />
              </div>
              <div className="right_foot_box">
                <h5>EMAIL</h5>
                <p>info@ukcarimports.ie</p>
              </div>
            </div>
          </div>
          <div className="right_half_box">
            {this.state.showvideo ? (
              <iframe
                style={{ border: "0" }}
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2385.907439518616!2d-6.218018634164293!3d53.27327807996377!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4867054677fba92f%3A0x23d83dd2dc00eb6e!2sUK%20Car%20Imports!5e0!3m2!1sen!2sin!4v1589012063630!5m2!1sen!2sin"
                width="100%"
                height="500"
                frameBorder="0"
                allowFullScreen="allowFullScreen"
                aria-hidden="false"
              ></iframe>
            ) : (
              ""
            )}
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  carsdata: state.car.carsdatanew,
  carsloading: state.car.carsloadingnew,
  filteredcardata: state.car.filteredcardatanew,
  filteredcarloading: state.car.filteredcarloadingnew,
  filterloading: state.car.filterloadingnew,
  filterdata: state.car.filterdatanew,
  filtermodelloading: state.car.filtermodelloading,
  filtermodeldata: state.car.filtermodeldata,
  filterbodystyleloading: state.car.filterbodystyleloading,
  filterbodystyledata: state.car.filterbodystyledata,

  makedata: state.filter.makesdata,
  bodystyledata: state.filter.bodystyledata,
  modeldata: state.filter.modelsdata,
  fueldata: state.filter.fueldata,
  transmissiondata: state.filter.transmissiondata,

  makeloading: state.filter.makesloading,
  modelloading: state.filter.modelsloading,
  fuelloading: state.filter.fuelloading,
  bodystyleloading: state.filter.bodystyleloading,
  transmissionloading: state.filter.transmissionloading,

  page: state.common.page,
  pageloading: state.common.pageloading,
  homepagedata: state.common.homepagedata,
  homepageloading: state.common.homepageloading,
});
export default connect(mapStateToProps)(HomePage);
// export default HomePage;
