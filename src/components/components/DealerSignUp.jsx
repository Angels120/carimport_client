import React, { Component } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import { connect } from "react-redux";
import { apiBaseUrl } from "../../store/helpers/common";
import toastr from "reactjs-toastr";
import { Helmet } from "react-helmet";
import $ from "jquery";
import SimpleReactValidator from "simple-react-validator";
import { getpage } from "../../store/actions/commonActions";

import {
  Elements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe("pk_live_hvQGGPsKi13bSSCm2zoKHfMi00RCjfXZZS");
// const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_TEST_KEY);

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
      $(".pays").attr("disabled", "disabled");
      $(".pays").text("Please Wait");
      const result = await stripe.createToken(card);
      if (result.error) {
        console.log(result.error.message);
        toastr.error(result.error.message, { displayDuration: 1500 });
        $(".pays").removeAttr("disabled", "disabled");
        $(".pays").text("Pay");
      } else {
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
              fontSize: "18px",
              color: "#424770",
              lineHeight: "35px",
              backgroundColor: "#fff",
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
              lineHeight: "35px",
              backgroundColor: "#fff",
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
            borderRadius: "5px",
            base: {
              fontSize: "16px",
              color: "#424770",
              lineHeight: "35px",
              backgroundColor: "#fff",
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
      <button className="btn btn-pay pays" type="submit" disabled={!stripe}>
        Pay and Get Started
      </button>
    </form>
  );
};

class DealerSignup extends Component {
  constructor(props) {
    super(props);
    this.payformValidator = new SimpleReactValidator();
    this.surveyformValidator = new SimpleReactValidator();
    this.state = {
      role: "",
      isLoggedIn: false,
      username: "",
      user_id: "",
      singleuser: [],
      faqs: "",
      pay_name: "",
      pay_owner: "",
      pay_zip: "",
      pay_email: "",
      pay_phone: "",
      pay_address: "",
      pay_amount: 20000,
      successmessage: false,
      successformmessage: false,
      message: "",
      rating: "",
    };
  }
  componentDidMount() {
    var slug = "dealersignup";
    this.props.dispatch(getpage(slug));
    // window.addEventListener('mouseout', (event) => {
    //     console.log(window.innerWidth)
    //     console.log(window.innerHeight)
    //     if(event.clientY <= 0 || event.clientX <= 0 || (event.clientX >= window.innerWidth || event.clientY >= window.innerHeight))
    //     {
    //         window.$('#bounce').modal('show');
    //     }
    // });
  }
  componentWillUnmount() {
    // window.$('#bounce').modal('show');
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      page: nextProps.page,
    });
    // console.log('page :'+JSON.stringify(nextProps.page));
  }
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  payformvalidate = (e) => {
    let validate = this.payformValidator;
    if (validate.allValid()) {
      return true;
    } else {
      validate.showMessages();
      this.forceUpdate();
      // $('html,body').animate({ scrollTop: 0 }, 'slow');
      return false;
    }
  };
  paymentInitiate = (token) => {
    if (token) {
      this.setState({ pay_loader: true });
      const {
        pay_name,
        pay_owner,
        pay_zip,
        pay_email,
        pay_phone,
        pay_amount,
        pay_address,
      } = this.state;
      const tokenn = token;
      const request = new Request(`${apiBaseUrl}/dealership-signup`, {
        method: "POST",
        body: JSON.stringify({
          tokenn,
          pay_name,
          pay_owner,
          pay_zip,
          pay_email,
          pay_phone,
          pay_amount,
          pay_address,
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
            $(".pays").removeAttr("disabled", "disabled");
            $(".pays").text("Payment Done");
            this.setState({
              successmessage: true,
            });
            this.props.history.push("/thankyou");
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
  submitRequest = (token) => {
    let validate = this.payformValidator;
    if (validate.allValid()) {
      this.setState({
        isSubmit: true,
      });
      const {
        pay_name,
        pay_owner,
        pay_zip,
        pay_email,
        pay_phone,
        pay_address,
      } = this.state;
      const request = new Request(`${apiBaseUrl}/signup-dealership-form`, {
        method: "POST",
        body: JSON.stringify({
          pay_name,
          pay_owner,
          pay_zip,
          pay_email,
          pay_phone,
          pay_address,
        }),
        headers: new Headers({
          "Content-Type": "application/json",
          "X-Auth-Token": `${localStorage.getItem("token")}`,
        }),
      });
      return fetch(request)
        .then((res) => res.json())
        .then((data) => {
          if (data.ResponseCode === "1") {
            toastr.success(data.ResponseText, { displayDuration: 1500 });
            // toastr.success('Redirecting to Dashboard', { displayDuration: 1500 });
            // this.setState({vrt_payment:true})
            // $('.pays').removeAttr("disabled", "disabled");
            // $('.pays').text("Payment Done");
            // $('#pay').modal('hide');
            // window.$('#pay').modal('hide');
            this.setState({
              successformmessage: true,
              isSubmit: false,
            });
            this.props.history.push("/thankyou");
            // this.props.dispatch(getUserdetails(this.state.user_id));
          } else {
            this.setState({ isSubmit: false });
            toastr.error(data.ResponseText, { displayDuration: 1500 });
          }
        })
        .catch((err) => {});
    } else {
      validate.showMessages();
      this.forceUpdate();
      return false;
    }
  };
  survey = () => {
    // add-dealership-review
    let validate = this.surveyformValidator;
    if (validate.allValid()) {
      this.setState({
        isSubmit: true,
      });
      const { rating, message } = this.state;
      const request = new Request(`${apiBaseUrl}/add-dealership-review`, {
        method: "POST",
        body: JSON.stringify({ rating, message }),
        headers: new Headers({
          "Content-Type": "application/json",
          "X-Auth-Token": `${localStorage.getItem("token")}`,
        }),
      });
      return fetch(request)
        .then((res) => res.json())
        .then((data) => {
          if (data.ResponseCode === "1") {
            toastr.success(data.ResponseText, { displayDuration: 1500 });
            // $('#pay').modal('hide');
            window.$("#bounce").modal("hide");
            this.setState({
              successformmessage: true,
              isSubmit: false,
            });
            // this.props.dispatch(getUserdetails(this.state.user_id));
          } else {
            this.setState({ isSubmit: false });
            toastr.error(data.ResponseText, { displayDuration: 1500 });
          }
        })
        .catch((err) => {});
    } else {
      validate.showMessages();
      this.forceUpdate();
      return false;
    }
  };
  render() {
    const { page } = this.state;
    // console.log(this.state.rating)
    return (
      <>
        <Helmet>
          <title>Dealer Sign Up &#8211; UK Car Imports</title>
          <meta
            name="description"
            content="UK Dealer Sign Up - UK Car Imports"
          />
        </Helmet>
        <div className="faq py-3">
          <div className="container p-0">
            <div className="row">
              {this.props.pageloading ? (
                <div className="alltourticksloader">
                  <img
                    className="loader_img"
                    src="/assets/images/straight-loader.gif"
                  />
                </div>
              ) : (
                ""
              )}
              {page ? (page.content ? page.content : "") : ""}
              {/* <div className="general-info">
                                <h1 className="title">UK Dealer Sign Up</h1>
                                <p>Welcome to our webpage dedicated to our UK Garage Clients</p>
                                <p>Most UK garages have sold used vehicles to clients in the South of Ireland. Irish buyers bring in some 100,000 used vehicles from the UK yearly. With Brexit everything has changed and buying from the UK has become more complex. Complexity puts buyers off especially when they find it almost impossible to calculate the total cost. To push back these barriers and make the process of buying used vehicles from UK garages as easy as possible <a target="_blank" href="https://ukcarimports.ie">www.ukcarimports.ie</a> has introduced a new offer.</p>
                                <p>We will advertise all your cars on our Premium* listing on <a target="_blank" href="https://ukcarimports.ie">www.ukcarimports.ie</a>  for a one off payment of €200 (£170). Your cars will be advertised for as long as you are happy to do so. The fee will cover the set up costs. Each car will be correctly priced to include import taxes, duty and VAT, so the price will be totally transparent. </p>
                                <p>As well as advertising your vehicles on <a target="_blank" href="https://ukcarimports.ie">www.ukcarimports.ie</a>, the number one ranked web platform for UK used vehicles in Ireland, we also offer a range of services to make it as straightforward as possible for Irish buyers to buy your cars.</p>
                                <p>Services we offer</p>
                                <ul>
                                    <li>Mechanical inspections of used vehicles for our Irish clients – restrictions permitting</li>
                                    <li>Competitive exchange rates for our Irish clients to purchase sterling</li>
                                    <li>Transport to Ireland</li>
                                    <li>NEW…..customs clearance, essential post Brexit</li>
                                    <li>NEW…..VAT Reclaim through our UK company/subsidiary …Carbuyerbuddy Ltd registered in England number 11597396</li>
                                    <li>Re-registration on Irish plates</li>
                                    <li>Warranties valid in Ireland</li>
                                    <li>Home delivery</li>
                                </ul>
                                <p>We manage the sale for you and you don’t even have to take part exchange</p>
                                <p>The new HMRC guidance on exporting used vehicles outside the UK is given <a target="_blank" href="https://www.gov.uk/guidance/vat-on-goods-exported-from-the-uk-notice-703">here.</a> Our UK subsidiary manages the export paperwork and VAT reclaim where a car is VAT Qualifying. We just need the VAT invoice from you were applicable.</p>
                                <p>To sign up simply fill in your company contact details below and the location where you list your vehicles online</p>
                                <p>You can pay now and get the process in motion or if you prefer you can contact me directly. Just click on ‘Request Contact’ and I will email you my details for a phone/Zoom call at your convenience.</p>
                                <p>If you would like to read a bit more about our service and the opportunity on offer please read on here.</p>
                            </div> */}
              <div className="col-md-2"></div>
              <div className="col-md-8 checkout-form-sec">
                <ul className="nav nav-tabs">
                  <li className="nav-item">
                    <a
                      className="nav-link active"
                      href="#tab1"
                      data-toggle="tab"
                    >
                      DEALER SIGN UP
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#tab2" data-toggle="tab">
                      Request Contact
                    </a>
                  </li>
                </ul>
                <div className="tab-content">
                  <div className="tab-pane active" id="tab1">
                    <Form ref={(el) => (this.form = el)}>
                      <Form.Group as={Row} controlId="formPlaintextName">
                        <Col sm="6">
                          <Form.Label column sm="12">
                            Name of Business <span className="red-mark">*</span>
                          </Form.Label>
                          <Form.Control
                            type="text"
                            name="pay_name"
                            placeholder="Name of Business"
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
                            Authorised Person/Owner{" "}
                            <span className="red-mark">*</span>
                          </Form.Label>
                          <Form.Control
                            type="text"
                            name="pay_owner"
                            placeholder="Authorised Person/Owner"
                            value={this.state.pay_owner}
                            onChange={(e) => this.handleChange(e)}
                          />
                          {this.payformValidator.message(
                            "Authorised Person/Owner",
                            this.state.pay_owner,
                            "required"
                          )}
                        </Col>
                        <Col sm="12">
                          <Form.Label column sm="12">
                            Address of Business{" "}
                            <span className="red-mark">*</span>
                          </Form.Label>
                          <Form.Control
                            type="text"
                            name="pay_address"
                            placeholder="Address of Business"
                            value={this.state.pay_address}
                            onChange={(e) => this.handleChange(e)}
                          />
                          {this.payformValidator.message(
                            "Address of Business",
                            this.state.pay_address,
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
                        <Col sm="6">
                          <Form.Label column sm="6">
                            Phone<span className="red-mark">*</span>
                          </Form.Label>
                          <Form.Control
                            type="text"
                            name="pay_phone"
                            placeholder="Phone"
                            value={this.state.pay_phone}
                            onChange={(e) => this.handleChange(e)}
                          />
                          {this.payformValidator.message(
                            "Phone",
                            this.state.pay_phone,
                            "required|numeric"
                          )}
                        </Col>
                        <Col sm="6">
                          <Form.Label column sm="6">
                            Post Code <span className="red-mark">*</span>
                          </Form.Label>
                          <Form.Control
                            type="text"
                            name="pay_zip"
                            placeholder="Post Code"
                            value={this.state.pay_zip}
                            onChange={(e) => this.handleChange(e)}
                          />
                          {this.payformValidator.message(
                            "Post Code",
                            this.state.pay_zip,
                            "required"
                          )}
                        </Col>
                      </Form.Group>
                    </Form>
                    <div className="col-sm-12 card_section">
                      <Elements stripe={stripePromise}>
                        <CheckoutForm
                          info={this.state}
                          onSuccessfulCheckout={(token) =>
                            this.paymentInitiate(token)
                          }
                          validateform={(e) => this.payformvalidate(e)}
                        />
                      </Elements>
                    </div>
                    {this.state.successmessage ? (
                      <div className="col-sm-12 card_section">
                        <p className="alert alert-success">
                          Thanks for payment. We will get back to you soon.
                        </p>
                      </div>
                    ) : (
                      ""
                    )}
                    <div className="sourcing footer-payment">
                      <img src="/assets/images/srtipe_payments.png" />
                    </div>
                  </div>
                  <div className="tab-pane" id="tab2">
                    <Form ref={(el) => (this.form = el)}>
                      <Form.Group as={Row} controlId="formPlaintextName">
                        <Col sm="6">
                          <Form.Label column sm="12">
                            Name of Business <span className="red-mark">*</span>
                          </Form.Label>
                          <Form.Control
                            type="text"
                            name="pay_name"
                            placeholder="Name of Business"
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
                            Authorised Person/Owner{" "}
                            <span className="red-mark">*</span>
                          </Form.Label>
                          <Form.Control
                            type="text"
                            name="pay_owner"
                            placeholder="Authorised Person/Owner"
                            value={this.state.pay_owner}
                            onChange={(e) => this.handleChange(e)}
                          />
                          {this.payformValidator.message(
                            "Authorised Person/Owner",
                            this.state.pay_owner,
                            "required"
                          )}
                        </Col>
                        <Col sm="12">
                          <Form.Label column sm="12">
                            Address of Business{" "}
                            <span className="red-mark">*</span>
                          </Form.Label>
                          <Form.Control
                            type="text"
                            name="pay_address"
                            placeholder="Address of Business"
                            value={this.state.pay_address}
                            onChange={(e) => this.handleChange(e)}
                          />
                          {this.payformValidator.message(
                            "Address of Business",
                            this.state.pay_address,
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
                        <Col sm="6">
                          <Form.Label column sm="6">
                            Phone<span className="red-mark">*</span>
                          </Form.Label>
                          <Form.Control
                            type="text"
                            name="pay_phone"
                            placeholder="Phone"
                            value={this.state.pay_phone}
                            onChange={(e) => this.handleChange(e)}
                          />
                          {this.payformValidator.message(
                            "Phone",
                            this.state.pay_phone,
                            "required|numeric"
                          )}
                        </Col>
                        <Col sm="6">
                          <Form.Label column sm="6">
                            Post Code <span className="red-mark">*</span>
                          </Form.Label>
                          <Form.Control
                            type="text"
                            name="pay_zip"
                            placeholder="Post Code"
                            value={this.state.pay_zip}
                            onChange={(e) => this.handleChange(e)}
                          />
                          {this.payformValidator.message(
                            "Post Code",
                            this.state.pay_zip,
                            "required"
                          )}
                        </Col>
                        <Col sm="12">
                          <button
                            className="mt-5 btn btn-pay"
                            type="button"
                            onClick={(e) => this.submitRequest()}
                            disabled={this.state.isSubmit}
                          >
                            {this.state.isSubmit
                              ? "PLEASE WAIT.."
                              : "Request Contact"}
                          </button>
                        </Col>
                      </Form.Group>
                    </Form>
                    {this.state.successformmessage ? (
                      <div className="col-sm-12 card_section">
                        <p className="alert alert-success">
                          Thanks for Request. We will get back to you soon.
                        </p>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
              <div className="col-md-2"></div>
              {/* {
                                page
                                ?
                                    page.aftercontent
                                    ?
                                        page.aftercontent
                                    :
                                        ""
                                :
                                    ''
                            } */}
              <div className="general-info">
                <br />
                <p>
                  If you would like to read a bit more about our service and the
                  opportunity on offer please read on here.
                </p>
              </div>
              <div className="faqs-list bs-example">
                <div className="card">
                  <div className="card-header" id="headingOne">
                    <h2 className="mb-0">
                      <button
                        type="button"
                        className="btn btn-link"
                        data-toggle="collapse"
                        data-target={`#collapse0`}
                      >
                        <i className="fa fa-plus"></i>Why advertise in Southern
                        Ireland?
                      </button>
                    </h2>
                  </div>
                  <div
                    id={`collapse0`}
                    className={`collapse show`}
                    aria-labelledby="headingOne"
                    data-parent="#accordionExample"
                  >
                    <div className="card-body">
                      <p>
                        With 5 million customers and over 100,000 purchases of
                        UK used cars a year, selling to Irish customers provides
                        a potentially lucrative export market for your business.
                        Our used vehicle advertisement platform,
                        www.ukcarimports.ie , is ranked Google Ranked No.1 for
                        UK used cars in Ireland. We can help you secure a
                        sustainable export market for your vehicles in the South
                        of Ireland.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="card">
                  <div className="card-header" id="headingOne">
                    <h2 className="mb-0">
                      <button
                        type="button"
                        className="btn btn-link"
                        data-toggle="collapse"
                        data-target={`#collapse1`}
                      >
                        <i className="fa fa-plus"></i>Why now?
                      </button>
                    </h2>
                  </div>
                  <div
                    id={`collapse1`}
                    className={`collapse`}
                    aria-labelledby="headingOne"
                    data-parent="#accordionExample"
                  >
                    <div className="card-body">
                      <p>
                        We remain a platform dedicated to the sale of UK used
                        cars, we are the only site to list import taxes and
                        final prices. Our site is unique in showing the full
                        cost of importation. We are recognised in Ireland as the
                        experts in our field and our Google ranking for terms
                        related to UK used cars and imports reflects this.
                      </p>
                      <br />
                      <p>
                        Over 8 years we have imported just over 3,000 vehicles
                        for Irish clients. We are an established national brand
                        with a reputation for efficient and cost effective
                        services. We do not sell our own vehicles and we do not
                        seek credit from the UK garages selling vehicles. We
                        make our margin on services.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="card">
                  <div className="card-header" id="headingOne">
                    <h2 className="mb-0">
                      <button
                        type="button"
                        className="btn btn-link"
                        data-toggle="collapse"
                        data-target={`#collapse2`}
                      >
                        <i className="fa fa-plus"></i>Why us?
                      </button>
                    </h2>
                  </div>
                  <div
                    id={`collapse2`}
                    className={`collapse`}
                    aria-labelledby="headingOne"
                    data-parent="#accordionExample"
                  >
                    <div className="card-body">
                      <p>
                        Brexit has added layers of complexity and cost to
                        importing a used vehicle from the UK. What was once a
                        fairly straight forward process now requires a company
                        with an EORI number. Navigating the new reality has been
                        challenging for us with expertise importing vehicles
                        from the UK, for the general public it has become almost
                        impossible.
                      </p>
                      <br />
                      <p>
                        The good news is that our platform and our services make
                        the best of the situation and give a commercial
                        advantage to UK garages advertising on our platform over
                        those that do not.
                      </p>
                      <br />
                      <p>
                        You can read about us from some media coverage we
                        received.
                      </p>
                      <br />
                      <p>
                        <a
                          target="_blank"
                          href="https://www.independent.ie/life/motoring/check-your-rearview-mirror-its-the-great-british-car-invasion-29752706.html"
                        >
                          https://www.independent.ie/life/motoring/check-your-rearview-mirror-its-the-great-british-car-invasion-29752706.html
                        </a>
                      </p>
                      <br />
                      <p>
                        <a
                          target="_blank"
                          href="https://www.independent.ie/business/vroom-brexit-has-me-driving-in-the-fast-lane-34865872.html"
                        >
                          https://www.independent.ie/business/vroom-brexit-has-me-driving-in-the-fast-lane-34865872.html
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="card">
                  <div className="card-header" id="headingOne">
                    <h2 className="mb-0">
                      <button
                        type="button"
                        className="btn btn-link"
                        data-toggle="collapse"
                        data-target={`#collapse3`}
                      >
                        <i className="fa fa-plus"></i>What has changed since
                        Brexit?
                      </button>
                    </h2>
                  </div>
                  <div
                    id={`collapse3`}
                    className={`collapse`}
                    aria-labelledby="headingOne"
                    data-parent="#accordionExample"
                  >
                    <div className="card-body">
                      <p>
                        VAT @23% is due on all non EU vehicle imports to
                        Ireland, as well as this the ‘Rules of Origin’ criteria
                        for importing vehicles/goods into the EU means that
                        vehicles produced outside the UK, imported to the UK and
                        then re—exported back into the EU attract a 10% Excise
                        duty. This effects most used vehicles. Vehicles
                        originally manufactured in the UK do not. It’s complex!
                      </p>
                      <br />
                      <p>
                        Ideally we target VAT Qualifying vehicles as we can
                        reclaim the VAT from HMRC to set against the VAT due on
                        importing to Ireland. However, VAT margin vehicles have
                        retained a steady flow of sales despite the extra 23%
                        VAT they attract, hence we still advertise them.
                      </p>
                      <br />
                      <p>
                        We will advertise all your vehicles on{" "}
                        <a target="_blank" href="https://ukcarimports.ie">
                          www.ukcarimports.ie
                        </a>{" "}
                        giving prominence to those that are VAT Qualifying on
                        Premium listing.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="card">
                  <div className="card-header" id="headingOne">
                    <h2 className="mb-0">
                      <button
                        type="button"
                        className="btn btn-link"
                        data-toggle="collapse"
                        data-target={`#collapse4`}
                      >
                        <i className="fa fa-plus"></i>How does it work?
                      </button>
                    </h2>
                  </div>
                  <div
                    id={`collapse4`}
                    className={`collapse`}
                    aria-labelledby="headingOne"
                    data-parent="#accordionExample"
                  >
                    <div className="card-body">
                      <p>
                        Once you have decided to join the thousands of other UK
                        garages currently advertising on{" "}
                        <a target="_blank" href="https://ukcarimports.ie">
                          www.ukcarimports.ie
                        </a>{" "}
                        then we simply copy your internet vehicle listing onto
                        the platform, no need for you to upload them it’s all
                        automated.
                      </p>
                      <br />
                      <p>
                        To improve the visibility of the more desirable VAT
                        Qualifying vehicles in your stock we would ask you to
                        ‘tag’ label your VAT Qualifying cars on your website or
                        Autotrader. The tag can be a simple letter like ‘Q’ or
                        something discreet if you do not wish to publish the VAT
                        status of the vehicle. For example a symbol or capital
                        letter at the end of the vehicle description like below{" "}
                      </p>
                      <br />
                      <p>
                        <i className="text-fade">
                          Reflex Autos is Open for Sales and Enquiries by
                          Appointment through our 'Reserve and Collect' Service,
                          Leave a £30 reservation fee to secure your new car,
                          Phone for Details on 01784 682013 or 07393 500120, We
                          are currently offering Our Cars at Reduced Prices, Low
                          Rate Finance from 7.9% APR Available and Part
                          Exchanges are Welcome, FULL SERVICE HISTORY, 2 OWNERS
                          FROM NEW, HPI CLEAR, 2 KEYS , Brilliant Black, Please
                          call or text before setting off to confirm this
                          vehicle is still available!, £15,985. Q.
                        </i>
                      </p>
                      <br />
                      <p>
                        We simply included a Q at the end of the description but
                        it could be any symbol or letter
                      </p>
                      <br />
                      <p>
                        We will then load the details from your website on to
                        our Premium list and that’s it. Your VAT Qualifying cars
                        will be advertised with all the relevant Irish taxes for
                        transparent pricing on our <strong>Premium</strong>{" "}
                        listing. The others in our general listing.{" "}
                      </p>
                      <br />
                      <p>
                        Once one of our Irish clients wishes to proceed we will
                        be in touch!
                      </p>
                    </div>
                  </div>
                </div>
                <div className="card">
                  <div className="card-header" id="headingOne">
                    <h2 className="mb-0">
                      <button
                        type="button"
                        className="btn btn-link"
                        data-toggle="collapse"
                        data-target={`#collapse5`}
                      >
                        <i className="fa fa-plus"></i>Does listing my vehicles
                        on{" "}
                        <a target="_blank" href="https://ukcarimports.ie">
                          www.ukcarimports.ie
                        </a>{" "}
                        cost anything?
                      </button>
                    </h2>
                  </div>
                  <div
                    id={`collapse5`}
                    className={`collapse`}
                    aria-labelledby="headingOne"
                    data-parent="#accordionExample"
                  >
                    <div className="card-body">
                      <p>
                        We charge a one-time set up fee of €200 (£170) that will
                        get all your cars on our website indefinitely.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="card">
                  <div className="card-header" id="headingOne">
                    <h2 className="mb-0">
                      <button
                        type="button"
                        className="btn btn-link"
                        data-toggle="collapse"
                        data-target={`#collapse6`}
                      >
                        <i className="fa fa-plus"></i>Can I sell a vehicle to
                        the South of Ireland zero VAT rated?
                      </button>
                    </h2>
                  </div>
                  <div
                    id={`collapse6`}
                    className={`collapse`}
                    aria-labelledby="headingOne"
                    data-parent="#accordionExample"
                  >
                    <div className="card-body">
                      <p>
                        The new HMRC guidance on exporting used vehicles outside
                        the UK is given{" "}
                        <a
                          href="https://www.gov.uk/guidance/vat-on-goods-exported-from-the-uk-notice-703"
                          target="_blank"
                        >
                          here.
                        </a>{" "}
                        Proof of export for HMRC purposes includes –
                      </p>
                      <br />
                      <p>
                        <i className="text-fade">
                          'you must keep one of the copies of the bill of lading
                          or sea waybill along with a note of the export entry
                          number or, where a shipping company does not issue
                          these, a certificate of shipment (certifying actual
                          shipment) along with a note of the export entry
                          number, given by a responsible official of that
                          company'
                        </i>
                      </p>
                      <br />
                      <p>
                        Garages with experience in exporting used vehicles tend
                        to want to book the shipping themselves so they can
                        receive the invoice which contains the export entry
                        number directly from the shipping company. Zero rating
                        exports is entirely normal and preferable.{" "}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="modal" id="bounce" role="dialog">
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
                <div className="form_sec survey col-sm-12">
                  <h2>On a Scale of 1-5 how interesting is our offer ?</h2>
                  <button
                    className={`btn-style ${
                      this.state.rating === 1 ? "active" : ""
                    }`}
                    onClick={() => this.setState({ rating: 1 })}
                  >
                    1
                  </button>
                  <button
                    className={`btn-style ${
                      this.state.rating === 2 ? "active" : ""
                    }`}
                    onClick={() => this.setState({ rating: 2 })}
                  >
                    2
                  </button>
                  <button
                    className={`btn-style ${
                      this.state.rating === 3 ? "active" : ""
                    }`}
                    onClick={() => this.setState({ rating: 3 })}
                  >
                    3
                  </button>
                  <button
                    className={`btn-style ${
                      this.state.rating === 4 ? "active" : ""
                    }`}
                    onClick={() => this.setState({ rating: 4 })}
                  >
                    4
                  </button>
                  <button
                    className={`btn-style ${
                      this.state.rating === 5 ? "active" : ""
                    }`}
                    onClick={() => this.setState({ rating: 5 })}
                  >
                    5
                  </button>
                  {this.surveyformValidator.message(
                    "Rating",
                    this.state.rating,
                    "required"
                  )}
                  <br />
                  <input
                    type="text"
                    placeholder="Message"
                    name="message"
                    value={this.state.message}
                    onChange={(e) => this.handleChange(e)}
                  />
                  <br />
                  <button
                    className="btn btn-pay pays"
                    onClick={(e) => this.survey()}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  page: state.common.page,
  pageloading: state.common.pageloading,
});
export default connect(mapStateToProps)(DealerSignup);
