import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { getLeads } from "../../store/actions/commonActions";
import {
  getcarslisting,
  getcarslistingnew,
} from "../../store/actions/carActions";
import parseJwt from "../../store/helpers/common";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      carsdata: [],
      leadsdata: "",
      user_id: "",
      loggedin: false,
      total_cars: "",
    };
  }
  componentDidMount() {
    if (localStorage.getItem("token")) {
      const currdetails = parseJwt(localStorage.getItem("token"));
      const role = currdetails.urxrs;
      if (role === "$aHF667#79+57h%45") {
        this.setState({ loggedin: true });
        this.props.dispatch(getLeads());
        this.props.dispatch(getcarslistingnew(0, 10, "", ""));
      } else {
        localStorage.clear("token");
        this.props.history.push("/sign-in");
      }
    }
    else {
      this.setState({ loggedin: false });
      localStorage.clear("token");
      this.props.history.push("/sign-in");
    }
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      leadsdata: nextProps.leadsdata,
      carsdata: nextProps.carsdata.data,
      total_cars: nextProps.carsdata.count,
    });
    // console.log('https://automerchant.ie/car/202010295566594'+nextProps.carsdata)
  }
  render() {
    const { carsdata, leadsdata } = this.state;
    // console.log('carsdataaaaaaa:'+this.state.carsdata.length);
    return (
      <>
        <div className="row wrapper border-bottom white-bg page-heading">
          <div className="col-lg-12">
            <h2>Dashboard</h2>
            <ol className="breadcrumb">
              <li className="breadcrumb-item active">
                <NavLink className="nav-link" to="/dashboard">
                  Dashboard
                </NavLink>
              </li>
            </ol>
          </div>
        </div>
        <div className="wrapper wrapper-content">
          <div className="row">
            <div className="col-lg-4">
              <div className="ibox ">
                <div className="ibox-title">
                  {/*<span className="label label-success float-right">Monthly</span>*/}
                  <h5>Total Vehicles</h5>
                </div>
                <div className="ibox-content">
                  <h1 className="no-margins">{this.state.total_cars}</h1>
                  {/*<div className="stat-percent font-bold text-success">98% <i className="fa fa-bolt"></i></div>*/}
                  <strong>Cars</strong>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="ibox ">
                <div className="ibox-title">
                  {/*<span className="label label-info float-right">Annual</span>*/}
                  <h5>Total Leads</h5>
                </div>
                <div className="ibox-content">
                  <h1 className="no-margins">
                    {leadsdata
                      ? leadsdata.length > 0
                        ? leadsdata.length
                        : "0"
                      : "0"}
                  </h1>
                  {/*<div className="stat-percent font-bold text-info">20% <i className="fa fa-level-up"></i></div>*/}
                  <strong>Leads</strong>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="ibox ">
                <div className="ibox-title">
                  {/*<span className="label label-primary float-right">Today</span>*/}
                  <h5>Scrapper Status</h5>
                </div>
                <div className="ibox-content">
                  <h1 className="no-margins">Running...</h1>
                  {/*<div className="stat-percent font-bold text-navy">44% <i className="fa fa-level-up"></i></div>*/}
                  <small>
                    1024/2000 <strong>Cars Pending</strong>
                  </small>
                </div>
              </div>
            </div>
            {/*<div className="col-lg-3">
		                        <div className="ibox ">
		                            <div className="ibox-title">
		                                <span className="label label-danger float-right">Low value</span>
		                                <h5>User activity</h5>
		                            </div>
		                            <div className="ibox-content">
		                                <h1 className="no-margins">80,600</h1>
		                                <div className="stat-percent font-bold text-danger">38% <i className="fa fa-level-down"></i></div>
		                                <small>In first month</small>
		                            </div>
		                        </div>
		                    </div>*/}
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
export default connect(mapStateToProps)(Dashboard);
