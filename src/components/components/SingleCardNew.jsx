import React, { Component } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import SimpleReactValidator from "simple-react-validator";
import { apiBaseUrl } from "../../store/helpers/common";
import toastr from "reactjs-toastr";
import "reactjs-toastr/lib/toast.css";
import { getcar } from "../../store/actions/carActions";
import { connect } from "react-redux";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import formatNumber from "simple-format-number";
import { NavLink } from "react-router-dom";
import $ from "jquery";
import { Helmet } from "react-helmet";
import parseJwt from "../../store/helpers/common";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

import {
  Elements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  PaymentRequestButtonElement,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import Tooltip from "rc-tooltip";
import "rc-tooltip/assets/bootstrap.css";
import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe("pk_live_hvQGGPsKi13bSSCm2zoKHfMi00RCjfXZZS");
// const stripePromise = loadStripe('pk_test_z3Pj22fEGh0WuS9Zb4eiuSQ300xG8EDdlr');

const CheckoutForm = ({ info, onSuccessfulCheckout, validateform }) => {
  // console.log(info)
  const stripe = useStripe();
  const elements = useElements();
  const handleSubmit = async (event) => {
    event.preventDefault();
    var validate = validateform();
    // console.log(validate)
    if (validate) {
      var card = elements.getElement(CardNumberElement);
      if (!stripe || !elements) {
        console.log("error");
        return;
      }
      $(".btn-pay").attr("disabled", "disabled");
      $(".btn-pay").text("Please Wait");
      const result = await stripe.createToken(card);
      if (!result.error) {
        onSuccessfulCheckout(result.token.id);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Card Number</label>
      <CardNumberElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      <label>Expiry</label>
      <CardExpiryElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      <label>CVC</label>
      <CardCvcElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      {/* <CardElement /> */}
      <br />
      <button className="btn btn-pay" type="submit" disabled={!stripe}>
        Pay
      </button>
    </form>
  );
};

class SingleCar extends Component {
  constructor(props) {
    console.log("single car new");
    super(props);
    this.formValidator = new SimpleReactValidator();
    this.payformValidator = new SimpleReactValidator();
    this.state = {
      cardata: "",
      car_images: "",
      car_specification: "",
      car_id: "",
      Name: "",
      Email: "",
      Phone: "",
      twelvemonthwarrenty: "",
      premiummax395: "",
      vrt_proccessing: 1,
      transferuktodub: 1,
      homedelivry: "0",
      tnc: "",
      car_features: "",
      featured_image: "",
      isSubmit: false,
      isLoggedIn: "",
      userrole: "",
      deposit_price: 0,
      car_c_p: 0,
      car_n: 0,
      deposit_price: 0,
      warranty: 0,
      // inspection: 295,
      inspection: 0,
      inspection_fee: 1,
      vrt_price: 295,
      // transfer_price: 450,
      transfer_price: 0,
      delivery_price: 0,
      photoIndex: 0,
      isOpen: false,
      pay_name: "",
      pay_email: "",
      pay_address: "",
      pay_city: "",
      pay_country: "",
      pay_amount: 200,
      car_vrt_id: "",
      vrt_payment: false,
      pay_loader: false,
      activepayment: "",
      includeVRTNOX: false,
      includeDelivery: false,
      includeCarWarranty: false,
      warranty_val: 0,
    };
  }
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
    if (e.target.name === "twelvemonthwarrenty") {
      var warranty = 0;
      if (e.target.value === "") {
        warranty = 0;
      } else if (e.target.value === "premiummax395") {
        warranty = 395;
      } else if (e.target.value === "premiumplus395") {
        warranty = 395;
      } else if (e.target.value === "premiumpowertrain295") {
        warranty = 295;
      } else if (e.target.value === "premiumcomp395") {
        warranty = 395;
      } else {
        warranty = 0;
      }
      this.setState({
        warranty: warranty,
      });
    }
  };
  handleCheckbox = (e) => {
    let value_checked = "0";
    if (e.target.checked == true) {
      value_checked = "1";
      if (e.target.name === "vrt_proccessing") {
        this.setState({
          vrt_price: 295,
        });
      } else if (e.target.name === "transferuktodub") {
        this.setState({
          transfer_price: this.state.transfer_price,
        });
      } else if (e.target.name === "homedelivry") {
        this.setState({
          delivery_price: 250,
        });
      }
    } else if (e.target.checked !== true) {
      if (e.target.name === "vrt_proccessing") {
        this.setState({
          vrt_price: 0,
        });
      } else if (e.target.name === "transferuktodub") {
        this.setState({
          transfer_price: 0,
        });
      } else if (e.target.name === "homedelivry") {
        this.setState({
          delivery_price: 0,
        });
      } else {
        value_checked = "";
      }
    }
    this.setState({
      [e.target.name]: value_checked,
    });
  };
  componentDidMount() {
    const car_id = this.props.match.params.id;
    this.setState({ car_id: car_id, car_vrt_id: car_id });
    this.props.dispatch(getcar(car_id));
  }

  componentWillReceiveProps(nextProps) {
    // if(this.props.cardata !== nextProps.cardataa){
    this.setState({
      cardata: nextProps.cardataa,
      car_features: nextProps.cardataa.features_options,
      car_specification: nextProps.cardataa.techinal_specifications,
      car_images: nextProps.cardataa.decoded_images,
    });

    if (nextProps.cardataa.car_info) {
      this.setState({
        deposit_price: nextProps.cardataa.car_info.final_price,
        car_c_p: nextProps.cardataa.car_info.final_price,
        car_n: nextProps.cardataa.car_info.nox,
        transfer_price: nextProps.cardataa.car_info.uktransfer_cost,
      });
    }
  }
  setphone = (e) => {
    this.setState({ Phone: e });
  };
  signIn = (e) => {
    window.location.replace("/sign-in");
  };
  submitform = (ev) => {
    let validate = this.formValidator;
    if (validate.allValid()) {
      this.setState({ isSubmit: true });
      window.grecaptcha.ready(
        function () {
          window.grecaptcha
            .execute("6LdJejIaAAAAABPap2izWvDOKZgwXHDlo4KVmtLs", {
              action: "submit",
            })
            .then(
              function (token) {
                this.submitdeposit(token);
              }.bind(this)
            );
        }.bind(this)
      );
    } else {
      console.log("tnc: " + this.state.tnc);
      validate.showMessages();
      this.forceUpdate();
    }
  };
  submitdeposit = (token) => {
    if (token) {
      const {
        Name,
        Email,
        Phone,
        inspection_fee,
        twelvemonthwarrenty,
        premiummax395,
        vrt_proccessing,
        transferuktodub,
        homedelivry,
        tnc,
        car_id,
      } = this.state;
      const request = new Request(`${apiBaseUrl}/submit-form`, {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json",
          "X-Auth-Token": `${localStorage.getItem("token")}`,
        }),
        body: JSON.stringify({
          Name,
          Email,
          Phone,
          inspection_fee,
          twelvemonthwarrenty,
          premiummax395,
          vrt_proccessing,
          transferuktodub,
          homedelivry,
          tnc,
          car_id,
        }),
      });
      return fetch(request)
        .then((res) => res.json())
        .then((data) => {
          // console.log('data :'+JSON.stringify(data.ResponseCode));
          if (data.ResponseCode == 1) {
            toastr.success(
              "Form Submitted Successfully, We will get back to you soon.",
              { displayDuration: 3000 }
            );
            this.setState({ isSubmit: false });
            window.location.reload();
          }
        })
        .catch((err) => {
          this.setState({ isSubmit: false });
          console.log("err :" + err);
        });
    }
  };
  getVehicle = (car_id) => {
    $("html,body").animate({ scrollTop: 0 }, "slow");
    this.setState({ car_id: car_id });
    this.props.dispatch(getcar(car_id));
  };
  onImageClick = (img) => {
    this.setState({ featured_image: img });
  };
  payformvalidate = (e) => {
    let validate = this.payformValidator;
    if (validate.allValid()) {
      return true;
    } else {
      validate.showMessages();
      this.forceUpdate();
      $("html,body").animate({ scrollTop: 0 }, "slow");
      return false;
    }
  };
  paymentInitiate = (token) => {
    if (token) {
      this.setState({ pay_loader: true });
      const {
        pay_name,
        pay_email,
        pay_address,
        pay_city,
        pay_country,
        pay_amount,
        car_vrt_id,
      } = this.state;
      const tokenn = token;
      // const request = new Request(`${apiBaseUrl}/testmakepayment`, {
      const request = new Request(`${apiBaseUrl}/makepayment`, {
        method: "POST",
        body: JSON.stringify({
          tokenn,
          pay_name,
          pay_email,
          pay_address,
          pay_city,
          pay_country,
          pay_amount,
          car_vrt_id,
        }),
        headers: new Headers({
          "Content-Type": "application/json",
          "X-Auth-Token": `${localStorage.getItem("token")}`,
        }),
      });
      return fetch(request)
        .then((res) => res.json())
        .then((data) => {
          this.setState({ pay_loader: false });
          if (data.ResponseCode === "1") {
            this.setState({ pay_loader: false });
            toastr.success(data.ResponseText, { displayDuration: 1500 });
            // toastr.success('Redirecting to Dashboard', { displayDuration: 1500 });
            this.setState({ vrt_payment: true });
            $(".btn-pay").removeAttr("disabled", "disabled");
            $(".btn-pay").text("Payment Dne");
            // $('#pay').modal('hide');
            window.$("#pay").modal("hide");
            this.setState({
              includeVRTNOX: true,
            });
            // this.props.dispatch(getUserdetails(this.state.user_id));
          } else {
            this.setState({ pay_loader: false });
            toastr.error(data.ResponseText, { displayDuration: 1500 });
          }
        })
        .catch((err) => {});
    } else {
      alert("error");
    }
  };
  setpay = (e) => {
    this.setState({
      activepayment: e.target.value,
    });
  };
  includeHomeDelivery = (e) => {
    this.setState({
      includeDelivery: e.target.checked,
    });
  };
  includeWarranty = (e) => {
    this.setState({
      includeCarWarranty: e.target.checked,
    });
  };
  includeVRT = (e) => {
    this.setState({
      includeVRTNOX: e.target.checked,
    });
  };
  handleWarrantyChange = (e) => {
    let value = parseInt(e.target.value);
    this.setState({
      warranty_val: value,
    });
  };
  paycar = () => {
    window.$("#pay").modal("show");
  };
  closeModal = () => {
    window.$("#check").prop("checked", false);
    window.$("#pay").modal("hide");
  };
  render() {
    const {
      car_c_p,
      car_n,
      pay_name,
      pay_email,
      pay_address,
      pay_city,
      pay_country,
      pay_amount,
      photoIndex,
      isOpen,
      deposit_price,
      warranty,
      vrt_price,
      delivery_price,
      transfer_price,
      isLoggedIn,
      car_features,
      featured_image,
      cardata,
      car_images,
      car_specification,
    } = this.state;
    var caryear = "";
    console.log(cardata);
    if (cardata) {
      let date = cardata.registration_date.split("/");
      let year = date[2];
      let month = date[1];
      month = month > 6 ? 2 : 1;
      year = year.replace("20", "");
      caryear = date[2] + " (" + year + month + ")";
    }
    var equipmentArray = [];
    if (cardata.equipment_declaration) {
      var equipmentArray = cardata?.equipment_declaration.split(",");
    }
    // console.log(typeof(car_specification))
    let performance = [];
    let driver_convernience = [];
    let safety = [];
    let exterior_feature = [];
    let interior_feature = [];
    let dimensions = [];
    Object.keys(car_specification).forEach(function (key) {
      if (car_specification[key].specName == "Driver Convenience") {
        driver_convernience = car_specification[key].specs;
      } else if (car_specification[key].specName == "Economy & performance") {
        performance = car_specification[key].specs;
      } else if (car_specification[key].specName == "Safety") {
        safety = car_specification[key].specs;
      } else if (car_specification[key].specName == "Exterior Features") {
        exterior_feature = car_specification[key].specs;
      } else if (car_specification[key].specName == "Interior Features") {
        interior_feature = car_specification[key].specs;
      } else if (car_specification[key].specName == "Dimensions") {
        dimensions = car_specification[key].specs;
      }
    });

    let i = 0;
    let j = 0;
    let images = [];
    Object.keys(car_images).forEach(function (key) {
      images.push(car_images[key].image);
    });
    let total = 0;
    if (cardata.car_info) {
      // total = cardata.car_info.final_price+this.state.vrt_price+this.state.transfer_price+this.state.inspection;
      total = cardata.car_info.final_price + this.state.inspection;
    }
    if (this.state.vrt_payment) {
      if (this.state.includeVRTNOX) {
        // total = cardata.car_info.final_price+this.state.vrt_price+this.state.transfer_price+this.state.inspection;
        total = cardata.car_info.final_price + this.state.inspection;
      }
    }
    if (this.state.includeCarWarranty) {
      total = total + this.state.warranty_val;
    }
    if (this.state.includeDelivery) {
      total = total + 250;
    }
    // console.log(total)
    return (
      <>
        <Helmet>
          <script src="https://www.google.com/recaptcha/api.js?render=6LdJejIaAAAAABPap2izWvDOKZgwXHDlo4KVmtLs"></script>
        </Helmet>
        <div>
          {isOpen && (
            <Lightbox
              mainSrc={images[photoIndex]}
              nextSrc={images[(photoIndex + 1) % images.length]}
              prevSrc={images[(photoIndex + images.length - 1) % images.length]}
              onCloseRequest={() => this.setState({ isOpen: false })}
              onMovePrevRequest={() =>
                this.setState({
                  photoIndex: (photoIndex + images.length - 1) % images.length,
                })
              }
              onMoveNextRequest={() =>
                this.setState({
                  photoIndex: (photoIndex + 1) % images.length,
                })
              }
            />
          )}
        </div>
        {this.props.carloading ? (
          <div className="alltourticksloader">
            <img
              className="loader_img"
              src="/assets/images/straight-loader.gif"
            />
          </div>
        ) : cardata ? (
          <div className="single-car-details">
            <div className="container-fluid">
              <div className="vehicle theme-border-color-secondary">
                <a
                  href=""
                  target="_blank"
                  rel="nofollow noopener"
                  className="vehicle-header strong"
                >
                  {cardata.car_name}
                  {cardata.premium_car === 1 ? (
                    <span>
                      <i className="fa fa-star"></i>&nbsp;Premium
                    </span>
                  ) : cardata.is_manheim_car === "1" ? (
                    <span class="auction-sec">
                      <i class="fa fa-gavel"></i>&nbsp;Auction Vehicle
                    </span>
                  ) : (
                    ""
                  )}
                </a>
                {parseJwt(localStorage.getItem("token"))?.urxrs ===
                "$aHF667#79+57h%45" ? (
                  <>
                    {" "}
                    <a
                      target="_blank"
                      href={`https://www.autotrader.co.uk/car-details/${cardata.car_url}`}
                    >
                      See at Autotrader
                    </a>{" "}
                  </>
                ) : (
                  ""
                )}
                <div className="w3-row row">
                  <div className="col-md-6">
                    <div className="main-image w3-padding-0 w3-padding-top">
                      <div className="lagr-image">
                        <img
                          //   alt="MainImage"
                          onClick={() =>
                            this.setState({ photoIndex: 0, isOpen: true })
                          }
                          src={
                            featured_image
                              ? featured_image
                              : cardata.featured_image
                          }
                        />
                      </div>
                      <div className="w3-col l3 listing card-gallery w3-hide-medium w3-hide-small w3-display-container">
                        {car_images
                          ? car_images.map((car_image, index) => (
                              <img
                                onClick={() =>
                                  this.setState({
                                    photoIndex: index,
                                    isOpen: true,
                                  })
                                }
                                key={car_image.id}
                                alt=""
                                src={car_image.image}
                                className="w3-image w3-display-topleft w3-hide-small"
                              />
                            ))
                          : ""}
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="price-ttable mb-4">
                      {cardata.car_info ? (
                        <table className="price-table w3-table w3-padding-0 w3-margin-0 w3-margin-bottom">
                          <tbody>
                            {cardata.car_info.co2_tax === 0 ? (
                              <>
                                <tr>
                                  <td colspan="2">
                                    <div className="price-details-sec">
                                      <p className="heading">Price includes</p>
                                      <ul className="include-listing">
                                        <li className="item">
                                          <i
                                            class="fa fa-check-circle"
                                            aria-hidden="true"
                                          ></i>{" "}
                                          Rules of origin Duty - if applicable -
                                          @10%
                                        </li>
                                        <li className="item">
                                          <i
                                            class="fa fa-check-circle"
                                            aria-hidden="true"
                                          ></i>{" "}
                                          Mechanical Inspection
                                        </li>
                                        <li className="item">
                                          <i
                                            class="fa fa-check-circle"
                                            aria-hidden="true"
                                          ></i>{" "}
                                          Transport to Dublin
                                        </li>
                                        {cardata?.vrt_rate !== null ? (
                                          <li className="item">
                                            <i
                                              class="fa fa-check-circle"
                                              aria-hidden="true"
                                            ></i>{" "}
                                            VRT Processing
                                          </li>
                                        ) : (
                                          <li className="item">
                                            <i
                                              class="fa fa-times"
                                              aria-hidden="true"
                                              style={{ color: "red" }}
                                            ></i>{" "}
                                            VRT Processing
                                          </li>
                                        )}
                                        {cardata?.vrt_rate !== null ? (
                                          <li className="item">
                                            <i
                                              class="fa fa-check-circle"
                                              aria-hidden="true"
                                            ></i>{" "}
                                            VRT
                                          </li>
                                        ) : (
                                          <li className="item">
                                            <i
                                              class="fa fa-times"
                                              aria-hidden="true"
                                              style={{ color: "red" }}
                                            ></i>{" "}
                                            VRT
                                          </li>
                                        )}

                                        {cardata.premium_car === 1 ? (
                                          <li className="item">
                                            <i
                                              class="fa fa-check-circle"
                                              aria-hidden="true"
                                            ></i>{" "}
                                            VAT
                                          </li>
                                        ) : (
                                          <li className="item">
                                            <i
                                              class="fa fa-check-circle"
                                              aria-hidden="true"
                                            ></i>{" "}
                                            VAT
                                          </li>
                                        )}
                                      </ul>
                                      <p className="heading">
                                        Click to include
                                      </p>
                                      <input
                                        type="checkbox"
                                        onClick={(e) => this.includeWarranty(e)}
                                        defaultChecked={
                                          this.state.includeCarWarranty
                                        }
                                      />
                                      Warranty{" "}
                                      <NavLink
                                        to="/assets/pdf/premium_cover.pdf"
                                        target="_blank"
                                      >
                                        (More Details)
                                      </NavLink>{" "}
                                      &nbsp;&nbsp;&nbsp;
                                      {this.state.includeCarWarranty ? (
                                        <select
                                          name="include_warranty"
                                          onChange={(e) =>
                                            this.handleWarrantyChange(
                                              e,
                                              cardata
                                            )
                                          }
                                        >
                                          <option value="0">Select</option>
                                          <option value="395">
                                            Premium Max (+€395)
                                          </option>
                                          <option value="395">
                                            Premium Plus (+€395)
                                          </option>
                                          <option value="395">
                                            Premium Component (+€395)
                                          </option>
                                          <option value="295">
                                            Premium Power Train (+€295)
                                          </option>
                                        </select>
                                      ) : (
                                        ""
                                      )}
                                      {/* <br />
                                      <input
                                        type="checkbox"
                                        name="home_delivery"
                                        onClick={(e) =>
                                          this.includeHomeDelivery(e)
                                        }
                                        defaultChecked={
                                          this.state.includeDelivery
                                        }
                                      />
                                      Home Delivery <br /> */}
                                    </div>
                                  </td>
                                </tr>
                                <tr className="w3-border-top w3-border-bottom strong total">
                                  {cardata.is_manheim_car === "1" ? (
                                    <td className="w3-border-top">
                                      Auction Price:
                                    </td>
                                  ) : (
                                    <td className="w3-border-top">
                                      {cardata?.vrt_rate !== null
                                        ? "Total Price (Including VRT):"
                                        : "Total Price (Excluding VRT):"}
                                    </td>
                                    //   <td className="w3-border-top">
                                    //   <span>Total Price:</span>
                                    //   <h6>(Excluding VRT)</h6>
                                    // </td>
                                  )}
                                  {cardata?.vrt_rate !== null ? (
                                    <td className="w3-border-top">
                                      {/* {formatNumber(
        total + this.state.transfer_price,
        { fractionDigits: 0 }
      )} */}
                                      <span
                                        style={{
                                          fontSize: "18px",
                                          marginLeft: "5px",
                                        }}
                                      >
                                        €
                                        {`${formatNumber(
                                          cardata?.car_info
                                            ?.before_vrt_final_price +
                                            this.state.inspection,
                                          { fractionDigits: 0 }
                                        )}  (€${cardata?.vrt_rate})`}
                                      </span>{" "}
                                      €{" "}
                                      {formatNumber(
                                        cardata?.car_info
                                          ?.before_vrt_final_price +
                                          this.state.inspection +
                                          cardata?.vrt_rate,
                                        { fractionDigits: 0 }
                                      )}
                                    </td>
                                  ) : (
                                    <td className="w3-border-top">
                                      €{" "}
                                      {formatNumber(total, {
                                        fractionDigits: 0,
                                      })}
                                      {cardata?.car_info
                                        ?.before_vrt_final_price <= 25000 ? (
                                        <span
                                          style={{
                                            fontSize: "16px",
                                            marginLeft: "5px",
                                          }}
                                        >
                                          +/- €750 &nbsp;
                                          <Tooltip
                                            placement="top"
                                            overlay={
                                              "Auction prices vary, please allow €750 extra in your budget"
                                              // "Auction prices vary, please allow some leeway (10%) in your budget, espicially on Grade 1,2 or 3 vehicles as these are the most desirable."
                                            }
                                            arrowContent={
                                              <div className="rc-tooltip-arrow-inner"></div>
                                            }
                                            overlayStyle={{
                                              maxWidth: "170px",
                                            }}
                                          >
                                            <i
                                              className="fa fa-info-circle"
                                              aria-hidden="true"
                                            ></i>
                                          </Tooltip>
                                        </span>
                                      ) : (
                                        <span
                                          style={{
                                            fontSize: "16px",
                                            marginLeft: "5px",
                                          }}
                                        >
                                          +/- €1,500 &nbsp;
                                          <Tooltip
                                            placement="top"
                                            overlay={
                                              "Auction prices vary, please allow €1,500 extra in your budget"
                                              // "Auction prices vary, please allow some leeway (10%) in your budget, espicially on Grade 1,2 or 3 vehicles as these are the most desirable."
                                            }
                                            arrowContent={
                                              <div className="rc-tooltip-arrow-inner"></div>
                                            }
                                            overlayStyle={{
                                              maxWidth: "170px",
                                            }}
                                          >
                                            <i
                                              className="fa fa-info-circle"
                                              aria-hidden="true"
                                            ></i>
                                          </Tooltip>
                                        </span>
                                      )}
                                    </td>
                                  )}
                                </tr>
                              </>
                            ) : this.state.vrt_payment ? (
                              <>
                                <tr>
                                  <td colspan="2">
                                    <div className="price-details-sec">
                                      <p className="heading">Price includes</p>
                                      <ul className="include-listing">
                                        <li className="item">
                                          <i
                                            class="fa fa-check-circle"
                                            aria-hidden="true"
                                          ></i>{" "}
                                          Rules of origin Duty - if applicable -
                                          @10%
                                        </li>
                                        <li className="item">
                                          <i
                                            class="fa fa-check-circle"
                                            aria-hidden="true"
                                          ></i>{" "}
                                          Mechanical Inspection
                                        </li>
                                        <li className="item">
                                          <i
                                            class="fa fa-check-circle"
                                            aria-hidden="true"
                                          ></i>{" "}
                                          Transport to Dublin
                                        </li>
                                        {cardata?.vrt_rate !== null ? (
                                          <li className="item">
                                            <i
                                              class="fa fa-check-circle"
                                              aria-hidden="true"
                                            ></i>{" "}
                                            VRT Processing
                                          </li>
                                        ) : (
                                          <li className="item">
                                            <i
                                              class="fa fa-times"
                                              aria-hidden="true"
                                              style={{ color: "red" }}
                                            ></i>{" "}
                                            VRT Processing
                                          </li>
                                        )}
                                        {cardata.premium_car === 1 ? (
                                          <li className="item">
                                            <i
                                              class="fa fa-check-circle"
                                              aria-hidden="true"
                                            ></i>{" "}
                                            VAT
                                          </li>
                                        ) : (
                                          <li className="item">
                                            <i
                                              class="fa fa-check-circle"
                                              aria-hidden="true"
                                            ></i>{" "}
                                            VAT
                                          </li>
                                        )}
                                      </ul>
                                      <p className="heading">
                                        Click to includes
                                      </p>
                                      {this.state.includeVRTNOX
                                        ? " - €" +
                                          formatNumber(
                                            cardata.car_info.co2_tax +
                                              cardata.car_info.nox,
                                            { fractionDigits: 0 }
                                          )
                                        : ""}
                                      )<br />
                                      <input
                                        type="checkbox"
                                        onClick={(e) => this.includeWarranty(e)}
                                        defaultChecked={
                                          this.state.includeCarWarranty
                                        }
                                      />
                                      Warranty{" "}
                                      <NavLink
                                        to="/assets/pdf/premium_cover.pdf"
                                        target="_blank"
                                      >
                                        (More Details)
                                      </NavLink>{" "}
                                      &nbsp;&nbsp;&nbsp;
                                      {/* Warranty &nbsp;&nbsp;&nbsp; */}
                                      {this.state.includeCarWarranty ? (
                                        <select
                                          name="include_warranty"
                                          onChange={(e) =>
                                            this.handleWarrantyChange(
                                              e,
                                              cardata
                                            )
                                          }
                                        >
                                          <option value="0">Select</option>
                                          <option value="395">
                                            Premium Max (+€395)
                                          </option>
                                          <option value="395">
                                            Premium Plus (+€395)
                                          </option>
                                          <option value="395">
                                            Premium Component (+€395)
                                          </option>
                                          <option value="295">
                                            Premium Power Train (+€295)
                                          </option>
                                        </select>
                                      ) : (
                                        ""
                                      )}
                                      <br />
                                      <input
                                        type="checkbox"
                                        name="home_delivery"
                                        onClick={(e) =>
                                          this.includeHomeDelivery(e)
                                        }
                                        defaultChecked={
                                          this.state.includeDelivery
                                        }
                                      />
                                      Home Delivery <br />
                                    </div>
                                  </td>
                                </tr>
                                <tr className="w3-border-top w3-border-bottom strong total">
                                  {cardata.is_manheim_car === "1" ? (
                                    <td className="w3-border-top">
                                      Auction Price:
                                    </td>
                                  ) : (
                                    <td className="w3-border-top">
                                      {cardata?.vrt_rate !== null
                                        ? "Total Price (Including VRT):"
                                        : "Total Price (Excluding VRT):"}
                                    </td>
                                  )}
                                  {cardata?.vrt_rate !== null ? (
                                    <td className="w3-border-top">
                                      {/* {formatNumber(
                                        total + this.state.transfer_price,
                                        { fractionDigits: 0 }
                                      )} */}
                                      <span
                                        style={{
                                          fontSize: "14px",
                                          marginLeft: "5px",
                                          fontFamily: "Arial",
                                        }}
                                      >
                                        €
                                        {`${formatNumber(
                                          cardata?.car_info
                                            ?.before_vrt_final_price +
                                            this.state.inspection,
                                          { fractionDigits: 0 }
                                        )} (€${formatNumber(cardata?.vrt_rate, {
                                          fractionDigits: 0,
                                        })} VRT)`}
                                      </span>{" "}
                                      €
                                      {formatNumber(
                                        cardata?.car_info
                                          ?.before_vrt_final_price +
                                          this.state.inspection +
                                          cardata?.vrt_rate,
                                        { fractionDigits: 0 }
                                      )}
                                      {cardata?.car_info
                                        ?.before_vrt_final_price <= 25000 ? (
                                        <span
                                          style={{
                                            fontSize: "16px",
                                            marginLeft: "5px",
                                          }}
                                        >
                                          +/- €750 &nbsp;
                                          <Tooltip
                                            placement="top"
                                            overlay={
                                              "Auction prices vary, please allow €750 extra in your budget"
                                              // "Auction prices vary, please allow some leeway (10%) in your budget, espicially on Grade 1,2 or 3 vehicles as these are the most desirable."
                                            }
                                            arrowContent={
                                              <div className="rc-tooltip-arrow-inner"></div>
                                            }
                                            overlayStyle={{
                                              maxWidth: "170px",
                                            }}
                                          >
                                            <i
                                              className="fa fa-info-circle"
                                              aria-hidden="true"
                                            ></i>
                                          </Tooltip>
                                        </span>
                                      ) : (
                                        <span
                                          style={{
                                            fontSize: "16px",
                                            marginLeft: "5px",
                                          }}
                                        >
                                          +/- €1,500 &nbsp;
                                          <Tooltip
                                            placement="top"
                                            overlay={
                                              "Auction prices vary, please allow €1,500 extra in your budget"
                                              // "Auction prices vary, please allow some leeway (10%) in your budget, espicially on Grade 1,2 or 3 vehicles as these are the most desirable."
                                            }
                                            arrowContent={
                                              <div className="rc-tooltip-arrow-inner"></div>
                                            }
                                            overlayStyle={{
                                              maxWidth: "170px",
                                            }}
                                          >
                                            <i
                                              className="fa fa-info-circle"
                                              aria-hidden="true"
                                            ></i>
                                          </Tooltip>
                                        </span>
                                      )}
                                    </td>
                                  ) : (
                                    <td className="w3-border-top">
                                      €{" "}
                                      {formatNumber(total, {
                                        fractionDigits: 0,
                                      })}
                                      {cardata?.car_info
                                        ?.before_vrt_final_price <= 25000 ? (
                                        <span
                                          style={{
                                            fontSize: "16px",
                                            marginLeft: "5px",
                                          }}
                                        >
                                          +/- €750 &nbsp;
                                          <Tooltip
                                            placement="top"
                                            overlay={
                                              "Auction prices vary, please allow €750 extra in your budget"
                                              // "Auction prices vary, please allow some leeway (10%) in your budget, espicially on Grade 1,2 or 3 vehicles as these are the most desirable."
                                            }
                                            arrowContent={
                                              <div className="rc-tooltip-arrow-inner"></div>
                                            }
                                            overlayStyle={{
                                              maxWidth: "170px",
                                            }}
                                          >
                                            <i
                                              className="fa fa-info-circle"
                                              aria-hidden="true"
                                            ></i>
                                          </Tooltip>
                                        </span>
                                      ) : (
                                        <span
                                          style={{
                                            fontSize: "16px",
                                            marginLeft: "5px",
                                          }}
                                        >
                                          +/- €1,500 &nbsp;
                                          <Tooltip
                                            placement="top"
                                            overlay={
                                              "Auction prices vary, please allow €1,500 extra in your budget"
                                              // "Auction prices vary, please allow some leeway (10%) in your budget, espicially on Grade 1,2 or 3 vehicles as these are the most desirable."
                                            }
                                            arrowContent={
                                              <div className="rc-tooltip-arrow-inner"></div>
                                            }
                                            overlayStyle={{
                                              maxWidth: "170px",
                                            }}
                                          >
                                            <i
                                              className="fa fa-info-circle"
                                              aria-hidden="true"
                                            ></i>
                                          </Tooltip>
                                        </span>
                                      )}
                                    </td>
                                  )}
                                </tr>
                              </>
                            ) : (
                              <>
                                <tr>
                                  <td colspan="2">
                                    <div className="price-details-sec">
                                      <p className="heading">Price includes</p>
                                      <ul className="include-listing">
                                        <li className="item">
                                          <i
                                            class="fa fa-check-circle"
                                            aria-hidden="true"
                                          ></i>{" "}
                                          Rules of origin Duty - if applicable -
                                          @10%
                                        </li>
                                        <li className="item">
                                          <i
                                            class="fa fa-check-circle"
                                            aria-hidden="true"
                                          ></i>{" "}
                                          Mechanical Inspection
                                        </li>
                                        <li className="item">
                                          <i
                                            class="fa fa-check-circle"
                                            aria-hidden="true"
                                          ></i>{" "}
                                          Transport to Dublin
                                        </li>
                                        {cardata?.vrt_rate !== null ? (
                                          <li className="item">
                                            <i
                                              class="fa fa-check-circle"
                                              aria-hidden="true"
                                            ></i>{" "}
                                            VRT Processing
                                          </li>
                                        ) : (
                                          <li className="item">
                                            <i
                                              class="fa fa-times"
                                              aria-hidden="true"
                                              style={{ color: "red" }}
                                            ></i>{" "}
                                            VRT Processing
                                          </li>
                                        )}
                                        <li className="item">
                                          <i
                                            class="fa fa-check-circle"
                                            aria-hidden="true"
                                          ></i>{" "}
                                          VRT
                                        </li>
                                        {cardata.premium_car === 1 ? (
                                          <li className="item">
                                            <i
                                              class="fa fa-check-circle"
                                              aria-hidden="true"
                                            ></i>{" "}
                                            VAT
                                          </li>
                                        ) : (
                                          <li className="item">
                                            <i
                                              class="fa fa-check-circle"
                                              aria-hidden="true"
                                            ></i>{" "}
                                            VAT
                                          </li>
                                        )}
                                      </ul>
                                      <p className="heading">
                                        Click to include
                                      </p>
                                      <input
                                        type="checkbox"
                                        onClick={(e) => this.includeWarranty(e)}
                                        defaultChecked={
                                          this.state.includeCarWarranty
                                        }
                                      />
                                      Warranty{" "}
                                      <NavLink
                                        to="/assets/pdf/premium_cover.pdf"
                                        target="_blank"
                                      >
                                        (More Details)
                                      </NavLink>{" "}
                                      &nbsp;&nbsp;&nbsp;
                                      {this.state.includeCarWarranty ? (
                                        <select
                                          name="include_warranty"
                                          onChange={(e) =>
                                            this.handleWarrantyChange(
                                              e,
                                              cardata
                                            )
                                          }
                                        >
                                          <option value="0">Select</option>
                                          <option value="395">
                                            Premium Max (+€395)
                                          </option>
                                          <option value="395">
                                            Premium Plus (+€395)
                                          </option>
                                          <option value="395">
                                            Premium Component (+€395)
                                          </option>
                                          <option value="295">
                                            Premium Power Train (+€295)
                                          </option>
                                        </select>
                                      ) : (
                                        ""
                                      )}
                                      <br />
                                      <input
                                        type="checkbox"
                                        name="home_delivery"
                                        onClick={(e) =>
                                          this.includeHomeDelivery(e)
                                        }
                                        defaultChecked={
                                          this.state.includeDelivery
                                        }
                                      />
                                      Home Delivery <br />
                                    </div>
                                  </td>
                                </tr>
                                <tr className="w3-border-top w3-border-bottom strong total">
                                  {cardata.is_manheim_car === "1" ? (
                                    <td className="w3-border-top">
                                      Auction Price:
                                    </td>
                                  ) : (
                                    <td className="w3-border-top">
                                      {cardata?.vrt_rate !== null
                                        ? "Total Price (Including VRT):"
                                        : "Total Price (Excluding VRT):"}
                                    </td>
                                  )}
                                  {cardata?.vrt_rate !== null ? (
                                    <td className="w3-border-top">
                                      {/* {formatNumber(
                                        total + this.state.transfer_price,
                                        { fractionDigits: 0 }
                                      )} */}
                                      <span
                                        style={{
                                          fontSize: "14px",
                                          marginLeft: "5px",
                                          fontFamily: "Arial",
                                        }}
                                      >
                                        €
                                        {`${formatNumber(
                                          cardata?.car_info
                                            ?.before_vrt_final_price +
                                            this.state.inspection,
                                          { fractionDigits: 0 }
                                        )} (€${formatNumber(cardata?.vrt_rate, {
                                          fractionDigits: 0,
                                        })} VRT)`}
                                      </span>{" "}
                                      €
                                      {formatNumber(
                                        cardata?.car_info
                                          ?.before_vrt_final_price +
                                          this.state.inspection +
                                          cardata?.vrt_rate,
                                        { fractionDigits: 0 }
                                      )}
                                      {cardata?.car_info
                                        ?.before_vrt_final_price <= 25000 ? (
                                        <span
                                          style={{
                                            fontSize: "16px",
                                            marginLeft: "5px",
                                          }}
                                        >
                                          +/- €750 &nbsp;
                                          <Tooltip
                                            placement="top"
                                            overlay={
                                              "Auction prices vary, please allow €750 extra in your budget"
                                              // "Auction prices vary, please allow some leeway (10%) in your budget, espicially on Grade 1,2 or 3 vehicles as these are the most desirable."
                                            }
                                            arrowContent={
                                              <div className="rc-tooltip-arrow-inner"></div>
                                            }
                                            overlayStyle={{
                                              maxWidth: "170px",
                                            }}
                                          >
                                            <i
                                              className="fa fa-info-circle"
                                              aria-hidden="true"
                                            ></i>
                                          </Tooltip>
                                        </span>
                                      ) : (
                                        <span
                                          style={{
                                            fontSize: "16px",
                                            marginLeft: "5px",
                                          }}
                                        >
                                          +/- €1,500 &nbsp;
                                          <Tooltip
                                            placement="top"
                                            overlay={
                                              "Auction prices vary, please allow €1,500 extra in your budget"
                                              // "Auction prices vary, please allow some leeway (10%) in your budget, espicially on Grade 1,2 or 3 vehicles as these are the most desirable."
                                            }
                                            arrowContent={
                                              <div className="rc-tooltip-arrow-inner"></div>
                                            }
                                            overlayStyle={{
                                              maxWidth: "170px",
                                            }}
                                          >
                                            <i
                                              className="fa fa-info-circle"
                                              aria-hidden="true"
                                            ></i>
                                          </Tooltip>
                                        </span>
                                      )}
                                    </td>
                                  ) : (
                                    <td className="w3-border-top">
                                      €{" "}
                                      {formatNumber(total, {
                                        fractionDigits: 0,
                                      })}
                                      {cardata?.car_info
                                        ?.before_vrt_final_price <= 25000 ? (
                                        <span
                                          style={{
                                            fontSize: "16px",
                                            marginLeft: "5px",
                                          }}
                                        >
                                          +/- €750 &nbsp;
                                          <Tooltip
                                            placement="top"
                                            overlay={
                                              "Auction prices vary, please allow €750 extra in your budget"
                                              // "Auction prices vary, please allow some leeway (10%) in your budget, espicially on Grade 1,2 or 3 vehicles as these are the most desirable."
                                            }
                                            arrowContent={
                                              <div className="rc-tooltip-arrow-inner"></div>
                                            }
                                            overlayStyle={{
                                              maxWidth: "170px",
                                            }}
                                          >
                                            <i
                                              className="fa fa-info-circle"
                                              aria-hidden="true"
                                            ></i>
                                          </Tooltip>
                                        </span>
                                      ) : (
                                        <span
                                          style={{
                                            fontSize: "16px",
                                            marginLeft: "5px",
                                          }}
                                        >
                                          +/- €1,500 &nbsp;
                                          <Tooltip
                                            placement="top"
                                            overlay={
                                              "Auction prices vary, please allow €1,500 extra in your budget"
                                              // "Auction prices vary, please allow some leeway (10%) in your budget, espicially on Grade 1,2 or 3 vehicles as these are the most desirable."
                                            }
                                            arrowContent={
                                              <div className="rc-tooltip-arrow-inner"></div>
                                            }
                                            overlayStyle={{
                                              maxWidth: "170px",
                                            }}
                                          >
                                            <i
                                              className="fa fa-info-circle"
                                              aria-hidden="true"
                                            ></i>
                                          </Tooltip>
                                        </span>
                                      )}
                                    </td>
                                  )}
                                </tr>
                              </>
                            )}
                          </tbody>
                        </table>
                      ) : (
                        ""
                      )}
                      <div className="green-check w3-row">
                        Inspected After a Deposit
                      </div>
                      <div className="green-check w3-row">MOT History</div>
                      {(cardata.last_service_type ||
                        cardata.total_service ||
                        cardata.last_service !== "-" ||
                        cardata.last_service_mileage ||
                        cardata.service_notes ||
                        cardata.mot_date !== "-") && (
                        <div className="green-check w3-row">
                          Service History
                        </div>
                      )}

                      <div className="request ">
                        <div className="request-place text-center">
                          <p className="text-center">
                            We'll get in touch with you soon to confirm the
                            order and request the deposit.
                          </p>
                          <div className="financing">
                            {
                              <button
                                type="button"
                                className="btn btn deposit"
                                data-toggle="modal"
                                data-target={`#buynow`}
                              >
                                Place A Deposit
                              </button>
                            }
                          </div>
                        </div>
                      </div>
                      {/* <div className="how-it-work">
                        <a
                          className="strong"
                          href="https://www.youtube.com/watch?v=L-2oXvn2oko"
                          target="_blank"
                          rel="nofollow, noopener, noreferrer"
                        >
                          How It Works
                        </a>
                        <a
                          className="strong"
                          href="https://www.youtube.com/watch?v=2HwE_KZucIM"
                          target="_blank"
                          rel="nofollow, noopener, noreferrer"
                        >
                          Need to trade in?
                        </a>
                      </div>
                      <div className="how-it-work-img">
                        <a href="https://wipdidoo.ie/" target="_blank">
                          <img
                            className="section-img-ad"
                            src="/assets/images/WipdidooAd2.gif"
                          />
                        </a>
                      </div> */}
                    </div>
                  </div>
                </div>
                <div className="w3-row strong w3-border-top w3-block w3-padding">
                  {caryear ? caryear : ""}, {cardata.car_door},{" "}
                  {cardata.transmission_name} Transmission,{" "}
                  {cardata.fuel_type_name}, (
                  {formatNumber(Number(cardata?.mileage_km), {
                    fractionDigits: 0,
                  })}{" "}
                  KM ({cardata.mileage} Miles))
                </div>
                <div className="theme-vehicle-details theme-vehicle-section w3-row w3-block w3-round-small w3-padding-bottom w3-card-2 w3-padding-8">
                  <div className="w3-row w3-center">
                    <h2>Details</h2>
                  </div>
                  <div className="w3-row w3-block w3-border w3-round-small">
                    <div className="w3-col l66">
                      <table className="w3-table w3-padding-0">
                        <tbody>
                          <tr>
                            <td>Make</td>
                            <td>{cardata.make_name}</td>
                          </tr>
                          <tr>
                            <td>Model</td>
                            <td>{cardata.model_name}</td>
                          </tr>
                          {cardata.trim && cardata.trim !== null && (
                            <tr>
                              <td>VARIANT</td>
                              <td>{cardata.trim}</td>
                            </tr>
                          )}
                          <tr>
                            <td>Body Type</td>
                            <td>{cardata.body_style_name}</td>
                          </tr>
                          <tr>
                            <td>Fuel Type</td>
                            <td>{cardata.fuel_type_name}</td>
                          </tr>
                          <tr>
                            <td>Transmission</td>
                            <td>{cardata.transmission_name}</td>
                          </tr>
                          <tr>
                            <td>Doors</td>
                            <td>{cardata.car_door}</td>
                          </tr>
                          <tr>
                            <td>Colour</td>
                            <td>{cardata.color_name}</td>
                          </tr>
                          <tr>
                            <td>CO2 Emission</td>
                            <td>{cardata.co2_emission ? cardata?.co2_emission : "0 g/km"}</td>
                          </tr>
                          <tr>
                            <td>Condition Grade</td>
                            <td>Following Inspection</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div className="w3-col l66">
                      <table className="w3-table w3-padding-0">
                        <tbody>
                          <tr>
                            <td>Mileage</td>
                            <td>{cardata.mileage}</td>
                          </tr>
                          <tr>
                            <td> MOT HISTORY</td>
                            <td>
                              <a
                                href="https://www.check-mot.service.gov.uk/"
                                target="_blank"
                                style={{ color: "#b60b0c" }}
                              >
                                CHECK
                              </a>
                            </td>
                          </tr>
                          <tr>
                            <td> MECHANICAL & CONDITION REPORT</td>
                            <td>
                              <a
                                href={apiBaseUrl + "/report/Mech_And_Cond_Report.pdf"}
                                target="_blank"
                                style={{ color: "#b60b0c" }}
                              >
                                VIEW
                              </a>
                            </td>
                          </tr>
                          {/* <tr>
                            <td> CONDITION REPORT</td>
                            <td>
                              <a
                                href={cardata?.condition_report}
                                target="_blank"
                                style={{ color: "#b60b0c" }}
                              >
                                VIEW
                              </a>
                            </td>
                          </tr> */}
                          {/* <tr>
                            <td>GRADE</td>
                            <td>{cardata?.grade}</td>
                          </tr> */}
                          <tr>
                            <td> NUMBER OF OWNERS</td>
                            <td>{cardata?.owner}</td>
                          </tr>
                          {/* <tr>
                            <td> REG NUMBER</td>
                            <td>{cardata?.vrm || "-"}</td>
                          </tr> */}
                          
                          {cardata.inspection_url ? (
                            cardata.inspection_url != null ? (
                              <tr>
                                <td>Inspection URL</td>
                                <td>
                                  <a
                                    rel="nofollow noreferrer"
                                    target="_blank"
                                    href={cardata.inspection_url}
                                  >
                                    Check
                                  </a>
                                </td>
                              </tr>
                            ) : (
                              ""
                            )
                          ) : (
                            ""
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                <div className="theme-vehicle-section w3-row w3-block w3-round-small w3-card-2">
                  <div className="w3-row w3-block w3-round-small w3-padding-8">
                    <div className="w3-row w3-center">
                      <h2>Equipment</h2>
                    </div>
                    <div className="w3-row w3-block w3-round-small w3-border">
                      <div className="w3-row w3-block">
                        {
                          // console.log(JSON.parse(post.features_options))
                          equipmentArray && equipmentArray.length > 0
                            ? equipmentArray.map((feature) => (
                                <div className="w3-col xl4 m6">
                                  <div className="w3-row">
                                    <i
                                      className="fa fa-check-square-o"
                                      aria-hidden="true"
                                    ></i>{" "}
                                    {feature}
                                  </div>
                                </div>
                              ))
                            : ""
                        }
                        {/* <div className="w3-col xl4 m6">
                          <div className="w3-row ">
                            <i
                              className="fa fa-check-square-o"
                              aria-hidden="true"
                            ></i>{" "}
                            <span style={{ textTransform: "none" }}>
                              NOx Emission: {cardata?.nox_emission}
                            </span>
                          </div>
                        </div>
                        <div className="w3-col xl4 m6">
                          <div className="w3-row">
                            <i
                              className="fa fa-check-square-o"
                              aria-hidden="true"
                            ></i>{" "}
                            CO2 Emission: {cardata?.co2_emission}
                          </div>
                        </div> */}
                      </div>

                      <div className="w3-row w3-block">
                        <div className="w3-col xl4 m6 float-left">
                          {cardata.stat_code !== "" ||
                          cardata.trim ||
                          cardata.OMSP ||
                          cardata.yearly_dep_rate ||
                          cardata.monthly_dep_rate ||
                          cardata.mileage_dep ||
                          cardata.vrt_rate ? (
                            <>
                              {/* <label
                                className="historyLabel"
                                style={{
                                  marginBottom: 0,
                                  fontSize: 23,
                                }}
                              ></label>{" "}
                              {cardata.stat_code !== "" ? (
                                <div className="w3-row">
                                  <i
                                    className="fa fa-check-square-o"
                                    aria-hidden="true"
                                  ></i>{" "}
                                  Stat Code: {cardata.stat_code}
                                </div>
                              ) : (
                                <div className="w3-row">
                                  <i
                                    className="fa fa-check-square-o"
                                    aria-hidden="true"
                                  ></i>
                                  Stat Code:
                                </div>
                              )}
                              {cardata.trim !== "" ? (
                                <div className="w3-row">
                                  <i
                                    className="fa fa-check-square-o"
                                    aria-hidden="true"
                                  ></i>{" "}
                                  Trim: {cardata.trim}
                                </div>
                              ) : (
                                <div className="w3-row">
                                  <i
                                    className="fa fa-check-square-o"
                                    aria-hidden="true"
                                  ></i>{" "}
                                  Trim:
                                </div>
                              )}
                              {cardata.OMSP !== "" ? (
                                <div className="w3-row">
                                  <i
                                    className="fa fa-check-square-o"
                                    aria-hidden="true"
                                  ></i>{" "}
                                  OMSP: {cardata.OMSP}
                                </div>
                              ) : (
                                <div className="w3-row">
                                  <i
                                    className="fa fa-check-square-o"
                                    aria-hidden="true"
                                  ></i>{" "}
                                  OMSP:
                                </div>
                              )}
                              {cardata.yearly_dep_rate !== "" ? (
                                <div className="w3-row">
                                  <i
                                    className="fa fa-check-square-o"
                                    aria-hidden="true"
                                  ></i>{" "}
                                  Yearly Dep Rate: {cardata.yearly_dep_rate}
                                </div>
                              ) : (
                                <div className="w3-row">
                                  <i
                                    className="fa fa-check-square-o"
                                    aria-hidden="true"
                                  ></i>{" "}
                                  Yearly Dep Rate:
                                </div>
                              )}
                              {cardata.monthly_dep_rate !== "" ? (
                                <div className="w3-row">
                                  <i
                                    className="fa fa-check-square-o"
                                    aria-hidden="true"
                                  ></i>{" "}
                                  Monthly Dep Rate: {cardata.monthly_dep_rate}
                                </div>
                              ) : (
                                <div className="w3-row">
                                  <i
                                    className="fa fa-check-square-o"
                                    aria-hidden="true"
                                  ></i>{" "}
                                  Monthly Dep Rate:
                                </div>
                              )}
                              {cardata.mileage_dep !== "" ? (
                                <div className="w3-row">
                                  <i
                                    className="fa fa-check-square-o"
                                    aria-hidden="true"
                                  ></i>{" "}
                                  Mileage Dep: {cardata.mileage_dep}
                                </div>
                              ) : (
                                <div className="w3-row">
                                  <i
                                    className="fa fa-check-square-o"
                                    aria-hidden="true"
                                  ></i>{" "}
                                  Mileage Dep:
                                </div>
                              )}
                              {cardata.co2_rate !== null ? (
                                <div className="w3-row">
                                  <i
                                    className="fa fa-check-square-o"
                                    aria-hidden="true"
                                  ></i>{" "}
                                  co2 Rate: {cardata.co2_rate}
                                </div>
                              ) : (
                                <div className="w3-row">
                                  <i
                                    className="fa fa-check-square-o"
                                    aria-hidden="true"
                                  ></i>{" "}
                                  co2 Rate:
                                </div>
                              )}
                              {cardata.nox_rate !== null ? (
                                <div className="w3-row">
                                  <i
                                    className="fa fa-check-square-o"
                                    aria-hidden="true"
                                  ></i>{" "}
                                  Nox Rate: {cardata.nox_rate}
                                </div>
                              ) : (
                                <div className="w3-row">
                                  <i
                                    className="fa fa-check-square-o"
                                    aria-hidden="true"
                                  ></i>{" "}
                                  Nox Rate:
                                </div>
                              )}
                              {cardata.vrt_rate !== "" ? (
                                <div className="w3-row">
                                  <i
                                    className="fa fa-check-square-o"
                                    aria-hidden="true"
                                  ></i>{" "}
                                  VRT Rate: {cardata.vrt_rate}
                                </div>
                              ) : (
                                <div className="w3-row">
                                  <i
                                    className="fa fa-check-square-o"
                                    aria-hidden="true"
                                  ></i>{" "}
                                  VRT Rate:
                                </div>
                              )} */}
                            </>
                          ) : (
                            <>
                              <label
                                className="historyLabel"
                                style={{
                                  marginBottom: 0,
                                  fontSize: 23,
                                }}
                              ></label>{" "}
                              {cardata.stat_code === "" ? (
                                <div className="w3-row">
                                  <i
                                    className="fa fa-check-square-o"
                                    aria-hidden="true"
                                  ></i>
                                  Stat Code:
                                </div>
                              ) : (
                                ""
                              )}
                              <div className="w3-row">
                                <i
                                  className="fa fa-check-square-o"
                                  aria-hidden="true"
                                ></i>{" "}
                                Trim:
                              </div>
                              <div className="w3-row">
                                <i
                                  className="fa fa-check-square-o"
                                  aria-hidden="true"
                                ></i>
                                OMSP:
                              </div>
                              <div className="w3-row">
                                <i
                                  className="fa fa-check-square-o"
                                  aria-hidden="true"
                                ></i>
                                Yearly Dep Rate:
                              </div>
                              <div className="w3-row">
                                <i
                                  className="fa fa-check-square-o"
                                  aria-hidden="true"
                                ></i>
                                Monthly Dep Rate:
                              </div>
                              <div className="w3-row">
                                <i
                                  className="fa fa-check-square-o"
                                  aria-hidden="true"
                                ></i>
                                Mileage Dep:
                              </div>
                              <div className="w3-row">
                                <i
                                  className="fa fa-check-square-o"
                                  aria-hidden="true"
                                ></i>
                                VRT Rate:
                              </div>
                            </>
                          )}
                        </div>
                        <div className="w3-col xl4 m6 float-right">
                          {cardata.last_service_type ||
                          cardata.total_service ||
                          cardata.last_service !== "-" ||
                          cardata.last_service_mileage ||
                          cardata.service_notes ||
                          cardata.mot_date !== "-" ? (
                            <>
                              <label
                                className="historyLabel"
                                style={{
                                  marginBottom: 0,
                                  fontSize: 23,
                                }}
                              >
                                Service History
                              </label>{" "}
                              :
                              {cardata.last_service_type && (
                                <div className="w3-row">
                                  <i
                                    className="fa fa-check-square-o"
                                    aria-hidden="true"
                                  ></i>{" "}
                                  Service History: {cardata.last_service_type}
                                </div>
                              )}
                              {cardata.total_service && (
                                <div className="w3-row">
                                  <i
                                    className="fa fa-check-square-o"
                                    aria-hidden="true"
                                  ></i>{" "}
                                  Number of Service: {cardata.total_service}
                                </div>
                              )}
                              {cardata.last_service !== "-" && (
                                <div className="w3-row">
                                  <i
                                    className="fa fa-check-square-o"
                                    aria-hidden="true"
                                  ></i>{" "}
                                  Last Service: {cardata.last_service}
                                </div>
                              )}
                              {cardata.last_service_mileage && (
                                <div className="w3-row">
                                  <i
                                    className="fa fa-check-square-o"
                                    aria-hidden="true"
                                  ></i>{" "}
                                  Last Service Milage:{" "}
                                  {cardata.last_service_mileage}
                                </div>
                              )}
                              {cardata.service_notes && (
                                <div className="w3-row">
                                  <i
                                    className="fa fa-check-square-o"
                                    aria-hidden="true"
                                  ></i>{" "}
                                  Service Notes: {cardata.service_notes}
                                </div>
                              )}
                              {cardata.mot_date !== "-" && (
                                <div className="w3-row">
                                  <i
                                    className="fa fa-check-square-o"
                                    aria-hidden="true"
                                  ></i>{" "}
                                  MOT Expiry: {cardata.mot_date}
                                </div>
                              )}
                            </>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {car_specification ? (
                  <div className="theme-vehicle-section w3-row w3-block w3-round-small w3-card-2">
                    <div className="w3-row w3-block w3-round-small w3-padding-8">
                      <div className="w3-row w3-center">
                        <h2 className="m-0">Specifications</h2>
                        <div
                          className="w3-row"
                          style={{ color: "#000", float: "left" }}
                        >
                          STAT CODE :{" "}
                          {cardata?.stat_code ? cardata?.stat_code : "-"}
                        </div>
                      </div>
                      <div className="w3-row w3-block w3-round-small w3-border">
                        <div className="w3-row w3-block">
                          <Accordion className="text-left">
                            {performance.length > 0 ? (
                              <Card className="mt-2">
                                <Card.Header>
                                  <Accordion.Toggle
                                    as={Button}
                                    variant="link"
                                    eventKey="4"
                                  >
                                    <div className="theme-vehicle-details-open strong underline w3-row w3-btn w3-block w3-padding-0 w3-round-small">
                                      <a>Performance</a>
                                    </div>
                                  </Accordion.Toggle>
                                </Card.Header>
                                <Accordion.Collapse eventKey="4">
                                  <Card.Body>
                                    {performance.map((per) => (
                                      <div className="w3-col xl4 m6">
                                        <div className="w3-row">
                                          {per.name} :{" "}
                                          <span className="plain-text">
                                            {per.value}
                                          </span>
                                        </div>
                                      </div>
                                    ))}
                                  </Card.Body>
                                </Accordion.Collapse>
                              </Card>
                            ) : (
                              ""
                            )}
                            {driver_convernience.length > 0 ? (
                              <Card className="mt-2">
                                <Card.Header>
                                  <Accordion.Toggle
                                    as={Button}
                                    variant="link"
                                    eventKey="0"
                                  >
                                    <div className="theme-vehicle-details-open strong underline w3-row w3-btn w3-block w3-padding-0 w3-round-small">
                                      <a>Driver Convenience</a>
                                    </div>
                                  </Accordion.Toggle>
                                </Card.Header>
                                <Accordion.Collapse eventKey="0">
                                  <Card.Body>
                                    {driver_convernience.map((convenience) => (
                                      <div className="w3-col xl4 m6">
                                        <div className="w3-row">
                                          <i
                                            className="fa fa-check-square-o"
                                            aria-hidden="true"
                                          ></i>{" "}
                                          {convenience}
                                        </div>
                                      </div>
                                    ))}
                                  </Card.Body>
                                </Accordion.Collapse>
                              </Card>
                            ) : (
                              ""
                            )}
                            {safety.length > 0 ? (
                              <Card className="mt-2">
                                <Card.Header>
                                  <Accordion.Toggle
                                    as={Button}
                                    variant="link"
                                    eventKey="1"
                                  >
                                    <div className="theme-vehicle-details-open strong underline w3-row w3-btn w3-block w3-padding-0 w3-round-small">
                                      <a>Safety</a>
                                    </div>
                                  </Accordion.Toggle>
                                </Card.Header>
                                <Accordion.Collapse eventKey="1">
                                  <Card.Body>
                                    {safety.map((safety_feature) => (
                                      <div className="w3-col xl4 m6">
                                        <div className="w3-row">
                                          <i
                                            className="fa fa-check-square-o"
                                            aria-hidden="true"
                                          ></i>{" "}
                                          {safety_feature}
                                        </div>
                                      </div>
                                    ))}
                                  </Card.Body>
                                </Accordion.Collapse>
                              </Card>
                            ) : (
                              ""
                            )}
                            {exterior_feature.length > 0 ? (
                              <Card className="mt-2">
                                <Card.Header>
                                  <Accordion.Toggle
                                    as={Button}
                                    variant="link"
                                    eventKey="2"
                                  >
                                    <div className="theme-vehicle-details-open strong underline w3-row w3-btn w3-block w3-padding-0 w3-round-small">
                                      <a>Exterior Feature</a>
                                    </div>
                                  </Accordion.Toggle>
                                </Card.Header>
                                <Accordion.Collapse eventKey="2">
                                  <Card.Body>
                                    {exterior_feature.map((exter_feature) => (
                                      <div className="w3-col xl4 m6">
                                        <div className="w3-row">
                                          <i
                                            className="fa fa-check-square-o"
                                            aria-hidden="true"
                                          ></i>{" "}
                                          {exter_feature}
                                        </div>
                                      </div>
                                    ))}
                                  </Card.Body>
                                </Accordion.Collapse>
                              </Card>
                            ) : (
                              ""
                            )}
                            {interior_feature.length > 0 ? (
                              <Card className="mt-2">
                                <Card.Header>
                                  <Accordion.Toggle
                                    as={Button}
                                    variant="link"
                                    eventKey="3"
                                  >
                                    <div className="theme-vehicle-details-open strong underline w3-row w3-btn w3-block w3-padding-0 w3-round-small">
                                      <a>Interior Feature</a>
                                    </div>
                                  </Accordion.Toggle>
                                </Card.Header>
                                <Accordion.Collapse eventKey="3">
                                  <Card.Body>
                                    {interior_feature.map((int_feature) => (
                                      <div className="w3-col xl4 m6">
                                        <div className="w3-row">
                                          <i
                                            className="fa fa-check-square-o"
                                            aria-hidden="true"
                                          ></i>{" "}
                                          {int_feature}
                                        </div>
                                      </div>
                                    ))}
                                  </Card.Body>
                                </Accordion.Collapse>
                              </Card>
                            ) : (
                              ""
                            )}
                            {dimensions.length > 0 ? (
                              <Card className="mt-2">
                                <Card.Header>
                                  <Accordion.Toggle
                                    as={Button}
                                    variant="link"
                                    eventKey="4"
                                  >
                                    <div className="theme-vehicle-details-open strong underline w3-row w3-btn w3-block w3-padding-0 w3-round-small">
                                      <a>Dimensions</a>
                                    </div>
                                  </Accordion.Toggle>
                                </Card.Header>
                                <Accordion.Collapse eventKey="4">
                                  <Card.Body>
                                    {dimensions.map((dimension) => (
                                      <div className="w3-col xl4 m6">
                                        <div className="w3-row">
                                          {dimension.name} : {dimension.value}
                                        </div>
                                      </div>
                                    ))}
                                  </Card.Body>
                                </Accordion.Collapse>
                              </Card>
                            ) : (
                              ""
                            )}
                          </Accordion>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  ""
                )}
                <div className="w3-row w3-border-top w3-block w3-center">
                  <div className="w3-col s6 w3-border-right">
                    <div className="w3-row w3-block">
                      <div className="w3-row w3-block">Registration Year:</div>
                      <div className="w3-row w3-block w3-large strong w3-date">
                        {/* {caryear ? caryear : ""} */}
                        {cardata.registration_date}
                      </div>
                    </div>
                  </div>
                  <div className="w3-col s6">
                    {cardata.auction_end_date != "" ? (
                      <>
                        <div className="w3-row w3-block">Available until</div>
                        <div className="w3-row w3-block w3-date">
                          {cardata.auction_end_date}
                        </div>
                      </>
                    ) : (
                      <div className="w3-row w3-block">
                        Available until further notice
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          "No Car"
        )}
        {/* Buy Vehicle */}
        <div className="modal fade" id={`buynow`} role="dialog">
          <div className="login team view-order modal-dialog modal-lg">
            <div className="vehicle_buy modal-content">
              <button
                type="button"
                className="close"
                id="close"
                data-dismiss="modal"
              >
                ×
              </button>
              <div className="row modal-body">
                <div
                  style={{ backgroundImage: `url(${cardata.featured_image})` }}
                  className="image_sec col-sm-6"
                >
                  <h2>Buy {cardata.car_name}</h2>
                </div>
                <div className="form_sec col-sm-6">
                  <h2>Place A Deposit</h2>
                  <Form ref={(el) => (this.form = el)}>
                    <Form.Group as={Row} controlId="formPlaintextName">
                      <Form.Label column sm="12">
                        Name
                      </Form.Label>
                      <Col sm="12">
                        <Form.Control
                          type="text"
                          name="Name"
                          placeholder="Name"
                          value={this.state.Name}
                          onChange={(e) => this.handleChange(e)}
                        />
                        {this.formValidator.message(
                          "Name",
                          this.state.Name,
                          "required"
                        )}
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formPlaintextName">
                      <Form.Label column sm="12">
                        Email
                      </Form.Label>
                      <Col sm="12">
                        <Form.Control
                          type="text"
                          name="Email"
                          placeholder="Email"
                          value={this.state.Email}
                          onChange={(e) => this.handleChange(e)}
                        />
                        {this.formValidator.message(
                          "Email",
                          this.state.Email,
                          "required|email"
                        )}
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formPlaintextName">
                      <Form.Label column sm="12">
                        Phone
                      </Form.Label>
                      <Col sm="12">
                        <PhoneInput
                          placeholder="Enter phone number"
                          defaultCountry="IE"
                          value={this.state.Phone}
                          className="form-input"
                          onChange={(e) => this.setphone(e)}
                        />
                        {this.formValidator.message(
                          "Phone",
                          this.state.Phone,
                          "required|phone"
                        )}
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formPlaintextName">
                      <Form.Label column sm="12">
                        12 months Warranty
                      </Form.Label>
                      <Col sm="12">
                        <Form.Control
                          size="sm"
                          as="select"
                          name="twelvemonthwarrenty"
                          onChange={(e) => this.handleChange(e)}
                        >
                          <option value="">WARRANTY</option>
                          <option value="premiummax395">
                            Premium Max (+€395)
                          </option>
                          <option value="premiumplus395">
                            Premium Plus (+€395)
                          </option>
                          <option value="premiumcomp395">
                            Premium Component (+€395)
                          </option>
                          <option value="premiumpowertrain295">
                            Premium Power Train (+€295)
                          </option>
                        </Form.Control>
                        {/* { this.formValidator.message('12 months Warranty', this.state.twelvemonthwarrenty ,'required') }*/}
                      </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="formPlaintextName">
                      <Col sm="12">
                        <Form.Control
                          className="check-box-style"
                          type="checkbox"
                          name="inspection"
                          placeholder="Inspection Fee"
                          value={this.state.inspection}
                          checked
                        />{" "}
                        Inspection Fee (+€295)
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formPlaintextName">
                      <Col sm="12">
                        <Form.Control
                          className="check-box-style"
                          type="checkbox"
                          name="transferuktodub"
                          placeholder="Transport UK to Dub"
                          value={this.state.transferuktodub}
                          checked
                        />{" "}
                        {`Transport UK to Dub (+€${transfer_price})`}
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formPlaintextName">
                      <Col sm="12">
                        <Form.Control
                          className="check-box-style"
                          type="checkbox"
                          name="homedelivry"
                          placeholder="Home Delivery"
                          value={this.state.homedelivry}
                          onChange={(e) => this.handleCheckbox(e)}
                        />{" "}
                        Home Delivery (+€250)
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formPlaintextName">
                      <Col sm="12">
                        <Form.Control
                          className="check-box-style"
                          type="checkbox"
                          name="tnc"
                          placeholder="Terms and Conditions"
                          value={this.state.tnc}
                          onChange={(e) => this.handleCheckbox(e)}
                        />{" "}
                        I accept Terms and Conditions and Privacy Policy
                        {this.formValidator.message(
                          "Terms and Conditions",
                          this.state.tnc,
                          "required"
                        )}
                      </Col>
                    </Form.Group>
                    {this.state.vrt_payment ? (
                      <Button
                        variant="primary"
                        className="btn btn deposit"
                        type="button"
                        onClick={(e) => this.submitform(e)}
                        disabled={this.state.isSubmit}
                      >
                        {this.state.isSubmit
                          ? "Please wait.."
                          : "Final Price: € " +
                            formatNumber(
                              deposit_price +
                                warranty +
                                this.state.inspection +
                                delivery_price,
                              { fractionDigits: 0 }
                            )}
                      </Button>
                    ) : (
                      <>
                        {/* <button type="button" className="btn btn get-deposit" data-toggle="modal" data-target={`#pay`}>Include VRT in the Total due for €2</button> */}
                        <Button
                          variant="primary"
                          className="btn btn deposit"
                          type="button"
                          onClick={(e) => this.submitform(e)}
                          disabled={this.state.isSubmit}
                        >
                          {this.state.isSubmit
                            ? "Please wait.."
                            : "Final Price: € " +
                              formatNumber(
                                car_c_p +
                                  warranty +
                                  this.state.inspection +
                                  delivery_price,
                                { fractionDigits: 0 }
                              )}
                        </Button>
                      </>
                    )}
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="modal fade" id={`signin`} role="dialog">
          <div className="login team view-order modal-dialog modal-lg">
            <div className="vehicle_buy modal-content">
              <button
                type="button"
                className="close"
                id="close"
                data-dismiss="modal"
              >
                ×
              </button>
              <div className="row modal-body">
                <div className="form_sec col-sm-12">
                  <h2>Place A Deposit</h2>
                  <p>
                    This contact form is available only for logged in users.
                  </p>
                  <NavLink to="#" onClick={(e) => this.signIn(e)}>
                    Login
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="modal fade"
          id={`pay`}
          role="dialog"
          data-backdrop="static"
          data-keyboard="false"
        >
          <div className="login team view-order modal-dialog modal-lg">
            <div className="vehicle_buy modal-content">
              <button
                type="button"
                className="close"
                id="close"
                onClick={(e) => this.closeModal()}
              >
                ×
              </button>
              {/* <button type="button" className="close" id="close" data-dismiss="modal">×</button> */}
              <div className="row modal-body">
                <div className="col-sm-12">
                  <h2>Look up VRT</h2>
                </div>
                {this.state.pay_loader ? (
                  <div className="col-sm-12">
                    <div className="pay-loader">
                      <img
                        className="loader_img"
                        src="/assets/images/straight-loader.gif"
                      />
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="col-sm-12">
                      <div className="row">
                        <div className="col-sm-7">
                          <div className="mobile-summary">
                            <h2 className="left-title">Summary</h2>
                            <div className="check-desc">
                              <table>
                                <tr>
                                  <th>Product</th>
                                  <th>Subtotal</th>
                                </tr>
                                <tr>
                                  <td>{cardata.car_name}</td>
                                  <td>€2.00</td>
                                </tr>
                                <tr>
                                  <td>Subtotal</td>
                                  <td>€2.00</td>
                                </tr>
                                <tr className="total-sec">
                                  <td>
                                    <strong>Total</strong>
                                  </td>
                                  <td>
                                    <strong>€2.00</strong>
                                  </td>
                                </tr>
                              </table>
                            </div>
                          </div>
                          <h2 className="left-title">Billing Details</h2>
                          <Form ref={(el) => (this.form = el)}>
                            <Form.Group as={Row} controlId="formPlaintextName">
                              <Col sm="6">
                                <Form.Label column sm="12">
                                  Name <span className="red-mark">*</span>
                                </Form.Label>
                                <Form.Control
                                  type="text"
                                  name="pay_name"
                                  placeholder="Name"
                                  value={this.state.pay_name}
                                  onChange={(e) => this.handleChange(e)}
                                />
                                {this.payformValidator.message(
                                  "Name",
                                  this.state.pay_name,
                                  "required"
                                )}
                              </Col>
                              <Col sm="6">
                                <Form.Label column sm="12">
                                  Email <span className="red-mark">*</span>
                                </Form.Label>
                                <Form.Control
                                  type="email"
                                  name="pay_email"
                                  placeholder="Email"
                                  value={this.state.pay_email}
                                  onChange={(e) => this.handleChange(e)}
                                />
                                {this.payformValidator.message(
                                  "Email",
                                  this.state.pay_email,
                                  "required|email"
                                )}
                              </Col>
                              <Col sm="12">
                                <Form.Label column sm="12">
                                  Address <span className="red-mark">*</span>
                                </Form.Label>
                                <Form.Control
                                  type="text"
                                  name="pay_address"
                                  placeholder="Address"
                                  value={this.state.pay_address}
                                  onChange={(e) => this.handleChange(e)}
                                />
                                {this.payformValidator.message(
                                  "Address",
                                  this.state.pay_address,
                                  "required"
                                )}
                              </Col>
                              <Col sm="6">
                                <Form.Label column sm="6">
                                  City <span className="red-mark">*</span>
                                </Form.Label>
                                <Form.Control
                                  type="text"
                                  name="pay_city"
                                  placeholder="City"
                                  value={this.state.pay_city}
                                  onChange={(e) => this.handleChange(e)}
                                />
                                {this.payformValidator.message(
                                  "City",
                                  this.state.pay_city,
                                  "required"
                                )}
                              </Col>
                              <Col sm="6">
                                <Form.Label column sm="12">
                                  Country <span className="red-mark">*</span>
                                </Form.Label>
                                <Form.Control
                                  type="text"
                                  name="pay_country"
                                  placeholder="Country"
                                  value={this.state.pay_country}
                                  onChange={(e) => this.handleChange(e)}
                                />
                                {this.payformValidator.message(
                                  "Country",
                                  this.state.pay_country,
                                  "required"
                                )}
                              </Col>
                            </Form.Group>
                          </Form>
                          <hr />
                        </div>
                        <div className="col-sm-5">
                          <h2 className="left-title">Car Details</h2>
                          <div className="image_sec">
                            {/* <h2>Buy {cardata.car_name}</h2> */}
                            <img src={`${cardata.featured_image}`} />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-12">
                      <div className="row">
                        <div className="col-sm-7">
                          <div className="car-charges section">
                            <h2 className="left-title">Payment Details</h2>
                            <div onChange={(e) => this.setpay(e)}>
                              {/* <input type="radio" value="MALE" name="gender"/> Male */}
                              {/* <div className="paypal-sec">
                                                            <input type="radio" value="paypal" name="pay" /> PayPal <img src="/assets/images/paypal.jpg"/>
                                                            </div> */}
                              {/* <br/>
                                                            {
                                                                this.state.activepayment
                                                                    ?
                                                                        this.state.activepayment === 'creditcard'
                                                                        ?
                                                                            ''
                                                                        :
                                                                            <div className="col-sm-12 card_section">
                                                                                <PayPalScriptProvider options={{ "client-id": "AS565exCyACTZ2LRBmae5mLOvS8legvXTuOBvf3BbeLIzgQb-L5Klgo9CmG6XAXdOvdVyaAqkRjfcLMj" }}>
                                                                                    <PayPalButtons style={{ layout: "horizontal" }} />
                                                                                </PayPalScriptProvider>
                                                                            </div>
                                                                    :
                                                                        ''
                                                            } */}
                              {/* <input type="radio" value="FEMALE" name="gender"/> Female */}
                              {/* <div className="creditcarinfo-sec">
                                                            <input type="radio" value="creditcard" name="pay"/> Credit Card <img src="/assets/images/pay_icons.png"/>
                                                            <br />
                                                            </div>
                                                            { */}
                              {/* this.state.activepayment
                                                                    ?
                                                                        this.state.activepayment === 'creditcard'
                                                                        ? */}
                              <div className="col-sm-12 card_section">
                                <Elements stripe={stripePromise}>
                                  <CheckoutForm
                                    info={this.state}
                                    onSuccessfulCheckout={(token) =>
                                      this.paymentInitiate(token)
                                    }
                                    validateform={(e) =>
                                      this.payformvalidate(e)
                                    }
                                  />
                                </Elements>
                              </div>
                              {/* :
                                                                            ''
                                                                    :
                                                                        ''
                                                            } */}
                            </div>
                            {/* {
                                                            this.state.activepayment
                                                                ?
                                                                    this.state.activepayment === 'creditcard'
                                                                    ?
                                                                        <div className="col-sm-12 card_section">
                                                                            <Elements stripe={stripePromise}>
                                                                                <CheckoutForm info={this.state} onSuccessfulCheckout={token => this.paymentInitiate(token)} validateform={e=>this.payformvalidate(e)}/>
                                                                            </Elements>
                                                                        </div>
                                                                    :
                                                                        <div className="col-sm-12 card_section">
                                                                            <button type="button">Pay With Paypal</button>
                                                                        </div>
                                                                :
                                                                    ''
                                                        }     */}
                            <div className="footer-payment">
                              <img src="/assets/images/srtipe_payments.png" />
                            </div>
                          </div>
                        </div>
                        <div className="col-sm-5">
                          <h2 className="left-title">Summary</h2>
                          <div className="check-desc">
                            <table>
                              <tr>
                                <th>Product</th>
                                <th>Subtotal</th>
                              </tr>
                              <tr>
                                <td>{cardata.car_name}</td>
                                <td>€2.00</td>
                              </tr>
                              <tr>
                                <td>Subtotal</td>
                                <td>€2.00</td>
                              </tr>
                              <tr className="total-sec">
                                <td>
                                  <strong>Total</strong>
                                </td>
                                <td>
                                  <strong>€2.00</strong>
                                </td>
                              </tr>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
                {/* <div style={{ 'backgroundImage': `url(${cardata.featured_image})`}} className="image_sec col-sm-6">
                                <h2>Buy {cardata.car_name}</h2>
                            </div>
                            <div className="form_sec col-sm-6">
                                <h2>Paying €2 for VRT</h2>
                                {
                                    this.state.pay_loader
                                    ?
                                        <div className="col-sm-12">
                                            <div className="pay-loader">
                                                <img className="loader_img" src="/assets/images/straight-loader.gif" />
                                            </div>
                                        </div>
                                    :
                                        <>
                                            <Form ref={el => (this.form = el)}>
                                                <Form.Group as={Row} controlId="formPlaintextName">
                                                    <Form.Label column sm="12">
                                                        Name
                                                    </Form.Label>
                                                    <Col sm="12">
                                                    <Form.Control type="text" name="pay_name" placeholder="Name" value={this.state.pay_name} onChange={ e => this.handleChange(e) } />
                                                    {this.payformValidator.message('Name', this.state.pay_name, 'required')}
                                                    </Col> 
                                                </Form.Group>
                                                <Form.Group as={Row} controlId="formPlaintextName">
                                                    <Form.Label column sm="12">
                                                    Email
                                                    </Form.Label>
                                                    <Col sm="12">
                                                    <Form.Control type="email" name="pay_email" placeholder="Email" value={this.state.pay_email} onChange={ e => this.handleChange(e) } />
                                                    {this.payformValidator.message('Email', this.state.pay_email, 'required|email')}
                                                    </Col> 
                                                </Form.Group>
                                                <Form.Group as={Row} controlId="formPlaintextName">
                                                    <Form.Label column sm="12">
                                                    Address
                                                    </Form.Label>
                                                    <Col sm="12">
                                                    <Form.Control type="text" name="pay_address" placeholder="Address" value={this.state.pay_address} onChange={ e => this.handleChange(e) } />
                                                    {this.payformValidator.message('Address', this.state.pay_address, 'required')}
                                                    </Col> 
                                                </Form.Group>
                                                <Form.Group as={Row} controlId="formPlaintextName">
                                                    <Form.Label column sm="12">
                                                    City
                                                    </Form.Label>
                                                    <Col sm="12">
                                                    <Form.Control type="text" name="pay_city" placeholder="City" value={this.state.pay_city} onChange={ e => this.handleChange(e) } />
                                                    {this.payformValidator.message('City', this.state.pay_city, 'required')}
                                                    </Col> 
                                                </Form.Group>
                                                <Form.Group as={Row} controlId="formPlaintextName">
                                                    <Form.Label column sm="12">
                                                    Country
                                                    </Form.Label>
                                                    <Col sm="12">
                                                    <Form.Control type="text" name="pay_country" placeholder="Country" value={this.state.pay_country} onChange={ e => this.handleChange(e) } />
                                                    {this.payformValidator.message('Country', this.state.pay_country, 'required')}
                                                    </Col> 
                                                </Form.Group>
                                            </Form>
                                            <div className="col-sm-12 card_section">
                                                <Elements stripe={stripePromise}>
                                                    <CheckoutForm info={this.state} onSuccessfulCheckout={token => this.paymentInitiate(token)} validateform={e=>this.payformvalidate(e)}/>
                                                </Elements>
                                            </div>
                                        </>
                                }
                                    <div className="row">
                                    <div className="col-sm-6">
                                        <label>Name</label>
                                        <input type="text" name="pay_name" value={pay_name} className="form-control" onChange={e => this.handleChange(e)} />
                                        {this.payformValidator.message('First Name', this.state.pay_name, 'required')}
                                    </div>
                                    <div className="col-sm-6">
                                        <label>Email</label>
                                        <input type="email" name="pay_email" value={pay_email} className="form-control" onChange={e => this.handleChange(e)} />
                                        {this.payformValidator.message('Email', this.state.pay_email, 'required|email')}
                                    </div>
                                    <div className="col-sm-6">
                                        <label>Address</label>
                                        <input type="text" name="pay_address" value={pay_address} className="form-control" onChange={e => this.handleChange(e)} />
                                        {this.payformValidator.message('Address', this.state.pay_address, 'required')}
                                    </div>
                                    <div className="col-sm-6">
                                        <label>City</label>
                                        <input type="text" name="pay_city" value={pay_city} className="form-control" onChange={e => this.handleChange(e)} />
                                        {this.payformValidator.message('City', this.state.pay_city, 'required')}
                                    </div>
                                    <div className="col-sm-6">
                                        <label>State</label>
                                        <input type="text" name="pay_country" value={pay_country} className="form-control" onChange={e => this.handleChange(e)} />
                                        {this.payformValidator.message('Country', this.state.pay_country, 'required')}
                                    </div>
                                </div> 
                                    <Elements stripe={stripePromise}>
                                    <CheckoutForm info={this.state} onSuccessfulCheckout={token => this.paymentInitiate(token)} validateform={e=>this.payformvalidate(e)}/>
                                </Elements> 
                            </div> */}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  cardataa: state.car.cardata,
  carloading: state.car.carloading,
});
export default connect(mapStateToProps)(SingleCar);
