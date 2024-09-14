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

class AddBlog extends Component {
  constructor(props) {
    super(props);
    this.formValidator = new SimpleReactValidator();
    this.state = {
      blog_heading: "",
      blog_description: "",
      blog_author: "Richard Smith",
      blog_image: "",
      image: "",
      loggedin: false,
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
    this.setState({ blog_description: e.target.getContent() });
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  submitForm = () => {
    let validate = this.formValidator;
    if (validate.allValid()) {
      const { blog_heading, blog_description, blog_author } = this.state;
      this.setState({ isSubmit: true });
      let formData = new FormData();
      let blog_image = $("#blog_image")[0].files[0];
      formData.append("blog_heading", encodeURIComponent(blog_heading).replace(/[!'()*]/g, escape));
      formData.append("blog_description", encodeURIComponent(blog_description).replace(/[!'()*]/g, escape));
      formData.append("blog_image", blog_image);
      formData.append("blog_author", blog_author);
      const request = new Request(`${apiBaseUrl}/user/add-blog`, {
        method: "POST",
        headers: { "X-Auth-Token": `${localStorage.getItem("token")}` },
        body: formData,
      });
      return fetch(request)
        .then((res) => res.json())
        .then((data) => {
          // console.log('data :'+JSON.stringify(data.ResponseCode));
          if (data.ResponseCode == 1) {
            toastr.success(data.ResponseText, { displayDuration: 3000 });
            this.setState({
              blog_heading: "",
              blog_description: "",
              blog_image: "",
              image: "",
            });
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
  render() {
    const { isSubmit } = this.state;
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
                <NavLink className="nav-link" to="/blogs">
                  Blogs
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
                  <h5>Add Blog</h5>
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
                        name="blog_heading"
                        className="form-control"
                        id="blog_heading"
                        value={this.state.blog_heading}
                        onChange={(e) => this.handleChange(e)}
                      />
                      {this.formValidator.message(
                        "Heading",
                        this.state.blog_heading,
                        "required"
                      )}
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="form-group">
                      <label for="">Image</label>
                      <input
                        type="file"
                        name="image"
                        className="form-control"
                        id="blog_image"
                        value={this.state.image}
                        onChange={(e) => this.handleChange(e)}
                      />
                      {/* {this.formValidator.message(
                        "Image",
                        this.state.image,
                        "required"
                      )} */}
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label for="">Content</label>
                      <TinyMCE
                        content={this.state.blog_description}
                        config={{
                          plugins: "autolink link image lists print preview",
                          toolbar:
                            "undo redo | bold italic | alignleft aligncenter alignright",
                        }}
                        onChange={this.handleEditorChange}
                      />
                      {this.formValidator.message(
                        "Content",
                        this.state.blog_description,
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
export default connect(mapStateToProps)(AddBlog);
