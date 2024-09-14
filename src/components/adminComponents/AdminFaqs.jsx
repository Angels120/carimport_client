import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { getfaqs } from "../../store/actions/commonActions";
import swal from "sweetalert";
import SimpleReactValidator from "simple-react-validator";
import { apiBaseUrl } from "../../store/helpers/common";
import toastr from "reactjs-toastr";
import TinyMCE from "react-tinymce";

class AdminFaqs extends Component {
  constructor(props) {
    super(props);
    this.formValidator = new SimpleReactValidator();
    this.state = {
      faqs: "",
      isSubmit: false,
      question: "",
      answer: "",
    };
    this.handleEditorChange = this.handleEditorChange.bind(this);
  }
  componentDidMount() {
    this.props.dispatch(getfaqs());
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      faqs: nextProps.faqs.decodedcontent,
    });
    // console.log('faqs :'+JSON.stringify(nextProps.faqs));
  }
  deletefaq = (faq_id) => {
    swal({
      title: "Are you sure to delete this FAQ?",
      buttons: ["Cancel", "Yes"],
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        if (localStorage.getItem("token")) {
          const request = new Request(
            `${apiBaseUrl}/user/delete-faq/` + faq_id,
            {
              method: "DELETE",
              headers: { "X-Auth-Token": `${localStorage.getItem("token")}` },
              body: "",
            }
          );
          return fetch(request)
            .then((res) => res.json())
            .then((data) => {
              // console.log('data :'+JSON.stringify(data.ResponseCode));
              if (data.ResponseCode == 1) {
                toastr.success("Dod deleted successfully.", {
                  displayDuration: 1500,
                });
                this.setState({ isSubmit: false });
                // window.location.reload();
                this.props.dispatch(getfaqs());
              }
            })
            .catch((err) => {
              console.log("err :" + err);
            });
        } else {
          toastr.error("Token Missing.", { displayDuration: 1500 });
        }
      }
    });
  };
  handleEditorChange(e) {
    console.log(e.target.getContent());
    this.setState({ answer: e.target.getContent() });
  }
  submitForm = () => {
    let validate = this.formValidator;
    if (validate.allValid()) {
      const { question, answer, faqid } = this.state;
      this.setState({ isSubmit: true });
      const request = new Request(`${apiBaseUrl}/user/update-faq`, {
        method: "POST",
        headers: {
          "X-Auth-Token": `${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question, answer, faqid }),
      });
      return fetch(request)
        .then((res) => res.json())
        .then((data) => {
          // console.log('data :'+JSON.stringify(data.ResponseCode));
          if (data.ResponseCode == 1) {
            toastr.success(data.ResponseText, { displayDuration: 3000 });
            this.setState({ isSubmit: false });
            this.setState({ faq_id: "", question: "", answer: "" });
            window.$("#editfaq" + faqid).modal("hide");
            this.props.dispatch(getfaqs());
          } else {
            toastr.error(data.ResponseText, { displayDuration: 3000 });
            this.setState({ isSubmit: false });
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

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  openform = (e) => {
    this.setState({
      question: e.question,
      answer: e.answer,
      faqid: e.id,
    });
    window.$("#editfaq" + e.id).modal("show");
  };
  render() {
    const { faqs, isSubmit, answer, question } = this.state;
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
                  <h5>List of FAQs</h5>
                  <div className="ibox-tools">
                    <NavLink className="text-right" to="/add-faq">
                      Add Faq
                    </NavLink>
                  </div>
                </div>
                <div className="ibox-content">
                  <div className="table-responsive">
                    <table className="table table-striped table-bordered table-hover vehicle-list">
                      <thead>
                        <tr>
                          <th>Question</th>
                          <th>Date</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.props.faqsloading ? (
                          <div className="alltourticksloader">
                            <img
                              className="loader_img"
                              src="/assets/images/straight-loader.gif"
                            />
                          </div>
                        ) : faqs ? (
                          faqs.length ? (
                            faqs.map((post) => (
                              <>
                                <tr>
                                  <td>{post.question}</td>
                                  <td>{post.date}</td>
                                  <td>
                                    <button
                                      type="button"
                                      className="btn"
                                      onClick={(e) => this.deletefaq(post.id)}
                                    >
                                      Delete Faq
                                    </button>{" "}
                                    <button
                                      type="button"
                                      className="btn"
                                      onClick={(e) => this.openform(post)}
                                      data-toggle="modal"
                                    >
                                      Edit Faq
                                    </button>
                                  </td>
                                </tr>
                                <div
                                  className="modal fade"
                                  id={`editfaq${post.id}`}
                                  role="dialog"
                                >
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
                                          <h2>Update FAQ</h2>
                                          <div className="col-lg-6">
                                            <div className="form-group">
                                              <label for="">Question</label>
                                              <input
                                                type="text"
                                                name="question"
                                                className="form-control"
                                                id="question"
                                                value={this.state.question}
                                                onChange={(e) =>
                                                  this.handleChange(e)
                                                }
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
                                                apikey="yzoxib5i7ew4vdsxi3fxkymn5ac1p86p0t53kappazwkk7yv"
                                                content={post.answer}
                                                config={{
                                                  plugins:
                                                    "lists code autolink link image lists print preview",
                                                  toolbar:
                                                    "undo redo | bold italic | alignleft aligncenter alignright",
                                                }}
                                                onChange={
                                                  this.handleEditorChange
                                                }
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
                                              {isSubmit
                                                ? "Please Wait..."
                                                : "Submit"}
                                            </button>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </>
                            ))
                          ) : (
                            <div>No FAQs</div>
                          )
                        ) : (
                          <div>No FAQs</div>
                        )}
                      </tbody>
                    </table>
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

const mapStateToProps = (state) => ({
  faqs: state.common.faqs,
  faqsloading: state.common.faqsloading,
});
export default connect(mapStateToProps)(AdminFaqs);
