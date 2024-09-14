import React, { Component } from "react";
import { connect } from "react-redux";
import { getLeads } from "../../store/actions/commonActions";
import { NavLink, Redirect } from "react-router-dom";
import { getblogs, getblog } from "../../store/actions/commonActions";
import swal from "sweetalert";
import { apiBaseUrl } from "../../store/helpers/common";
import toastr from "reactjs-toastr";

class AdminBlogs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blogs: "",
    };
  }
  componentDidMount() {
    this.props.dispatch(getblogs());
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      leadsdata: nextProps.leadsdata,
      blogs: nextProps.blogs,
    });
    // console.log('leadsdatasssssssss :'+JSON.stringify(nextProps.leadsdata));
  }
  deleteblog = (blog_id) => {
    swal({
      title: "Are you sure to delete this blog?",
      buttons: ["Cancel", "Yes"],
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        // alert(blog_id)
        if (localStorage.getItem("token")) {
          const request = new Request(
            `${apiBaseUrl}/user/delete-blog/` + blog_id,
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
                toastr.success(data.ResponseText, { displayDuration: 1500 });
                this.setState({ isSubmit: false });
                // window.location.reload();
                this.props.dispatch(getblogs());
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

  render() {
    const { blogs } = this.state;
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
                  <h5>List of Blogs</h5>
                  <div className="ibox-tools">
                    <NavLink className="text-right" to="/add-blog">
                      Add Blog
                    </NavLink>
                  </div>
                </div>
                <div className="ibox-content">
                  <div className="table-responsive">
                    <table className="table table-striped table-bordered table-hover vehicle-list">
                      <thead>
                        <tr>
                          <th>Title</th>
                          <th>Slug</th>
                          <th>Author</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.props.blogsloading ? (
                          <div className="alltourticksloader">
                            <img
                              className="loader_img"
                              src="/assets/images/straight-loader.gif"
                            />
                          </div>
                        ) : blogs ? (
                          blogs.length ? (
                            blogs.map((post) => (
                              <tr>
                                <td>{post.blog_heading}</td>
                                <td>{post.blog_url}</td>
                                <td>{post.Author}</td>
                                <td>
                                  <button
                                    className="btn"
                                    onClick={(e) =>
                                      this.deleteblog(post.blog_id)
                                    }
                                  >
                                    Delete Blog
                                  </button>{" "}
                                  <NavLink
                                    className="btn"
                                    to={encodeURI(
                                      encodeURI(`/blog/${post.blog_url}`).replace(/[!'()*]/g, escape)
                                    ).replace(/[!'()*]/g, escape)}
                                  >
                                    View Blog
                                  </NavLink>{" "}
                                  <NavLink
                                    className="btn"
                                    to={{
                                      pathname: `/edit-blog/${post.id}`,
                                      state: { blog: post },
                                    }}
                                  >
                                    Edit Blog
                                  </NavLink>
                                </td>
                              </tr>
                            ))
                          ) : (
                            <div>No Blogs</div>
                          )
                        ) : (
                          <div>No Blogs</div>
                        )}
                      </tbody>
                      <tfoot>
                        <tr>
                          <th>Title</th>
                          <th>Slug</th>
                          <th>Author</th>
                          <th>Action</th>
                        </tr>
                      </tfoot>
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
  blogs: state.common.blogs,
  blogsloading: state.common.blogsloading,
});
export default connect(mapStateToProps)(AdminBlogs);
