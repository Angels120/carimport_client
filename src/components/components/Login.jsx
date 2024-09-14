import React, { Component } from "react";
import { withRouter } from "react-router";
import SimpleReactValidator from "simple-react-validator";
import { apiBaseUrl } from "../../store/helpers/common";
import toastr from "reactjs-toastr";
import "reactjs-toastr/lib/toast.css";
import { GoogleLogin } from "react-google-login";
import FacebookLogin from "react-facebook-login";

const CLIENT_ID =
  "770098782810-8m89oj6i8e69jfjtbi2pbdaihl5m2ikl.apps.googleusercontent.com";

class Login extends Component {
  constructor(props) {
    super(props);
    this.loginValidator = new SimpleReactValidator();
    this.state = {
      email: "",
      password: "",
      isSubmit: false,
      loggedIn: false,
      accessToken: "",
    };
  }
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
    e.preventDefault();
  };
  Login = (e) => {
    let validate = this.loginValidator;
    if (validate.allValid()) {
      this.setState({ isSubmit: true });
      const { email, password } = this.state;
      const request = new Request(`${apiBaseUrl}/user/login`, {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: new Headers({ "Content-Type": "application/json" }),
      });
      return fetch(request)
        .then((res) => res.json())
        .then((data) => {
          if (data.ResponseCode == 1) {
            toastr.success(data.ResponseText, { displayDuration: 1500 });
            document.getElementById("close").click();
            localStorage.setItem("token", data.token);
            this.setState({ isSubmit: true, loggedIn: true });
            this.props.history.push("/admin-dashboard");
            window.location.reload();
          } else {
            toastr.error(data.ResponseText, { displayDuration: 1500 });
            this.setState({ isSubmit: false, loggedIn: false });
          }
        })
        .catch((err) => {
          this.setState({ isSubmit: false });
        });
    } else {
      validate.showMessages();
      this.forceUpdate();
    }
  };
  googleLogin = (response) => {
    let userinfo = response.profileObj;
    if (userinfo && userinfo.googleId !== "") {
      toastr.success("Login Successfull", { displayDuration: 1500 });
      const platform_id = userinfo.googleId;
      const user_type = "breeder";
      const fullname = userinfo.name;
      const email = userinfo.email;
      const method = "google";
      this.setState({ isSubmit: true });
      const request = new Request(`${apiBaseUrl}/login-plat`, {
        method: "POST",
        body: JSON.stringify({
          platform_id,
          user_type,
          fullname,
          email,
          method,
        }),
        headers: new Headers({ "Content-Type": "application/json" }),
      });
      return fetch(request)
        .then((res) => res.json())
        .then((data) => {
          if (data.ResponseCode == 1) {
            toastr.success("Redirecting to Dashboard...", {
              displayDuration: 1500,
            });
            document.getElementById("close").click();
            localStorage.setItem("token", data.token);
            this.setState({ isSubmit: true, loggedIn: true });
            this.props.history.push("/admin-dashboard");
            window.location.reload();
          } else {
            toastr.error(data.ResponseText, { displayDuration: 1500 });
            this.setState({ isSubmit: false, loggedIn: false });
          }
        })
        .catch((err) => {
          console.log(err);
          toastr.error("Login Failed", { displayDuration: 1500 });
          this.setState({ isSubmit: false });
        });
    } else {
      toastr.error("Login Failed", { displayDuration: 1500 });
    }
  };

  responseFacebook(response) {
    console.log(response);
  }
  handleLoginFailure(response) {
    // toastr.error('Login Failed', { displayDuration: 1500 });
  }

  handleLogoutFailure(response) {
    alert("Failed to log out");
  }

  render() {
    return (
      <>
        <div
          className="modal fade"
          id="modal-container-login"
          role="dialog"
          aria-labelledby="myModalLabel"
          aria-hidden="true"
        >
          <button
            type="button"
            className="close"
            id="close"
            data-dismiss="modal"
          >
            &times;
          </button>
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="login modal-dialog" role="document">
                  <div className="login modal-content">
                    {/* <div className="login modal-header text-center">
                                            <h5 className="modal-titl text-center w-100" id="myModalLabel">LOGIN</h5>
                                        </div> */}
                    <div className="modal-body">
                      <div className="logincontainer">
                        <div className="login-img-sec">
                          <img
                            src="https://res.cloudinary.com/dahyfu60u/image/upload/v1592546301/assets/pexels_photo_1108099_ymjpvn.png"
                            alt=""
                          />
                        </div>
                        <div className="login-form-sec">
                          <h4 className="title">Sign In</h4>
                          <input
                            className="form-input"
                            type="text"
                            name="email"
                            placeholder="Email Address"
                            value={this.state.email}
                            onChange={(e) => this.handleChange(e)}
                          />
                          {this.loginValidator.message(
                            "Email",
                            this.state.email,
                            "required|email"
                          )}
                          <input
                            className="form-input"
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={this.state.password}
                            onChange={(e) => this.handleChange(e)}
                          />
                          {this.loginValidator.message(
                            "Password",
                            this.state.password,
                            "required"
                          )}
                          <button
                            className="signin modal-action-btn"
                            type="button"
                            disabled={this.state.isSubmit}
                            onClick={(e) => this.Login(e)}
                          >
                            {this.state.isSubmit ? "PLEASE WAIT.." : "LOGIN"}
                          </button>
                          <p className="text-muted">
                            orConnect with Social Media
                          </p>
                          <GoogleLogin
                            clientId={CLIENT_ID}
                            render={(renderProps) => (
                              <button
                                className="google modal-action-btn"
                                onClick={renderProps.onClick}
                                disabled={renderProps.disabled}
                              >
                                Sign in with Google
                              </button>
                            )}
                            buttonText="Login"
                            onSuccess={(e) => this.googleLogin(e)}
                            onFailure={this.handleLoginFailure}
                            cookiePolicy={"single_host_origin"}
                            responseType="code,token"
                          />
                          <FacebookLogin
                            appId="698718574288489"
                            // autoLoad={true}
                            fields="name,email,picture"
                            // onClick={e => this.componentClicked(e)}
                            callback={(e) => this.responseFacebook(e)}
                            cssclassName="facebook modal-action-btn"
                            textButton="Sign In with Facebook"
                          />
                          ,
                          <button
                            className="twitter modal-action-btn"
                            type="button"
                          >
                            Sign in with Twitter
                          </button>
                          {/* <button className="facebook modal-action-btn" type="button">Sign in with Facebook</button> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
export default withRouter(Login);
