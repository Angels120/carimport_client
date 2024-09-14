import React, { Component } from "react";
import SimpleReactValidator from "simple-react-validator";
import PhoneInput from "react-phone-number-input";
import { apiBaseUrl } from "../../store/helpers/common";
import toastr from "reactjs-toastr";
import { withRouter } from "react-router";
import { NavLink } from "react-router-dom";
import { Helmet } from "react-helmet";

class Contact extends Component {
  constructor(props) {
    super(props);
    this.formValidator = new SimpleReactValidator();
    this.state = {
      fullname: "",
      phone: "",
      messages: "",
      email: "",
      isSubmit: false,
    };
  }
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  formSubmit = () => {
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
                this.submitquery(token);
              }.bind(this)
            );
        }.bind(this)
      );
    } else {
      validate.showMessages();
      this.forceUpdate();
    }
  };
  submitquery = (token) => {
    if (token) {
      const { fullname, email, phone, message } = this.state;
      const request = new Request(`${apiBaseUrl}/add-lead`, {
        method: "POST",
        headers: new Headers({ "Content-Type": "application/json" }),
        body: JSON.stringify({ fullname, email, phone, message }),
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
            this.setState({ fullname: "", email: "", phone: "", message: "" });
            this.setState({ isSubmit: false });
          }
        })
        .catch((err) => {
          this.setState({ isSubmit: false });
          console.log("err :" + err);
        });
    }
  };
  setphone = (e) => {
    this.setState({ phone: e });
  };
  render() {
    return (
      <>
        <Helmet>
          <title>Contact &#8211; UK Car Imports</title>
          <script src="https://www.google.com/recaptcha/api.js?render=6LdJejIaAAAAABPap2izWvDOKZgwXHDlo4KVmtLs"></script>
        </Helmet>
        <div className="footer_new">
          <div className="left_half_box">
            <h2>
              <span>OUR</span>
              <br />
              OFFICES
            </h2>
            <div className="footer_box">
              <div className="left_foot_box">
                <img src="assets/images/icon-4.png" />
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
                <img src="assets/images/icon-5.png" />
              </div>
              <div className="right_foot_box">
                <h5>EMAIL</h5>
                <p>info@ukcarimports.ie</p>
              </div>
            </div>
          </div>
          <div className="right_half_box contact_us">
            <form>
              <div className="form-group">
                <label for="">YOUR NAME:</label>
                <input
                  type="name"
                  name="fullname"
                  value={this.state.fullname}
                  onChange={(e) => this.handleChange(e)}
                  className="form-control"
                  id="name"
                />
                {this.formValidator.message(
                  "Name",
                  this.state.fullname,
                  "required"
                )}
              </div>
              <div className="form-group">
                <label for="pwd">YOUR PHONE:</label>
                <PhoneInput
                  placeholder="Enter phone number"
                  defaultCountry="IE"
                  value={this.state.phone}
                  className="form-input"
                  onChange={(e) => this.setphone(e)}
                />
                {/*<Form.Control type="text" name="Phone" placeholder="Phone" value={this.state.Phone} onChange={ e => this.handleChange(e) } />*/}
                {this.formValidator.message(
                  "Phone",
                  this.state.phone,
                  "required|phone"
                )}
              </div>
              <div className="form-group">
                <label for="pwd">YOUR EMAIL:</label>
                <input
                  type="email"
                  name="email"
                  value={this.state.email}
                  onChange={(e) => this.handleChange(e)}
                  className="form-control"
                  id="email"
                />
                {this.formValidator.message(
                  "Email",
                  this.state.email,
                  "required|email"
                )}
              </div>
              <div className="form-group">
                <label for="pwd">MESSAGE:</label>
                <textarea
                  type="text"
                  name="message"
                  value={this.state.message}
                  onChange={(e) => this.handleChange(e)}
                  className="form-control"
                  id="text"
                ></textarea>
                {this.formValidator.message(
                  "Message",
                  this.state.message,
                  "required"
                )}
              </div>
              <button
                type="button"
                onClick={(e) => this.formSubmit()}
                className="btn btn-primary"
                disabled={this.state.isSubmit}
              >
                {this.state.isSubmit ? "Please Wait.." : "Submit"}
              </button>
            </form>
          </div>
        </div>

        <section className="map">
          <div className="">
            <iframe
              style={{ border: "0" }}
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2385.907439518616!2d-6.218018634164293!3d53.27327807996377!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4867054677fba92f%3A0x23d83dd2dc00eb6e!2sUK%20Car%20Imports!5e0!3m2!1sen!2sin!4v1589012063630!5m2!1sen!2sin"
              width="100%"
              height="500"
              frameborder="0"
              allowfullscreen="allowfullscreen"
              aria-hidden="false"
            ></iframe>
          </div>
        </section>
      </>
    );
  }
}

export default withRouter(Contact);
