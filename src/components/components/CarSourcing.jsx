import React, { Component } from "react";
import { getfaqs } from "../../store/actions/commonActions";
import { Button, Form, Col, Row } from "react-bootstrap";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
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
  PaymentRequestButtonElement,
  CardElement,
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
        Pay
      </button>
    </form>
  );
};

class CarSourcing extends Component {
  constructor(props) {
    super(props);
    this.payformValidator = new SimpleReactValidator();
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
      pay_amount: 1995,
      successmessage: false,
      successformmessage: false,
      vehicle_link: "",
    };
  }
  componentDidMount() {
    var slug = "dealersignup";
    this.props.dispatch(getpage(slug));
  }
  componentWillUnmount() {
    // alert('dasdasdas')
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
        pay_email,
        pay_zip,
        pay_phone,
        pay_amount,
        pay_address,
        vehicle_link,
      } = this.state;
      const tokenn = token;
      const request = new Request(`${apiBaseUrl}/payment-carsourcing`, {
        method: "POST",
        body: JSON.stringify({
          tokenn,
          pay_name,
          pay_zip,
          pay_email,
          pay_phone,
          pay_amount,
          pay_address,
          vehicle_link,
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
            this.setState({ vrt_payment: true });
            $(".pays").removeAttr("disabled", "disabled");
            $(".pays").text("Payment Dne");
            // $('#pay').modal('hide');
            // window.$('#bounce').modal('hide');
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
    return (
      <>
        <Helmet>
          <title>Car Sourcing &#8211; UK Car Imports</title>
          <meta name="description" content="Car Sourcing - UK Car Imports" />
        </Helmet>
        <div className="faq py-3">
          <div className="container p-0">
            <div className="row">
              {/* {
                                this.props.pageloading
                                ?
                                    <div className="alltourticksloader">
                                        <img className="loader_img" src="/assets/images/straight-loader.gif" />
                                    </div>
                                :
                                    ""
                            }
                            {
                                page
                                ?
                                    page.content
                                    ?
                                        renderHTML(page.content)
                                    :
                                        ""
                                :
                                    ''
                            } */}

              <div className="general-info">
                <h1 className="title">Car Sourcing</h1>
                {/* <div className="youtube-Video">
                  <iframe
                    width="500"
                    height="300"
                    src="https://www.youtube.com/embed/PRu73zB9Zjs"
                    title="YouTube video player"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                  ></iframe>
                </div> */}
                <p>
                  <strong>
                    Found a vehicle* in the UK you would like to import?
                  </strong>
                </p>
                <p>
                  Perhaps we can help. First we need to calculate the total
                  price. To do this we charge €19.95
                </p>
                <p>For this we will calculate</p>
                <ul>
                  <li>VRT including NOx and CO2 elements</li>
                  <li>Rules of Origin Duty if applicable</li>
                  <li>Determine if the vehicle is VAT Qualifying</li>
                </ul>
                <p>
                  We will then forward you a total price to have the car
                  imported.
                </p>
                <p>
                  Just copy and paste the link for the vehicle you are after in
                  the form below, complete payment and we will be back with the
                  amount due.
                </p>
                <p>
                  <strong>
                    *Please be aware that we will provide our best estimate
                    where vehicle makes are not present on the VRT calculator
                  </strong>
                </p>
              </div>
              <div className="col-md-2"></div>
              <div className="col-md-8 checkout-form-sec p-4">
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
                      <Form.Label column sm="12">
                        Vechiles Link <span className="red-mark">*</span>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        name="vehicle_link"
                        placeholder="Vehicle Link"
                        value={this.state.vehicle_link}
                        onChange={(e) => this.handleChange(e)}
                      />
                      {this.payformValidator.message(
                        "Vehicle Link",
                        this.state.vehicle_link,
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
              <div className="col-md-2"></div>
              {/* {
                                page
                                ?
                                    page.aftercontent
                                    ?
                                        renderHTML(page.aftercontent)
                                    :
                                        ""
                                :
                                    ''
                            } */}
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
export default connect(mapStateToProps)(CarSourcing);
