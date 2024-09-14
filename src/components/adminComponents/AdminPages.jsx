import React, { Component } from "react";
import { connect } from "react-redux";
import { getLeads } from "../../store/actions/commonActions";
import { NavLink, Redirect } from "react-router-dom";
import {getpages} from "../../store/actions/commonActions"
import swal from "sweetalert";
import { apiBaseUrl } from "../../store/helpers/common";
import toastr from "reactjs-toastr";

class AdminPages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pages: "",
    };
  }
  componentDidMount() {
    this.props.dispatch(getpages());
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      pages: nextProps.pages,
    });
  }

  render() {
    const { pages } = this.state;

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
                <NavLink className="nav-link" to="/pages">
                  Pages
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
                  <h5>List of Pages</h5>
                  <div className="ibox-tools">
                    <NavLink className="text-right" to="/pages">
                      Add Page
                    </NavLink>
                  </div>
                </div>
                <div className="ibox-content">
                  <div className="table-responsive">
                    <table className="table table-striped table-bordered table-hover vehicle-list">
                      <thead>
                        <tr>
                          <th>Title</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {pages
                          ? pages.length > 0
                            ? pages.map((page) => (
                                // console.log(page)
                                <tr>
                                  <td>{page.pagename}</td>
                                  <td>
                                    <NavLink
                                      target="_blank"
                                      className="btn"
                                      to={`${page.page_slug}`}
                                    >
                                      View Page
                                    </NavLink>{" "}
                                    <NavLink
                                      className="btn"
                                      to={`/edit-page/${page.pagename}`}
                                    >
                                      Edit Page
                                    </NavLink>
                                  </td>
                                </tr>
                              ))
                            : "No Pages"
                          : "No Pages"}
                      </tbody>
                      <tfoot>
                        <tr>
                          <th>Title</th>
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
  pages: state.common.pages,
  pagesloading: state.common.pagesloading,
});
export default connect(mapStateToProps)(AdminPages);
