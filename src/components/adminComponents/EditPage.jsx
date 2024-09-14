import React, { Component } from "react";
import { connect } from "react-redux";
import { getpage } from "../../store/actions/commonActions";
import { apiBaseUrl } from "../../store/helpers/common";
import toastr from "reactjs-toastr";
import parseJwt from "../../store/helpers/common";
import TinyMCE from "react-tinymce";
import SimpleReactValidator from "simple-react-validator";
import { NavLink } from "react-router-dom";
import $ from "jquery";

class EditPage extends Component {
  constructor(props) {
    super(props);
    this.formValidator = new SimpleReactValidator();
    this.state = {
      pagename: "",
      pagecontent: "",
      page_id: "",
      page: "",
      loggedin: false,
      isSubmit: false,
    };
    this.handleEditorChange = this.handleEditorChange.bind(this);
  }
  componentDidMount() {
    var slug = this.props.match.params.slug;
    if (localStorage.getItem("token")) {
      const currdetails = parseJwt(localStorage.getItem("token"));
      const role = currdetails.urxrs;
      console.log(localStorage.getItem("token"));
      if (currdetails.urxrs) {
        this.props.dispatch(getpage(slug));
        this.setState({ loggedin: true });
      }
    } else {
      this.setState({ loggedin: false });
      localStorage.clear("token");
      this.props.history.push("/sign-in");
    }
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      page: nextProps.page,
      pagename: nextProps.page.pagename,
      pagecontent: nextProps.page.content,
      page_id: nextProps.page.id,
    });
  }

  handleEditorChange(e) {
    // console.log(e.target.getContent())
    this.setState({ pagecontent: e.target.getContent() });
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  submitForm = () => {
    let validate = this.formValidator;
    if (validate.allValid()) {
      const { pagename, pagecontent } = this.state;
      this.setState({ isSubmit: true });
      const request = new Request(`${apiBaseUrl}/user/update-content`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Auth-Token": `${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ pagename, pagecontent }),
      });
      return fetch(request)
        .then((res) => res.json())
        .then((data) => {
          // console.log('data :'+JSON.stringify(data.ResponseCode));
          if (data.ResponseCode == 1) {
            toastr.success(data.ResponseText, { displayDuration: 3000 });
            this.setState({ isSubmit: false });
            this.props.history.push("/pages");
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
    const { isSubmit, page } = this.state;
    return (
      <>
        <div className="row wrapper border-bottom white-bg page-heading">
          <div className="col-lg-12">
            <h2>Blogs</h2>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <NavLink className="nav-link" to="/dashboard">
                  Dashboard
                </NavLink>
              </li>
              <li className="breadcrumb-item active">
                <NavLink className="nav-link" to="/edit-page/homepage">
                  Edit Page
                </NavLink>
              </li>
            </ol>
          </div>
        </div>
        <div className="wrapper wrapper-content animated fadeInRight">
          <div className="row">
            <div className="col-lg-12">
              {this.props.pageloading ? (
                <div className="alltourticksloader">
                  <img
                    className="loader_img"
                    src="/assets/images/straight-loader.gif"
                  />
                </div>
              ) : page ? (
                <div className="ibox ">
                  <div className="ibox-title">
                    <h5>Edit Page</h5>
                    <div className="ibox-tools">
                      {/* <NavLink className="text-right" to="/add-blog">Add Blog</NavLink>			                             */}
                    </div>
                  </div>
                  <div className="ibox-content">
                    <div className="col-lg-6">
                      <div className="form-group">
                        <label for="">Title</label>
                        <input
                          type="text"
                          name="pagename"
                          className="form-control"
                          id="pagename"
                          value={this.state.pagename}
                          onChange={(e) => this.handleChange(e)}
                        />
                        {this.formValidator.message(
                          "Heading",
                          this.state.pagename,
                          "required"
                        )}
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="form-group">
                        <label for="">Content</label>
                        <TinyMCE
                          content={this.state.pagecontent}
                          config={{
                            height: "500",
                            plugins:
                              "code autolink link image lists print preview",
                            toolbar:
                              "undo redo | bold italic | alignleft aligncenter alignright",
                          }}
                          onChange={this.handleEditorChange}
                        />
                        {this.formValidator.message(
                          "Content",
                          this.state.pagecontent,
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
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </>
    );
  }
}

// export default Dashboard;
const mapStateToProps = (state) => ({
  page: state.common.page,
  pageloading: state.common.pageloading,
});
export default connect(mapStateToProps)(EditPage);
