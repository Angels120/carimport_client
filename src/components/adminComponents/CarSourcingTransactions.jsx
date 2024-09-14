import React, { Component } from "react";
import { connect } from "react-redux";
import { getTransactions, getQueries } from "../../store/actions/commonActions";
import { NavLink, Redirect } from "react-router-dom";
import swal from "sweetalert";
import { apiBaseUrl } from "../../store/helpers/common";
import toastr from "reactjs-toastr";

class CarSourcingTransactions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transactions: "",
    };
  }
  componentDidMount() {
    var slug = "carsourcing";
    this.props.dispatch(getTransactions(slug));
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      transactions: nextProps.transactions,
    });
    console.log("transactions :" + JSON.stringify(nextProps.transactions));
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
    const { transactions } = this.state;
    return (
      <>
        <div className="row wrapper border-bottom white-bg page-heading">
          <div className="col-lg-12">
            <h2>Dealer's Transactions</h2>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <NavLink className="nav-link" to="/dashboard">
                  Dashboard
                </NavLink>
              </li>
              <li className="breadcrumb-item active">
                <NavLink className="nav-link" to="/dealer-transactions">
                  Transactions
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
                  <h5>List of Dealer Transactions</h5>
                  <div className="ibox-tools"></div>
                </div>
                <div className="ibox-content">
                  <div className="table-responsive">
                    <table className="table table-striped table-bordered table-hover vehicle-list">
                      <thead>
                        <tr>
                          {/* <th>Business Name</th> */}
                          <th>Name</th>
                          <th>Email</th>
                          <th>Address</th>
                          <th>Post Code</th>
                          <th>Date</th>
                          <th>Amount</th>
                          <th>Type</th>
                          <th>Vehicle Link</th>
                          <th>IP</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.props.transactionsloading ? (
                          <div className="alltourticksloader">
                            <img
                              className="loader_img"
                              src="/assets/images/straight-loader.gif"
                            />
                          </div>
                        ) : transactions ? (
                          transactions.length ? (
                            transactions.map((post) => (
                              <tr>
                                {/* <td>{post.business_name}</td> */}
                                <td>{post.firstname}</td>
                                <td>{post.email}</td>
                                <td>{post.address}</td>
                                <td>{post.zipcode}</td>
                                <td>{post.currdate}</td>
                                <td>€{post.amount}</td>
                                <td>
                                  <strong>{`Car Sourcing`}</strong>
                                </td>
                                <td>
                                  <a href={post.vehicle_link} target="_blank">
                                    {post.vehicle_link}
                                  </a>
                                </td>
                                <td>{post.ip}</td>
                                {/* <td>
																				<button className="btn" onClick={e => this.deleteQuery(post.leadid)}>Delete</button>
																			</td> */}
                              </tr>
                            ))
                          ) : (
                            <div>No transactions</div>
                          )
                        ) : (
                          <div>No transactions</div>
                        )}
                      </tbody>
                      <tfoot>
                        <tr>
                          {/* <th>Business Name</th> */}
                          <th>Name</th>
                          <th>Email</th>
                          <th>Address</th>
                          <th>Post Code</th>
                          <th>Date</th>
                          <th>Amount</th>
                          <th>Type</th>
                          <th>Vehicle Link</th>
                          <th>IP</th>
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
  transactions: state.common.transactions,
  transactionsloading: state.common.transactionsloading,
});
export default connect(mapStateToProps)(CarSourcingTransactions);
