import React, { Component } from "react";
import { connect } from "react-redux";
import { getLeads, getQueries } from "../../store/actions/commonActions";
import { NavLink, Redirect } from "react-router-dom";
import swal from "sweetalert";
import { apiBaseUrl } from "../../store/helpers/common";
import toastr from "reactjs-toastr";

class AdminQueriesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      queriesdata: "",
    };
  }
  componentDidMount() {
    this.props.dispatch(getQueries());
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      queriesdata: nextProps.queriesdata,
    });
    // console.log('leadsdatasssssssss :'+JSON.stringify(nextProps.leadsdata));
  }
  deleteQuery = (query_id) => {
    swal({
      title: "Are you sure to delete this Lead?",
      buttons: ["Cancel", "Yes"],
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        if (localStorage.getItem("token")) {
          const request = new Request(
            `${apiBaseUrl}/user/delete-lead/` + query_id,
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
                this.props.dispatch(getQueries());
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
    const { queriesdata } = this.state;
    return (
      <>
        <div className="row wrapper border-bottom white-bg page-heading">
          <div className="col-lg-12">
            <h2>User Queries</h2>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <NavLink className="nav-link" to="/dashboard">
                  Dashboard
                </NavLink>
              </li>
              <li className="breadcrumb-item active">
                <NavLink className="nav-link" to="/queries">
                  Queries
                </NavLink>
              </li>
            </ol>
          </div>
          <div className="col-lg-2"></div>
        </div>
        <div className="wrapper wrapper-content animated fadeInRight">
          <div className="row">
            <div className="col-lg-12">
              <div className="ibox ">
                <div className="ibox-title">
                  <h5>List of Queries</h5>
                  <div className="ibox-tools"></div>
                </div>
                <div className="ibox-content">
                  <div className="table-responsive">
                    <table className="table table-striped table-bordered table-hover vehicle-list">
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Phone</th>
                          <th>Email</th>
                          <th>Message</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.props.queriesloading ? (
                          <div className="alltourticksloader">
                            <img
                              className="loader_img"
                              src="/assets/images/straight-loader.gif"
                            />
                          </div>
                        ) : queriesdata ? (
                          queriesdata.length ? (
                            queriesdata.map((post) => (
                              <tr>
                                <td>{post.fullname}</td>
                                <td>{post.phone}</td>
                                <td>{post.email}</td>
                                <td>{post.message}</td>
                                <td>
                                  <button
                                    className="btn"
                                    onClick={(e) =>
                                      this.deleteQuery(post.leadid)
                                    }
                                  >
                                    Delete
                                  </button>
                                </td>
                              </tr>
                            ))
                          ) : (
                            <div>No Queries</div>
                          )
                        ) : (
                          <div>No Queries</div>
                        )}
                      </tbody>
                      <tfoot>
                        <tr>
                          <th>Name</th>
                          <th>Phone</th>
                          <th>Email</th>
                          <th>Message</th>
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
  queriesdata: state.common.queriesdata,
  queriesloading: state.common.queriesloading,
});
export default connect(mapStateToProps)(AdminQueriesList);
