import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { withRouter } from "react-router";
import SimpleReactValidator from "simple-react-validator";
import { apiBaseUrl } from "../../store/helpers/common";
import toastr from "reactjs-toastr";
import "reactjs-toastr/lib/toast.css";
import "reactjs-toastr/lib/toast.css";

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.LoginValidator = new SimpleReactValidator();
    this.state = {
      firstname: "",
      lastname: "",
      phone: "",
      email: "",
      password: "",
      isSubmit: false,
    };
  }
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
    e.preventDefault();
  };
  SignUp = (e) => {
    let validate = this.LoginValidator;
    if (validate.allValid()) {
      this.setState({ isSubmit: true });
      const { firstname, lastname, phone, email, password } = this.state;
      const request = new Request(`${apiBaseUrl}/signup`, {
        method: "POST",
        headers: new Headers({ "Content-Type": "application/json" }),
        body: JSON.stringify({ firstname, lastname, phone, email, password }),
      });
      return fetch(request)
        .then((res) => res.json())
        .then((data) => {
          if (data.ResponseCode == 1) {
            toastr.success(data.ResponseText, { displayDuration: 1500 });
            const request = new Request(`${apiBaseUrl}/login`, {
              method: "POST",
              headers: new Headers({ "Content-Type": "application/json" }),
              body: JSON.stringify({ email, password }),
            });
            return fetch(request)
              .then((res) => res.json())
              .then((data) => {
                if (data.ResponseCode == 1) {
                  toastr.success(data.ResponseText, { displayDuration: 1500 });
                  localStorage.setItem("token", data.token);
                  this.setState({ isSubmit: false });
                  if (data.user_type == "admin") {
                    // window.location.replace("/dashboard");
                  } else {
                    window.location.replace("/");
                  }
                } else {
                  toastr.error(data.ResponseText, { displayDuration: 1500 });
                  this.setState({ isSubmit: false });
                }
              })
              .catch((err) => {
                console.log(err);
                this.setState({ isSubmit: false });
              });
            // localStorage.setItem('token', data.token);
            // this.setState({ isSubmit: false});
            // this.props.history.push('/sign-in');
          } else {
            toastr.error(data.ResponseText, { displayDuration: 1500 });
            this.setState({ isSubmit: false });
          }
        })
        .catch((err) => {
          console.log(err);
          this.setState({ isSubmit: false });
        });
    } else {
      validate.showMessages();
      this.forceUpdate();
    }
  };
  render() {
    return (
      <div className="middle-box text-center loginscreen animated fadeInDown">
        <div>
          <div>
            <img className="main_logo" src="/assets/images/logo.png" />
          </div>
          <h3>Welcome to UK Car Imports</h3>
          <p>Precisely prepared for Buying UK Cars Online from Ireland.</p>
          <p>Sign Up. To see it in action.</p>
          <form className="m-t" role="form" action="index.html">
            <div className="form-group">
              <input
                type="text"
                name="firstname"
                className="form-control"
                value={this.state.firstname}
                placeholder="First Name"
                onChange={(e) => this.handleChange(e)}
              />
              {this.LoginValidator.message(
                "First Name",
                this.state.firstname,
                "required"
              )}
            </div>
            <div className="form-group">
              <input
                type="text"
                name="lastname"
                className="form-control"
                value={this.state.lastname}
                placeholder="Last Name"
                onChange={(e) => this.handleChange(e)}
              />
              {this.LoginValidator.message(
                "Last Name",
                this.state.lastname,
                "required"
              )}
            </div>
            <div className="form-group">
              <input
                type="text"
                name="phone"
                className="form-control"
                value={this.state.phone}
                placeholder="Phone"
                onChange={(e) => this.handleChange(e)}
              />
              {this.LoginValidator.message(
                "Phone",
                this.state.phone,
                "required|numeric"
              )}
            </div>
            <div className="form-group">
              <input
                type="email"
                name="email"
                className="form-control"
                value={this.state.email}
                placeholder="Email"
                onChange={(e) => this.handleChange(e)}
              />
              {this.LoginValidator.message(
                "Email",
                this.state.email,
                "required|email"
              )}
            </div>
            <div className="form-group">
              <input
                type="password"
                name="password"
                className="form-control"
                value={this.state.password}
                placeholder="Password"
                onChange={(e) => this.handleChange(e)}
              />
              {this.LoginValidator.message(
                "Password",
                this.state.password,
                "required"
              )}
            </div>
            <button
              type="button"
              className="btn btn-danger block full-width m-b"
              onClick={(ev) => this.SignUp(ev)}
              disabled={this.state.isSubmit}
            >
              {this.state.isSubmit ? "Please Wait...." : "Register"}
            </button>
            <div className="forget_link">
              <NavLink className="login_link" to="/sign-in">
                Already have an account? Sign in
              </NavLink>
            </div>
            {/*<a href="#"><small>Forgot password?</small></a>
		                <p className="text-muted text-center"><small>Do not have an account?</small></p>
		                <a className="btn btn-sm btn-white btn-block" href="register.html">Create an account</a>*/}
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(SignUp);
