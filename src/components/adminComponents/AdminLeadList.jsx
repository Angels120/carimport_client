import React, { Component } from "react";
import { connect } from "react-redux";
import { getLeads } from "../../store/actions/commonActions";
import { NavLink, Redirect } from "react-router-dom";
import swal from "sweetalert";
import { apiBaseUrl } from "../../store/helpers/common";
import toastr from "reactjs-toastr";

class AdminLeadList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      leadsdata: "",
    };
  }
  componentDidMount() {
    this.props.dispatch(getLeads());
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      leadsdata: nextProps.leadsdata,
    });
    // console.log('leadsdatasssssssss :'+JSON.stringify(nextProps.leadsdata));
  }
  deleteLead = (lead_id) => {
    swal({
      title: "Are you sure to delete this Lead?",
      buttons: ["Cancel", "Yes"],
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        if (localStorage.getItem("token")) {
          const request = new Request(
            `${apiBaseUrl}/user/delete-Query/` + lead_id,
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
                this.props.dispatch(getLeads());
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
    const { leadsdata } = this.state;
    return (
      <>
        <div className="row wrapper border-bottom white-bg page-heading">
          <div className="col-lg-12">
            <h2>Leads</h2>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <NavLink className="nav-link" to="/dashboard">
                  Dashboard
                </NavLink>
              </li>
              <li className="breadcrumb-item active">
                <NavLink className="nav-link" to="/leads">
                  Leads
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
                  <h5>List of Leads</h5>
                  <div className="ibox-tools"></div>
                </div>
                <div className="ibox-content">
                  <div className="table-responsive">
                    <table className="table table-striped table-bordered table-hover vehicle-list">
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Phone</th>
                          <th>12 month Warranty</th>
                          <th>VRT Processing</th>
                          <th>Inspection Fee</th>
                          <th>Transport UK to Dub</th>
                          <th>Home Delivery</th>
                          <th>Car Link</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.props.leadsloading ? (
                          <div className="alltourticksloader">
                            <img
                              className="loader_img"
                              src="/assets/images/straight-loader.gif"
                            />
                          </div>
                        ) : leadsdata ? (
                          leadsdata.length ? (
                            leadsdata.map((post) => (
                              <tr>
                                <td>{post.name}</td>
                                <td>{post.Email}</td>
                                <td>{post.Phone}</td>
                                <td>
                                  {post.twelvemonthwarrenty
                                    ? post.twelvemonthwarrenty
                                    : ""}
                                </td>
                                <td>
                                  {post.vrt_proccessing &&
                                  post.vrt_proccessing === "1"
                                    ? "Yes"
                                    : "No"}
                                </td>
                                <td>
                                  {post.inspection_fee &&
                                  post.inspection_fee === "1"
                                    ? "Yes"
                                    : "No"}
                                </td>
                                <td>
                                  {post.transferuktodub &&
                                  post.transferuktodub === "1"
                                    ? "Yes"
                                    : "No"}
                                </td>
                                <td>
                                  {post.homedelivry && post.homedelivry === "1"
                                    ? "Yes"
                                    : "No"}
                                </td>
                                <td>
                                  <a
                                    target="_blank"
                                    href={`https://www.autotrader.co.uk/car-details/${post.car_id}`}
                                  >
                                    Autotrader Link
                                  </a>
                                  <br></br>
                                  <a
                                    target="_blank"
                                    href={`https://staging.ukcarimports.ie/car/${post.car_id}`}
                                  >
                                    Automerchant Link
                                  </a>
                                </td>
                                <td>
                                  <button
                                    className="btn"
                                    onClick={(e) =>
                                      this.deleteLead(post.lead_id)
                                    }
                                  >
                                    Delete
                                  </button>
                                </td>
                              </tr>
                            ))
                          ) : (
                            <div>No Leads</div>
                          )
                        ) : (
                          <div>No Leads</div>
                        )}
                      </tbody>
                      <tfoot>
                        <tr>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Phone</th>
                          <th>Car Link</th>
                          <th>12 month Warranty</th>
                          <th>VRT Processing</th>
                          <th>Transport UK to Dub</th>
                          <th>Home Delivery</th>
                          <th>Car Link</th>
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
  leadsdata: state.common.leadsdata,
  leadsloading: state.common.leadsloading,
});
export default connect(mapStateToProps)(AdminLeadList);
