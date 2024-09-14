import React, { Component } from "react";
import { BrowserRouter, HashRouter, Switch, Link } from "react-router-dom";
import ScrollToTop from "react-router-scroll-top";
import { history } from "./store/helpers/history";
import EmptyLayout from "./components/layout/EmptyLayout";
import CompleteEmptyLayout from "./components/layout/CompleteEmptyLayout";
import AdminLayout from "./components/layout/AdminLayout";
import InnerLayout from "./components/layout/InnerLayout";
import { RouteWithLayout } from "./components/layout/RouteWithLayout";
import UsedCars from "./components/components/UsedCars";
import UsedCarsInProcess from "./components/components/UsedCarsInProcess";
import HomePage from "./components/components/HomePage";
import About from "./components/components/About";
import Blog from "./components/components/Blog";
import Faq from "./components/components/Faq";
import TermsConditions from "./components/components/TermsConditions";
import PrivacyPolicy from "./components/components/PrivacyPolicy";
import Contact from "./components/components/Contact";
import Payment from "./components/components/Payment";
// import SingleVehicle from './components/components/SingleVehicle';
import SingleCar from "./components/components/SingleCar";
import SingleCardNew from "./components/components/SingleCardNew";
import HttpsRedirect from "react-https-redirect";
import Dashboard from "./components/adminComponents/Dashboard";
// import AdminVehicleList from './components/adminComponents/AdminVehicleListnew';
import AdminLeadList from "./components/adminComponents/AdminLeadList";
import AdminQueriesList from "./components/adminComponents/AdminQueriesList";
import AdminTransactions from "./components/adminComponents/AdminTransactions";
import AdminSettings from "./components/adminComponents/AdminSettings";
// import AdminSingleVehicle from './components/adminComponents/AdminSingleVehicle';
import AdminBlogs from "./components/adminComponents/AdminBlogs";
import AdminPages from "./components/adminComponents/AdminPages";
import AddBlog from "./components/adminComponents/AddBlog";
import EditBlog from "./components/adminComponents/EditBlog";
import EditPage from "./components/adminComponents/EditPage";
import AdminFaqs from "./components/adminComponents/AdminFaqs";
import AddFaq from "./components/adminComponents/AddFaq";
import EditFaq from "./components/adminComponents/EditFaq";
import SignIn from "./components/components/SignIn";
import Signup from "./components/components/SignUp";
import parseJwt from "./store/helpers/common";
import DealerSignup from "./components/components/DealerSignUp";
import DealerTransactions from "./components/adminComponents/DealerTransactions";
import CarSourcing from "./components/components/CarSourcing";
import CarSourcingTransactions from "./components/adminComponents/CarSourcingTransactions";
import Thankyou from "./components/components/ThankYou";
import WarningPage from "./components/components/WarningPage";
import { getGeolocation } from "./store/helpers/userServices";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userrole: "",
      is_loggedin: false,
      token: "",
      isUK: false,
    };
  }

  fetchGeolocation = async () => {
    try {
      console.log('step 1');
      const response = await fetch('https://get.geojs.io/v1/ip/geo.json');
      const geoData = await response.json();
      if (geoData && geoData.country_code === "GB") {
        this.setState({ isUK: true });
      } else {
        this.setState({ isUK: false });
      }
    } catch (error) {
      console.error("Error fetching geolocation:", error);
      this.setState({ isUK: false });
    }
  };

  componentDidMount() {
    this.fetchGeolocation();
    if (localStorage.getItem("token")) {
      const currdetails = parseJwt(localStorage.getItem("token"));
      console.log("credential:", currdetails);
      var role = currdetails?.urxrs;
      this.setState({
        userrole: role,
        is_loggedin: true,
        token: localStorage.getItem("token"),
      });
    }
  }

  componentDidUpdate() {
    const newToken = localStorage.getItem("token");
    if (newToken !== this.state.token) {
      this.setState({ token: newToken });
      const currdetails = parseJwt(localStorage.getItem("token"));
      console.log("credential:", currdetails);
      var role = currdetails?.urxrs;
      this.setState({
        userrole: role,
        is_loggedin: true,
        token: localStorage.getItem("token"),
      });
    }
  }

  render() {
    const { userrole, is_loggedin, isUK } = this.state;
    console.log("sdfdsf:", this.state);
    return isUK ? (
      <WarningPage />
    ) : (
      <HttpsRedirect>
        <BrowserRouter history={history}>
          <ScrollToTop>
            <Switch>
              {is_loggedin && userrole === "$aHF667#79+57h%45" ? (
                <>
                  <RouteWithLayout
                    layout={AdminLayout}
                    path="/used-cars/:location?/:brand?/:model?"
                    component={UsedCars}
                  />
                  {/* <RouteWithLayout layout={AdminLayout} path="/used-cars2/:location?/:brand?/:model?" component={UsedCars} /> */}
                  <RouteWithLayout
                    layout={AdminLayout}
                    path="/leads"
                    component={AdminLeadList}
                  />
                  <RouteWithLayout
                    layout={AdminLayout}
                    path="/queries"
                    component={AdminQueriesList}
                  />
                  <RouteWithLayout
                    layout={AdminLayout}
                    path="/vrt-transactions"
                    component={AdminTransactions}
                  />
                  <RouteWithLayout
                    layout={AdminLayout}
                    path="/dealer-transactions"
                    component={DealerTransactions}
                  />
                  <RouteWithLayout
                    layout={AdminLayout}
                    path="/carsourcing-transactions"
                    component={CarSourcingTransactions}
                  />
                  <RouteWithLayout
                    layout={AdminLayout}
                    path="/settings"
                    component={AdminSettings}
                  />
                  {/* <RouteWithLayout layout={AdminLayout} path="/vehicle/:id" component={AdminSingleVehicle} /> */}
                  <RouteWithLayout
                    layout={AdminLayout}
                    path="/pages"
                    component={AdminPages}
                  />
                  <RouteWithLayout
                    layout={AdminLayout}
                    path="/blogs"
                    component={AdminBlogs}
                  />
                  <RouteWithLayout
                    layout={AdminLayout}
                    path="/add-blog"
                    component={AddBlog}
                  />
                  <RouteWithLayout
                    layout={AdminLayout}
                    path="/edit-blog/:slug"
                    component={EditBlog}
                  />
                  <RouteWithLayout
                    layout={AdminLayout}
                    path="/edit-page/:slug"
                    component={EditPage}
                  />
                  <RouteWithLayout
                    layout={AdminLayout}
                    path="/faqs"
                    component={AdminFaqs}
                  />
                  <RouteWithLayout
                    layout={AdminLayout}
                    path="/add-faq"
                    component={AddFaq}
                  />
                  <RouteWithLayout
                    layout={AdminLayout}
                    path="/edit-faq/:slug"
                    component={EditFaq}
                  />
                  <RouteWithLayout
                    exact={true}
                    layout={AdminLayout}
                    path="/dashboard"
                    component={Dashboard}
                  />
                  <RouteWithLayout
                    exact={true}
                    layout={EmptyLayout}
                    path="/"
                    component={HomePage}
                  />
                  <RouteWithLayout
                    layout={EmptyLayout}
                    path="/faq"
                    component={Faq}
                  />
                  <RouteWithLayout
                    layout={EmptyLayout}
                    path="/about-us"
                    component={About}
                  />
                  <RouteWithLayout
                    layout={EmptyLayout}
                    path="/blog/:slug?"
                    component={Blog}
                  />
                  <RouteWithLayout
                    layout={EmptyLayout}
                    path="/contact"
                    component={Contact}
                  />
                  <RouteWithLayout
                    layout={EmptyLayout}
                    path="/terms-and-conditions"
                    component={TermsConditions}
                  />
                  <RouteWithLayout
                    layout={EmptyLayout}
                    path="/privacy-policy"
                    component={PrivacyPolicy}
                  />
                  <RouteWithLayout
                    layout={EmptyLayout}
                    path="/car/:id"
                    component={SingleCar}
                  />
                  <RouteWithLayout
                    layout={EmptyLayout}
                    path="/car-sourcing"
                    component={CarSourcing}
                  />
                  {/* <RouteWithLayout layout={EmptyLayout} path="/dealer-signup" component={DealerSignup} /> */}
                  <RouteWithLayout
                    layout={EmptyLayout}
                    path="/thankyou"
                    component={Thankyou}
                  />
                  {/* <RouteWithLayout layout={EmptyLayout} path="/dealer-signup" component={DealerSignup} /> */}
                  {/* <RouteWithLayout layout={EmptyLayout} path="/single-vehicle/:id" component={SingleVehicle} /> */}
                  {/* <RouteWithLayout layout={EmptyLayout} path="/registration" component={Registration} /> */}
                  {/* <RouteWithLayout layout={EmptyLayout} path="/vehicle-lists" component={VehicleList} /> */}
                  {/* <RouteWithLayout layout={EmptyLayout} path="/used-cars/:location?/:brand?/:model?" component={UsedCars} />       */}
                  {/* <RouteWithLayout layout={EmptyLayout} path="/vehicle-lists-new" component={VehicleListnew} /> */}
                </>
              ) : (
                <>
                  <RouteWithLayout
                    exact={true}
                    layout={EmptyLayout}
                    path="/"
                    component={HomePage}
                  />
                  <RouteWithLayout
                    layout={EmptyLayout}
                    path="/faq"
                    component={Faq}
                  />
                  <RouteWithLayout
                    layout={EmptyLayout}
                    path="/about-us"
                    component={About}
                  />
                  <RouteWithLayout
                    layout={EmptyLayout}
                    path="/blog/:slug?"
                    component={Blog}
                  />
                  <RouteWithLayout
                    layout={EmptyLayout}
                    path="/contact"
                    component={Contact}
                  />
                  {/* <RouteWithLayout layout={EmptyLayout} path="/payment" component={Payment} /> */}
                  <RouteWithLayout
                    layout={EmptyLayout}
                    path="/terms-and-conditions"
                    component={TermsConditions}
                  />
                  <RouteWithLayout
                    layout={EmptyLayout}
                    path="/privacy-policy"
                    component={PrivacyPolicy}
                  />
                  <RouteWithLayout
                    layout={EmptyLayout}
                    path="/car/:id"
                    component={SingleCar}
                  />
                  <RouteWithLayout
                    layout={EmptyLayout}
                    path="/used-cars/:location?/:brand?/:model?"
                    component={UsedCars}
                  />
                  <RouteWithLayout
                    layout={EmptyLayout}
                    path="/sign-up"
                    component={Signup}
                  />
                  <RouteWithLayout
                    layout={EmptyLayout}
                    path="/sign-in"
                    component={SignIn}
                  />
                  <RouteWithLayout
                    layout={EmptyLayout}
                    path="/car-sourcing"
                    component={CarSourcing}
                  />
                  <RouteWithLayout
                    layout={EmptyLayout}
                    path="/dealer-signup"
                    component={DealerSignup}
                  />
                  <RouteWithLayout
                    layout={EmptyLayout}
                    path="/thankyou"
                    component={Thankyou}
                  />
                </>
              )}
            </Switch>
          </ScrollToTop>
        </BrowserRouter>
      </HttpsRedirect>
    );
  }
}
export default App;
