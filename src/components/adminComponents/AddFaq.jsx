import React, { Component } from "react";
import { connect } from "react-redux";
import { getLeads } from "../../store/actions/commonActions";
import { getcarslisting, getcarslistingnew } from "../../store/actions/carActions";
import { apiBaseUrl } from "../../store/helpers/common";
import toastr from "reactjs-toastr";
import parseJwt from "../../store/helpers/common";
import TinyMCE from "react-tinymce";
import SimpleReactValidator from "simple-react-validator";
import { NavLink } from "react-router-dom";
import $ from "jquery";

class AddFaq extends Component {
  constructor(props) {
    super(props);
    this.formValidator = new SimpleReactValidator();
    this.state = {
      question: "",
      answer: "",
      isSubmit: false,
    };
    this.handleEditorChange = this.handleEditorChange.bind(this);
  }
  componentDidMount() {
    if (localStorage.getItem("token")) {
      const currdetails = parseJwt(localStorage.getItem("token"));
      const role = currdetails.urxrs;
      // console.log(currdetails);
      if (currdetails.urxrs) {
        this.setState({ loggedin: true });
      }
    } else {
      this.setState({ loggedin: false });
      localStorage.clear("token");
      this.props.history.push("/sign-in");
    }
  }
  componentWillReceiveProps(nextProps) {}

  handleEditorChange(e) {
    // console.log(e.target.getContent())
    this.setState({ answer: e.target.getContent() });
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  submitForm = () => {
    let validate = this.formValidator;
    if (validate.allValid()) {
      const { question, answer } = this.state;
      this.setState({ isSubmit: true });
      const request = new Request(`${apiBaseUrl}/user/add-faq`, {
        method: "POST",
        headers: {
          "X-Auth-Token": `${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question, answer }),
      });
      return fetch(request)
        .then((res) => res.json())
        .then((data) => {
          // console.log('data :'+JSON.stringify(data.ResponseCode));
          if (data.ResponseCode == 1) {
            toastr.success(data.ResponseText, { displayDuration: 3000 });
            this.setState({ isSubmit: false, question: "", answer: "" });
            this.props.history.push("/faqs");
          } else {
            toastr.error(data.ResponseText, { displayDuration: 3000 });
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
  render() {
    const { isSubmit } = this.state;
    return (
      <>
        <div className="row wrapper border-bottom white-bg page-heading">
          <div className="col-lg-12">
            <h2>FAQs</h2>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <NavLink className="nav-link" to="/dashboard">
                  Dashboard
                </NavLink>
              </li>
              <li className="breadcrumb-item active">
                <NavLink className="nav-link" to="/faqs">
                  FAQs
                </NavLink>
              </li>
            </ol>
          </div>
        </div>
        <div className="wrapper wrapper-content animated fadeInRight">
          <div className="row">
            <div className="col-lg-12">
              <div className="ibox ">
                <div className="ibox-title">
                  <h5>Add FAQ</h5>
                  <div className="ibox-tools"></div>
                </div>
                <div className="ibox-content">
                  <div className="col-lg-6">
                    <div className="form-group">
                      <label for="">Question</label>
                      <input
                        type="text"
                        name="question"
                        className="form-control"
                        id="question"
                        value={this.state.question}
                        onChange={(e) => this.handleChange(e)}
                      />
                      {this.formValidator.message(
                        "Question",
                        this.state.question,
                        "required"
                      )}
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label for="">Answer</label>
                      <TinyMCE
                        content={this.state.answer}
                        config={{
                          plugins: "autolink link image lists print preview",
                          toolbar:
                            "undo redo | bold italic | alignleft aligncenter alignright",
                        }}
                        onChange={this.handleEditorChange}
                      />
                      {this.formValidator.message(
                        "Answer",
                        this.state.answer,
                        "required"
                      )}
                    </div>
                    <button
                      type="button"
                      className="btn"
                      onClick={(e) => this.submitForm()}
                      disabled={isSubmit ? true : false}
                    >
                      {isSubmit ? "Please Wait..." : "Submit"}
                    </button>
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

// export default Dashboard;
const mapStateToProps = (state) => ({
  carsdata: state.car.carsdatanew,
  carsloading: state.car.carsloading,
  leadsdata: state.common.leadsdata,
  leadsloading: state.common.leadsloading,
});
export default connect(mapStateToProps)(AddFaq);
