import React, { Component } from "react";
import {
  clearFilteredCarnew as clearAllCars,
  getcarslistingnew,
  getFilteredCarsnew,
  getfiltersnew,
} from "../../store/actions/carActions";
import {
  getfilterdmake,
  getfilterdmodel,
  getfilterdfuel,
  getfilterdGrade,
  // getfilterdcondition,
  getfilterdbodystyles,
  getfilterdMileage,
  getfilterdtransmission,
  getfilterdengine,
  getfilterdcolor,
  getfilterdVrt,
} from "../../store/actions/filterActions";
import SimpleReactValidator from "simple-react-validator";
import { Button, Form, Col, Row } from "react-bootstrap";
import { apiBaseUrl } from "../../store/helpers/common";
import toastr from "reactjs-toastr";
import "reactjs-toastr/lib/toast.css";
import { getsettings } from "../../store/actions/commonActions";
import { NavLink } from "react-router-dom";
import PhoneInput from "react-phone-number-input";
import $ from "jquery";
import { connect } from "react-redux";
import Pagination from "react-js-pagination";
import queryString from "query-string";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import parseJwt from "../../store/helpers/common";
import { Helmet } from "react-helmet";
import formatNumber from "simple-format-number";
import MilesToKilometers from "miles-to-kilometers";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import swal from "sweetalert";
import Tooltip from "rc-tooltip";
import Drawer from "rc-drawer";
import "rc-tooltip/assets/bootstrap.css";
import {
  Elements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  PaymentRequestButtonElement,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import "./style.css";

const stripePromise = loadStripe("pk_live_hvQGGPsKi13bSSCm2zoKHfMi00RCjfXZZS");
// const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_TEST_KEY);

const CheckoutForm = ({ info, onSuccessfulCheckout, validateform }) => {
  const stripe = useStripe();
  const elements = useElements();
  const handleSubmit = async (event) => {
    event.preventDefault();
    var validate = validateform();
    if (validate) {
      var card = elements.getElement(CardNumberElement);
      if (!stripe || !elements) {
        console.log("error");
        return;
      }
      $(".btn-pay").attr("disabled", "disabled");
      $(".btn-pay").text("Please Wait");
      const result = await stripe.createToken(card);
      if (result.error) {
        console.log(result.error.message);
        toastr.error(result.error.message, '', { displayDuration: 10000 });
        $(".btn-pay").removeAttr("disabled", "disabled");
        $(".btn-pay").text("Pay");
      } else {
        onSuccessfulCheckout(result.token.id);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Card Number</label>
      <CardNumberElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      <label>Expiry</label>
      <CardExpiryElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      <label>CVC</label>
      <CardCvcElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      {/* <CardElement /> */}
      <br />
      <button className="btn btn-pay" type="submit" disabled={!stripe}>
        Pay
      </button>
    </form>
  );
};

class UsedCars extends Component {
  constructor(props) {
    super(props);
    this.formValidator = new SimpleReactValidator();
    this.searchformValidator = new SimpleReactValidator();
    this.payformValidator = new SimpleReactValidator();
    this.state = {
      carsdata: [],
      carimg: "",
      carimages: "",
      carname: "",
      car_id: "",
      deposit_price: 0,
      car_c_p: 0,
      car_n: 0,
      warranty: 0,
      vrt_price: 295,
      transfer_price: 0,
      before_vrt_final_price_state: "",
      vrt_rate_state: "",
      gradeData: "",
      vrtData: "",
      inspection: 0,
      inspection_fee: 1,
      delivery_price: 0,
      Name: "",
      Email: "",
      pageOfItems: [],
      Phone: "",
      twelvemonthwarrenty: "",
      premiummax395: "",
      vrt_proccessing: 1,
      transferuktodub: 1,
      homedelivry: "0",
      tnc: "",
      Year: "",
      minYear: "",
      maxYear: "",
      minPrice: "",
      maxPrice: "",
      Make: "",
      Model: "",
      body_style: "",
      engine: "",
      color: [],
      is_manheim_car_val: false,
      is_manheim_car: 0,
      premium_car_val: false,
      premium_car: 0,
      Condition: "",
      Mileage: "",
      minMileage: "",
      maxMileage: "",
      transmission_type: "",
      Fuel: "",
      Grade: "",
      Vrt: "",
      filter: false,
      filterdata: [],
      filtermodeldata: [],
      filterbodystyledata: [],
      carsloader: true,
      total_cars: "",
      activePage: 1,
      total_pages: "",
      isSubmit: false,
      feature_img: [],
      limit: 10,
      mileage_sort: "",
      price_sort: "",
      preffer_make: "",
      preffer_model: "",
      preffer_location: "",
      yearfilter: "",
      makefilter: "",
      modelfilter: "",
      fuelfilter: "",
      gradefilter: "",
      vrtFilter: "",
      bodystylefilter: "",
      conditionfilter: "",
      Mileagefilter: "",
      transmissionfilter: "",
      enginefilter: "",
      colorfilter: "",
      yearlist: [
        // { name: "2010", value: "2010" },
        // { name: "2011", value: "2011" },
        // { name: "2012", value: "2012" },
        // { name: "2013", value: "2013" },
        { name: "2014", value: "2014" },
        { name: "2015", value: "2015" },
        { name: "2016", value: "2016" },
        { name: "2017", value: "2017" },
        { name: "2018", value: "2018" },
        { name: "2019", value: "2019" },
        { name: "2020", value: "2020" },
        { name: "2021", value: "2021" },
        { name: "2022", value: "2022" },
        { name: "2023", value: "2023" },
        { name: "2024", value: "2024" },
      ],
      isLoggedIn: "",
      userrole: "",
      photoIndex: 0,
      isOpen: false,
      images: [],
      searchname: "",
      mobile_filterstate: false,
      unpaymentcars: [],
      pay_name: "",
      pay_email: "",
      pay_address: "",
      pay_city: "",
      pay_country: "",
      pay_amount: 200,
      pay_loader: false,
      car_detailing: [],
      include_warranty: 0,
      show: false,
    };
    this.handleClose = this.handleClose.bind(this);
    this.handleOpenDrawer = this.handleOpenDrawer.bind(this);
    this.handleCloseDraw = this.handleCloseDraw.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(getfilterdGrade());
    this.props.dispatch(getfilterdVrt());
    if (localStorage.getItem("token")) {
      const currdetails = parseJwt(localStorage.getItem("token"));
      const role = currdetails.urxrs;
      console.log("get token:", currdetails);
      console.log(role);
      if (currdetails.urxrs) {
        this.setState({ isLoggedIn: true, userrole: currdetails.urxrs });
      }
    }
    var preffermake = this.props.match.params.brand;
    var preffermodel = this.props.match.params.model;

    var location = this.props.match.params.location;
    this.setState({
      preffer_make: preffermake,
      preffer_model: preffermodel,
      preffer_location: location,
    });
    this.setState({ loader: true });
    var searchquery = this.props.location.search;
    if (searchquery != "") {
      const parsed = queryString.parse(searchquery);

      let {
        is_manheim_car,
        premium_car,
        minPrice,
        maxPrice,
        minYear,
        maxYear,
        Make,
        Model,
        Fuel,
        body_style,
        Condition,
        minMileage,
        maxMileage,
        transmission_type,
        engine,
        limit,
        price_sort,
        mileage_sort,
        color,
      } = this.state;
      if (parsed.Make) {
        Make = parsed.Make;
      }
      if (parsed.Fuel) {
        Fuel = parsed.Fuel;
      }
      if (parsed.transmission_type) {
        transmission_type = parsed.transmission_type;
      }
      if (parsed.body_style) {
        body_style = parsed.body_style;
      }
      if (parsed.engine) {
        engine = parsed.engine;
      }
      if (parsed.Condition) {
        Condition = parsed.Condition;
      }
      if (parsed.Model) {
        Model = parsed.Model;
      }
      if (parsed.transmission_type) {
        transmission_type = parsed.transmission_type;
      }
      if (parsed.minYear) {
        minYear = parsed.minYear;
      }
      if (parsed.maxYear) {
        maxYear = parsed.maxYear;
      }
      if (parsed.minPrice) {
        minPrice = parsed.minPrice;
      }
      if (parsed.maxPrice) {
        maxPrice = parsed.maxPrice;
      }
      if (parsed.minMileage) {
        minMileage = parsed.minMileage;
      }
      if (parsed.maxMileage) {
        maxMileage = parsed.maxMileage;
      }
      if (parsed.premium_car) {
        premium_car = parsed.premium_car;
      }
      if (parsed.is_manheim_car) {
        is_manheim_car = parsed.is_manheim_car;
      }

      this.setState({
        filter: true,
        minPrice: minPrice,
        maxPrice: maxPrice,
        minYear: minYear,
        maxYear: maxYear,
        Make: Make,
        Model: Model,
        Fuel: Fuel,
        body_style: body_style,
        Condition: Condition,
        minMileage: minMileage,
        maxMileage: maxMileage,
        transmission_type: transmission_type,
        engine: engine,
        limit: limit,
        price_sort: price_sort,
        mileage_sort: mileage_sort,
        color: color,
        is_manheim_car: is_manheim_car,
        premium_car: premium_car,
      });
      var pagenum = 0;
      // this.props.dispatch(getfilterdGrade());
      this.props.dispatch(
        getFilteredCarsnew(
          is_manheim_car,
          premium_car,
          minPrice,
          maxPrice,
          minYear,
          maxYear,
          Make,
          Model,
          Fuel,
          body_style,
          Condition,
          minMileage,
          maxMileage,
          transmission_type,
          engine,
          pagenum,
          limit,
          price_sort,
          mileage_sort,
          color,
          parseJwt(localStorage.getItem("token"))?.urxrs === "$aHF667#79+57h%45"
            ? "All"
            : "Yes"
        )
      );
      this.props.dispatch(
        getfilterdmake(
          is_manheim_car,
          premium_car,
          minPrice,
          maxPrice,
          minYear,
          maxYear,
          Make,
          Model,
          Fuel,
          body_style,
          Condition,
          minMileage,
          maxMileage,
          transmission_type,
          engine,
          color,
          parseJwt(localStorage.getItem("token"))?.urxrs === "$aHF667#79+57h%45"
            ? "All"
            : "Yes"
        )
      );
      this.props.dispatch(
        getfilterdfuel(
          is_manheim_car,
          premium_car,
          minPrice,
          maxPrice,
          minYear,
          maxYear,
          Make,
          Model,
          Fuel,
          body_style,
          Condition,
          minMileage,
          maxMileage,
          transmission_type,
          engine,
          color,
          parseJwt(localStorage.getItem("token"))?.urxrs === "$aHF667#79+57h%45"
            ? "All"
            : "Yes"
        )
      );
      this.props.dispatch(
        getfilterdtransmission(
          is_manheim_car,
          premium_car,
          minPrice,
          maxPrice,
          minYear,
          maxYear,
          Make,
          Model,
          Fuel,
          body_style,
          Condition,
          minMileage,
          maxMileage,
          transmission_type,
          engine,
          color,
          parseJwt(localStorage.getItem("token"))?.urxrs === "$aHF667#79+57h%45"
            ? "All"
            : "Yes"
        )
      );
      this.props.dispatch(
        getfilterdbodystyles(
          is_manheim_car,
          premium_car,
          minPrice,
          maxPrice,
          minYear,
          maxYear,
          Make,
          Model,
          Fuel,
          body_style,
          Condition,
          minMileage,
          maxMileage,
          transmission_type,
          engine,
          color,
          parseJwt(localStorage.getItem("token"))?.urxrs === "$aHF667#79+57h%45"
            ? "All"
            : "Yes"
        )
      );
      this.props.dispatch(
        getfilterdengine(
          is_manheim_car,
          premium_car,
          minPrice,
          maxPrice,
          minYear,
          maxYear,
          Make,
          Model,
          Fuel,
          body_style,
          Condition,
          minMileage,
          maxMileage,
          transmission_type,
          engine,
          color,
          parseJwt(localStorage.getItem("token"))?.urxrs === "$aHF667#79+57h%45"
            ? "All"
            : "Yes"
        )
      );

      this.props.dispatch(
        getfilterdmodel(
          is_manheim_car,
          premium_car,
          minPrice,
          maxPrice,
          minYear,
          maxYear,
          Make,
          Model,
          Fuel,
          body_style,
          Condition,
          minMileage,
          maxMileage,
          transmission_type,
          engine,
          color,
          parseJwt(localStorage.getItem("token"))?.urxrs === "$aHF667#79+57h%45"
            ? "All"
            : "Yes"
        )
      );
    } else if (preffermake) {
      let {
        is_manheim_car,
        premium_car,
        limit,
        minPrice,
        maxPrice,
        price_sort,
        mileage_sort,
        Year,
        minYear,
        maxYear,
        Make,
        Model,
        Fuel,
        body_style,
        Condition,
        Mileage,
        minMileage,
        maxMileage,
        transmission_type,
        engine,
        color,
        Vrt
      } = this.state;
      Make = preffermake;
      if (preffermodel) {
        Model = preffermodel;
      } else {
        Model = "";
      }
      this.setState({ filter: true, Make: Make, Model: Model });
      var pagenum = 0;
      this.props.dispatch(
        getFilteredCarsnew(
          is_manheim_car,
          premium_car,
          minPrice,
          maxPrice,
          minYear,
          maxYear,
          Make,
          Model,
          Fuel,
          body_style,
          Condition,
          minMileage,
          maxMileage,
          transmission_type,
          engine,
          pagenum,
          limit,
          price_sort,
          mileage_sort,
          color,
          parseJwt(localStorage.getItem("token"))?.urxrs === "$aHF667#79+57h%45"
            ? "All"
            : "Yes"
        )
      );
      // this.props.dispatch(getfilterdGrade());
      //exedcutign filters
      this.props.dispatch(
        getfilterdmake(
          is_manheim_car,
          premium_car,
          minPrice,
          maxPrice,
          minYear,
          maxYear,
          Make,
          Model,
          Fuel,
          body_style,
          Condition,
          minMileage,
          maxMileage,
          transmission_type,
          engine,
          color,
          parseJwt(localStorage.getItem("token"))?.urxrs === "$aHF667#79+57h%45"
            ? "All"
            : "Yes"
        )
      );
      this.props.dispatch(
        getfilterdfuel(
          is_manheim_car,
          premium_car,
          minPrice,
          maxPrice,
          minYear,
          maxYear,
          Make,
          Model,
          Fuel,
          body_style,
          Condition,
          minMileage,
          maxMileage,
          transmission_type,
          engine,
          color,
          parseJwt(localStorage.getItem("token"))?.urxrs === "$aHF667#79+57h%45"
            ? "All"
            : "Yes"
        )
      );
      this.props.dispatch(
        getfilterdtransmission(
          is_manheim_car,
          premium_car,
          minPrice,
          maxPrice,
          minYear,
          maxYear,
          Make,
          Model,
          Fuel,
          body_style,
          Condition,
          minMileage,
          maxMileage,
          transmission_type,
          engine,
          color,
          parseJwt(localStorage.getItem("token"))?.urxrs === "$aHF667#79+57h%45"
            ? "All"
            : "Yes"
        )
      );
      this.props.dispatch(
        getfilterdbodystyles(
          is_manheim_car,
          premium_car,
          minPrice,
          maxPrice,
          minYear,
          maxYear,
          Make,
          Model,
          Fuel,
          body_style,
          Condition,
          minMileage,
          maxMileage,
          transmission_type,
          engine,
          color,
          parseJwt(localStorage.getItem("token"))?.urxrs === "$aHF667#79+57h%45"
            ? "All"
            : "Yes"
        )
      );
      this.props.dispatch(
        getfilterdengine(
          is_manheim_car,
          premium_car,
          minPrice,
          maxPrice,
          minYear,
          maxYear,
          Make,
          Model,
          Fuel,
          body_style,
          Condition,
          minMileage,
          maxMileage,
          transmission_type,
          engine,
          color,
          parseJwt(localStorage.getItem("token"))?.urxrs === "$aHF667#79+57h%45"
            ? "All"
            : "Yes"
        )
      );
      this.props.dispatch(
        getfilterdmodel(
          is_manheim_car,
          premium_car,
          minPrice,
          maxPrice,
          minYear,
          maxYear,
          Make,
          Model,
          Fuel,
          body_style,
          Condition,
          minMileage,
          maxMileage,
          transmission_type,
          engine,
          color,
          parseJwt(localStorage.getItem("token"))?.urxrs === "$aHF667#79+57h%45"
            ? "All"
            : "Yes"
        )
      );
    } else {
      let {
        is_manheim_car,
        premium_car,
        limit,
        minPrice,
        maxPrice,
        price_sort,
        mileage_sort,
        Year,
        minYear,
        maxYear,
        Make,
        Model,
        Fuel,
        body_style,
        Condition,
        Mileage,
        minMileage,
        maxMileage,
        transmission_type,
        engine,
        color,
      } = this.state;
      this.props.dispatch(
        getcarslistingnew(
          0,
          limit,
          price_sort,
          mileage_sort,
          parseJwt(localStorage.getItem("token"))?.urxrs === "$aHF667#79+57h%45"
            ? "All"
            : "Yes"
        )
      );
      this.props.dispatch(
        getfilterdmake(
          is_manheim_car,
          premium_car,
          minPrice,
          maxPrice,
          minYear,
          maxYear,
          Make,
          Model,
          Fuel,
          body_style,
          Condition,
          minMileage,
          maxMileage,
          transmission_type,
          engine,
          color,
          parseJwt(localStorage.getItem("token"))?.urxrs === "$aHF667#79+57h%45"
            ? "All"
            : "Yes"
        )
      );
      this.props.dispatch(
        getfilterdfuel(
          is_manheim_car,
          premium_car,
          minPrice,
          maxPrice,
          minYear,
          maxYear,
          Make,
          Model,
          Fuel,
          body_style,
          Condition,
          minMileage,
          maxMileage,
          transmission_type,
          engine,
          color,
          parseJwt(localStorage.getItem("token"))?.urxrs === "$aHF667#79+57h%45"
            ? "All"
            : "Yes"
        )
      );
      this.props.dispatch(
        getfilterdtransmission(
          is_manheim_car,
          premium_car,
          minPrice,
          maxPrice,
          minYear,
          maxYear,
          Make,
          Model,
          Fuel,
          body_style,
          Condition,
          minMileage,
          maxMileage,
          transmission_type,
          engine,
          color,
          parseJwt(localStorage.getItem("token"))?.urxrs === "$aHF667#79+57h%45"
            ? "All"
            : "Yes"
        )
      );
      this.props.dispatch(
        getfilterdbodystyles(
          is_manheim_car,
          premium_car,
          minPrice,
          maxPrice,
          minYear,
          maxYear,
          Make,
          Model,
          Fuel,
          body_style,
          Condition,
          minMileage,
          maxMileage,
          transmission_type,
          engine,
          color,
          parseJwt(localStorage.getItem("token"))?.urxrs === "$aHF667#79+57h%45"
            ? "All"
            : "Yes"
        )
      );
      this.props.dispatch(
        getfilterdengine(
          is_manheim_car,
          premium_car,
          minPrice,
          maxPrice,
          minYear,
          maxYear,
          Make,
          Model,
          Fuel,
          body_style,
          Condition,
          minMileage,
          maxMileage,
          transmission_type,
          engine,
          color,
          parseJwt(localStorage.getItem("token"))?.urxrs === "$aHF667#79+57h%45"
            ? "All"
            : "Yes"
        )
      );
      this.props.dispatch(
        getfilterdmodel(
          is_manheim_car,
          premium_car,
          minPrice,
          maxPrice,
          minYear,
          maxYear,
          Make,
          Model,
          Fuel,
          body_style,
          Condition,
          minMileage,
          maxMileage,
          transmission_type,
          engine,
          color,
          parseJwt(localStorage.getItem("token"))?.urxrs === "$aHF667#79+57h%45"
            ? "All"
            : "Yes"
        )
      );
    }
    this.props.dispatch(getsettings());
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.show !== this.state.show) {
      // Handle state change here
      // This code will run when the 'show' state changes
      console.log(this.state.show);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.filter) {
      this.setState({
        carsdata: nextProps.filteredcardata.cars,
        carimages: nextProps.filteredcardata.cars,
        total_cars: nextProps.filteredcardata.count,
        carsloader: nextProps.filteredcarloading,
      });
      if (nextProps.filteredcardata.cars) {
        var cars_data = nextProps.filteredcardata.cars;
        var items = [];
        Object.keys(cars_data).map((key, index) => {
          items.push(cars_data[key].car_id);
        });
        this.setState({
          unpaymentcars: items,
        });
      }
    } else {
      this.setState({
        carsdata: nextProps.carsdata.cars,
        carimages: nextProps.carsdata.cars,
        total_cars: nextProps.carsdata.count,
        carsloader: nextProps.carsloading,
      });
      if (nextProps.carsdata.cars) {
        var cars_data = nextProps.carsdata.cars;
        var items = [];
        Object.keys(cars_data).map((key, index) => {
          items.push(cars_data[key].car_id);
        });
        this.setState({
          unpaymentcars: items,
        });
      }
    }
    this.setState({
      filtermodeldata: nextProps.filtermodeldata,
      filterbodystyledata: nextProps.filterbodystyledata,
      yearfilter: nextProps.yeardata,
      makefilter: nextProps.makedata,
      modelfilter: nextProps.modeldata,
      fuelfilter: nextProps.fueldata,
      gradefilter: nextProps.gradefilter,
      vrtFilter: nextProps.vrtFilter,
      bodystylefilter: nextProps.bodystyledata,
      conditionfilter: nextProps.conditiondata,
      Mileagefilter: nextProps.mileagedata,
      transmissionfilter: nextProps.transmissiondata,
      enginefilter: nextProps.enginedata,
      colorfilter: nextProps.colordata,
      settings: nextProps.settings,
      gradeData: nextProps.gradeData,
      vrtData: nextProps.vrtData,
    });
  }
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
    if (e.target.name === "twelvemonthwarrenty") {
      var warranty = 0;
      if (e.target.value === "") {
        warranty = 0;
      } else if (e.target.value === "premiummax395") {
        warranty = 395;
      } else if (e.target.value === "premiumplus395") {
        warranty = 395;
      } else if (e.target.value === "premiumpowertrain295") {
        warranty = 295;
      } else if (e.target.value === "premiumcomp395") {
        warranty = 395;
      } else {
        warranty = 0;
      }
      this.setState({
        warranty: warranty,
      });
    }
  };

  filterSelect = (name) => {
    let {
      is_manheim_car,
      premium_car,
      minPrice,
      maxPrice,
      minYear,
      maxYear,
      Make,
      Model,
      Fuel,
      body_style,
      transmission_type,
      Condition,
      minMileage,
      maxMileage,
      engine,
      color,
    } = this.state;
    if (name === "Make") {
      this.props.dispatch(
        getfilterdmake(
          is_manheim_car,
          premium_car,
          minPrice,
          maxPrice,
          minYear,
          maxYear,
          Make,
          Model,
          Fuel,
          body_style,
          Condition,
          minMileage,
          maxMileage,
          transmission_type,
          engine,
          color,
          this.getVrtFilterByRole()
        )
      );
    } else if (name === "Fuel") {
      this.props.dispatch(
        getfilterdfuel(
          is_manheim_car,
          premium_car,
          minPrice,
          maxPrice,
          minYear,
          maxYear,
          Make,
          Model,
          Fuel,
          body_style,
          Condition,
          minMileage,
          maxMileage,
          transmission_type,
          engine,
          color,
          this.getVrtFilterByRole()
        )
      );
    } else if (name === "transmission_type") {
      this.props.dispatch(
        getfilterdtransmission(
          is_manheim_car,
          premium_car,
          minPrice,
          maxPrice,
          minYear,
          maxYear,
          Make,
          Model,
          Fuel,
          body_style,
          Condition,
          minMileage,
          maxMileage,
          transmission_type,
          engine,
          color,
          this.getVrtFilterByRole()
        )
      );
    } else if (name === "body_style") {
      this.props.dispatch(
        getfilterdbodystyles(
          is_manheim_car,
          premium_car,
          minPrice,
          maxPrice,
          minYear,
          maxYear,
          Make,
          Model,
          Fuel,
          body_style,
          Condition,
          minMileage,
          maxMileage,
          transmission_type,
          engine,
          color,
          this.getVrtFilterByRole()
        )
      );
    } else if (name === "engine") {
      this.props.dispatch(
        getfilterdengine(
          is_manheim_car,
          premium_car,
          minPrice,
          maxPrice,
          minYear,
          maxYear,
          Make,
          Model,
          Fuel,
          body_style,
          Condition,
          minMileage,
          maxMileage,
          transmission_type,
          engine,
          color,
          this.getVrtFilterByRole()
        )
      );
    } else if (name === "Model") {
      this.props.dispatch(
        getfilterdmodel(
          is_manheim_car,
          premium_car,
          minPrice,
          maxPrice,
          minYear,
          maxYear,
          Make,
          Model,
          Fuel,
          body_style,
          Condition,
          minMileage,
          maxMileage,
          transmission_type,
          engine,
          color,
          this.getVrtFilterByRole()
        )
      );
    }
  };

  deleteCar = (e, carid) => {
    swal({
      title: "Are you sure to delete this Car?",
      buttons: ["Cancel", "Yes"],
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        // alert(blog_id)
        if (localStorage.getItem("token")) {
          const request = new Request(
            `${apiBaseUrl}/user/delete-car/` + carid,
            {
              method: "DELETE",
              headers: { "X-Auth-Token": `${localStorage.getItem("token")}` },
              body: "",
            }
          );
          return fetch(request)
            .then((res) => res.json())
            .then((data) => {
              if (data.ResponseCode == 1) {
                toastr.success(data.ResponseText, '', { displayDuration: 10000 });
                window.location.reload();
              }
            })
            .catch((err) => {
              console.log("err :" + err);
            });
        } else {
          toastr.error("Error.. Please try again.", '', { displayDuration: 10000 });
        }
      }
    });
  };

  selectpremium = (name, value) => {
    this.setState({
      [name]: value,
    });
    if (value) {
      this.selectOption(name, value);
    } else {
      this.clearOption(name);
    }
  };
  selectAuction = (name, value) => {
    this.setState({
      [name]: value,
    });
    if (value) {
      this.selectOption(name, value);
    } else {
      this.clearOption(name);
    }
  };
  selectOption = (name, value) => {
    console.log(name, value);
    this.setState({
      [name]: value,
    });
    let {
      is_manheim_car,
      premium_car,
      price_sort,
      mileage_sort,
      limit,
      minPrice,
      maxPrice,
      minYear,
      maxYear,
      Make,
      Model,
      Fuel,
      body_style,
      transmission_type,
      Condition,
      minMileage,
      maxMileage,
      engine,
      color,
      Grade,
      Vrt,
    } = this.state;
    if (name === "premium_car_val") {
      if (value) {
        premium_car = 1;
      } else {
        premium_car = 0;
      }
      this.setState({
        premium_car: premium_car,
      });
    }
    if (name === "is_manheim_car_val") {
      if (value) {
        is_manheim_car = 1;
      } else {
        is_manheim_car = 0;
      }
      this.setState({
        is_manheim_car: is_manheim_car,
      });
    }
    /* filterData */
    if (name === "Make") {
      Make = value;
      // Model = "";
      // body_style = "";
      // Fuel = "";
      // transmission_type = "";
      // this.setState({
      //   Model: "",
      //   body_style: "",
      //   transmission_type: "",
      //   Fuel: "",
      // });
    } else if (name === "Fuel") {
      Fuel = value;
      // this.setState({
      //   Fuel: "",
      // });
    } else if (name === "Grade") {
      Grade = value;
      console.log("Grade", Grade);
    } else if (name === "Vrt") {
      Vrt = value;
    } else if (name === "transmission_type") {
      transmission_type = value;
    } else if (name === "body_style") {
      body_style = value;
    } else if (name === "engine") {
      console.log("engine........................", value);
      engine = value;
    } else if (name === "Condition") {
      Condition = value;
    } else if (name === "Model") {
      Model = value;
      // body_style = "";
      // this.setState({
      //   body_style: "",
      // });
    } else if (name === "minYear") {
      minYear = value;
    } else if (name === "maxYear") {
      maxYear = value;
    } else if (name === "minPrice") {
      console.log("minPrice.............", minPrice);
      minPrice = value;
    } else if (name === "maxPrice") {
      maxPrice = value;
    } else if (name === "minMileage") {
      minMileage = value;
    } else if (name === "maxMileage") {
      maxMileage = value;
    }
    this.setState({ filter: true, activePage: 1 });
    var parsed = [];
    parsed.filter = true;
    if (Make) {
      parsed.Make = Make;
    }
    if (premium_car) {
      parsed.premium_car = premium_car;
    }
    if (is_manheim_car) {
      parsed.is_manheim_car = is_manheim_car;
    }
    if (Fuel) {
      parsed.Fuel = Fuel;
    }
    if (transmission_type) {
      parsed.transmission_type = transmission_type;
    }
    if (body_style) {
      parsed.body_style = body_style;
    }
    if (engine) {
      parsed.engine = engine;
    }
    if (Condition) {
      parsed.Condition = Condition;
    }
    if (Model) {
      parsed.Model = Model;
    }

    if (minYear) {
      parsed.minYear = minYear;
    }
    if (maxYear) {
      parsed.maxYear = maxYear;
    }
    if (parseInt(minPrice) >= 0) {
      parsed.minPrice = minPrice;
    }
    if (parseInt(maxPrice) >= 0) {
      parsed.maxPrice = maxPrice;
    }
    if (minMileage) {
      parsed.minMileage = minMileage;
    }
    if (maxMileage) {
      parsed.maxMileage = maxMileage;
    }
    const stringified = queryString.stringify(parsed);
    this.props.history.push("/used-cars/?" + stringified);
    console.log("Vrt : ", Vrt);
    // executing filters on condition basis
    if (name !== "Make" && !Make) {
      this.props.dispatch(
        getfilterdmake(
          is_manheim_car,
          premium_car,
          minPrice,
          maxPrice,
          minYear,
          maxYear,
          Make,
          Model,
          Fuel,
          body_style,
          Condition,
          minMileage,
          maxMileage,
          transmission_type,
          engine,
          color,
          this.getVrtFilterByRole(Vrt)
        )
      );
      this.props.dispatch(
        getfilterdfuel(
          is_manheim_car,
          premium_car,
          minPrice,
          maxPrice,
          minYear,
          maxYear,
          Make,
          Model,
          Fuel,
          body_style,
          Condition,
          minMileage,
          maxMileage,
          transmission_type,
          engine,
          color,
          this.getVrtFilterByRole(Vrt)
        )
      );
    }
    if (name !== "Fuel" && !Fuel) {
      this.props.dispatch(
        getfilterdfuel(
          is_manheim_car,
          premium_car,
          minPrice,
          maxPrice,
          minYear,
          maxYear,
          Make,
          Model,
          Fuel,
          body_style,
          Condition,
          minMileage,
          maxMileage,
          transmission_type,
          engine,
          color,
          this.getVrtFilterByRole(Vrt)
        )
      );
    }
    if (name !== "transmission_type" && !transmission_type) {
      console.log(engine);
      this.props.dispatch(
        getfilterdtransmission(
          is_manheim_car,
          premium_car,
          minPrice,
          maxPrice,
          minYear,
          maxYear,
          Make,
          Model,
          Fuel,
          body_style,
          Condition,
          minMileage,
          maxMileage,
          transmission_type,
          engine,
          color,
          this.getVrtFilterByRole(Vrt)
        )
      );
    }
    if (name !== "body_style" && !body_style) {
      this.props.dispatch(
        getfilterdbodystyles(
          is_manheim_car,
          premium_car,
          minPrice,
          maxPrice,
          minYear,
          maxYear,
          Make,
          Model,
          Fuel,
          body_style,
          Condition,
          minMileage,
          maxMileage,
          transmission_type,
          engine,
          color,
          this.getVrtFilterByRole(Vrt)
        )
      );
    }
    if (name !== "engine" && !engine) {
      this.props.dispatch(
        getfilterdengine(
          is_manheim_car,
          premium_car,
          minPrice,
          maxPrice,
          minYear,
          maxYear,
          Make,
          Model,
          Fuel,
          body_style,
          Condition,
          minMileage,
          maxMileage,
          transmission_type,
          engine,
          color,
          this.getVrtFilterByRole(Vrt)
        )
      );
    }
    if (name !== "Model" && !Model) {
      this.props.dispatch(
        getfilterdmodel(
          is_manheim_car,
          premium_car,
          minPrice,
          maxPrice,
          minYear,
          maxYear,
          Make,
          Model,
          Fuel,
          body_style,
          Condition,
          minMileage,
          maxMileage,
          transmission_type,
          engine,
          color,
          this.getVrtFilterByRole(Vrt)
        )
      );
    }
    // executing filters on condition basis
    var pagenum = 0;
    this.props.dispatch(clearAllCars());
    this.props.dispatch(
      getFilteredCarsnew(
        is_manheim_car,
        premium_car,
        minPrice,
        maxPrice,
        minYear,
        maxYear,
        Make,
        Model,
        Fuel,
        body_style,
        Condition,
        minMileage,
        maxMileage,
        transmission_type,
        engine,
        pagenum,
        limit,
        price_sort,
        mileage_sort,
        color,
        this.getVrtFilterByRole(Vrt),
        Grade
      )
    );
  };
  clearOption = (name) => {
    var pagenum = 0;
    if (name === "premium_car_val") {
      this.setState({
        premium_car: 0,
      });
    } else if (name === "is_manheim_car_val") {
      this.setState({
        is_manheim_car: 0,
      });
    } else {
      this.setState({
        [name]: "",
      });
    }

    let {
      is_manheim_car,
      premium_car,
      price_sort,
      mileage_sort,
      limit,
      minPrice,
      maxPrice,
      minYear,
      maxYear,
      Make,
      Model,
      Fuel,
      body_style,
      transmission_type,
      Condition,
      minMileage,
      maxMileage,
      engine,
      color,
      Grade,
      Vrt,
    } = this.state;
    if (name === "Make") {
      Make = "";
      Vrt = "";
      this.setState({
        Vrt: "",
      });
    } else if (name === "Fuel") {
      Fuel = "";
    } else if (name === "transmission_type") {
      transmission_type = "";
    } else if (name === "body_style") {
      body_style = "";
    } else if (name === "engine") {
      engine = "";
    } else if (name === "Model") {
      Model = "";
    } else if (name === "Grade") {
      Grade = "";
    } else if (name === "Vrt") {
      Vrt = "";
    } else if (name === "minYear") {
      minYear = "";
      maxYear = "";
      minMileage = "";
      maxMileage = "";
      this.setState({
        maxYear: "",
        minMileage: "",
        maxMileage: "",
      });
    } else if (name === "maxYear") {
      maxYear = "";
    } else if (name === "minPrice") {
      minPrice = "";
    } else if (name === "maxPrice") {
      maxPrice = "";
    } else if (name === "minMileage") {
      minMileage = "";
      maxMileage = "";
      this.setState({
        minMileage: "",
        maxMileage: "",
      });
    } else if (name === "maxMileage") {
      maxMileage = "";
      this.setState({
        maxMileage: "",
      });
    } else if (name === "premium_car_val") {
      // console.log('yes')
      premium_car = 0;
    } else if (name === "is_manheim_car_val") {
      is_manheim_car = 0;
    }
    if (color.length === 0) {
      color = "";
    } else {
      color = color;
    }
    if (
      is_manheim_car !== 0 ||
      premium_car !== 0 ||
      Make ||
      Fuel ||
      transmission_type ||
      body_style ||
      engine ||
      // Condition ||
      Model ||
      minYear ||
      maxYear ||
      minPrice ||
      maxPrice ||
      minMileage ||
      maxMileage ||
      color
    ) {
      var parsed = [];
      parsed.filter = true;
      if (Make) {
        parsed.Make = Make;
      }
      if (premium_car) {
        parsed.premium_car = premium_car;
      }
      if (is_manheim_car) {
        parsed.is_manheim_car = is_manheim_car;
      }

      if (Fuel) {
        parsed.Fuel = Fuel;
      }
      if (transmission_type) {
        parsed.transmission_type = transmission_type;
      }
      if (body_style) {
        parsed.body_style = body_style;
      }
      if (engine) {
        parsed.engine = engine;
      }
      // if (Condition) {
      //   parsed.Condition = Condition;
      // }
      if (Model) {
        parsed.Model = Model;
      }
      // if (transmission_type) {
      //   parsed.transmission_type = transmission_type;
      // }
      if (minYear) {
        parsed.minYear = minYear;
      }
      if (maxYear) {
        parsed.maxYear = maxYear;
      }
      if (minPrice) {
        parsed.minPrice = minPrice;
      }
      if (maxPrice) {
        parsed.maxPrice = maxPrice;
      }
      if (minMileage) {
        parsed.minMileage = minMileage;
      }
      if (maxMileage) {
        parsed.maxMileage = maxMileage;
      }
      const stringified = queryString.stringify(parsed);
      // this.props.location.search(stringified)
      this.setState({ filter: true, activePage: 1 });
      this.props.dispatch(clearAllCars());
      this.props.dispatch(
        getFilteredCarsnew(
          is_manheim_car,
          premium_car,
          minPrice,
          maxPrice,
          minYear,
          maxYear,
          Make,
          Model,
          Fuel,
          body_style,
          Condition,
          minMileage,
          maxMileage,
          transmission_type,
          engine,
          pagenum,
          limit,
          price_sort,
          mileage_sort,
          color,
          this.getVrtFilterByRole(Vrt),
          Grade
        )
      );
      this.props.history.push("/used-cars/?" + stringified);
      // updating filters
      this.props.dispatch(
        getfilterdmake(
          is_manheim_car,
          premium_car,
          minPrice,
          maxPrice,
          minYear,
          maxYear,
          Make,
          Model,
          Fuel,
          body_style,
          Condition,
          minMileage,
          maxMileage,
          transmission_type,
          engine,
          color,
          this.getVrtFilterByRole(Vrt)
        )
      );
      this.props.dispatch(
        getfilterdfuel(
          is_manheim_car,
          premium_car,
          minPrice,
          maxPrice,
          minYear,
          maxYear,
          Make,
          Model,
          Fuel,
          body_style,
          Condition,
          minMileage,
          maxMileage,
          transmission_type,
          engine,
          color,
          this.getVrtFilterByRole(Vrt)
        )
      );
      this.props.dispatch(
        getfilterdtransmission(
          is_manheim_car,
          premium_car,
          minPrice,
          maxPrice,
          minYear,
          maxYear,
          Make,
          Model,
          Fuel,
          body_style,
          Condition,
          minMileage,
          maxMileage,
          transmission_type,
          engine,
          color,
          this.getVrtFilterByRole(Vrt)
        )
      );
      this.props.dispatch(
        getfilterdbodystyles(
          is_manheim_car,
          premium_car,
          minPrice,
          maxPrice,
          minYear,
          maxYear,
          Make,
          Model,
          Fuel,
          body_style,
          Condition,
          minMileage,
          maxMileage,
          transmission_type,
          engine,
          color,
          this.getVrtFilterByRole(Vrt)
        )
      );
      this.props.dispatch(
        getfilterdengine(
          is_manheim_car,
          premium_car,
          minPrice,
          maxPrice,
          minYear,
          maxYear,
          Make,
          Model,
          Fuel,
          body_style,
          Condition,
          minMileage,
          maxMileage,
          transmission_type,
          engine,
          color,
          this.getVrtFilterByRole(Vrt)
        )
      );
      // this.props.dispatch(
      //   getfilterdcondition(
      //     is_manheim_car,
      //     premium_car,
      //     minPrice,
      //     maxPrice,
      //     minYear,
      //     maxYear,
      //     Make,
      //     Model,
      //     Fuel,
      //     body_style,
      //     Condition,
      //     minMileage,
      //     maxMileage,
      //     transmission_type,
      //     engine,
      //     color
      //   )
      // );
      this.props.dispatch(
        getfilterdmodel(
          is_manheim_car,
          premium_car,
          minPrice,
          maxPrice,
          minYear,
          maxYear,
          Make,
          Model,
          Fuel,
          body_style,
          Condition,
          minMileage,
          maxMileage,
          transmission_type,
          engine,
          color,
          this.getVrtFilterByRole(Vrt)
        )
      );
    } else {
      this.setState({ filter: false, activePage: 1 });
      this.props.dispatch(
        getfilterdmake(
          is_manheim_car,
          premium_car,
          minPrice,
          maxPrice,
          minYear,
          maxYear,
          Make,
          Model,
          Fuel,
          body_style,
          Condition,
          minMileage,
          maxMileage,
          transmission_type,
          engine,
          color,
          this.getVrtFilterByRole(Vrt)
        )
      );
      this.props.dispatch(
        getfilterdfuel(
          is_manheim_car,
          premium_car,
          minPrice,
          maxPrice,
          minYear,
          maxYear,
          Make,
          Model,
          Fuel,
          body_style,
          Condition,
          minMileage,
          maxMileage,
          transmission_type,
          engine,
          color,
          this.getVrtFilterByRole(Vrt)
        )
      );
      this.props.dispatch(
        getfilterdtransmission(
          is_manheim_car,
          premium_car,
          minPrice,
          maxPrice,
          minYear,
          maxYear,
          Make,
          Model,
          Fuel,
          body_style,
          Condition,
          minMileage,
          maxMileage,
          transmission_type,
          engine,
          color,
          this.getVrtFilterByRole(Vrt)
        )
      );
      this.props.dispatch(
        getfilterdbodystyles(
          is_manheim_car,
          premium_car,
          minPrice,
          maxPrice,
          minYear,
          maxYear,
          Make,
          Model,
          Fuel,
          body_style,
          Condition,
          minMileage,
          maxMileage,
          transmission_type,
          engine,
          color,
          this.getVrtFilterByRole(Vrt)
        )
      );
      this.props.dispatch(
        getfilterdengine(
          is_manheim_car,
          premium_car,
          minPrice,
          maxPrice,
          minYear,
          maxYear,
          Make,
          Model,
          Fuel,
          body_style,
          Condition,
          minMileage,
          maxMileage,
          transmission_type,
          engine,
          color,
          this.getVrtFilterByRole(Vrt)
        )
      );

      this.props.dispatch(
        getfilterdmodel(
          is_manheim_car,
          premium_car,
          minPrice,
          maxPrice,
          minYear,
          maxYear,
          Make,
          Model,
          Fuel,
          body_style,
          Condition,
          minMileage,
          maxMileage,
          transmission_type,
          engine,
          color,
          this.getVrtFilterByRole(Vrt)
        )
      );

      this.props.dispatch(
        getcarslistingnew(
          0,
          limit,
          price_sort,
          mileage_sort,
          this.getVrtFilterByRole()
        )
      );
      this.props.history.push("/used-cars");
    }
  };
  onfilterChange = (ev) => {
    this.setState({ activePage: 1, filter: true });
    if (this.state.filter) {
      this.setState({ carsloader: this.props.filteredcarloading });
    } else {
      this.setState({ carsloader: this.props.carsloading });
    }
    console.log(ev.target.checked);
    if (ev.target.name === "color") {
      let isChecked = ev.target.checked;
      let checkname = [ev.target.name];
      let values = this.state.color;
      if (isChecked) {
        values.push(ev.target.value);
      } else {
        var index = values.indexOf(ev.target.value);
        values.splice(index, 1);
      }
      this.setState({
        color: values,
      });
      var color = values;
    } else {
      var color = this.state.color;
    }

    if (ev.target.name === "minYear") {
      var minYear = ev.target.value;
    } else {
      var minYear = this.state.minYear;
    }
    if (ev.target.name === "maxYear") {
      var maxYear = ev.target.value;
    } else {
      var maxYear = this.state.maxYear;
    }
    // mileage filter
    if (ev.target.name === "minMileage") {
      var minMileage = ev.target.value;
    } else {
      var minMileage = this.state.minMileage;
    }

    if (ev.target.name === "maxMileage") {
      var maxMileage = ev.target.value;
    } else {
      var maxMileage = this.state.maxMileage;
    }
    // price filter
    if (ev.target.name === "minPrice") {
      var minPrice = ev.target.value;
    } else {
      var minPrice = this.state.minPrice;
    }

    if (ev.target.name === "maxPrice") {
      var maxPrice = ev.target.value;
    } else {
      var maxPrice = this.state.maxPrice;
    }

    if (ev.target.name === "Year") {
      var Year = ev.target.value;
    } else {
      var Year = this.state.Year;
    }
    if (ev.target.name === "Model") {
      var Model = ev.target.value;
      // this.props.dispatch(getfilterbodystyle(ev.target.value));
    } else {
      var Model = this.state.Model;
    }

    if (ev.target.name === "Fuel") {
      var Fuel = ev.target.value;
    } else {
      var Fuel = this.state.Fuel;
    }

    if (ev.target.name === "body_style") {
      var body_style = ev.target.value;
    } else {
      var body_style = this.state.body_style;
    }

    if (ev.target.name === "Condition") {
      var Condition = ev.target.value;
    } else {
      var Condition = this.state.Condition;
    }

    if (ev.target.name === "transmission_type") {
      console.log("transmission1", ev.target.value);
      var transmission_type = ev.target.value;
    } else {
      console.log("transmission2", ev.target.value);

      var transmission_type = this.state.transmission_type;
    }

    if (ev.target.name === "engine") {
      var engine = ev.target.value;
    } else {
      var engine = this.state.engine;
    }

    if (ev.target.name === "Make") {
      var Make = ev.target.value;
      var Model = "";
      var body_style = "";
      var Fuel = "";
      var Condition = "";
      var transmission_type = "";
      var Year = "";
      var Mileage = "";
      var engine = "";
      this.setState({
        Year: "",
        Model: "",
        body_style: "",
        engine: "",
        Condition: "",
        Mileage: "",
        transmission_type: "",
        Fuel: "",
      });
    } else {
      var Make = this.state.Make;
    }
    if (ev.target.name !== "color") {
      this.setState({ [ev.target.name]: ev.target.value });
    }
    var pagenum = 0;
    this.props.dispatch(clearAllCars());
    this.props.dispatch(
      getFilteredCarsnew(
        this.state.is_manheim_car,
        this.state.premium_car,
        minPrice,
        maxPrice,
        minYear,
        maxYear,
        Make,
        Model,
        Fuel,
        body_style,
        Condition,
        minMileage,
        maxMileage,
        transmission_type,
        engine,
        pagenum,
        this.state.limit,
        this.state.price_sort,
        this.state.mileage_sort,
        color,
        this.getVrtFilterByRole()
      )
    );
  };
  resetFilters = () => {
    this.props.dispatch(clearAllCars());
    this.openFilter();
    let {
      price_sort,
      mileage_sort,
      limit,
      minPrice,
      maxPrice,
      minYear,
      maxYear,
      Make,
      Model,
      Fuel,
      body_style,
      transmission_type,
      Condition,
      minMileage,
      maxMileage,
      engine,
    } = "";
    let color = [];
    let premium_car = 0;
    let is_manheim_car = 0;
    this.setState({ filter: false, activePage: 1 });
    this.props.dispatch(
      getcarslistingnew(
        0,
        this.state.limit,
        this.state.price_sort,
        this.state.mileage_sort,
        this.getVrtFilterByRole()
      )
    );
    this.setState({
      is_manheim_car: is_manheim_car,
      premium_car: premium_car,
      Year: "",
      minYear: "",
      maxYear: "",
      minPrice: "",
      maxPrice: "",
      Make: "",
      Model: "",
      Fuel: "",
      body_style: "",
      Condition: "",
      Mileage: "",
      minMileage: "",
      maxMileage: "",
      transmission_type: "",
      engine: "",
      color: [],
      Vrt: "",
    });
    $("input[name='color']:checkbox").prop("checked", false);
    $("input[name='premium_car']:checkbox").prop("checked", false);
    $("input[name='is_manheim_car']:checkbox").prop("checked", false);

    this.props.history.push("/used-cars");
    // updating filters

    this.props.dispatch(
      getfilterdmake(
        is_manheim_car,
        premium_car,
        minPrice,
        maxPrice,
        minYear,
        maxYear,
        Make,
        Model,
        Fuel,
        body_style,
        Condition,
        minMileage,
        maxMileage,
        transmission_type,
        engine,
        color,
        this.getVrtFilterByRole()
      )
    );
    this.props.dispatch(
      getfilterdfuel(
        is_manheim_car,
        premium_car,
        minPrice,
        maxPrice,
        minYear,
        maxYear,
        Make,
        Model,
        Fuel,
        body_style,
        Condition,
        minMileage,
        maxMileage,
        transmission_type,
        engine,
        color,
        this.getVrtFilterByRole()
      )
    );
    this.props.dispatch(
      getfilterdtransmission(
        is_manheim_car,
        premium_car,
        minPrice,
        maxPrice,
        minYear,
        maxYear,
        Make,
        Model,
        Fuel,
        body_style,
        Condition,
        minMileage,
        maxMileage,
        transmission_type,
        engine,
        color,
        this.getVrtFilterByRole()
      )
    );
    this.props.dispatch(
      getfilterdbodystyles(
        is_manheim_car,
        premium_car,
        minPrice,
        maxPrice,
        minYear,
        maxYear,
        Make,
        Model,
        Fuel,
        body_style,
        Condition,
        minMileage,
        maxMileage,
        transmission_type,
        engine,
        color,
        this.getVrtFilterByRole()
      )
    );
    this.props.dispatch(
      getfilterdengine(
        is_manheim_car,
        premium_car,
        minPrice,
        maxPrice,
        minYear,
        maxYear,
        Make,
        Model,
        Fuel,
        body_style,
        Condition,
        minMileage,
        maxMileage,
        transmission_type,
        engine,
        color,
        this.getVrtFilterByRole()
      )
    );
    this.props.dispatch(
      getfilterdmodel(
        is_manheim_car,
        premium_car,
        minPrice,
        maxPrice,
        minYear,
        maxYear,
        Make,
        Model,
        Fuel,
        body_style,
        Condition,
        minMileage,
        maxMileage,
        transmission_type,
        engine,
        color,
        this.getVrtFilterByRole()
      )
    );
  };
  handlePageChange(pageNumber) {
    $("html,body").animate({ scrollTop: 0 }, "slow");
    this.setState({ activePage: pageNumber, carsdata: [] });
    if (this.state.filter == true) {
      var pagenum = pageNumber - 1;
      const {
        is_manheim_car,
        premium_car,
        limit,
        minPrice,
        maxPrice,
        price_sort,
        mileage_sort,
        minYear,
        maxYear,
        Make,
        Model,
        Fuel,
        body_style,
        Condition,
        minMileage,
        maxMileage,
        transmission_type,
        engine,
        color,
        Vrt,
      } = this.state;
      this.props.dispatch(
        getFilteredCarsnew(
          is_manheim_car,
          premium_car,
          minPrice,
          maxPrice,
          minYear,
          maxYear,
          Make,
          Model,
          Fuel,
          body_style,
          Condition,
          minMileage,
          maxMileage,
          transmission_type,
          engine,
          pagenum,
          limit,
          price_sort,
          mileage_sort,
          color,
          this.getVrtFilterByRole(Vrt)
        )
      );
    } else {
      this.props.dispatch(
        getcarslistingnew(
          pageNumber - 1,
          this.state.limit,
          this.state.price_sort,
          this.state.mileage_sort,
          this.getVrtFilterByRole()
        )
      );
    }
  }
  handleLimitChange(e, limit) {
    $(".theme-filter-option").removeClass("active");
    e.target.classList.add("active");
    this.setState({ limit: limit, activePage: 1 });
    $("html,body").animate({ scrollTop: 0 }, "slow");
    var pagenum = 0;
    if (this.state.filter == true) {
      const {
        is_manheim_car,
        premium_car,
        minPrice,
        maxPrice,
        minYear,
        maxYear,
        Make,
        Model,
        Fuel,
        body_style,
        Condition,
        Mileage,
        transmission_type,
        engine,
        color,
        minMileage,
        maxMileage,
        Vrt,
      } = this.state;
      this.props.dispatch(
        getFilteredCarsnew(
          is_manheim_car,
          premium_car,
          minPrice,
          maxPrice,
          minYear,
          maxYear,
          Make,
          Model,
          Fuel,
          body_style,
          Condition,
          minMileage,
          maxMileage,
          transmission_type,
          engine,
          pagenum,
          limit,
          this.state.price_sort,
          this.state.mileage_sort,
          color,
          this.getVrtFilterByRole(Vrt)
        )
      );
    } else {
      this.props.dispatch(
        getcarslistingnew(
          pagenum,
          limit,
          this.state.price_sort,
          this.state.mileage_sort,
          this.getVrtFilterByRole()
        )
      );
    }
  }

  handleCheckbox = (e) => {
    let value_checked = "0";
    if (e.target.checked == true) {
      value_checked = "1";
      if (e.target.name === "vrt_proccessing") {
        this.setState({
          vrt_price: 295,
        });
      } else if (e.target.name === "transferuktodub") {
        this.setState({
          transfer_price: this.state.transfer_price,
        });
      } else if (e.target.name === "homedelivry") {
        this.setState({
          delivery_price: 250,
        });
      }
    } else if (e.target.checked !== true) {
      if (e.target.name === "vrt_proccessing") {
        this.setState({
          vrt_price: 0,
        });
      } else if (e.target.name === "transferuktodub") {
        this.setState({
          transfer_price: 0,
        });
      } else if (e.target.name === "homedelivry") {
        this.setState({
          delivery_price: 0,
        });
      } else {
        value_checked = "";
      }
    }
    this.setState({
      [e.target.name]: value_checked,
    });
  };
  openform = (e) => {
    this.setState({
      carimg: e.featured_image,
      carname: e.car_name,
      car_id: e.car_id,
      deposit_price: e.car_info.final_price,
      car_c_p: e.car_info.final_price,
      car_n: e.car_info.nox,
      // transfer_price: e.car_info.uktransfer_cost,
    });
    const { isLoggedIn } = this.state;
    window.$("#buynow").modal("show");
  };

  openVideo = (e) => {
    window.$("#videShow").modal("show");
  };
  signIn = (e) => {
    window.location.replace("/sign-in");
  };
  setphone = (e) => {
    this.setState({ Phone: e });
  };

  submitform = (ev) => {
    let validate = this.formValidator;
    if (validate.allValid()) {
      this.setState({ isSubmit: true });
      window.grecaptcha.ready(
        function () {
          window.grecaptcha
            .execute("6LdJejIaAAAAABPap2izWvDOKZgwXHDlo4KVmtLs", {
              action: "submit",
            })
            .then(
              function (token) {
                this.submitdeposit(token);
              }.bind(this)
            );
        }.bind(this)
      );
    } else {
      // console.log('tnc: '+this.state.tnc)
      validate.showMessages();
      this.forceUpdate();
    }
  };
  submitdeposit = (token) => {
    if (token) {
      const {
        Name,
        Email,
        Phone,
        inspection_fee,
        twelvemonthwarrenty,
        premiummax395,
        vrt_proccessing,
        transferuktodub,
        homedelivry,
        tnc,
        car_id,
      } = this.state;
      const request = new Request(`${apiBaseUrl}/submit-form`, {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json",
          "X-Auth-Token": `${localStorage.getItem("token")}`,
        }),
        body: JSON.stringify({
          Name,
          Email,
          Phone,
          inspection_fee,
          twelvemonthwarrenty,
          premiummax395,
          vrt_proccessing,
          transferuktodub,
          homedelivry,
          tnc,
          car_id,
        }),
      });
      return fetch(request)
        .then((res) => res.json())
        .then((data) => {
          console.log("dfsdfds:", data);
          if (data.ResponseCode === "1") {
            toastr.success(
              "Form Submitted Successfully, We will get back to you soon.",
              '', { displayDuration: 10000 }
            );
          } else {
            toastr.error("Error Form Submitting, You can try again later.", {
              displayDuration: 10000,
            });
          }
          this.setState({
            carimg: "",
            carname: "",
            car_id: "",
            deposit_price: 0,
            transfer_price: 0,
            delivery_price: 0,
          });
          this.setState({ isSubmit: false });
          window.$("#buynow").modal("hide");
        })
        .catch((err) => {
          this.setState({
            carimg: "",
            carname: "",
            car_id: "",
            deposit_price: 0,
            transfer_price: 0,
            delivery_price: 0,
          });
          this.setState({ isSubmit: false });
          window.$("#buynow").modal("hide");
        });
    }
  };

  onImageChange = (imgs, key) => {
    if (imgs.length > 0) {
      this.setState({
        images: imgs,
        isOpen: true,
        photoIndex: key,
      });
    }
  };

  onSort = (e) => {
    var mileage_sort = "";
    var price_sort = "";
    if (e.target.value == "mileage_low") {
      mileage_sort = "low";
      price_sort = "";
    } else if (e.target.value == "mileage_high") {
      mileage_sort = "high";
      price_sort = "";
    } else if (e.target.value == "price_low") {
      mileage_sort = "";
      price_sort = "low";
    } else if (e.target.value == "price_high") {
      mileage_sort = "";
      price_sort = "high";
    } else {
      mileage_sort = "";
      price_sort = "";
    }
    this.setState({
      mileage_sort: mileage_sort,
      price_sort: price_sort,
      activePage: 1,
    });
    $("html,body").animate({ scrollTop: 0 }, "slow");
    var pagenum = 0;
    if (this.state.filter == true) {
      const {
        is_manheim_car,
        premium_car,
        minPrice,
        maxPrice,
        minYear,
        maxYear,
        Make,
        Model,
        Fuel,
        body_style,
        Condition,
        minMileage,
        maxMileage,
        transmission_type,
        engine,
        color,
      } = this.state;
      this.props.dispatch(
        getFilteredCarsnew(
          is_manheim_car,
          premium_car,
          minPrice,
          maxPrice,
          minYear,
          maxYear,
          Make,
          Model,
          Fuel,
          body_style,
          Condition,
          minMileage,
          maxMileage,
          transmission_type,
          engine,
          pagenum,
          this.state.limit,
          price_sort,
          mileage_sort,
          color,
          !this.state.userrole || this.state.userrole !== "$aHF667#79+57h%45"
            ? "Yes"
            : "All"
        )
      );
    } else {
      this.props.dispatch(
        getcarslistingnew(
          pagenum,
          this.state.limit,
          price_sort,
          mileage_sort,
          parseJwt(localStorage.getItem("token"))?.urxrs === "$aHF667#79+57h%45"
            ? "Yes"
            : "Yes"
        )
      );
    }
  };
  searchCar = () => {
    let validate = this.searchformValidator;
    this.setState({ carloadertest: true });
    if (validate.allValid()) {
      const { searchname } = this.state;
      const request = new Request(`${apiBaseUrl}/search-cars`, {
        method: "POST",
        headers: new Headers({ "Content-Type": "application/json" }),
        body: JSON.stringify({ searchname }),
      });
      return fetch(request)
        .then((res) => res.json())
        .then((data) => {
          var res = data.data;
          // console.log(data)
          this.setState({
            filter: true,
            Make: res.make,
            Model: res.model,
            Fuel: res.Fuel,
            body_style: res.body_style,
            Condition: res.Condition,
            transmission_type: res.transmission_type,
            engine: res.engine,
            color: res.color,
          });
          this.openFilter();
          this.props.dispatch(
            getFilteredCarsnew(
              this.state.is_manheim_car,
              this.state.premium_car,
              this.state.minPrice,
              this.state.maxPrice,
              this.state.minYear,
              this.state.maxYear,
              res.make,
              res.model,
              res.Fuel,
              res.body_style,
              res.Condition,
              this.state.minMileage,
              this.state.maxMileage,
              res.transmission_type,
              res.engine,
              0,
              0,
              this.state.price_sort,
              this.state.mileage_sort,
              this.state.color,
              !this.state.userrole ||
                this.state.userrole !== "$aHF667#79+57h%45"
                ? "Yes"
                : "All"
            )
          );
        })
        .catch((err) => {
          this.setState({ isSubmit: false });
          console.log(err);
        });
    } else {
      // console.log('tnc: '+this.state.tnc)
      validate.showMessages();
      this.forceUpdate();
    }
  };
  openFilter = (state = null) => {
    console.log(state);
    if (state || this.state.mobile_filterstate) {
      this.setState({ mobile_filterstate: !this.state.mobile_filterstate });
      $(".filters-sec").toggleClass("slide");
      $("body").toggleClass("modal-open");
    }
  };
  paycar = (car) => {
    if (car) {
      this.setState({
        carimg: car.featured_image,
        carname: car.car_name,
        car_id: car.car_id,
        deposit_price: car.car_info.final_price,
        car_c_p: car.car_info.final_price,
        car_n: car.car_info.nox,
      });
    }
    $(".btn-pay").text("Pay");
    window.$("#pay").modal("show");
  };
  payformvalidate = (e) => {
    let validate = this.payformValidator;
    if (validate.allValid()) {
      return true;
    } else {
      validate.showMessages();
      this.forceUpdate();
      $("html,body").animate({ scrollTop: 0 }, "slow");
      return false;
    }
  };
  paymentInitiate = (token) => {
    if (token) {
      this.setState({ pay_loader: true });
      const {
        pay_name,
        pay_email,
        pay_address,
        pay_city,
        pay_country,
        pay_amount,
      } = this.state;
      var car_vrt_id = this.state.car_id;
      const tokenn = token;
      // const request = new Request(`${apiBaseUrl}/testmakepayment`, {
      const request = new Request(`${apiBaseUrl}/makepayment`, {
        method: "POST",
        body: JSON.stringify({
          tokenn,
          pay_name,
          pay_email,
          pay_address,
          pay_city,
          pay_country,
          pay_amount,
          car_vrt_id,
        }),
        headers: new Headers({
          "Content-Type": "application/json",
          "X-Auth-Token": `${localStorage.getItem("token")}`,
        }),
      });
      return fetch(request)
        .then((res) => res.json())
        .then((data) => {
          this.setState({ pay_loader: false });
          if (data.ResponseCode === "1") {
            this.setState({ pay_loader: false });
            toastr.success(data.ResponseText, '', { displayDuration: 10000 });
            // toastr.success('Redirecting to Dashboard', '', { displayDuration: 1500 });
            // this.setState({vrt_payment:true})
            var items = this.state.unpaymentcars;
            var index = Object.values(items).indexOf(this.state.car_id);
            items.splice(index, 1);
            this.setState({
              unpaymentcars: items,
            });
            // updaating the car_deatailing for showing VRT
            let car_detailing = this.state.car_detailing;
            let carid = this.state.car_id;
            if (car_detailing.length === 0) {
              car_detailing.push({
                car_id: carid,
                vart_nox: true,
                warranty_val: 0,
                warranty: false,
                homedelivry: false,
              });
            } else {
              var exist = false;
              for (var i = 0; i < car_detailing.length; i++) {
                if (car_detailing[i].car_id == carid) {
                  car_detailing[i].vart_nox = true;
                  exist = true;
                }
              }
              if (!exist) {
                car_detailing.push({
                  car_id: carid,
                  vart_nox: true,
                  warranty: false,
                  warranty_val: 0,
                  homedelivry: false,
                });
              }
            }
            this.setState({ car_detailing: car_detailing });
            // updaating the car_deatailing for showing VRT

            // $('#pay').modal('hide');
            $(".btn-pay").removeAttr("disabled", "disabled");
            $(".btn-pay").text("Payment Done");
            window.$("#pay").modal("hide");
            // this.props.dispatch(getUserdetails(this.state.user_id));
          } else {
            this.setState({ pay_loader: false });
            toastr.error(data.ResponseText, '', { displayDuration: 10000 });
          }
        })
        .catch((err) => {});
    } else {
      alert("error");
    }
  };
  includeHomeDelivery = (e, car) => {
    let car_detailing = this.state.car_detailing;
    let carid = car.car_id;

    if (car_detailing.length === 0) {
      car_detailing.push({
        car_id: car.car_id,
        vart_nox: false,
        warranty: false,
        warranty_val: 0,
        homedelivry: e.target.checked,
      });
    } else {
      var exist = false;
      for (var i = 0; i < car_detailing.length; i++) {
        if (car_detailing[i].car_id == carid) {
          // if(car_detailing[i].name == name){
          car_detailing[i].homedelivry = e.target.checked;
          exist = true;
          // }
        }
      }
      if (!exist) {
        car_detailing.push({
          car_id: car.car_id,
          vart_nox: false,
          warranty: false,
          warranty_val: 0,
          homedelivry: e.target.checked,
        });
      }
    }
    this.setState({ car_detailing: car_detailing });
  };

  includeWarranty = (e, car) => {
    let car_detailing = this.state.car_detailing;
    let carid = car.car_id;

    if (car_detailing.length === 0) {
      car_detailing.push({
        car_id: car.car_id,
        vart_nox: false,
        warranty: e.target.checked,
        warranty_val: 0,
        homedelivry: false,
      });
    } else {
      var exist = false;
      for (var i = 0; i < car_detailing.length; i++) {
        if (car_detailing[i].car_id == carid) {
          // if(car_detailing[i].name == name){
          car_detailing[i].warranty = e.target.checked;
          exist = true;
          // }
        }
      }
      if (!exist) {
        car_detailing.push({
          car_id: car.car_id,
          vart_nox: false,
          warranty: e.target.checked,
          warranty_val: 0,
          homedelivry: false,
        });
      }
    }
    this.setState({ car_detailing: car_detailing });
  };
  includeVRT = (e, car) => {
    let car_detailing = this.state.car_detailing;
    let carid = car.car_id;
    if (car_detailing.length === 0) {
      car_detailing.push({
        car_id: car.car_id,
        vart_nox: e.target.checked,
        warranty: false,
        warranty_val: 0,
        homedelivry: false,
      });
    } else {
      var exist = false;
      for (var i = 0; i < car_detailing.length; i++) {
        if (car_detailing[i].car_id == carid) {
          // if(car_detailing[i].name == name){
          car_detailing[i].vart_nox = e.target.checked;
          exist = true;
          // }
        }
      }
      if (!exist) {
        car_detailing.push({
          car_id: car.car_id,
          vart_nox: e.target.checked,
          warranty: false,
          warranty_val: 0,
          homedelivry: false,
        });
      }
    }
    this.setState({ car_detailing: car_detailing });
  };
  handleWarrantyChange = (e, car) => {
    let car_detailing = this.state.car_detailing;
    let value = parseInt(e.target.value);
    let carid = car.car_id;
    console.log(value);
    if (car_detailing.length === 0) {
      car_detailing.push({
        car_id: car.car_id,
        vart_nox: false,
        warranty: false,
        warranty_val: value,
        homedelivry: false,
      });
    } else {
      var exist = false;
      for (var i = 0; i < car_detailing.length; i++) {
        if (car_detailing[i].car_id === carid) {
          // if(car_detailing[i].name == name){
          car_detailing[i].warranty_val = value;
          exist = true;
          // }
        }
      }
      if (!exist) {
        car_detailing.push({
          car_id: car.car_id,
          vart_nox: false,
          warranty: false,
          warranty_val: value,
          homedelivry: false,
        });
      }
    }
    this.setState({ car_detailing: car_detailing });
  };
  closeModal = (car_id) => {
    window.$("#check" + car_id).prop("checked", false);
    window.$("#pay").modal("hide");
  };

  handleClose = () => {
    this.setState({ show: false });
  };

  handleOpenDrawer = () => {
    this.setState({ show: true });
  };

  handleCloseDraw = () => {
    console.log("click", this.state.show);
    this.setState({ show: false });
  };

  render() {
    const {
      car_detailing,
      pay_name,
      pay_email,
      pay_address,
      pay_city,
      pay_country,
      pay_amount,
      unpaymentcars,
      before_vrt_final_price_state,
      vrt_rate_state,
    } = this.state;
    // console.log(car_c_p+car_n+warranty+vrt_price+this.state.inspection+delivery_price+transfer_price)
    if (this.state.filter) {
      var carloadertest = this.props.filteredcarloading;
    } else {
      var carloadertest = this.props.carsloading;
    }
    var mtk = new MilesToKilometers();
    const {
      images,
      photoIndex,
      isOpen,
      limit,
      vrt_price,
      delivery_price,
      transfer_price,
      deposit_price,
      car_c_p,
      car_n,
      warranty,
      minPrice,
      maxPrice,
      minMileage,
      maxMileage,
      minYear,
      maxYear,
      yearlist,
      preffer_model,
      preffer_make,
      preffer_location,
      feature_img,
      carimages,
      filter,
      carsloader,
      carsdata,
      carimg,
      carname,
      filterdata,
      filtermodeldata,
      filterbodystyledata,
      Year,
      Make,
      Model,
      Fuel,
      Grade,
      Vrt,
      body_style,
      Condition,
      Mileage,
      transmission_type,
      engine,
      color,
      gradeData,
      vrtData,
    } = this.state;
    const {
      yearfilter,
      makefilter,
      modelfilter,
      fuelfilter,
      gradefilter,
      vrtFilter,
      bodystylefilter,
      conditionfilter,
      Mileagefilter,
      transmissionfilter,
      enginefilter,
      colorfilter,
    } = this.state;
    let i = 5000;
    let numbers = [
      0, 5000, 10000, 15000, 20000, 25000, 30000, 35000, 40000, 45000, 50000,
      55000, 60000, 65000, 70000, 75000, 80000, 85000, 90000, 95000, 100000,
      105000, 110000, 115000, 120000, 125000, 130000, 135000, 140000, 145000,
      150000, 155000, 160000, 165000, 170000, 175000, 180000, 185000, 190000,
      195000, 200000, 205000, 210000, 215000, 220000, 225000, 230000, 235000,
      240000, 245000, 250000, 255000, 260000, 265000, 270000, 275000, 280000,
      285000, 290000, 295000, 300000, 305000, 310000, 315000, 320000, 325000,
      330000, 335000, 340000, 345000, 350000, 355000, 360000, 365000, 370000,
      375000, 380000, 385000, 390000, 395000, 400000, 405000, 410000, 415000,
      420000, 425000, 430000, 435000, 440000, 445000, 450000, 455000, 460000,
      465000, 470000, 475000, 480000, 485000, 490000, 495000, 500000,
    ];

    return (
      <div className={`banner car-list ${this.state.show ? "no-scroll" : ""}`}>
        <Helmet>
          <title>
            {preffer_make ? preffer_make : ""}{" "}
            {preffer_model ? preffer_model : ""} Used cars for sale{" "}
            {preffer_location ? "in " + preffer_location : ""} - UK Car Import
          </title>
          <meta
            name="title"
            content={`${preffer_make ? preffer_make : ""} ${
              preffer_model ? preffer_model : ""
            } Used cars for sale ${
              preffer_location ? "in " + preffer_location : ""
            }  - UK Car Import`}
          />
          <meta
            name="description"
            content={`Choose your ${preffer_make ? preffer_make : ""} ${
              preffer_model ? preffer_model : ""
            } second hand car ${
              preffer_location ? "in " + preffer_location : ""
            } - The Best Price✅ Irish Warranty✅ Excellent Service✅ - buy ${
              preffer_make ? preffer_make : ""
            } pre owned car ${
              preffer_location ? "in " + preffer_location : ""
            } with UK Car Imports`}
          />
          <script src="https://www.google.com/recaptcha/api.js?render=6LdJejIaAAAAABPap2izWvDOKZgwXHDlo4KVmtLs"></script>
        </Helmet>
        {isOpen && (
          <Lightbox
            mainSrc={images[photoIndex]}
            nextSrc={images[(photoIndex + 1) % images.length]}
            prevSrc={images[(photoIndex + images.length - 1) % images.length]}
            onCloseRequest={() => this.setState({ isOpen: false })}
            onMovePrevRequest={() =>
              this.setState({
                photoIndex: (photoIndex + images.length - 1) % images.length,
              })
            }
            onMoveNextRequest={() =>
              this.setState({
                photoIndex: (photoIndex + 1) % images.length,
              })
            }
          />
        )}
        <section>
          <div className="container-fluid">
            <div className="row">
              <span
                className="filterbtn"
                onClick={(e) => this.openFilter(true)}
              >
                <i className="fa fa-filter" aria-hidden="true"></i>
              </span>
              <div className="filters-sec col-md-4">
                <div className="filter-contain">
                  <div className="col-md-12 mt-2">
                    <div className="left-sideblock">
                      <div className="car-filterss">
                        <h4>
                          Filter Vehicle:
                          <span className="pull-right">
                            {filter ? (
                              <button
                                type="button"
                                className="btn btn-info"
                                onClick={(e) => this.resetFilters()}
                              >
                                <i className="fa fa-times"></i> Clear All
                              </button>
                            ) : (
                              ""
                            )}
                          </span>
                        </h4>
                      </div>
                      <form action="">
                        <div className="car-filter">
                          <div className="form-group">
                            <div className="dropdown">
                              <button
                                className="btn btn-secondary dropdown-toggle"
                                type="button"
                                id="dropdownMenuButton"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                              >
                                {Make ? (
                                  <span className="selected">{Make?.toUpperCase()}</span>
                                ) : (
                                  "Make"
                                )}
                              </button>
                              {Make ? (
                                <a
                                  className="inbtn"
                                  onClick={(e) => this.clearOption("Make")}
                                >
                                  <i className="fa fa-times"></i>
                                </a>
                              ) : (
                                ""
                              )}
                              <div
                                className="dropdown-menu"
                                aria-labelledby="dropdownMenuButton"
                              >
                                {this.props.makeloading ? (
                                  <a className="dropdown-item">
                                    <i className="fa-li fa fa-spinner fa-spin"></i>
                                  </a>
                                ) : makefilter.make ? (
                                  makefilter.make.map((item) => (
                                    <a
                                      className="dropdown-item"
                                      onClick={(e) =>
                                        this.selectOption(`Make`, item.make)
                                      }
                                    >
                                      {item.make?.toUpperCase()} ({item.total})
                                    </a>
                                  ))
                                ) : (
                                  <a className="dropdown-item">
                                    <i className="fa-li fa fa-spinner fa-spin"></i>
                                  </a>
                                )}
                              </div>
                            </div>
                          </div>

                          {/* Model Filter */}
                          <div className="form-group">
                            <div className="dropdown">
                              {/* <button className="btn btn-secondary dropdown-toggle" onClick={e => this.filterSelect('Model')} type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" disabled={Make ? false : true}> */}
                              <button
                                className="btn btn-secondary dropdown-toggle"
                                type="button"
                                id="dropdownMenuButton"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                                disabled={Make ? false : true}
                              >
                                {Model ? (
                                  <span className="selected">{Model?.toUpperCase()}</span>
                                ) : (
                                  "Model"
                                )}
                              </button>
                              {Model ? (
                                <a
                                  className="inbtn"
                                  onClick={(e) => this.clearOption("Model")}
                                >
                                  <i className="fa fa-times"></i>
                                </a>
                              ) : (
                                ""
                              )}
                              <div
                                className="dropdown-menu"
                                aria-labelledby="dropdownMenuButton"
                              >
                                {this.props.modelloading ? (
                                  <a className="dropdown-item">
                                    <i className="fa-li fa fa-spinner fa-spin"></i>
                                  </a>
                                ) : modelfilter.model ? (
                                  modelfilter.model.map((item) => (
                                    <a
                                      className="dropdown-item"
                                      onClick={(e) =>
                                        this.selectOption(
                                          `Model`,
                                          item.car_model
                                        )
                                      }
                                    >
                                      {item.car_model?.toUpperCase()} ({item.total})
                                    </a>
                                  ))
                                ) : (
                                  <a className="dropdown-item">
                                    <i className="fa-li fa fa-spinner fa-spin"></i>
                                  </a>
                                )}
                              </div>
                            </div>
                          </div>
                          {/* Body Style Filter */}
                          <div className="form-group">
                            <div className="dropdown">
                              {/* <button className="btn btn-secondary dropdown-toggle" onClick={e => this.filterSelect('body_style')} type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" disabled={Model ? false : true}> */}
                              <button
                                className="btn btn-secondary dropdown-toggle"
                                type="button"
                                id="dropdownMenuButton"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                                disabled={Model ? false : true}
                              >
                                {body_style ? (
                                  <span className="selected">{body_style}</span>
                                ) : (
                                  "Body Type"
                                )}
                              </button>
                              {body_style ? (
                                <a
                                  className="inbtn"
                                  onClick={(e) =>
                                    this.clearOption("body_style")
                                  }
                                >
                                  <i className="fa fa-times"></i>
                                </a>
                              ) : (
                                ""
                              )}
                              <div
                                className="dropdown-menu"
                                aria-labelledby="dropdownMenuButton"
                              >
                                {this.props.bodystyleloading ? (
                                  <a className="dropdown-item">
                                    <i className="fa-li fa fa-spinner fa-spin"></i>
                                  </a>
                                ) : bodystylefilter.body_style ? (
                                  bodystylefilter.body_style.map((item) => (
                                    <a
                                      className="dropdown-item"
                                      onClick={(e) =>
                                        this.selectOption(
                                          `body_style`,
                                          item.body_style
                                        )
                                      }
                                    >
                                      {item.body_style} ({item.total})
                                    </a>
                                  ))
                                ) : (
                                  <a className="dropdown-item">
                                    <i className="fa-li fa fa-spinner fa-spin"></i>
                                  </a>
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="form-group">
                            <div className="dropdown">
                              <button
                                className="btn btn-secondary dropdown-toggle"
                                type="button"
                                id="dropdownMenuButton"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                              >
                                {transmission_type ? (
                                  <span className="selected">
                                    {transmission_type}
                                  </span>
                                ) : (
                                  "Transmission"
                                )}
                              </button>
                              {transmission_type ? (
                                <a
                                  className="inbtn"
                                  onClick={(e) =>
                                    this.clearOption("transmission_type")
                                  }
                                >
                                  <i className="fa fa-times"></i>
                                </a>
                              ) : (
                                ""
                              )}
                              <div
                                className="dropdown-menu"
                                aria-labelledby="dropdownMenuButton"
                              >
                                {this.props.transmissionloading ? (
                                  <a className="dropdown-item">
                                    <i className="fa-li fa fa-spinner fa-spin"></i>
                                  </a>
                                ) : transmissionfilter.transmission ? (
                                  transmissionfilter.transmission.map(
                                    (item) => (
                                      <a
                                        className="dropdown-item"
                                        onClick={(e) =>
                                          this.selectOption(
                                            `transmission_type`,
                                            item.car_transmission
                                          )
                                        }
                                      >
                                        {item.car_transmission} ({item.total})
                                      </a>
                                    )
                                  )
                                ) : (
                                  <a className="dropdown-item">
                                    <i className="fa-li fa fa-spinner fa-spin"></i>
                                  </a>
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="form-group">
                            <div className="dropdown">
                              {/* <button className="btn btn-secondary dropdown-toggle" onClick={e => this.filterSelect('Fuel')} type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> */}
                              <button
                                className="btn btn-secondary dropdown-toggle"
                                type="button"
                                id="dropdownMenuButton"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                              >
                                {Fuel ? (
                                  <span className="selected">{Fuel}</span>
                                ) : (
                                  "Fuel Type"
                                )}
                              </button>
                              {Fuel ? (
                                <a
                                  className="inbtn"
                                  onClick={(e) => this.clearOption("Fuel")}
                                >
                                  <i className="fa fa-times"></i>
                                </a>
                              ) : (
                                ""
                              )}
                              <div
                                className="dropdown-menu"
                                aria-labelledby="dropdownMenuButton"
                              >
                                {this.props.fuelloading ? (
                                  <a className="dropdown-item">
                                    <i className="fa-li fa fa-spinner fa-spin"></i>
                                  </a>
                                ) : fuelfilter.fuel_type ? (
                                  fuelfilter.fuel_type.map((item) => (
                                    <a
                                      className="dropdown-item"
                                      onClick={(e) =>
                                        this.selectOption(
                                          `Fuel`,
                                          item.fuel_type
                                        )
                                      }
                                    >
                                      {item.fuel_type} ({item.total})
                                    </a>
                                  ))
                                ) : (
                                  <a className="dropdown-item">
                                    <i className="fa-li fa fa-spinner fa-spin"></i>
                                  </a>
                                )}
                              </div>
                            </div>
                          </div>
                          {this.state.userrole ? (
                            this.state.userrole === "$aHF667#79+57h%45" ? (
                              <div className="form-group">
                                <div className="dropdown">
                                  {/* <button className="btn btn-secondary dropdown-toggle" onClick={e => this.filterSelect('Fuel')} type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> */}
                                  <button
                                    className="btn btn-secondary dropdown-toggle"
                                    type="button"
                                    id="dropdownMenuButton"
                                    data-toggle="dropdown"
                                    aria-haspopup="true"
                                    aria-expanded="false"
                                  >
                                    {Vrt ? (
                                      <span className="selected">{Vrt}</span>
                                    ) : (
                                      "VRT"
                                    )}
                                  </button>
                                  {Vrt ? (
                                    <a
                                      className="inbtn"
                                      onClick={(e) => this.clearOption("Vrt")}
                                    >
                                      <i className="fa fa-times"></i>
                                    </a>
                                  ) : (
                                    ""
                                  )}
                                  <div
                                    className="dropdown-menu"
                                    aria-labelledby="dropdownMenuButton"
                                  >
                                    {this.props.vrtLoading ? (
                                      <a className="dropdown-item">
                                        <i className="fa-li fa fa-spinner fa-spin"></i>
                                      </a>
                                    ) : vrtData.vrt ? (
                                      vrtData.vrt.map((item) => (
                                        <a
                                          className="dropdown-item"
                                          onClick={(e) =>
                                            this.selectOption(`Vrt`, item.vrt)
                                          }
                                        >
                                          {item.vrt}
                                        </a>
                                      ))
                                    ) : (
                                      <a className="dropdown-item">
                                        <i className="fa-li fa fa-spinner fa-spin"></i>
                                      </a>
                                    )}
                                  </div>
                                </div>
                              </div>
                            ) : (
                              ""
                            )
                          ) : (
                            ""
                          )}
                          {/* Color Filters mobile */}
                          <div className="form-group">
                            <div className="dropdown">
                              <div className="mobile car_color">
                                <button
                                  className="btn btn-secondary dropdown-toggle"
                                  type="button"
                                  id="dropdownMenuButton"
                                  data-toggle="dropdown"
                                  aria-haspopup="true"
                                  aria-expanded="false"
                                >
                                  <span className="">Color</span>
                                </button>
                                <div
                                  className="dropdown-menu"
                                  aria-labelledby="dropdownMenuButton"
                                >
                                  <div className="row">
                                    <div className="col-md-6">
                                      <span className="item">
                                        <input
                                          type="checkbox"
                                          name="color"
                                          value="Beige"
                                          onChange={(e) =>
                                            this.onfilterChange(e)
                                          }
                                        />
                                        <span>Beige</span>
                                      </span>
                                    </div>
                                    <div className="col-md-6">
                                      <span className="item">
                                        <input
                                          type="checkbox"
                                          name="color"
                                          value="Black"
                                          onChange={(e) =>
                                            this.onfilterChange(e)
                                          }
                                        />
                                        <span>Black</span>
                                      </span>
                                    </div>
                                    <div className="col-md-6">
                                      <span className="item">
                                        <input
                                          type="checkbox"
                                          name="color"
                                          value="Blue"
                                          onChange={(e) =>
                                            this.onfilterChange(e)
                                          }
                                        />
                                        <span>Blue</span>
                                      </span>
                                    </div>
                                    <div className="col-md-6">
                                      <span className="item">
                                        <input
                                          type="checkbox"
                                          name="color"
                                          value="Bronze"
                                          onChange={(e) =>
                                            this.onfilterChange(e)
                                          }
                                        />
                                        <span>Bronze</span>
                                      </span>
                                    </div>
                                    <div className="col-md-6">
                                      <span className="item">
                                        <input
                                          type="checkbox"
                                          name="color"
                                          value="Burgundy"
                                          onChange={(e) =>
                                            this.onfilterChange(e)
                                          }
                                        />
                                        <span>Burgundy</span>
                                      </span>
                                    </div>
                                    <div className="col-md-6">
                                      <span className="item">
                                        <input
                                          type="checkbox"
                                          name="color"
                                          value="Gold"
                                          onChange={(e) =>
                                            this.onfilterChange(e)
                                          }
                                        />
                                        <span>Gold</span>
                                      </span>
                                    </div>
                                    <div className="col-md-6">
                                      <span className="item">
                                        <input
                                          type="checkbox"
                                          name="color"
                                          value="Green"
                                          onChange={(e) =>
                                            this.onfilterChange(e)
                                          }
                                        />
                                        <span>Green</span>
                                      </span>
                                    </div>
                                    <div className="col-md-6">
                                      <span className="item">
                                        <input
                                          type="checkbox"
                                          name="color"
                                          value="Grey"
                                          onChange={(e) =>
                                            this.onfilterChange(e)
                                          }
                                        />
                                        <span>Grey</span>
                                      </span>
                                    </div>
                                    <div className="col-md-6">
                                      <span className="item">
                                        <input
                                          type="checkbox"
                                          name="color"
                                          value="Indigo"
                                          onChange={(e) =>
                                            this.onfilterChange(e)
                                          }
                                        />
                                        <span>Indigo</span>
                                      </span>
                                    </div>
                                    <div className="col-md-6">
                                      <span className="item">
                                        <input
                                          type="checkbox"
                                          name="color"
                                          value="Magenta"
                                          onChange={(e) =>
                                            this.onfilterChange(e)
                                          }
                                        />
                                        <span>Magenta</span>
                                      </span>
                                    </div>
                                    <div className="col-md-6">
                                      <span className="item">
                                        <input
                                          type="checkbox"
                                          name="color"
                                          value="Maroon"
                                          onChange={(e) =>
                                            this.onfilterChange(e)
                                          }
                                        />
                                        <span>Maroon</span>
                                      </span>
                                    </div>
                                    <div className="col-md-6">
                                      <span className="item">
                                        <input
                                          type="checkbox"
                                          name="color"
                                          value="Multicolour"
                                          onChange={(e) =>
                                            this.onfilterChange(e)
                                          }
                                        />
                                        <span>Multicolour</span>
                                      </span>
                                    </div>
                                    <div className="col-md-6">
                                      <span className="item">
                                        <input
                                          type="checkbox"
                                          name="color"
                                          value="Navy"
                                          onChange={(e) =>
                                            this.onfilterChange(e)
                                          }
                                        />
                                        <span>Navy</span>
                                      </span>
                                    </div>
                                    <div className="col-md-6">
                                      <span className="item">
                                        <input
                                          type="checkbox"
                                          name="color"
                                          value="Orange"
                                          onChange={(e) =>
                                            this.onfilterChange(e)
                                          }
                                        />
                                        <span>Orange</span>
                                      </span>
                                    </div>
                                    <div className="col-md-6">
                                      <span className="item">
                                        <input
                                          type="checkbox"
                                          name="color"
                                          value="Pink"
                                          onChange={(e) =>
                                            this.onfilterChange(e)
                                          }
                                        />
                                        <span>Pink</span>
                                      </span>
                                    </div>
                                    <div className="col-md-6">
                                      <span className="item">
                                        <input
                                          type="checkbox"
                                          name="color"
                                          value="Purple"
                                          onChange={(e) =>
                                            this.onfilterChange(e)
                                          }
                                        />
                                        <span>Purple</span>
                                      </span>
                                    </div>
                                    <div className="col-md-6">
                                      <span className="item">
                                        <input
                                          type="checkbox"
                                          name="color"
                                          value="Red"
                                          onChange={(e) =>
                                            this.onfilterChange(e)
                                          }
                                        />
                                        <span>Red</span>
                                      </span>
                                    </div>
                                    <div className="col-md-6">
                                      <span className="item">
                                        <input
                                          type="checkbox"
                                          name="color"
                                          value="Silver"
                                          onChange={(e) =>
                                            this.onfilterChange(e)
                                          }
                                        />
                                        <span>Silver</span>
                                      </span>
                                    </div>
                                    <div className="col-md-6">
                                      <span className="item">
                                        <input
                                          type="checkbox"
                                          name="color"
                                          value="Turquoise"
                                          onChange={(e) =>
                                            this.onfilterChange(e)
                                          }
                                        />
                                        <span>Turquoise</span>
                                      </span>
                                    </div>
                                    <div className="col-md-6">
                                      <span className="item">
                                        <input
                                          type="checkbox"
                                          name="color"
                                          value="Unlisted"
                                          onChange={(e) =>
                                            this.onfilterChange(e)
                                          }
                                        />
                                        <span>Unlisted</span>
                                      </span>
                                    </div>
                                    <div className="col-md-6">
                                      <span className="item">
                                        <input
                                          type="checkbox"
                                          name="color"
                                          value="White"
                                          onChange={(e) =>
                                            this.onfilterChange(e)
                                          }
                                        />
                                        <span>White</span>
                                      </span>
                                    </div>
                                    <div className="col-md-6">
                                      <span className="item">
                                        <input
                                          type="checkbox"
                                          name="color"
                                          value="Yellow"
                                          onChange={(e) =>
                                            this.onfilterChange(e)
                                          }
                                        />
                                        <span>Yellow</span>
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="car_color form-group">
                            <label>Color:</label>
                            <div className="row">
                              <div className="col-md-6">
                                <span className="item">
                                  <input
                                    type="checkbox"
                                    name="color"
                                    value="Beige"
                                    onChange={(e) => this.onfilterChange(e)}
                                  />
                                  <span>Beige</span>
                                </span>
                              </div>
                              <div className="col-md-6">
                                <span className="item">
                                  <input
                                    type="checkbox"
                                    name="color"
                                    value="Black"
                                    onChange={(e) => this.onfilterChange(e)}
                                  />
                                  <span>Black</span>
                                </span>
                              </div>
                              <div className="col-md-6">
                                <span className="item">
                                  <input
                                    type="checkbox"
                                    name="color"
                                    value="Blue"
                                    onChange={(e) => this.onfilterChange(e)}
                                  />
                                  <span>Blue</span>
                                </span>
                              </div>
                              <div className="col-md-6">
                                <span className="item">
                                  <input
                                    type="checkbox"
                                    name="color"
                                    value="Bronze"
                                    onChange={(e) => this.onfilterChange(e)}
                                  />
                                  <span>Bronze</span>
                                </span>
                              </div>
                              <div className="col-md-6">
                                <span className="item">
                                  <input
                                    type="checkbox"
                                    name="color"
                                    value="Burgundy"
                                    onChange={(e) => this.onfilterChange(e)}
                                  />
                                  <span>Burgundy</span>
                                </span>
                              </div>
                              <div className="col-md-6">
                                <span className="item">
                                  <input
                                    type="checkbox"
                                    name="color"
                                    value="Gold"
                                    onChange={(e) => this.onfilterChange(e)}
                                  />
                                  <span>Gold</span>
                                </span>
                              </div>
                              <div className="col-md-6">
                                <span className="item">
                                  <input
                                    type="checkbox"
                                    name="color"
                                    value="Green"
                                    onChange={(e) => this.onfilterChange(e)}
                                  />
                                  <span>Green</span>
                                </span>
                              </div>
                              <div className="col-md-6">
                                <span className="item">
                                  <input
                                    type="checkbox"
                                    name="color"
                                    value="Grey"
                                    onChange={(e) => this.onfilterChange(e)}
                                  />
                                  <span>Grey</span>
                                </span>
                              </div>
                              <div className="col-md-6">
                                <span className="item">
                                  <input
                                    type="checkbox"
                                    name="color"
                                    value="Indigo"
                                    onChange={(e) => this.onfilterChange(e)}
                                  />
                                  <span>Indigo</span>
                                </span>
                              </div>
                              <div className="col-md-6">
                                <span className="item">
                                  <input
                                    type="checkbox"
                                    name="color"
                                    value="Magenta"
                                    onChange={(e) => this.onfilterChange(e)}
                                  />
                                  <span>Magenta</span>
                                </span>
                              </div>
                              <div className="col-md-6">
                                <span className="item">
                                  <input
                                    type="checkbox"
                                    name="color"
                                    value="Maroon"
                                    onChange={(e) => this.onfilterChange(e)}
                                  />
                                  <span>Maroon</span>
                                </span>
                              </div>
                              <div className="col-md-6">
                                <span className="item">
                                  <input
                                    type="checkbox"
                                    name="color"
                                    value="Multicolour"
                                    onChange={(e) => this.onfilterChange(e)}
                                  />
                                  <span>Multicolour</span>
                                </span>
                              </div>
                              <div className="col-md-6">
                                <span className="item">
                                  <input
                                    type="checkbox"
                                    name="color"
                                    value="Navy"
                                    onChange={(e) => this.onfilterChange(e)}
                                  />
                                  <span>Navy</span>
                                </span>
                              </div>
                              <div className="col-md-6">
                                <span className="item">
                                  <input
                                    type="checkbox"
                                    name="color"
                                    value="Orange"
                                    onChange={(e) => this.onfilterChange(e)}
                                  />
                                  <span>Orange</span>
                                </span>
                              </div>
                              <div className="col-md-6">
                                <span className="item">
                                  <input
                                    type="checkbox"
                                    name="color"
                                    value="Pink"
                                    onChange={(e) => this.onfilterChange(e)}
                                  />
                                  <span>Pink</span>
                                </span>
                              </div>
                              <div className="col-md-6">
                                <span className="item">
                                  <input
                                    type="checkbox"
                                    name="color"
                                    value="Purple"
                                    onChange={(e) => this.onfilterChange(e)}
                                  />
                                  <span>Purple</span>
                                </span>
                              </div>
                              <div className="col-md-6">
                                <span className="item">
                                  <input
                                    type="checkbox"
                                    name="color"
                                    value="Red"
                                    onChange={(e) => this.onfilterChange(e)}
                                  />
                                  <span>Red</span>
                                </span>
                              </div>
                              <div className="col-md-6">
                                <span className="item">
                                  <input
                                    type="checkbox"
                                    name="color"
                                    value="Silver"
                                    onChange={(e) => this.onfilterChange(e)}
                                  />
                                  <span>Silver</span>
                                </span>
                              </div>
                              <div className="col-md-6">
                                <span className="item">
                                  <input
                                    type="checkbox"
                                    name="color"
                                    value="Turquoise"
                                    onChange={(e) => this.onfilterChange(e)}
                                  />
                                  <span>Turquoise</span>
                                </span>
                              </div>
                              <div className="col-md-6">
                                <span className="item">
                                  <input
                                    type="checkbox"
                                    name="color"
                                    value="Unlisted"
                                    onChange={(e) => this.onfilterChange(e)}
                                  />
                                  <span>Unlisted</span>
                                </span>
                              </div>
                              <div className="col-md-6">
                                <span className="item">
                                  <input
                                    type="checkbox"
                                    name="color"
                                    value="White"
                                    onChange={(e) => this.onfilterChange(e)}
                                  />
                                  <span>White</span>
                                </span>
                              </div>
                              <div className="col-md-6">
                                <span className="item">
                                  <input
                                    type="checkbox"
                                    name="color"
                                    value="Yellow"
                                    onChange={(e) => this.onfilterChange(e)}
                                  />
                                  <span>Yellow</span>
                                </span>
                              </div>
                            </div>
                          </div>
                          {/* year Filter */}
                          {yearlist.length > 0 ? (
                            <div className="form-group">
                              <label>Year:</label>
                              <div className="row">
                                <div className="col-sm-6 col-md-6">
                                  <div className="dropdown">
                                    {/* <button className="btn btn-secondary dropdown-toggle" onClick={e => this.filterSelect('minYear')} type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> */}
                                    <button
                                      className="btn btn-secondary dropdown-toggle"
                                      type="button"
                                      id="dropdownMenuButton"
                                      data-toggle="dropdown"
                                      aria-haspopup="true"
                                      aria-expanded="false"
                                    >
                                      {minYear ? (
                                        <span className="selected">
                                          {minYear}
                                        </span>
                                      ) : (
                                        "Min Year"
                                      )}
                                    </button>
                                    {minYear ? (
                                      <a
                                        className="inbtn"
                                        onClick={(e) =>
                                          this.clearOption("minYear")
                                        }
                                      >
                                        <i className="fa fa-times"></i>
                                      </a>
                                    ) : (
                                      ""
                                    )}
                                    <div
                                      className="dropdown-menu"
                                      aria-labelledby="dropdownMenuButton"
                                    >
                                      {yearlist ? (
                                        yearlist.map((item) =>
                                          maxYear ? (
                                            maxYear >= item.value ? (
                                              <a
                                                className="dropdown-item"
                                                onClick={(e) =>
                                                  this.selectOption(
                                                    `minYear`,
                                                    item.value
                                                  )
                                                }
                                              >
                                                {item.name}
                                              </a>
                                            ) : (
                                              ""
                                            )
                                          ) : (
                                            <a
                                              className="dropdown-item"
                                              onClick={(e) =>
                                                this.selectOption(
                                                  `minYear`,
                                                  item.value
                                                )
                                              }
                                            >
                                              {item.name}
                                            </a>
                                          )
                                        )
                                      ) : (
                                        <a className="dropdown-item">
                                          <i className="fa-li fa fa-spinner fa-spin"></i>
                                        </a>
                                      )}
                                    </div>
                                  </div>
                                </div>
                                <div className="col-sm-6 col-md-6">
                                  <div className="dropdown">
                                    {/* <button className="btn btn-secondary dropdown-toggle" onClick={e => this.filterSelect('maxYear')} type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> */}
                                    <button
                                      className="btn btn-secondary dropdown-toggle"
                                      type="button"
                                      id="dropdownMenuButton"
                                      data-toggle="dropdown"
                                      aria-haspopup="true"
                                      aria-expanded="false"
                                    >
                                      {maxYear ? (
                                        <span className="selected">
                                          {maxYear}
                                        </span>
                                      ) : (
                                        "Max Year"
                                      )}
                                    </button>
                                    {maxYear ? (
                                      <a
                                        className="inbtn"
                                        onClick={(e) =>
                                          this.clearOption("maxYear")
                                        }
                                      >
                                        <i className="fa fa-times"></i>
                                      </a>
                                    ) : (
                                      ""
                                    )}
                                    <div
                                      className="dropdown-menu"
                                      aria-labelledby="dropdownMenuButton"
                                    >
                                      {yearlist ? (
                                        yearlist.map((item) =>
                                          minYear ? (
                                            minYear <= item.value ? (
                                              <a
                                                className="dropdown-item"
                                                onClick={(e) =>
                                                  this.selectOption(
                                                    `maxYear`,
                                                    item.value
                                                  )
                                                }
                                              >
                                                {item.name}
                                              </a>
                                            ) : (
                                              ""
                                            )
                                          ) : (
                                            <a
                                              className="dropdown-item"
                                              onClick={(e) =>
                                                this.selectOption(
                                                  `maxYear`,
                                                  item.value
                                                )
                                              }
                                            >
                                              {item.name}
                                            </a>
                                          )
                                        )
                                      ) : (
                                        <a className="dropdown-item">
                                          <i className="fa-li fa fa-spinner fa-spin"></i>
                                        </a>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ) : (
                            ""
                          )}
                          {/* Mileage Filter */}
                          <div className="form-group">
                            <label>Mileage:</label>
                            <div className="row">
                              <div className="col-sm-6  col-md-6">
                                <div className="dropdown">
                                  {/* <button className="btn btn-secondary dropdown-toggle" onClick={e => this.filterSelect('minMileage')} type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> */}
                                  <button
                                    className="btn btn-secondary dropdown-toggle"
                                    type="button"
                                    id="dropdownMenuButton"
                                    data-toggle="dropdown"
                                    aria-haspopup="true"
                                    aria-expanded="false"
                                  >
                                    {minMileage ? (
                                      <span className="selected">
                                        {minMileage}
                                        {/* {formatNumber(minMileage, {
                                          fractionDigits: 0,
                                        })} */}
                                      </span>
                                    ) : (
                                      "Min Km's"
                                    )}
                                  </button>
                                  {minMileage ? (
                                    <a
                                      className="inbtn"
                                      onClick={(e) =>
                                        this.clearOption("minMileage")
                                      }
                                    >
                                      <i className="fa fa-times"></i>
                                    </a>
                                  ) : (
                                    ""
                                  )}
                                  <div
                                    className="dropdown-menu"
                                    aria-labelledby="dropdownMenuButton"
                                  >
                                    {numbers ? (
                                      numbers.map((item) =>
                                        maxMileage ? (
                                          maxMileage > item ? (
                                            <a
                                              className="dropdown-item"
                                              onClick={(e) =>
                                                this.selectOption(
                                                  `minMileage`,
                                                  item
                                                )
                                              }
                                            >
                                              {formatNumber(item, {
                                                fractionDigits: 0,
                                              })}
                                            </a>
                                          ) : (
                                            ""
                                          )
                                        ) : (
                                          <a
                                            className="dropdown-item"
                                            onClick={(e) =>
                                              this.selectOption(
                                                `minMileage`,
                                                item
                                              )
                                            }
                                          >
                                            {formatNumber(item, {
                                              fractionDigits: 0,
                                            })}
                                          </a>
                                        )
                                      )
                                    ) : (
                                      <a className="dropdown-item">
                                        <i className="fa-li fa fa-spinner fa-spin"></i>
                                      </a>
                                    )}
                                  </div>
                                </div>
                              </div>
                              <div className="col-sm-6  col-md-6">
                                <div className="dropdown">
                                  {/* <button className="btn btn-secondary dropdown-toggle" onClick={e => this.filterSelect('maxMileage')} type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> */}
                                  <button
                                    className="btn btn-secondary dropdown-toggle"
                                    type="button"
                                    id="dropdownMenuButton"
                                    data-toggle="dropdown"
                                    aria-haspopup="true"
                                    aria-expanded="false"
                                  >
                                    {maxMileage ? (
                                      <span className="selected">
                                        {maxMileage}
                                        {/* {formatNumber(maxMileage, {
                                          fractionDigits: 0,
                                        })} */}
                                      </span>
                                    ) : (
                                      "Max Km's"
                                    )}
                                  </button>
                                  {maxMileage ? (
                                    <a
                                      className="inbtn"
                                      onClick={(e) =>
                                        this.clearOption("maxMileage")
                                      }
                                    >
                                      <i className="fa fa-times"></i>
                                    </a>
                                  ) : (
                                    ""
                                  )}
                                  <div
                                    className="dropdown-menu"
                                    aria-labelledby="dropdownMenuButton"
                                  >
                                    {numbers ? (
                                      numbers.map((item) =>
                                        minMileage ? (
                                          minMileage < item ? (
                                            <a
                                              className="dropdown-item"
                                              onClick={(e) =>
                                                this.selectOption(
                                                  `maxMileage`,
                                                  item
                                                )
                                              }
                                            >
                                              {formatNumber(item, {
                                                fractionDigits: 0,
                                              })}
                                            </a>
                                          ) : (
                                            ""
                                          )
                                        ) : (
                                          <a
                                            className="dropdown-item"
                                            onClick={(e) =>
                                              this.selectOption(
                                                `maxMileage`,
                                                item
                                              )
                                            }
                                          >
                                            {formatNumber(item, {
                                              fractionDigits: 0,
                                            })}
                                          </a>
                                        )
                                      )
                                    ) : (
                                      <a className="dropdown-item">
                                        <i className="fa-li fa fa-spinner fa-spin"></i>
                                      </a>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          {/* Price Filter */}
                          <div className="form-group">
                            <label>Price:</label>
                            <div className="row">
                              <div className="col-sm-6  col-md-6">
                                <div className="dropdown">
                                  {/* <button className="btn btn-secondary dropdown-toggle" onClick={e => this.filterSelect('minPrice')} type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> */}
                                  <button
                                    className="btn btn-secondary dropdown-toggle"
                                    type="button"
                                    id="dropdownMenuButton"
                                    data-toggle="dropdown"
                                    aria-haspopup="true"
                                    aria-expanded="false"
                                  >
                                    {parseInt(minPrice) >= 0 ? (
                                      <span className="selected">
                                        € {minPrice}
                                      </span>
                                    ) : (
                                      "Min Price"
                                    )}
                                  </button>
                                  {parseInt(minPrice) >= 0 ? (
                                    <a
                                      className="inbtn"
                                      onClick={(e) =>
                                        this.clearOption("minPrice")
                                      }
                                    >
                                      <i className="fa fa-times"></i>
                                    </a>
                                  ) : (
                                    ""
                                  )}
                                  <div
                                    className="dropdown-menu"
                                    aria-labelledby="dropdownMenuButton"
                                  >
                                    {numbers ? (
                                      numbers.map((item) =>
                                        maxPrice ? (
                                          maxPrice > item ? (
                                            <a
                                              className="dropdown-item"
                                              onClick={(e) =>
                                                this.selectOption(
                                                  `minPrice`,
                                                  item
                                                )
                                              }
                                            >
                                              €{" "}
                                              {formatNumber(item, {
                                                fractionDigits: 0,
                                              })}
                                            </a>
                                          ) : (
                                            ""
                                          )
                                        ) : (
                                          <a
                                            className="dropdown-item"
                                            onClick={(e) =>
                                              this.selectOption(
                                                `minPrice`,
                                                item
                                              )
                                            }
                                          >
                                            {" "}
                                            €{" "}
                                            {formatNumber(item, {
                                              fractionDigits: 0,
                                            })}
                                          </a>
                                        )
                                      )
                                    ) : (
                                      <a className="dropdown-item">
                                        <i className="fa-li fa fa-spinner fa-spin"></i>
                                      </a>
                                    )}
                                  </div>
                                </div>
                              </div>
                              <div className="col-sm-6 col-md-6">
                                <div className="dropdown">
                                  {/* <button className="btn btn-secondary dropdown-toggle" onClick={e => this.filterSelect('maxPrice')} type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> */}
                                  <button
                                    className="btn btn-secondary dropdown-toggle"
                                    type="button"
                                    id="dropdownMenuButton"
                                    data-toggle="dropdown"
                                    aria-haspopup="true"
                                    aria-expanded="false"
                                  >
                                    {parseInt(maxPrice) >= 0 ? (
                                      <span className="selected">
                                        € {maxPrice}
                                      </span>
                                    ) : (
                                      "Max Price"
                                    )}
                                  </button>
                                  {parseInt(maxPrice) >= 0 ? (
                                    <a
                                      className="inbtn"
                                      onClick={(e) =>
                                        this.clearOption("maxPrice")
                                      }
                                    >
                                      <i className="fa fa-times"></i>
                                    </a>
                                  ) : (
                                    ""
                                  )}
                                  <div
                                    className="dropdown-menu"
                                    aria-labelledby="dropdownMenuButton"
                                  >
                                    {numbers ? (
                                      numbers.map((item) =>
                                        minPrice ? (
                                          minPrice < item ? (
                                            <a
                                              className="dropdown-item"
                                              onClick={(e) =>
                                                this.selectOption(
                                                  `maxPrice`,
                                                  item
                                                )
                                              }
                                            >
                                              {" "}
                                              €{" "}
                                              {formatNumber(item, {
                                                fractionDigits: 0,
                                              })}
                                            </a>
                                          ) : (
                                            ""
                                          )
                                        ) : (
                                          <a
                                            className="dropdown-item"
                                            onClick={(e) =>
                                              this.selectOption(
                                                `maxPrice`,
                                                item
                                              )
                                            }
                                          >
                                            {" "}
                                            €{" "}
                                            {formatNumber(item, {
                                              fractionDigits: 0,
                                            })}
                                          </a>
                                        )
                                      )
                                    ) : (
                                      <a className="dropdown-item">
                                        <i className="fa-li fa fa-spinner fa-spin"></i>
                                      </a>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="btnblock">
                            {/* <button type="button" className="btn btn-info" onClick={e => this.resetFilters()} disabled={!filter}>Reset</button> */}
                          </div>
                        </div>
                      </form>
                      <button
                        type="button"
                        className="btn btn-info apply"
                        onClick={(e) => this.openFilter()}
                      >
                        Apply
                      </button>
                    </div>
                    <div className="left-sideblock brand">
                      <div className="car-filterss">
                        <h4>
                          Used cars by Brand{" "}
                          {preffer_location
                            ? "in " + preffer_location + ":"
                            : ":"}
                        </h4>
                      </div>
                      <div className="car-filter">
                        <div className="w3-row">
                          {makefilter
                            ? makefilter.make
                              ? makefilter.make.length > 0
                                ? makefilter.make.map((item) =>
                                    item.make != "" ? (
                                      <a
                                        className="w3-row w3-text-blue-gray"
                                        href={`/used-cars/${
                                          preffer_location
                                            ? preffer_location
                                            : "ireland"
                                        }/${item.make}/`}
                                      >
                                        {item.make} used cars{" "}
                                        {preffer_location
                                          ? "in " + preffer_location
                                          : ""}
                                      </a>
                                    ) : (
                                      ""
                                    )
                                  )
                                : ""
                              : ""
                            : ""}
                        </div>
                      </div>
                    </div>
                    <div className="left-sideblock brand">
                      <div className="car-filterss">
                        <h4>Used cars by Location:</h4>
                      </div>
                      <div className="car-filter">
                        <div className="w3-row">
                          <a
                            className="w3-row w3-text-blue-gray"
                            href="/used-cars/dublin/"
                          >
                            Used cars in Dublin
                          </a>
                          <a
                            className="w3-row w3-text-blue-gray"
                            href="/used-cars/cork/"
                          >
                            Used cars in Cork
                          </a>
                          <a
                            className="w3-row w3-text-blue-gray"
                            href="/used-cars/limerick/"
                          >
                            Used cars in Limerick
                          </a>
                          <a
                            className="w3-row w3-text-blue-gray"
                            href="/used-cars/galway/"
                          >
                            Used cars in Galway
                          </a>
                          <a
                            className="w3-row w3-text-blue-gray"
                            href="/used-cars/waterford/"
                          >
                            Used cars in Waterford
                          </a>
                          <a
                            className="w3-row w3-text-blue-gray"
                            href="/used-cars/louth/"
                          >
                            Used cars in Louth
                          </a>
                          <a
                            className="w3-row w3-text-blue-gray"
                            href="/used-cars/kilkenny/"
                          >
                            Used cars in Kilkenny
                          </a>
                          <a
                            className="w3-row w3-text-blue-gray"
                            href="/used-cars/wexford/"
                          >
                            Used cars in Wexford
                          </a>
                          <a
                            className="w3-row w3-text-blue-gray"
                            href="/used-cars/sligo/"
                          >
                            Used cars in Sligo
                          </a>
                          <a
                            className="w3-row w3-text-blue-gray"
                            href="/used-cars/tipperary/"
                          >
                            Used cars in Tipperary
                          </a>
                          <a
                            className="w3-row w3-text-blue-gray"
                            href="/used-cars/wicklow/"
                          >
                            Used cars in Wicklow
                          </a>
                          <a
                            className="w3-row w3-text-blue-gray"
                            href="/used-cars/meath/"
                          >
                            Used cars in Meath
                          </a>
                          <a
                            className="w3-row w3-text-blue-gray"
                            href="/used-cars/clare/"
                          >
                            Used cars in Clare
                          </a>
                          <a
                            className="w3-row w3-text-blue-gray"
                            href="/used-cars/kerry/"
                          >
                            Used cars in Kerry
                          </a>
                          <a
                            className="w3-row w3-text-blue-gray"
                            href="/used-cars/carlow/"
                          >
                            Used cars in Carlow
                          </a>
                          <a
                            className="w3-row w3-text-blue-gray"
                            href="/used-cars/kildare/"
                          >
                            Used cars in Kildare
                          </a>
                          <a
                            className="w3-row w3-text-blue-gray"
                            href="/used-cars/westmeath/"
                          >
                            Used cars in Westmeath
                          </a>
                          <a
                            className="w3-row w3-text-blue-gray"
                            href="/used-cars/donegal/"
                          >
                            Used cars in Donegal
                          </a>
                          <a
                            className="w3-row w3-text-blue-gray"
                            href="/used-cars/offaly/"
                          >
                            Used cars in Offaly
                          </a>
                          <a
                            className="w3-row w3-text-blue-gray"
                            href="/used-cars/mayo/"
                          >
                            Used cars in Mayo
                          </a>
                          <a
                            className="w3-row w3-text-blue-gray"
                            href="/used-cars/cavan/"
                          >
                            Used cars in Cavan
                          </a>
                          <a
                            className="w3-row w3-text-blue-gray"
                            href="/used-cars/longford/"
                          >
                            Used cars in Longford
                          </a>
                          <a
                            className="w3-row w3-text-blue-gray"
                            href="/used-cars/monaghan/"
                          >
                            Used cars in Monaghan
                          </a>
                          <a
                            className="w3-row w3-text-blue-gray"
                            href="/used-cars/comm/"
                          >
                            Used cars in Comm
                          </a>
                          <a
                            className="w3-row w3-text-blue-gray"
                            href="/used-cars/laois/"
                          >
                            Used cars in Laois
                          </a>
                          <a
                            className="w3-row w3-text-blue-gray"
                            href="/used-cars/roscommon/"
                          >
                            Used cars in Roscommon
                          </a>
                          <a
                            className="w3-row w3-text-blue-gray"
                            href="/used-cars/drogheda/"
                          >
                            Used cars in Drogheda
                          </a>
                          <a
                            className="w3-row w3-text-blue-gray"
                            href="/used-cars/clonmel/"
                          >
                            Used cars in Clonmel
                          </a>
                          <a
                            className="w3-row w3-text-blue-gray"
                            href="/used-cars/dundalk/"
                          >
                            Used cars in Dundalk
                          </a>
                          <a
                            className="w3-row w3-text-blue-gray"
                            href="/used-cars/bray/"
                          >
                            Used cars in Bray
                          </a>
                          <a
                            className="w3-row w3-text-blue-gray"
                            href="/used-cars/navan/"
                          >
                            Used cars in Navan
                          </a>
                          <a
                            className="w3-row w3-text-blue-gray"
                            href="/used-cars/ennis/"
                          >
                            Used cars in Ennis
                          </a>
                          <a
                            className="w3-row w3-text-blue-gray"
                            href="/used-cars/tralee/"
                          >
                            Used cars in Tralee
                          </a>
                          <a
                            className="w3-row w3-text-blue-gray"
                            href="/used-cars/naas/"
                          >
                            Used cars in Naas
                          </a>
                          <a
                            className="w3-row w3-text-blue-gray"
                            href="/used-cars/athlone/"
                          >
                            Used cars in Athlone
                          </a>
                          <a
                            className="w3-row w3-text-blue-gray"
                            href="/used-cars/letterkenny/"
                          >
                            Used cars in Letterkenny
                          </a>
                          <a
                            className="w3-row w3-text-blue-gray"
                            href="/used-cars/tullamore/"
                          >
                            Used cars in Tullamore
                          </a>
                          <a
                            className="w3-row w3-text-blue-gray"
                            href="/used-cars/killarney/"
                          >
                            Used cars in Killarney
                          </a>
                          <a
                            className="w3-row w3-text-blue-gray"
                            href="/used-cars/arklow/"
                          >
                            Used cars in Arklow
                          </a>
                          <a
                            className="w3-row w3-text-blue-gray"
                            href="/used-cars/cobh/"
                          >
                            Used cars in Cobh
                          </a>
                          <a
                            className="w3-row w3-text-blue-gray"
                            href="/used-cars/castlebar/"
                          >
                            Used cars in Castlebar
                          </a>
                          <a
                            className="w3-row w3-text-blue-gray"
                            href="/used-cars/midleton/"
                          >
                            Used cars in Midleton
                          </a>
                          <a
                            className="w3-row w3-text-blue-gray"
                            href="/used-cars/mallow/"
                          >
                            Used cars in Mallow
                          </a>
                          <a
                            className="w3-row w3-text-blue-gray"
                            href="/used-cars/ballina/"
                          >
                            Used cars in Ballina
                          </a>
                          <a
                            className="w3-row w3-text-blue-gray"
                            href="/used-cars/enniscorthy/"
                          >
                            Used cars in Enniscorthy
                          </a>
                          <a
                            className="w3-row w3-text-blue-gray"
                            href="/used-cars/athy/"
                          >
                            Used cars in Athy
                          </a>
                          <a
                            className="w3-row w3-text-blue-gray"
                            href="/used-cars/dungarvan/"
                          >
                            Used cars in Dungarvan
                          </a>
                          <a
                            className="w3-row w3-text-blue-gray"
                            href="/used-cars/nenagh/"
                          >
                            Used cars in Nenagh
                          </a>
                          <a
                            className="w3-row w3-text-blue-gray"
                            href="/used-cars/trim/"
                          >
                            Used cars in Trim
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="cars-sec col-md-8">
                <div className="right-sideblock">
                  <div className="main">
                    <div
                      id="TopToScroll"
                      className="w3-container w3-col m8 w3-padding-tiny"
                    >
                      <div className="w3-container w3-row w3-block">
                        <div className="w3-container w3-col m6 w3-center">
                          <div
                            className={`theme-buttons-filter w3-container ${
                              !this.state.userrole ||
                              this.state.userrole !== "$aHF667#79+57h%45" ||
                              ((Vrt === "Yes" || Vrt === "No") && Make !== "")
                                ? "hideElement"
                                : ""
                            }`}
                            filter="displayLength:10"
                          >
                            <div className="w3-row w3-center">
                              Vehicles On Page
                            </div>
                            <ul className="w3-bar w3-row w3-margin-0 w3-padding-tiny">
                              {limit === 10 ? (
                                <li
                                  className={`theme-filter-option ${
                                    limit === 10 ? "active" : ""
                                  }`}
                                >
                                  10
                                </li>
                              ) : (
                                <li
                                  onClick={(e) => this.handleLimitChange(e, 10)}
                                  className={`theme-filter-option ${
                                    limit === 10 ? "active" : ""
                                  }`}
                                >
                                  10
                                </li>
                              )}
                              {limit === 25 ? (
                                <li
                                  className={`theme-filter-option ${
                                    limit === 25 ? "active" : ""
                                  }`}
                                >
                                  25
                                </li>
                              ) : (
                                <li
                                  onClick={(e) => this.handleLimitChange(e, 25)}
                                  className={`theme-filter-option ${
                                    limit === 25 ? "active" : ""
                                  }`}
                                >
                                  25
                                </li>
                              )}
                              {limit === 50 ? (
                                <li
                                  className={`theme-filter-option ${
                                    limit === 50 ? "active" : ""
                                  }`}
                                >
                                  50
                                </li>
                              ) : (
                                <li
                                  onClick={(e) => this.handleLimitChange(e, 50)}
                                  className={`theme-filter-option ${
                                    limit === 50 ? "active" : ""
                                  }`}
                                >
                                  50
                                </li>
                              )}
                            </ul>
                          </div>
                        </div>
                        <div className="w3-container w3-col m6 w3-center">
                          <div
                            className="theme-buttons-filter w3-container"
                            filter="sortBy:Make"
                          >
                            <div className="w3-row w3-center">Sort by</div>
                            <div className="form-group">
                              <select
                                className="form-control"
                                name="sort"
                                onChange={(e) => this.onSort(e)}
                              >
                                <option value="">Sort by</option>
                                <option value="mileage_low">
                                  Mileage Low to High
                                </option>
                                <option value="mileage_high">
                                  Mileage High to Low
                                </option>
                                <option value="price_low">
                                  Price Low to High
                                </option>
                                <option value="price_high">
                                  Price High to Low
                                </option>
                              </select>
                            </div>
                          </div>
                        </div>
                      </div>
                      {!carloadertest ? (
                        carsdata && carsdata.length > 0 ? (
                          <>
                            <div className="" id="TotalInfo">
                              <b>
                                <u>Total vehicles: {this.state.total_cars}</u>
                              </b>
                            </div>
                            <div className="theme-pagination-filter">
                              <Pagination
                                activePage={this.state.activePage}
                                itemsCountPerPage={this.state.limit}
                                totalItemsCount={this.state.total_cars}
                                pageRangeDisplayed={10}
                                prevPageText="<"
                                nextPageText=">"
                                firstPageText="<<"
                                lastPageText=">>"
                                onChange={this.handlePageChange.bind(this)}
                              />
                            </div>
                          </>
                        ) : (
                          ""
                        )
                      ) : (
                        ""
                      )}
                      {carloadertest ? (
                        <div className="carslist alltourticksloader">
                          <img
                            className="loader_img"
                            src="/assets/images/straight-loader.gif"
                          />
                        </div>
                      ) : (
                        ""
                      )}
                      {/* error below */}

                      <div className="Carssssssss">
                        {carsdata
                          ? carsdata.length > 0
                            ? (!this.state.userrole ||
                              this.state.userrole !== "$aHF667#79+57h%45"
                                ? carsdata
                                : carsdata
                              ).map((post, imgkey) => {
                                var caryear = "";
                                var registration_date = "";
                                var car_specification = "";
                                let performance = [];
                                let driver_convenience = [];
                                let safety = [];
                                let exterior_feature = [];
                                let interior_feature = [];
                                let technical_feat = [];

                                if (post.performance_spec) {
                                  try {
                                    performance = JSON.parse(
                                      post.performance_spec
                                    );
                                  } catch (error) {
                                    console.error(
                                      "Error parsing performance_spec:",
                                      error
                                    );
                                  }
                                }

                                if (post.driver_convenience_feat) {
                                  try {
                                    driver_convenience = JSON.parse(
                                      post.driver_convenience_feat
                                    );
                                  } catch (error) {
                                    console.error(
                                      "Error parsing driver_convenience:",
                                      error
                                    );
                                  }
                                }

                                if (post.safety_feat) {
                                  try {
                                    safety = JSON.parse(post.safety_feat);
                                  } catch (error) {
                                    console.error(
                                      "Error parsing safety_feat:",
                                      error
                                    );
                                  }
                                }

                                if (post.exterior_feat) {
                                  try {
                                    exterior_feature = JSON.parse(
                                      post.exterior_feat
                                    );
                                  } catch (error) {
                                    console.error(
                                      "Error parsing exterior_feat:",
                                      error
                                    );
                                  }
                                }

                                if (post.interior_feat) {
                                  try {
                                    interior_feature = JSON.parse(
                                      post.interior_feat
                                    );
                                  } catch (error) {
                                    console.error(
                                      "Error parsing interior_feat:",
                                      error
                                    );
                                  }
                                }

                                if (post.technical_feat) {
                                  try {
                                    technical_feat = JSON.parse(
                                      post.technical_feat
                                    );
                                  } catch (error) {
                                    console.error(
                                      "Error parsing technical_feat:",
                                      error
                                    );
                                  }
                                }
                                var dimensions = [];
                                var equipmentArray = [];

                                if (post.equipment_declaration) {
                                  equipmentArray =
                                    post?.equipment_declaration.split(",");
                                }
                                // console.log(equipmentArray);
                                if (post.year) {
                                  let date = post.registration_date.split("/");
                                  let year = date[2];
                                  let month = date[1];
                                  month = month > 6 ? 2 : 1;
                                  year = year.replace("20", "");
                                  caryear = date[2] + " (" + year + month + ")";
                                }
                                if (post.techinal_specifications !== 0) {
                                  car_specification = JSON.parse(
                                    post.techinal_specifications
                                  );
                                  Object.keys(car_specification).forEach(
                                    function (key) {
                                      if (
                                        car_specification[key].specName ==
                                        "Dimensions"
                                      ) {
                                        dimensions =
                                          car_specification[key].specs;
                                      }
                                    }
                                  );
                                }
                                let imgs = [];
                                if (post.car_images.length > 0) {
                                  JSON.parse(post.car_images).forEach(function (
                                    imges
                                  ) {
                                    if (imges) imgs.push(imges.image);
                                  });
                                  // console.log(
                                  //   JSON.parse(post?.car_images)[1]?.image,
                                  //   "JSON.parse(post?.car_images)[2]?.image"
                                  // );
                                  if (
                                    post.car_id ===
                                    "f4f358af-9f03-46b6-84dd-a7d49ff0db0f"
                                  ) {
                                    console.log(
                                      post.car_images,
                                      "post.car_images"
                                    );
                                    console.log(imgs, "imgs");
                                  }
                                }
                                // console.log(imgs.length)
                                this.state.before_vrt_final_price_state =
                                  post?.car_info?.before_vrt_final_price;
                                this.state.vrt_rate_state = post?.vrt_rate;
                                return (
                                  <div className="vehicle theme-border-color-secondary">
                                    <NavLink
                                      className="vehicle-header strong"
                                      target="_blank"
                                      to={`/car/${post.car_id}`}
                                    >
                                      {post.car_name}{" "}
                                      {post.premium_car === 1
                                        ? `<span><i className="fa fa-star"></i>&nbsp;Premium</span>`
                                        : post.is_manheim_car === "1"
                                        ? `<span className="auction-sec"><i className="fa fa-gavel"></i>&nbsp;Auction Vehicle</span>`
                                        : ""}
                                    </NavLink>
                                    {this.state.userrole ? (
                                      this.state.userrole ===
                                      "$aHF667#79+57h%45" ? (
                                        <>
                                          <div className="text-left">
                                            <a
                                              target="_blank"
                                              href={`https://www.autotrader.co.uk/car-details/${post.car_url}`}
                                            >
                                              See at Autotrader
                                            </a>
                                          </div>
                                          <div className="Deletesoldcars text-right">
                                            {" "}
                                            <a
                                              className="soldcars"
                                              onClick={(e) =>
                                                this.deleteCar(e, post.car_id)
                                              }
                                            >
                                              SOLD &nbsp;
                                              <i
                                                className="fa fa-trash"
                                                aria-hidden="true"
                                              ></i>
                                            </a>
                                          </div>
                                        </>
                                      ) : (
                                        ""
                                      )
                                    ) : (
                                      ""
                                    )}
                                    {/* <a href="" target="_blank" rel="nofollow noopener" className="vehicle-header strong">{post.car_name}</a> */}
                                    <div className="w3-row row">
                                      <div className="col-md-5">
                                        <div className="main-image w3-padding-0 w3-padding-top">
                                          <div className="lagr-image">
                                            <img
                                              id={`img_${imgkey}`}
                                              key={post.id}
                                              onClick={() =>
                                                this.onImageChange(imgs, 0)
                                              }
                                              alt="MainImage"
                                              // src={
                                              //   imgs?.length > 0
                                              //     ? JSON.parse(
                                              //       post?.car_images
                                              //     )[0]?.thumbnail
                                              //       ? JSON.parse(
                                              //         post?.car_images
                                              //       )[0]?.thumbnail
                                              //       : JSON.parse(
                                              //         post?.car_images
                                              //       )[0]?.image
                                              //     : post?.featured_image
                                              // }
                                              src={
                                                imgs?.length > 0
                                                  ? JSON.parse(
                                                      post?.car_images
                                                    )[0]?.image
                                                  : post?.featured_image
                                              }
                                            />
                                          </div>
                                          <div className="w3-col l3 card-gallery w3-hide-medium w3-hide-small w3-display-container">
                                            {JSON.parse(post.car_images)[1] !==
                                            undefined ? (
                                              <img
                                                alt="Photo"
                                                onClick={(e) =>
                                                  this.onImageChange(imgs, 1)
                                                }
                                                src={
                                                  imgs?.length > 0
                                                    ? imgs[1]
                                                    : post?.featured_image
                                                }
                                                className="w3-image w3-display-topleft w3-hide-small"
                                              />
                                            ) : (
                                              ""
                                            )}
                                            {JSON.parse(post.car_images)[2] !==
                                            undefined ? (
                                              <img
                                                alt="Photo"
                                                onClick={(e) =>
                                                  this.onImageChange(imgs, 2)
                                                }
                                                src={
                                                  imgs?.length > 0
                                                    ? imgs[2]
                                                    : post?.featured_image
                                                }
                                                className="w3-image w3-display-topleft w3-hide-small"
                                              />
                                            ) : (
                                              ""
                                            )}
                                            {JSON.parse(post.car_images)[3] !==
                                              undefined ||
                                            JSON.parse(post.car_images)[3] !==
                                              null ? (
                                              <img
                                                alt="Photo"
                                                onClick={(e) =>
                                                  this.onImageChange(imgs, 3)
                                                }
                                                src={
                                                  imgs?.length > 0
                                                    ? imgs[3]
                                                    : post?.featured_image
                                                }
                                                className="w3-image w3-display-topleft w3-hide-small"
                                              />
                                            ) : (
                                              ""
                                            )}
                                          </div>
                                        </div>
                                        <div className="main-image w3-padding-0 w3-padding-top">
                                          {/* <a
                                            onClick={(e) => this.openVideo(e)}
                                          > */}
                                          <a
                                            href={
                                              "/assets/pdf/HOW IT WORKS.pdf"
                                            }
                                            target="_blank"
                                            style={{
                                              color: "#b60b0c",
                                            }}
                                          >
                                            <div
                                              className="w3-row strong w3-border-top w3-block w3-padding "
                                              style={{
                                                display: "flex",
                                                justifyContent: "center",
                                              }}
                                            >
                                              <h4
                                                className="video-text"
                                                style={{ fontSize: 36 }}
                                              >
                                                HOW IT WORKS{" "}
                                                <i
                                                  className="fa fa-info-circle"
                                                  aria-hidden="true"
                                                ></i>
                                              </h4>
                                            </div>
                                          </a>
                                        </div>
                                      </div>
                                      <div className="col-md-4">
                                        <div className="price-ttable">
                                          {post.car_info ? (
                                            <table className="price-table w3-table w3-padding-0 w3-margin-0 w3-margin-bottom">
                                              <tbody>
                                                {this.state.userrole ? (
                                                  this.state.userrole ===
                                                  "$aHF667#79+57h%45" ? (
                                                    <>
                                                      <tr className="strong">
                                                        <td>Links:</td>
                                                      </tr>
                                                      <tr className="strong">
                                                        {post.is_autotrader_car ===
                                                        "1" ? (
                                                          <td>
                                                            <a
                                                              target="_blank"
                                                              href={`https://www.autotrader.co.uk/car-details/${post.car_url}`}
                                                            >
                                                              Autotrader Link
                                                            </a>
                                                            <br></br>
                                                            <a
                                                              target="_blank"
                                                              href={`https://ukcarimports.ie/car/${post.car_id}`}
                                                            >
                                                              Ukcarimport Link
                                                            </a>
                                                          </td>
                                                        ) : post.is_ni_car ===
                                                          "1" ? (
                                                          <td>
                                                            <a
                                                              target="_blank"
                                                              href={`https://www.usedcarsni.com${post.car_url}`}
                                                            >
                                                              User Car Ni Link
                                                            </a>
                                                            <br></br>
                                                            <a
                                                              target="_blank"
                                                              href={`https://ukcarimports.ie/car/${post.car_id}`}
                                                            >
                                                              Ukcarimport Link
                                                            </a>
                                                          </td>
                                                        ) : (
                                                          ""
                                                        )}
                                                      </tr>
                                                      <tr className="strong">
                                                        <td>Premium Car:</td>
                                                        <td>
                                                          {post.premium_car ===
                                                          1
                                                            ? "Yes"
                                                            : "No"}
                                                        </td>
                                                      </tr>
                                                      <tr className="strong">
                                                        <td>Exchange Rate:</td>
                                                        <td>
                                                          {this.state.settings
                                                            ? this.state
                                                                .settings
                                                                .currency
                                                            : ""}
                                                        </td>
                                                      </tr>
                                                      <tr className="strong">
                                                        <td>
                                                          Registration Date:
                                                        </td>
                                                        <td>
                                                          {
                                                            post.registration_date
                                                          }
                                                        </td>
                                                      </tr>
                                                      {/* <tr className="strong">
                                                        <td>Stat Code:</td>
                                                        <td>
                                                          {post.stat_code}
                                                        </td>
                                                      </tr> */}
                                                      <tr className="strong">
                                                        <td>EU Category:</td>
                                                        <td>
                                                          {
                                                            post.stat_code_cd_eu_cat
                                                          }
                                                        </td>
                                                      </tr>
                                                      <tr className="strong">
                                                        <td>COMSP:</td>
                                                        <td>
                                                          €
                                                          {post.stat_code_comsp}
                                                        </td>
                                                      </tr>
                                                      <tr className="strong">
                                                        <td>Site Price:</td>
                                                        <td>{post.price}</td>
                                                      </tr>
                                                      <tr className="strong">
                                                        <td>Margin:</td>
                                                        <td>
                                                          €{post.commission}
                                                        </td>
                                                      </tr>
                                                      <tr className="strong">
                                                        <td>Fixed Price:</td>
                                                        <td>
                                                          €
                                                          {
                                                            post.car_info
                                                              .final_price
                                                          }
                                                        </td>
                                                      </tr>
                                                      <tr className="strong">
                                                        <td>Stat Code:</td>
                                                        {post.point_3_5_match ===
                                                        1 ? (
                                                          <td className="red-mark">
                                                            {post.stat_code}
                                                          </td>
                                                        ) : (
                                                          <td>
                                                            {post.stat_code}
                                                          </td>
                                                        )}
                                                      </tr>
                                                      <tr className="strong">
                                                        <td>CO2 VRT:</td>
                                                        <td>
                                                          {post.car_info
                                                            .co2_tax === 0 ? (
                                                            <>
                                                              EXEMPT
                                                              <br />
                                                              (up to €5,000 of
                                                              VRT due)
                                                            </>
                                                          ) : (
                                                            <>
                                                              €{" "}
                                                              {
                                                                post.car_info
                                                                  .co2_tax
                                                              }
                                                            </>
                                                          )}
                                                          {/* €{post.car_info.co2_tax} */}
                                                        </td>
                                                      </tr>
                                                      {post.car_info.co2_tax ===
                                                      0 ? (
                                                        ""
                                                      ) : (
                                                        <tr className="strong">
                                                          <td>NOx VRT:</td>
                                                          <td>
                                                            €{" "}
                                                            {post.car_info.nox}
                                                          </td>
                                                        </tr>
                                                      )}
                                                      {/* <tr className="strong">
                                                                                                                    <td>NOX TAX:</td>
                                                                                                                    <td>€{post.car_info.nox}</td>
                                                                                                                </tr> */}
                                                      <tr className="strong">
                                                        <td>Total VRT:</td>
                                                        <td>
                                                          €{" "}
                                                          {formatNumber(
                                                            parseInt(
                                                              post.car_info.nox
                                                            ) +
                                                              parseInt(
                                                                post.car_info
                                                                  .co2_tax
                                                              ),
                                                            {
                                                              fractionDigits: 0,
                                                            }
                                                          )}
                                                        </td>
                                                      </tr>
                                                      <tr className="w3-border-top w3-border-bottom strong total">
                                                        <td className="w3-border-top">
                                                          Trade&nbsp;Price:
                                                        </td>
                                                        {/* <td className="w3-border-top">€{post.car_info.final_price+this.state.vrt_price+this.state.transfer_price+this.state.inspection}</td> */}
                                                        <td className="w3-border-top">
                                                          €{" "}
                                                          {formatNumber(
                                                            post?.car_info
                                                              ?.before_vrt_final_price +
                                                              post?.vrt_rate,
                                                            {
                                                              fractionDigits: 0,
                                                            }
                                                          )}
                                                          {/* {post.car_info
                                                            .final_price +
                                                            this.state
                                                              .inspection +
                                                            post.car_info.nox +
                                                            post.car_info
                                                              .co2_tax} */}
                                                        </td>
                                                      </tr>
                                                    </>
                                                  ) : (
                                                    <>
                                                      {/* <tr className="strong">
                                                                                                                    <td>Trade&nbsp;Price:</td>
                                                                                                                    <td>€ {formatNumber(post.car_info.converted_price, { fractionDigits: 0 })}</td>
                                                                                                                </tr> */}
                                                      {post.car_info.co2_tax ===
                                                      0 ? (
                                                        <>
                                                          <tr>
                                                            <td>CO2 VRT:</td>
                                                            <td>
                                                              <>
                                                                EXEMPT
                                                                <br />
                                                                (up to €5,000 of
                                                                VRT due)
                                                              </>
                                                            </td>
                                                          </tr>
                                                          <tr className="strong">
                                                            <td>Total VRT:</td>
                                                            <td>
                                                              €{" "}
                                                              {formatNumber(
                                                                post.car_info
                                                                  .co2_tax +
                                                                  post.car_info
                                                                    .nox,
                                                                {
                                                                  fractionDigits: 0,
                                                                }
                                                              )}
                                                            </td>
                                                          </tr>
                                                          <tr className="w3-border-top w3-border-bottom strong total">
                                                            {/* <td className="w3-border-top">Total Price:</td> */}
                                                            {post.is_manheim_car ===
                                                            "1" ? (
                                                              <td className="w3-border-top">
                                                                Auction Price:
                                                              </td>
                                                            ) : (
                                                              <td className="w3-border-top">
                                                                Total Price:
                                                              </td>
                                                            )}
                                                            {/* <td>€ {formatNumber(post.car_info.final_price+this.state.vrt_price+this.state.transfer_price+this.state.inspection, { fractionDigits: 0 })}</td> */}
                                                            <td>
                                                              €{" "}
                                                              {formatNumber(
                                                                post.car_info
                                                                  .final_price +
                                                                  this.state
                                                                    .inspection,
                                                                {
                                                                  fractionDigits: 0,
                                                                }
                                                              )}
                                                            </td>
                                                          </tr>
                                                        </>
                                                      ) : Object.values(
                                                          unpaymentcars
                                                        ).indexOf(post.car_id) >
                                                        -1 ? (
                                                        <>
                                                          <tr>
                                                            <td>CO2 VRT:</td>
                                                            <td>
                                                              <button
                                                                type="button"
                                                                className="btn btn get-deposit"
                                                                onClick={(e) =>
                                                                  this.paycar(
                                                                    post
                                                                  )
                                                                }
                                                              >
                                                                Include VRT in
                                                                the Total due
                                                                for €2
                                                              </button>
                                                            </td>
                                                          </tr>
                                                          <tr>
                                                            <td>NOx VRT:</td>
                                                            <td>
                                                              <button
                                                                type="button"
                                                                className="btn btn get-deposit"
                                                                data-toggle="modal"
                                                              >
                                                                Free when you
                                                                pay for VRT
                                                              </button>
                                                            </td>
                                                          </tr>
                                                          <tr className="strong">
                                                            <td>Total VRT:</td>
                                                            <td></td>
                                                          </tr>
                                                          <tr className="w3-border-top w3-border-bottom strong total">
                                                            {/* <td className="w3-border-top">Total Price:</td> */}
                                                            {post.is_manheim_car ===
                                                            "1" ? (
                                                              <td className="w3-border-top">
                                                                Auction Price:
                                                              </td>
                                                            ) : (
                                                              <td className="w3-border-top">
                                                                Total Price:
                                                              </td>
                                                            )}
                                                            {/* <td>€ {formatNumber((post.car_info.final_price+this.state.vrt_price+this.state.transfer_price+this.state.inspection), { fractionDigits: 0 })}</td> */}
                                                            <td>
                                                              €{" "}
                                                              {formatNumber(
                                                                post.car_info
                                                                  .final_price +
                                                                  this.state
                                                                    .inspection,
                                                                {
                                                                  fractionDigits: 0,
                                                                }
                                                              )}
                                                            </td>
                                                          </tr>
                                                        </>
                                                      ) : (
                                                        <>
                                                          <tr>
                                                            <td>CO2 VRT:</td>
                                                            <td>
                                                              €{" "}
                                                              {formatNumber(
                                                                post.car_info
                                                                  .co2_tax,
                                                                {
                                                                  fractionDigits: 0,
                                                                }
                                                              )}
                                                            </td>
                                                          </tr>
                                                          <tr>
                                                            <td>NOx VRT:</td>
                                                            <td>
                                                              €{" "}
                                                              {formatNumber(
                                                                post.car_info
                                                                  .nox,
                                                                {
                                                                  fractionDigits: 0,
                                                                }
                                                              )}
                                                            </td>
                                                          </tr>
                                                          <tr className="strong">
                                                            <td>Total VRT:</td>
                                                            <td>
                                                              €{" "}
                                                              {formatNumber(
                                                                post.car_info
                                                                  .co2_tax +
                                                                  post.car_info
                                                                    .nox,
                                                                {
                                                                  fractionDigits: 0,
                                                                }
                                                              )}
                                                            </td>
                                                          </tr>
                                                          <tr className="w3-border-top w3-border-bottom strong total">
                                                            {/* <td className="w3-border-top">Total Price:</td> */}
                                                            {post.is_manheim_car ===
                                                            "1" ? (
                                                              <td className="w3-border-top">
                                                                Auction Price:
                                                              </td>
                                                            ) : (
                                                              <td className="w3-border-top">
                                                                Total Price:
                                                              </td>
                                                            )}
                                                            {/* <td>€ {formatNumber(post.car_info.final_price+this.state.vrt_price+this.state.transfer_price+this.state.inspection, { fractionDigits: 0 })}</td> */}
                                                            <td>
                                                              €{" "}
                                                              {formatNumber(
                                                                post.car_info
                                                                  .final_price +
                                                                  this.state
                                                                    .inspection,
                                                                {
                                                                  fractionDigits: 0,
                                                                }
                                                              )}
                                                            </td>
                                                          </tr>
                                                        </>
                                                      )}
                                                    </>
                                                  )
                                                ) : (
                                                  <>
                                                    {/* <tr className="strong">
                                                                                                                {
                                                                                                                    post.is_manheim_car === '1'
                                                                                                                    ?
                                                                                                                        <td>Auction&nbsp;Price:</td>
                                                                                                                    :
                                                                                                                        <td>Trade&nbsp;Price:</td>
                                                                                                                }
                                                                                                                <td>€ {formatNumber(post.car_info.converted_price+this.state.vrt_price+this.state.transfer_price+this.state.inspection, { fractionDigits: 0 })}</td>
                                                                                                            </tr> */}

                                                    {
                                                      // post.car_info.co2_tax ===
                                                      // 0 ? (
                                                      //   <>
                                                      //     <tr>
                                                      //       <td>CO2 VRT:</td>
                                                      //       <td>
                                                      //         <>
                                                      //           EXEMPT
                                                      //           <br />
                                                      //           (up to €5,000 of
                                                      //           VRT due)
                                                      //         </>
                                                      //       </td>
                                                      //     </tr>
                                                      //     <tr className="strong">
                                                      //       <td>Total VRT:</td>
                                                      //       <td>
                                                      //         €{" "}
                                                      //         {formatNumber(
                                                      //           post.car_info
                                                      //             .co2_tax +
                                                      //             post.car_info
                                                      //               .nox,
                                                      //           {
                                                      //             fractionDigits: 0,
                                                      //           }
                                                      //         )}
                                                      //       </td>
                                                      //     </tr>
                                                      //     <tr className="w3-border-top w3-border-bottom strong total">
                                                      //       {post.is_manheim_car ===
                                                      //       "1" ? (
                                                      //         <td className="w3-border-top">
                                                      //           Auction Price:
                                                      //         </td>
                                                      //       ) : (
                                                      //         <td className="w3-border-top">
                                                      //           Total Price:
                                                      //         </td>
                                                      //       )}

                                                      //       {/* <td>€ {formatNumber(post.car_info.final_price+this.state.vrt_price+this.state.transfer_price+this.state.inspection, { fractionDigits: 0 })}</td> */}
                                                      //       <td>
                                                      //         €{" "}
                                                      //         {formatNumber(
                                                      //           post.car_info
                                                      //             .final_price +
                                                      //             this.state
                                                      //               .inspection,
                                                      //           {
                                                      //             fractionDigits: 0,
                                                      //           }
                                                      //         )}
                                                      //       </td>
                                                      //     </tr>
                                                      //   </>
                                                      // ) :
                                                      Object.values(
                                                        unpaymentcars
                                                      ).indexOf(post.car_id) >
                                                      -1 ? (
                                                        <>
                                                          <tr>
                                                            <td colSpan="2">
                                                              <div className="price-details-sec">
                                                                <p className="heading">
                                                                  Price includes
                                                                </p>
                                                                <ul className="include-listing">
                                                                  <li className="item">
                                                                    <i
                                                                      className="fa fa-check-circle"
                                                                      aria-hidden="true"
                                                                    ></i>{" "}
                                                                    Duty - if
                                                                    applicable -
                                                                    @10%
                                                                  </li>
                                                                  <li className="item">
                                                                    <i
                                                                      className="fa fa-check-circle"
                                                                      aria-hidden="true"
                                                                    ></i>{" "}
                                                                    Mechanical
                                                                    Inspection
                                                                  </li>
                                                                  <li className="item">
                                                                    <i
                                                                      className="fa fa-check-circle"
                                                                      aria-hidden="true"
                                                                    ></i>{" "}
                                                                    Transport to
                                                                    Dublin
                                                                  </li>
                                                                  {post.vrt_rate !==
                                                                  null ? (
                                                                    <li className="item">
                                                                      <i
                                                                        className="fa fa-check-circle"
                                                                        aria-hidden="true"
                                                                      ></i>{" "}
                                                                      VRT
                                                                      Processing
                                                                    </li>
                                                                  ) : (
                                                                    <li className="item">
                                                                      <i
                                                                        className="fa fa-times"
                                                                        aria-hidden="true"
                                                                        style={{
                                                                          color:
                                                                            "red",
                                                                        }}
                                                                      ></i>{" "}
                                                                      VRT
                                                                      Processing
                                                                    </li>
                                                                  )}
                                                                  {post.vrt_rate !==
                                                                  null ? (
                                                                    <li className="item">
                                                                      <i
                                                                        className="fa fa-check-circle"
                                                                        aria-hidden="true"
                                                                      ></i>{" "}
                                                                      VRT
                                                                    </li>
                                                                  ) : (
                                                                    <li className="item">
                                                                      <i
                                                                        className="fa fa-times"
                                                                        aria-hidden="true"
                                                                        style={{
                                                                          color:
                                                                            "red",
                                                                        }}
                                                                      ></i>{" "}
                                                                      VRT
                                                                    </li>
                                                                  )}
                                                                  {post.premium_car ===
                                                                  1 ? (
                                                                    <li className="item">
                                                                      <i
                                                                        className="fa fa-check-circle"
                                                                        aria-hidden="true"
                                                                      ></i>{" "}
                                                                      VAT
                                                                    </li>
                                                                  ) : post.is_manheim_car ===
                                                                    "1" ? (
                                                                    <li className="item">
                                                                      <i
                                                                        className="fa fa-check-circle"
                                                                        aria-hidden="true"
                                                                      ></i>{" "}
                                                                      VAT{" "}
                                                                    </li>
                                                                  ) : (
                                                                    <li className="item">
                                                                      <i
                                                                        className="fa fa-check-circle"
                                                                        aria-hidden="true"
                                                                      ></i>{" "}
                                                                      VAT
                                                                    </li>
                                                                  )}
                                                                </ul>
                                                                <p className="heading">
                                                                  Click to
                                                                  include
                                                                </p>
                                                                {/* <input id={`check${post.car_id}`} type="checkbox" name="vrt" onClick={e=>this.paycar(post)}/>VRT (CO2 & NOx - pay €2 to view) <br/> */}
                                                                <input
                                                                  type="checkbox"
                                                                  onClick={(
                                                                    e
                                                                  ) =>
                                                                    this.includeWarranty(
                                                                      e,
                                                                      post
                                                                    )
                                                                  }
                                                                />
                                                                Warranty{" "}
                                                                <NavLink
                                                                  to="/assets/pdf/premium_cover.pdf"
                                                                  target="_blank"
                                                                >
                                                                  (More Details)
                                                                </NavLink>{" "}
                                                                &nbsp;&nbsp;&nbsp;
                                                                {/* Warranty (<NavLink to="https://ukcarimports.ie/assets/pdf/premium_cover.pdf" target="_blank">More Details</NavLink>) &nbsp;&nbsp;&nbsp; */}
                                                                {car_detailing
                                                                  ? car_detailing.length >
                                                                    0
                                                                    ? car_detailing.map(
                                                                        (
                                                                          car_detail
                                                                        ) => {
                                                                          if (
                                                                            car_detail.car_id ===
                                                                            post.car_id
                                                                          ) {
                                                                            if (
                                                                              car_detail.warranty
                                                                            ) {
                                                                              return (
                                                                                <select
                                                                                  name="include_warranty"
                                                                                  onChange={(
                                                                                    e
                                                                                  ) =>
                                                                                    this.handleWarrantyChange(
                                                                                      e,
                                                                                      post
                                                                                    )
                                                                                  }
                                                                                >
                                                                                  <option value="0">
                                                                                    Select
                                                                                  </option>
                                                                                  <option value="395">
                                                                                    Premium
                                                                                    Max
                                                                                    (+€395)
                                                                                  </option>
                                                                                  <option value="395">
                                                                                    Premium
                                                                                    Plus
                                                                                    (+€395)
                                                                                  </option>
                                                                                  <option value="395">
                                                                                    Premium
                                                                                    Component
                                                                                    (+€395)
                                                                                  </option>
                                                                                  <option value="295">
                                                                                    Premium
                                                                                    Power
                                                                                    Train
                                                                                    (+€295)
                                                                                  </option>
                                                                                </select>
                                                                              );
                                                                            }
                                                                          }
                                                                        }
                                                                      )
                                                                    : ""
                                                                  : ""}
                                                              </div>
                                                            </td>
                                                          </tr>
                                                          {car_detailing ? (
                                                            car_detailing.length >
                                                            0 ? (
                                                              car_detailing.filter(
                                                                (item) =>
                                                                  item.car_id ===
                                                                  post.car_id
                                                              )[0] ? (
                                                                car_detailing.map(
                                                                  (
                                                                    car_detail
                                                                  ) => {
                                                                    // let total = post.car_info.final_price+this.state.vrt_price+this.state.transfer_price+this.state.inspection;
                                                                    if (
                                                                      car_detail.car_id ===
                                                                      post.car_id
                                                                    ) {
                                                                      let total =
                                                                        post
                                                                          .car_info
                                                                          .final_price +
                                                                        this
                                                                          .state
                                                                          .inspection;
                                                                      if (
                                                                        car_detail.car_id ===
                                                                        post.car_id
                                                                      ) {
                                                                        if (
                                                                          car_detail.warranty
                                                                        ) {
                                                                          total =
                                                                            total +
                                                                            car_detail.warranty_val;
                                                                          // total = total+250;
                                                                        }
                                                                        if (
                                                                          car_detail.homedelivry
                                                                        ) {
                                                                          total =
                                                                            total +
                                                                            250;
                                                                        }
                                                                      }
                                                                      return (
                                                                        <tr className="w3-border-top w3-border-bottom strong total">
                                                                          {post.is_manheim_car ===
                                                                          "1" ? (
                                                                            <td className="w3-border-top">
                                                                              Auction
                                                                              Price:
                                                                            </td>
                                                                          ) : (
                                                                            <td className="w3-border-top">
                                                                              Total
                                                                              Price:
                                                                            </td>
                                                                          )}
                                                                          {/* <td className="w3-border-top">Total Price:</td> */}
                                                                          <td>
                                                                            €{" "}
                                                                            {formatNumber(
                                                                              total,
                                                                              {
                                                                                fractionDigits: 0,
                                                                              }
                                                                            )}
                                                                          </td>
                                                                        </tr>
                                                                      );
                                                                    }
                                                                  }
                                                                )
                                                              ) : (
                                                                <tr className="w3-border-top w3-border-bottom strong total">
                                                                  {post.is_manheim_car ===
                                                                  "1" ? (
                                                                    <td className="w3-border-top">
                                                                      Auction
                                                                      Price:
                                                                    </td>
                                                                  ) : (
                                                                    // <td className="w3-border-top">
                                                                    //   Total Price
                                                                    //   (Excluding
                                                                    //   VRT):
                                                                    // </td>
                                                                    <td
                                                                      className="w3-border-top"
                                                                      style={{
                                                                        width:
                                                                          "90px",
                                                                      }}
                                                                    >
                                                                      Total
                                                                      Price:
                                                                      {/* {post?.vrt_rate !==
                                                                      null ? (
                                                                        <h6>
                                                                          (Including
                                                                          VRT)
                                                                        </h6>
                                                                      ) : (
                                                                        <h6>
                                                                          (Excluding
                                                                          VRT)
                                                                        </h6>
                                                                      )} */}
                                                                    </td>
                                                                  )}
                                                                  {/* <td className="w3-border-top">Total Price:</td> */}
                                                                  {/* <td>€ {formatNumber((post.car_info.final_price+this.state.vrt_price+this.state.transfer_price+this.state.inspection), { fractionDigits: 0 })}</td> */}
                                                                  {post.vrt_rate !==
                                                                  null ? (
                                                                    <td
                                                                      className="mt-0 pt-0"
                                                                      style={{
                                                                        width:
                                                                          "150px",
                                                                      }}
                                                                    >
                                                                      {" "}
                                                                      {/* {formatNumber(
                                                                      post
                                                                        .car_info
                                                                        .final_price +
                                                                        this.state
                                                                          .inspection +
                                                                        this.state
                                                                          .transfer_price,
  
                                                                      {
                                                                        fractionDigits: 0,
                                                                      }
                                                                    )} */}
                                                                      <span
                                                                        style={{
                                                                          fontSize:
                                                                            "14px",

                                                                          fontFamily:
                                                                            "Arial",
                                                                        }}
                                                                      >
                                                                        {`€${formatNumber(
                                                                          post
                                                                            ?.car_info
                                                                            ?.before_vrt_final_price +
                                                                            this
                                                                              .state
                                                                              .inspection,
                                                                          {
                                                                            fractionDigits: 0,
                                                                          }
                                                                        )}  (€${formatNumber(
                                                                          post?.vrt_rate,
                                                                          {
                                                                            fractionDigits: 0,
                                                                          }
                                                                        )} VRT)`}
                                                                      </span>{" "}
                                                                      <span
                                                                        style={{
                                                                          marginLeft:
                                                                            "5px",
                                                                        }}
                                                                      >
                                                                        €
                                                                        {formatNumber(
                                                                          post
                                                                            ?.car_info
                                                                            ?.before_vrt_final_price +
                                                                            post?.vrt_rate +
                                                                            this
                                                                              .state
                                                                              .inspection,
                                                                          // this
                                                                          //   .state
                                                                          //   .transfer_price +
                                                                          {
                                                                            fractionDigits: 0,
                                                                          }
                                                                        )}
                                                                      </span>
                                                                    </td>
                                                                  ) : (
                                                                    <td className="mt-0 pt-0">
                                                                      €{" "}
                                                                      {formatNumber(
                                                                        post
                                                                          .car_info
                                                                          .final_price +
                                                                          this
                                                                            .state
                                                                            .inspection +
                                                                          this
                                                                            .state
                                                                            .transfer_price,

                                                                        {
                                                                          fractionDigits: 0,
                                                                        }
                                                                      )}{" "}
                                                                    </td>
                                                                  )}
                                                                </tr>
                                                              )
                                                            ) : (
                                                              <tr className="w3-border-top w3-border-bottom strong total">
                                                                {post.is_manheim_car ===
                                                                "1" ? (
                                                                  <td className="w3-border-top">
                                                                    Auction
                                                                    Price:
                                                                  </td>
                                                                ) : (
                                                                  // <td className="w3-border-top">
                                                                  //   Total Price
                                                                  //   (Excluding
                                                                  //   VRT):
                                                                  // </td>
                                                                  <td
                                                                    className="w3-border-top"
                                                                    style={{
                                                                      width:
                                                                        "90px",
                                                                    }}
                                                                  >
                                                                    Total Price:
                                                                    {/* {post?.vrt_rate !==
                                                                    null ? (
                                                                      <h6>
                                                                        (Including
                                                                        VRT)
                                                                      </h6>
                                                                    ) : (
                                                                      <h6>
                                                                        (Excluding
                                                                        VRT)
                                                                      </h6>
                                                                    )} */}
                                                                  </td>
                                                                )}
                                                                {/* <td className="w3-border-top">Total Price:</td> */}
                                                                {/* <td>€ {formatNumber((post.car_info.final_price+this.state.vrt_price+this.state.transfer_price+this.state.inspection), { fractionDigits: 0 })}</td> */}
                                                                {post.vrt_rate !==
                                                                null ? (
                                                                  <td
                                                                    className="mt-0 pt-0"
                                                                    style={{
                                                                      width:
                                                                        "150px",
                                                                    }}
                                                                  >
                                                                    {" "}
                                                                    {/* {formatNumber(
                                                                    post
                                                                      .car_info
                                                                      .final_price +
                                                                      this.state
                                                                        .inspection +
                                                                      this.state
                                                                        .transfer_price,

                                                                    {
                                                                      fractionDigits: 0,
                                                                    }
                                                                  )} */}
                                                                    <span
                                                                      style={{
                                                                        fontSize:
                                                                          "14px",

                                                                        fontFamily:
                                                                          "Arial",
                                                                      }}
                                                                    >
                                                                      {`€${formatNumber(
                                                                        post
                                                                          ?.car_info
                                                                          ?.before_vrt_final_price +
                                                                          this
                                                                            .state
                                                                            .inspection,
                                                                        {
                                                                          fractionDigits: 0,
                                                                        }
                                                                      )}  (€${formatNumber(
                                                                        post?.vrt_rate,
                                                                        {
                                                                          fractionDigits: 0,
                                                                        }
                                                                      )} VRT)`}
                                                                    </span>{" "}
                                                                    <span
                                                                      style={{
                                                                        marginLeft:
                                                                          "5px",
                                                                      }}
                                                                    >
                                                                      €
                                                                      {formatNumber(
                                                                        post
                                                                          ?.car_info
                                                                          ?.before_vrt_final_price +
                                                                          post?.vrt_rate +
                                                                          this
                                                                            .state
                                                                            .inspection,
                                                                        // this
                                                                        //   .state
                                                                        //   .transfer_price +
                                                                        {
                                                                          fractionDigits: 0,
                                                                        }
                                                                      )}
                                                                    </span>
                                                                  </td>
                                                                ) : (
                                                                  <td className="mt-0 pt-0">
                                                                    €{" "}
                                                                    {formatNumber(
                                                                      post
                                                                        .car_info
                                                                        .final_price +
                                                                        this
                                                                          .state
                                                                          .inspection +
                                                                        this
                                                                          .state
                                                                          .transfer_price,

                                                                      {
                                                                        fractionDigits: 0,
                                                                      }
                                                                    )}{" "}
                                                                  </td>
                                                                )}
                                                              </tr>
                                                            )
                                                          ) : (
                                                            <tr className="w3-border-top w3-border-bottom strong total">
                                                              {post.is_manheim_car ===
                                                              "1" ? (
                                                                <td className="w3-border-top">
                                                                  Auction Price:
                                                                </td>
                                                              ) : (
                                                                <td className="w3-border-top">
                                                                  Total Price:
                                                                </td>
                                                              )}
                                                              {/* <td className="w3-border-top">Total Price:</td> */}
                                                              <td>
                                                                €{" "}
                                                                {formatNumber(
                                                                  post.car_info
                                                                    .final_price +
                                                                    this.state
                                                                      .inspection,
                                                                  {
                                                                    fractionDigits: 0,
                                                                  }
                                                                )}
                                                              </td>
                                                            </tr>
                                                          )}
                                                          {/* <tr className="w3-border-top w3-border-bottom strong total">
                                                                                                                                    <td className="w3-border-top">Total Price:</td>
                                                                                                                                    <td>€ {formatNumber((post.car_info.converted_price+this.state.vrt_price+this.state.transfer_price+this.state.inspection), { fractionDigits: 0 })}</td>
                                                                                                                                </tr> */}
                                                        </>
                                                      ) : (
                                                        <>
                                                          <tr>
                                                            <td colSpan="2">
                                                              <div className="price-details-sec">
                                                                <p className="heading">
                                                                  Price includes
                                                                </p>
                                                                <ul className="include-listing">
                                                                  <li className="item">
                                                                    <i
                                                                      className="fa fa-check-circle"
                                                                      aria-hidden="true"
                                                                    ></i>{" "}
                                                                    Rules of
                                                                    origin Duty
                                                                    - if
                                                                    applicable -
                                                                    @10%
                                                                  </li>
                                                                  <li className="item">
                                                                    <i
                                                                      className="fa fa-check-circle"
                                                                      aria-hidden="true"
                                                                    ></i>{" "}
                                                                    Mechanical
                                                                    Inspection
                                                                  </li>
                                                                  <li className="item">
                                                                    <i
                                                                      className="fa fa-check-circle"
                                                                      aria-hidden="true"
                                                                    ></i>{" "}
                                                                    Transport to
                                                                    Dublin
                                                                  </li>
                                                                  <li className="item">
                                                                    <i
                                                                      className="fa fa-times"
                                                                      aria-hidden="true"
                                                                      style={{
                                                                        color:
                                                                          "red",
                                                                      }}
                                                                    ></i>{" "}
                                                                    VRT
                                                                    Processing
                                                                  </li>
                                                                  {post.premium_car ===
                                                                  1 ? (
                                                                    <li className="item">
                                                                      <i
                                                                        className="fa fa-check-circle"
                                                                        aria-hidden="true"
                                                                      ></i>{" "}
                                                                      VAT
                                                                    </li>
                                                                  ) : (
                                                                    <li className="item">
                                                                      <i
                                                                        className="fa fa-question-circle"
                                                                        aria-hidden="true"
                                                                      ></i>{" "}
                                                                      VAT
                                                                      reclaim
                                                                      from UK to
                                                                      be
                                                                      manually
                                                                      confirmed
                                                                    </li>
                                                                  )}
                                                                </ul>
                                                                <p className="heading">
                                                                  Click to
                                                                  includess
                                                                </p>
                                                                <input
                                                                  type="checkbox"
                                                                  name="vrt"
                                                                  onClick={(
                                                                    e
                                                                  ) =>
                                                                    this.includeVRT(
                                                                      e,
                                                                      post
                                                                    )
                                                                  }
                                                                  defaultChecked={
                                                                    true
                                                                  }
                                                                />
                                                                VRT (CO2 & NOx)
                                                                (€{" "}
                                                                {formatNumber(
                                                                  post.car_info
                                                                    .co2_tax +
                                                                    post
                                                                      .car_info
                                                                      .nox,
                                                                  {
                                                                    fractionDigits: 0,
                                                                  }
                                                                )}
                                                                )<br />
                                                                <input
                                                                  type="checkbox"
                                                                  onClick={(
                                                                    e
                                                                  ) =>
                                                                    this.includeWarranty(
                                                                      e,
                                                                      post
                                                                    )
                                                                  }
                                                                />
                                                                Warranty{" "}
                                                                <NavLink
                                                                  to="/assets/pdf/premium_cover.pdf"
                                                                  target="_blank"
                                                                >
                                                                  (More Details)
                                                                </NavLink>{" "}
                                                                &nbsp;&nbsp;&nbsp;{" "}
                                                                {car_detailing
                                                                  ? car_detailing.length >
                                                                    0
                                                                    ? car_detailing.map(
                                                                        (
                                                                          car_detail
                                                                        ) => {
                                                                          if (
                                                                            car_detail.car_id ===
                                                                            post.car_id
                                                                          ) {
                                                                            if (
                                                                              car_detail.warranty
                                                                            ) {
                                                                              return (
                                                                                <select
                                                                                  name="include_warranty"
                                                                                  onChange={(
                                                                                    e
                                                                                  ) =>
                                                                                    this.handleWarrantyChange(
                                                                                      e,
                                                                                      post
                                                                                    )
                                                                                  }
                                                                                >
                                                                                  <option value="0">
                                                                                    Select
                                                                                  </option>
                                                                                  <option value="395">
                                                                                    Premium
                                                                                    Max
                                                                                    (+€395)
                                                                                  </option>
                                                                                  <option value="395">
                                                                                    Premium
                                                                                    Plus
                                                                                    (+€395)
                                                                                  </option>
                                                                                  <option value="395">
                                                                                    Premium
                                                                                    Component
                                                                                    (+€395)
                                                                                  </option>
                                                                                  <option value="295">
                                                                                    Premium
                                                                                    Power
                                                                                    Train
                                                                                    (+€295)
                                                                                  </option>
                                                                                </select>
                                                                              );
                                                                            }
                                                                          }
                                                                        }
                                                                      )
                                                                    : ""
                                                                  : ""}
                                                                <br />
                                                                <input
                                                                  type="checkbox"
                                                                  name="home_delivery"
                                                                  onClick={(
                                                                    e
                                                                  ) =>
                                                                    this.includeHomeDelivery(
                                                                      e,
                                                                      post
                                                                    )
                                                                  }
                                                                />
                                                                Home Delivery{" "}
                                                                <br />
                                                              </div>
                                                            </td>
                                                          </tr>
                                                          {car_detailing ? (
                                                            car_detailing.length >
                                                            0 ? (
                                                              car_detailing.map(
                                                                (
                                                                  car_detail
                                                                ) => {
                                                                  // let total = post.car_info.final_price+this.state.vrt_price+this.state.transfer_price+this.state.inspection;
                                                                  let total =
                                                                    post
                                                                      .car_info
                                                                      .final_price +
                                                                    this.state
                                                                      .inspection;
                                                                  if (
                                                                    car_detail.car_id ===
                                                                    post.car_id
                                                                  ) {
                                                                    if (
                                                                      car_detail.vart_nox
                                                                    ) {
                                                                      total =
                                                                        post
                                                                          .car_info
                                                                          .final_price +
                                                                        this
                                                                          .state
                                                                          .inspection;
                                                                      // total = post.car_info.final_price+this.state.vrt_price+this.state.transfer_price+this.state.inspection;
                                                                    }
                                                                    if (
                                                                      car_detail.warranty_val
                                                                    ) {
                                                                      total =
                                                                        total +
                                                                        car_detail.warranty_val;
                                                                      // total = total+250;
                                                                    }
                                                                    if (
                                                                      car_detail.homedelivry
                                                                    ) {
                                                                      total =
                                                                        total +
                                                                        250;
                                                                    }
                                                                  }
                                                                  return (
                                                                    <tr className="w3-border-top w3-border-bottom strong total">
                                                                      {/* <td className="w3-border-top">Total Price:</td> */}
                                                                      {post.is_manheim_car ===
                                                                      "1" ? (
                                                                        <td className="w3-border-top">
                                                                          Auction
                                                                          Price:
                                                                        </td>
                                                                      ) : (
                                                                        <td className="w3-border-top">
                                                                          Total
                                                                          Price:
                                                                        </td>
                                                                      )}
                                                                      <td>
                                                                        €{" "}
                                                                        {formatNumber(
                                                                          total,
                                                                          {
                                                                            fractionDigits: 0,
                                                                          }
                                                                        )}
                                                                      </td>
                                                                    </tr>
                                                                  );
                                                                }
                                                              )
                                                            ) : (
                                                              <tr className="w3-border-top w3-border-bottom strong total">
                                                                {/* <td className="w3-border-top">Total Price:</td> */}
                                                                {post.is_manheim_car ===
                                                                "1" ? (
                                                                  <td className="w3-border-top">
                                                                    Auction
                                                                    Price:
                                                                  </td>
                                                                ) : (
                                                                  <td className="w3-border-top">
                                                                    Total Price:
                                                                  </td>
                                                                )}
                                                                {/* <td>€ {formatNumber((post.car_info.final_price+this.state.vrt_price+this.state.transfer_price+this.state.inspection), { fractionDigits: 0 })}</td> */}
                                                                <td>
                                                                  €{" "}
                                                                  {formatNumber(
                                                                    post
                                                                      .car_info
                                                                      .final_price +
                                                                      this.state
                                                                        .inspection,
                                                                    {
                                                                      fractionDigits: 0,
                                                                    }
                                                                  )}
                                                                </td>
                                                              </tr>
                                                            )
                                                          ) : (
                                                            <tr className="w3-border-top w3-border-bottom strong total">
                                                              {post.is_manheim_car ===
                                                              "1" ? (
                                                                <td className="w3-border-top">
                                                                  Auction Price:
                                                                </td>
                                                              ) : (
                                                                <td className="w3-border-top">
                                                                  Total Price:
                                                                </td>
                                                              )}
                                                              {/* <td className="w3-border-top">Total Price:</td> */}
                                                              {/* <td>€ {formatNumber((post.car_info.final_price+this.state.vrt_price+this.state.transfer_price+this.state.inspection), { fractionDigits: 0 })}</td> */}
                                                              <td>
                                                                €{" "}
                                                                {formatNumber(
                                                                  post.car_info
                                                                    .final_price +
                                                                    this.state
                                                                      .inspection,
                                                                  {
                                                                    fractionDigits: 0,
                                                                  }
                                                                )}
                                                              </td>
                                                            </tr>
                                                          )}
                                                        </>
                                                      )
                                                    }
                                                  </>
                                                )}
                                              </tbody>
                                            </table>
                                          ) : (
                                            ""
                                          )}
                                          <div className="green-check w3-row">
                                            Inspected after a Deposit
                                          </div>
                                          <div className="green-check w3-row">
                                            history checked
                                          </div>

                                          {post.service_history ? (
                                            <div className="green-check w3-row">
                                              Service History
                                            </div>
                                          ) : null}

                                          <div className="request">
                                            <div className="request-place text-center">
                                              {/* <p
                                                className="text-center"
                                                style={{ color: "#b60b0c" }}
                                              >
                                                We'll get in touch with you soon
                                                to confirm the order and request
                                                the deposit.
                                              </p> */}
                                              <div className="financing">
                                                {/* <button className="btn btn deposit"> Place a Deposit</button> */}
                                                <button
                                                  type="button"
                                                  className="btn btn deposit"
                                                  onClick={(e) =>
                                                    this.openform(post)
                                                  }
                                                >
                                                  Place A Deposit
                                                </button>
                                                {/* <button className="btn btn finance">Finance Calculation</button> */}
                                              </div>
                                            </div>
                                          </div>
                                          <div className="how-it-work">
                                            {/* <a
                                              className="strong"
                                              href="https://www.youtube.com/watch?v=L-2oXvn2oko"
                                              target="_blank"
                                              rel="nofollow, noopener, noreferrer"
                                            >
                                              How It Works
                                            </a>
                                            <a
                                              className="strong"
                                              href="https://www.youtube.com/watch?v=2HwE_KZucIM"
                                              target="_blank"
                                              rel="nofollow, noopener, noreferrer"
                                            >
                                              Need to trade in?
                                            </a> */}
                                          </div>
                                        </div>
                                      </div>
                                      {/* <div className="col-md-3">
                                        <a
                                          href="https://wipdidoo.ie/"
                                          target="_blank"
                                        >
                                          <img
                                            className="section-img-ad"
                                            src="/assets/images/WipdidooAd.gif"
                                          />
                                        </a>
                                      </div> */}
                                    </div>
                                    <div className="w3-row strong w3-border-top w3-block w3-padding">
                                      {caryear ? caryear : ""}, {post.car_door},{" "}
                                      {post.transmission_name} Transmission,{" "}
                                      {post.fuel_type_name}, (
                                      {formatNumber(
                                        Math.round(
                                          post.mileage.replace(/\D/g, "") * 1.6
                                        ),
                                        { fractionDigits: 0 }
                                      )}{" "}
                                      KM ({post?.mileage} Miles))
                                    </div>

                                    <Accordion className="text-left">
                                      <Card className="mt-2">
                                        {/* Umar */}
                                        <Card.Header>
                                          <Accordion.Toggle
                                            as={Button}
                                            variant="link"
                                            eventKey="0"
                                          >
                                            <div className="theme-vehicle-details-open strong underline w3-row w3-btn w3-block w3-padding-0 w3-round-small">
                                              <a>
                                                Click here for Vehicle
                                                Details&nbsp;
                                                <i
                                                  className="fa fa-info-circle"
                                                  aria-hidden="true"
                                                ></i>
                                              </a>
                                            </div>
                                          </Accordion.Toggle>
                                        </Card.Header>
                                        {/* Umar */}

                                        <Accordion.Collapse
                                          eventKey="0"
                                          className="p-3"
                                        >
                                          <div className="theme-vehicle-details theme-vehicle-section w3-row w3-block w3-round-small w3-padding-bottom w3-card-2 w3-padding-8">
                                            <div className="w3-row w3-center">
                                              <h2>Details</h2>
                                            </div>
                                            <div className="w3-row w3-block w3-border w3-round-small">
                                              <div className="w3-col l66">
                                                <table className="w3-table w3-padding-0">
                                                  <tbody>
                                                    <tr>
                                                      <td>Make</td>
                                                      <td>{post.make_name}</td>
                                                    </tr>
                                                    <tr>
                                                      <td>Model</td>
                                                      <td>{post.model_name}</td>
                                                    </tr>
                                                    {this.state.userrole ===
                                                      "$aHF667#79+57h%45" &&
                                                      post.trim &&
                                                      post.trim !== null && (
                                                        <tr>
                                                          <td>VARIANT</td>
                                                          <td>{post.trim}</td>
                                                        </tr>
                                                      )}
                                                    {post.registration_date &&
                                                      post.registration_date !==
                                                        null && (
                                                        <tr>
                                                          <td>
                                                            Registration Date
                                                          </td>
                                                          <td>
                                                            {
                                                              post.registration_date
                                                            }
                                                          </td>
                                                        </tr>
                                                      )}
                                                    {post.seats &&
                                                      post.seats !== null &&
                                                      post.seats !== "0" && (
                                                        <tr>
                                                          <td>Seats</td>
                                                          <td>{post.seats}</td>
                                                        </tr>
                                                      )}
                                                    <tr>
                                                      <td>Body Type</td>
                                                      <td>
                                                        {post.body_style_name}
                                                      </td>
                                                    </tr>
                                                    <tr>
                                                      <td>Fuel Type</td>
                                                      <td>
                                                        {post.fuel_type_name}
                                                      </td>
                                                    </tr>
                                                    <tr>
                                                      <td>Transmission</td>
                                                      <td>
                                                        {post.transmission_name}
                                                      </td>
                                                    </tr>
                                                    <tr>
                                                      <td>Doors</td>
                                                      <td>{post.car_door}</td>
                                                    </tr>
                                                    <tr>
                                                      <td>Colour</td>
                                                      <td>{post.color_name}</td>
                                                    </tr>
                                                    <tr>
                                                      <td>CO2 Emission</td>
                                                      <td>
                                                        {post.co2_emission
                                                          ? post?.co2_emission
                                                          : "0 g/km"}
                                                      </td>
                                                    </tr>
                                                  </tbody>
                                                </table>
                                              </div>
                                              <div className="w3-col l66">
                                                <table className="w3-table w3-padding-0">
                                                  <tbody>
                                                    <tr>
                                                      <td>Mileage</td>
                                                      <td>
                                                        {formatNumber(
                                                          Math.round(
                                                            post.mileage.replace(
                                                              /\D/g,
                                                              ""
                                                            ) * 1.6
                                                          ),
                                                          { fractionDigits: 0 }
                                                        )}{" "}
                                                        KM ({post?.mileage}{" "}
                                                        Miles)
                                                      </td>
                                                    </tr>
                                                    <tr>
                                                      <td>MOT History</td>
                                                      <td>
                                                        <a
                                                          href="https://www.check-mot.service.gov.uk/"
                                                          target="_blank"
                                                          // rel="nofollow noreferrer"
                                                          style={{
                                                            color: "#b60b0c",
                                                          }}
                                                        >
                                                          Check
                                                        </a>
                                                      </td>
                                                    </tr>
                                                    <tr>
                                                      <td>
                                                        {" "}
                                                        MECHANICAL & CONDITION
                                                        REPORT
                                                      </td>
                                                      <td>
                                                        <a
                                                          href={
                                                            apiBaseUrl +
                                                            "/report/Mech_And_Cond_Report.pdf"
                                                          }
                                                          target="_blank"
                                                          style={{
                                                            color: "#b60b0c",
                                                          }}
                                                        >
                                                          VIEW
                                                        </a>
                                                      </td>
                                                    </tr>
                                                    {/* <tr>
                                                      <td> CONDITION REPORT</td>
                                                      <td>
                                                        <a
                                                          href={
                                                            post?.condition_report
                                                          }
                                                          target="_blank"
                                                          style={{
                                                            color: "#b60b0c",
                                                          }}
                                                        >
                                                          VIEW
                                                        </a>
                                                      </td>
                                                    </tr> */}
                                                    {/* <tr>
                                                      <td>GRADE</td>
                                                      <td>{post?.grade}</td>
                                                    </tr> */}
                                                    {post?.owner && (
                                                      <tr>
                                                        <td>
                                                          {" "}
                                                          NUMBER OF OWNERS
                                                        </td>
                                                        <td>{post?.owner}</td>
                                                      </tr>
                                                    )}
                                                    {post?.emission_class && (
                                                      <tr>
                                                        <td> Emission class</td>
                                                        <td>
                                                          {post?.emission_class}
                                                        </td>
                                                      </tr>
                                                    )}
                                                    {/*  <tr>
                                                      <td> REG NUMBER</td>
                                                      <td>
                                                        {post?.vrm || "-"}
                                                      </td>
                                                    </tr> */}
                                                    {post.inspection_url ? (
                                                      post.inspection_url !=
                                                      null ? (
                                                        <tr>
                                                          <td>
                                                            Inspection URL
                                                          </td>
                                                          <td>
                                                            <a
                                                              rel="nofollow noreferrer"
                                                              target="_blank"
                                                              href={
                                                                post.inspection_url
                                                              }
                                                            >
                                                              Check
                                                            </a>
                                                          </td>
                                                        </tr>
                                                      ) : (
                                                        ""
                                                      )
                                                    ) : (
                                                      ""
                                                    )}
                                                  </tbody>
                                                </table>
                                              </div>
                                            </div>
                                            <div className="w3-row w3-center">
                                              {equipmentArray !== "0" ? (
                                                equipmentArray.length > 0 ? (
                                                  <h2>Equipment</h2>
                                                ) : (
                                                  ""
                                                )
                                              ) : (
                                                ""
                                              )}
                                            </div>
                                            <div className="w3-row w3-block w3-round-small w3-border">
                                              <div className="w3-row w3-block">
                                                {
                                                  // console.log(JSON.parse(post.features_options))
                                                  equipmentArray &&
                                                  equipmentArray.length > 0
                                                    ? equipmentArray.map(
                                                        (feature) => (
                                                          <div className="w3-col xl4 m6">
                                                            <div className="w3-row">
                                                              <i
                                                                className="fa fa-check-square-o"
                                                                aria-hidden="true"
                                                              ></i>{" "}
                                                              {feature}
                                                            </div>
                                                          </div>
                                                        )
                                                      )
                                                    : ""
                                                }
                                                <div className="w3-row w3-block float-right">
                                                  <div className="w3-col xl4 m6 float-left">
                                                    {post.stat_code ||
                                                    post.trim ||
                                                    post.OMSP ||
                                                    post.yearly_dep_rate ||
                                                    post.monthly_dep_rate ||
                                                    post.mileage_dep ||
                                                    post.vrt_rate ? (
                                                      <></>
                                                    ) : (
                                                      <>
                                                        <label
                                                          className="historyLabel"
                                                          style={{
                                                            marginBottom: 0,
                                                            fontSize: 23,
                                                          }}
                                                        ></label>{" "}
                                                        <div className="w3-row">
                                                          <i
                                                            className="fa fa-check-square-o"
                                                            aria-hidden="true"
                                                          ></i>{" "}
                                                          Trim:
                                                        </div>
                                                        <div className="w3-row">
                                                          <i
                                                            className="fa fa-check-square-o"
                                                            aria-hidden="true"
                                                          ></i>{" "}
                                                          OMSP:
                                                        </div>
                                                        <div className="w3-row">
                                                          <i
                                                            className="fa fa-check-square-o"
                                                            aria-hidden="true"
                                                          ></i>{" "}
                                                          Yearly Dep Rate:
                                                        </div>
                                                        <div className="w3-row">
                                                          <i
                                                            className="fa fa-check-square-o"
                                                            aria-hidden="true"
                                                          ></i>{" "}
                                                          Monthly Dep Rate:
                                                        </div>
                                                        <div className="w3-row">
                                                          <i
                                                            className="fa fa-check-square-o"
                                                            aria-hidden="true"
                                                          ></i>{" "}
                                                          Mileage Dep:
                                                        </div>
                                                        <div className="w3-row">
                                                          <i
                                                            className="fa fa-check-square-o"
                                                            aria-hidden="true"
                                                          ></i>{" "}
                                                          VRT Rate:
                                                        </div>
                                                      </>
                                                    )}
                                                  </div>
                                                  <div className="w3-col xl4 m6 float-right">
                                                    {post.service_history ? (
                                                      <>
                                                        <label
                                                          className="historyLabel"
                                                          style={{
                                                            marginBottom: 0,
                                                            fontSize: 23,
                                                          }}
                                                        >
                                                          Service History : Yes
                                                        </label>{" "}
                                                        
                                                        {post.last_service_type && (
                                                          <div className="w3-row">
                                                            <i
                                                              className="fa fa-check-square-o"
                                                              aria-hidden="true"
                                                            ></i>{" "}
                                                            Service type:{" "}
                                                            {
                                                              post.last_service_type
                                                            }
                                                          </div>
                                                        )}
                                                        {post.total_service && (
                                                          <div className="w3-row">
                                                            <i
                                                              className="fa fa-check-square-o"
                                                              aria-hidden="true"
                                                            ></i>{" "}
                                                            Number of Service:{" "}
                                                            {post.total_service}
                                                          </div>
                                                        )}
                                                        {post.last_service !==
                                                          "-" &&
                                                          post.last_service !==
                                                            "" && (
                                                            <div className="w3-row">
                                                              <i
                                                                className="fa fa-check-square-o"
                                                                aria-hidden="true"
                                                              ></i>{" "}
                                                              Last Service:{" "}
                                                              {
                                                                post.last_service
                                                              }
                                                            </div>
                                                          )}
                                                        {post.last_service_mileage && (
                                                          <div className="w3-row">
                                                            <i
                                                              className="fa fa-check-square-o"
                                                              aria-hidden="true"
                                                            ></i>{" "}
                                                            Last Service Milage:{" "}
                                                            {
                                                              post.last_service_mileage
                                                            }
                                                          </div>
                                                        )}
                                                        {post.service_notes && (
                                                          <div className="w3-row">
                                                            <i
                                                              className="fa fa-check-square-o"
                                                              aria-hidden="true"
                                                            ></i>{" "}
                                                            Service Notes:{" "}
                                                            {post.service_notes}
                                                          </div>
                                                        )}
                                                        {post.mot_date !==
                                                          "-" &&
                                                          post.mot_date !==
                                                            "" && (
                                                            <div className="w3-row">
                                                              <i
                                                                className="fa fa-check-square-o"
                                                                aria-hidden="true"
                                                              ></i>{" "}
                                                              MOT Expiry:{" "}
                                                              {post.mot_date}
                                                            </div>
                                                          )}
                                                      </>
                                                    ) : (
                                                      ""
                                                    )}
                                                  </div>
                                                </div>
                                                {/* {post.features_options !== "0"
                                                  ? // console.log(JSON.parse(post.features_options))
                                                    JSON.parse(
                                                      post.features_options
                                                    ).length > 0
                                                    ? JSON.parse(
                                                        post.features_options
                                                      ).map((feature) => (
                                                        <div className="w3-col xl4 m6">
                                                          <div className="w3-row">
                                                            <i
                                                              className="fa fa-check-square-o"
                                                              aria-hidden="true"
                                                            ></i>{" "}
                                                            {feature}
                                                          </div>
                                                        </div>
                                                      ))
                                                    : ""
                                                  : ""} */}
                                              </div>
                                              {/* <div className="w3-row w3-block">
                                                <div className="w3-col xl4 m6">
                                                  <div className="w3-row ">
                                                    <i
                                                      className="fa fa-check-square-o"
                                                      aria-hidden="true"
                                                    ></i>{" "}
                                                    <span
                                                      style={{
                                                        textTransform: "none",
                                                      }}
                                                    >
                                                      NOx Emission:{" "}
                                                      {post?.nox_emission}
                                                    </span>
                                                  </div>
                                                </div>
                                              </div> */}
                                              {/* <div className="w3-row w3-block">
                                                <div className="w3-col xl4 m6">
                                                  <div className="w3-row">
                                                    <i
                                                      className="fa fa-check-square-o"
                                                      aria-hidden="true"
                                                    ></i>{" "}
                                                    CO2 Emission:{" "}
                                                    {post?.co2_emission}
                                                  </div>
                                                </div>
                                              </div> */}
                                            </div>
                                            <div
                                              style={{
                                                display: "flex",
                                                width: "100%",
                                              }}
                                            >
                                              <div
                                                style={{
                                                  cursor: "pointer",
                                                  display: "flex",
                                                  alignItems: "center",
                                                }}
                                                onClick={this.handleOpenDrawer}
                                              >
                                                <h2 style={{ marginBottom: 0 }}>
                                                  Specifications
                                                </h2>
                                                <i
                                                  className="fa fa-arrow-right"
                                                  style={{
                                                    fontSize: 30,
                                                    color: "#b60b0c",
                                                    paddingLeft: 15,
                                                  }}
                                                  aria-hidden="true"
                                                ></i>
                                                <div
                                                  className={`overlay ${
                                                    this.state.show
                                                      ? "overlay-open"
                                                      : ""
                                                  }`}
                                                  onClick={this.handleCloseDraw}
                                                ></div>
                                              </div>
                                            </div>
                                            {this.state.userrole ===
                                              "$aHF667#79+57h%45" &&
                                              post.stat_code &&
                                              post.stat_code !== "" && (
                                                <tr className="strong">
                                                  <td>Stat Code:</td>
                                                  <td
                                                    style={{
                                                      color:
                                                        post.point_3_5_match ===
                                                        1
                                                          ? "#b60b0c"
                                                          : "#8b8b8b",
                                                    }}
                                                  >
                                                    {post.stat_code}
                                                  </td>
                                                </tr>
                                              )}
                                            {this.state.show && (
                                              <div
                                                className={`drawer-right-part ${
                                                  this.state.show ? "show" : ""
                                                }`}
                                                style={{
                                                  display: "flex",
                                                  flexDirection: "column",
                                                }}
                                              >
                                                <div
                                                  onClick={this.handleClose}
                                                  style={{
                                                    display: "flex",
                                                    justifyContent: "end",
                                                    cursor: "pointer",
                                                  }}
                                                >
                                                  <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    height="14"
                                                    width="14"
                                                    viewBox="0 0 16 16"
                                                    fill="#242D3D"
                                                    className="atds-icon-svg"
                                                  >
                                                    <title></title>
                                                    <path d="M15.0701 2.3392L13.6601 0.929199L8.00005 6.5892L2.34005 0.929199L0.930054 2.3392L6.59005 7.9992L0.930054 13.6592L2.34005 15.0692L8.00005 9.4092L13.6601 15.0692L15.0701 13.6592L9.41005 7.9992L15.0701 2.3392Z"></path>
                                                  </svg>
                                                </div>
                                                <div className="w3-row w3-center">
                                                  <h2
                                                    style={{
                                                      textAlign: "center",
                                                    }}
                                                  >
                                                    Specifications
                                                  </h2>
                                                </div>
                                                <div
                                                  className="w3-row w3-block w3-round-small w3-border"
                                                  style={{
                                                    overflowY: "auto",
                                                    height: "100%",
                                                  }}
                                                >
                                                  <div className="w3-row w3-block">
                                                    {driver_convenience.length ===
                                                      0 &&
                                                      safety.length === 0 &&
                                                      exterior_feature.length ===
                                                        0 &&
                                                      interior_feature.length ===
                                                        0 &&
                                                      technical_feat.length ===
                                                        0 &&
                                                      performance.length ===
                                                        0 && <div>No data</div>}
                                                    <Accordion className="text-left">
                                                      {driver_convenience.length >
                                                      0 ? (
                                                        <Card className="mt-2">
                                                          <Card.Header>
                                                            <Accordion.Toggle
                                                              as={Button}
                                                              variant="link"
                                                              eventKey="0"
                                                            >
                                                              <div className="theme-vehicle-details-open strong underline w3-row w3-btn w3-block w3-padding-0 w3-round-small">
                                                                <a>
                                                                  Driver
                                                                  Convenience (
                                                                  {
                                                                    driver_convenience.length
                                                                  }
                                                                  )
                                                                </a>
                                                              </div>
                                                            </Accordion.Toggle>
                                                          </Card.Header>
                                                          <Accordion.Collapse eventKey="0">
                                                            <Card.Body>
                                                              {driver_convenience.map(
                                                                (
                                                                  convenience
                                                                ) => (
                                                                  <div className="m6">
                                                                    <div className="w3-row">
                                                                      <i
                                                                        className="fa fa-check-square-o"
                                                                        aria-hidden="true"
                                                                      ></i>{" "}
                                                                      {
                                                                        convenience
                                                                      }
                                                                    </div>
                                                                  </div>
                                                                )
                                                              )}
                                                            </Card.Body>
                                                          </Accordion.Collapse>
                                                        </Card>
                                                      ) : (
                                                        ""
                                                      )}
                                                      {safety.length > 0 ? (
                                                        <Card className="mt-2">
                                                          <Card.Header>
                                                            <Accordion.Toggle
                                                              as={Button}
                                                              variant="link"
                                                              eventKey="1"
                                                            >
                                                              <div className="theme-vehicle-details-open strong underline w3-row w3-btn w3-block w3-padding-0 w3-round-small">
                                                                <a>
                                                                  Safety (
                                                                  {
                                                                    safety.length
                                                                  }
                                                                  )
                                                                </a>
                                                              </div>
                                                            </Accordion.Toggle>
                                                          </Card.Header>
                                                          <Accordion.Collapse eventKey="1">
                                                            <Card.Body>
                                                              {safety.map(
                                                                (
                                                                  safety_feature
                                                                ) => (
                                                                  <div className="m6">
                                                                    <div className="w3-row">
                                                                      <i
                                                                        className="fa fa-check-square-o"
                                                                        aria-hidden="true"
                                                                      ></i>{" "}
                                                                      {
                                                                        safety_feature
                                                                      }
                                                                    </div>
                                                                  </div>
                                                                )
                                                              )}
                                                            </Card.Body>
                                                          </Accordion.Collapse>
                                                        </Card>
                                                      ) : (
                                                        ""
                                                      )}
                                                      {exterior_feature.length >
                                                      0 ? (
                                                        <Card className="mt-2">
                                                          <Card.Header>
                                                            <Accordion.Toggle
                                                              as={Button}
                                                              variant="link"
                                                              eventKey="2"
                                                            >
                                                              <div className="theme-vehicle-details-open strong underline w3-row w3-btn w3-block w3-padding-0 w3-round-small">
                                                                <a>
                                                                  Exterior
                                                                  Feature (
                                                                  {
                                                                    exterior_feature.length
                                                                  }
                                                                  )
                                                                </a>
                                                              </div>
                                                            </Accordion.Toggle>
                                                          </Card.Header>
                                                          <Accordion.Collapse eventKey="2">
                                                            <Card.Body>
                                                              {exterior_feature.map(
                                                                (
                                                                  exter_feature
                                                                ) => (
                                                                  <div className="m6">
                                                                    <div className="w3-row">
                                                                      <i
                                                                        className="fa fa-check-square-o"
                                                                        aria-hidden="true"
                                                                      ></i>{" "}
                                                                      {
                                                                        exter_feature
                                                                      }
                                                                    </div>
                                                                  </div>
                                                                )
                                                              )}
                                                            </Card.Body>
                                                          </Accordion.Collapse>
                                                        </Card>
                                                      ) : (
                                                        ""
                                                      )}
                                                      {interior_feature.length >
                                                      0 ? (
                                                        <Card className="mt-2">
                                                          <Card.Header>
                                                            <Accordion.Toggle
                                                              as={Button}
                                                              variant="link"
                                                              eventKey="3"
                                                            >
                                                              <div className="theme-vehicle-details-open strong underline w3-row w3-btn w3-block w3-padding-0 w3-round-small">
                                                                <a>
                                                                  Interior
                                                                  Feature (
                                                                  {
                                                                    interior_feature.length
                                                                  }
                                                                  )
                                                                </a>
                                                              </div>
                                                            </Accordion.Toggle>
                                                          </Card.Header>
                                                          <Accordion.Collapse eventKey="3">
                                                            <Card.Body>
                                                              {interior_feature.map(
                                                                (
                                                                  int_feature
                                                                ) => (
                                                                  <div className="m6">
                                                                    <div className="w3-row">
                                                                      <i
                                                                        className="fa fa-check-square-o"
                                                                        aria-hidden="true"
                                                                      ></i>{" "}
                                                                      {
                                                                        int_feature
                                                                      }
                                                                    </div>
                                                                  </div>
                                                                )
                                                              )}
                                                            </Card.Body>
                                                          </Accordion.Collapse>
                                                        </Card>
                                                      ) : (
                                                        ""
                                                      )}
                                                      {technical_feat.length >
                                                      0 ? (
                                                        <Card className="mt-2">
                                                          <Card.Header>
                                                            <Accordion.Toggle
                                                              as={Button}
                                                              variant="link"
                                                              eventKey="4"
                                                            >
                                                              <div className="theme-vehicle-details-open strong underline w3-row w3-btn w3-block w3-padding-0 w3-round-small">
                                                                <a>
                                                                  technical (
                                                                  {
                                                                    technical_feat.length
                                                                  }
                                                                  )
                                                                </a>
                                                              </div>
                                                            </Accordion.Toggle>
                                                          </Card.Header>
                                                          <Accordion.Collapse eventKey="4">
                                                            <Card.Body>
                                                              {technical_feat.map(
                                                                (
                                                                  int_feature
                                                                ) => (
                                                                  <div className="m6">
                                                                    <div className="w3-row">
                                                                      <i
                                                                        className="fa fa-check-square-o"
                                                                        aria-hidden="true"
                                                                      ></i>{" "}
                                                                      {
                                                                        int_feature
                                                                      }
                                                                    </div>
                                                                  </div>
                                                                )
                                                              )}
                                                            </Card.Body>
                                                          </Accordion.Collapse>
                                                        </Card>
                                                      ) : (
                                                        ""
                                                      )}
                                                      {performance.length >
                                                      0 ? (
                                                        <Card className="mt-2">
                                                          <Card.Header>
                                                            <Accordion.Toggle
                                                              as={Button}
                                                              variant="link"
                                                              eventKey="5"
                                                            >
                                                              <div className="theme-vehicle-details-open strong underline w3-row w3-btn w3-block w3-padding-0 w3-round-small">
                                                                <a>
                                                                  Performance (
                                                                  {
                                                                    performance.length
                                                                  }
                                                                  )
                                                                </a>
                                                              </div>
                                                            </Accordion.Toggle>
                                                          </Card.Header>
                                                          <Accordion.Collapse eventKey="5">
                                                            <Card.Body>
                                                              {performance.map(
                                                                (
                                                                  int_feature
                                                                ) => (
                                                                  <div className="m6">
                                                                    <div className="w3-row">
                                                                      <i
                                                                        className="fa fa-check-square-o"
                                                                        aria-hidden="true"
                                                                      ></i>{" "}
                                                                      {
                                                                        int_feature
                                                                      }
                                                                    </div>
                                                                  </div>
                                                                )
                                                              )}
                                                            </Card.Body>
                                                          </Accordion.Collapse>
                                                        </Card>
                                                      ) : (
                                                        ""
                                                      )}
                                                      {/* {dimensions.length > 0 ? (
                              <Card className="mt-2">
                                <Card.Header>
                                  <Accordion.Toggle
                                    as={Button}
                                    variant="link"
                                    eventKey="4"
                                  >
                                    <div className="theme-vehicle-details-open strong underline w3-row w3-btn w3-block w3-padding-0 w3-round-small">
                                      <a>Dimensions</a>
                                    </div>
                                  </Accordion.Toggle>
                                </Card.Header>
                                <Accordion.Collapse eventKey="4">
                                  <Card.Body>
                                    {dimensions.map((dimension) => (
                                      <div className="w3-col xl4 m6">
                                        <div className="w3-row">
                                          {dimension.name} : {dimension.value}
                                        </div>
                                      </div>
                                    ))}
                                  </Card.Body>
                                </Accordion.Collapse>
                              </Card>
                            ) : (
                              ""
                            )} */}
                                                    </Accordion>
                                                  </div>
                                                </div>
                                              </div>
                                            )}
                                          </div>
                                        </Accordion.Collapse>
                                      </Card>
                                    </Accordion>

                                    <div className="theme-vehicle-details w3-row w3-block w3-hide w3-round-small w3-card-2"></div>
                                    <div
                                      className="w3-row w3-border-top w3-block w3-center"
                                      style={{
                                        display: "flex",
                                        alignItems: "center",
                                      }}
                                    >
                                      <div className="w3-col s6 w3-border-right">
                                        <div className="w3-row w3-block">
                                          <div className="w3-row w3-block">
                                            Registration Date:
                                          </div>
                                          <div className="w3-row w3-block w3-large strong w3-date">
                                            {/* {caryear ? caryear : ""} */}
                                            {post?.registration_date || ""}
                                          </div>
                                        </div>
                                      </div>
                                      <div className="w3-col s6">
                                        <div className="w3-row w3-block">
                                          Seller/Garage:
                                        </div>
                                        <div className="w3-row w3-block">
                                          By : {post?.auction_company_name}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                );
                              })
                            : "No Car"
                          : "No Car"}
                      </div>
                      {/* error above */}

                      {!carloadertest ? (
                        carsdata && carsdata.length > 0 ? (
                          <>
                            {/* <div className="" id="TotalInfo"><b><u>Total vehicles: {this.state.total_cars}</u></b></div> */}
                            <div className="theme-pagination-filter">
                              <Pagination
                                activePage={this.state.activePage}
                                itemsCountPerPage={this.state.limit}
                                totalItemsCount={this.state.total_cars}
                                pageRangeDisplayed={10}
                                prevPageText="<"
                                nextPageText=">"
                                firstPageText="<<"
                                lastPageText=">>"
                                onChange={this.handlePageChange.bind(this)}
                              />
                            </div>
                          </>
                        ) : (
                          ""
                        )
                      ) : (
                        ""
                      )}
                    </div>

                    {/* Buy Vehicle */}
                    <div className="modal fade" id="buynow" role="dialog">
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
                            <div
                              style={{ backgroundImage: `url(${carimg})` }}
                              className="image_sec col-sm-6"
                            >
                              <h2>Buy {carname}</h2>
                              {/* <img className="modal-img" src={carimg} /> */}
                            </div>

                            <div className="form_sec col-sm-6">
                              <h2>Place A Deposit</h2>
                              <Form ref={(el) => (this.form = el)}>
                                <Form.Group
                                  as={Row}
                                  controlId="formPlaintextName"
                                >
                                  <Form.Label column sm="12">
                                    Name
                                  </Form.Label>
                                  <Col sm="12">
                                    <Form.Control
                                      type="text"
                                      name="Name"
                                      placeholder="Name"
                                      value={this.state.Name}
                                      onChange={(e) => this.handleChange(e)}
                                    />
                                    {this.formValidator.message(
                                      "Name",
                                      this.state.Name,
                                      "required"
                                    )}
                                  </Col>
                                </Form.Group>
                                <Form.Group
                                  as={Row}
                                  controlId="formPlaintextName"
                                >
                                  <Form.Label column sm="12">
                                    Email
                                  </Form.Label>
                                  <Col sm="12">
                                    <Form.Control
                                      type="text"
                                      name="Email"
                                      placeholder="Email"
                                      value={this.state.Email}
                                      onChange={(e) => this.handleChange(e)}
                                    />
                                    {this.formValidator.message(
                                      "Email",
                                      this.state.Email,
                                      "required|email"
                                    )}
                                  </Col>
                                </Form.Group>
                                <Form.Group
                                  as={Row}
                                  controlId="formPlaintextName"
                                >
                                  <Form.Label column sm="12">
                                    Phone
                                  </Form.Label>
                                  <Col sm="12">
                                    <PhoneInput
                                      placeholder="Enter phone number"
                                      defaultCountry="IE"
                                      value={this.state.Phone}
                                      className="form-input"
                                      onChange={(e) => this.setphone(e)}
                                    />
                                    {this.formValidator.message(
                                      "Phone",
                                      this.state.Phone,
                                      "required|phone"
                                    )}
                                  </Col>
                                </Form.Group>
                                <Form.Group
                                  as={Row}
                                  controlId="formPlaintextName"
                                >
                                  <Form.Label column sm="12">
                                    12 months Warranty
                                  </Form.Label>
                                  <Col sm="12">
                                    <Form.Control
                                      size="sm"
                                      as="select"
                                      color="yellow"
                                      name="twelvemonthwarrenty"
                                      onChange={(e) => this.handleChange(e)}
                                    >
                                      <option
                                        value=""
                                        style={{ color: "yellow" }}
                                      >
                                        WARRANTY
                                      </option>
                                      <option value="premiummax395">
                                        Premium Max (+€395)
                                      </option>
                                      <option value="premiumplus395">
                                        Premium Plus (+€395)
                                      </option>
                                      <option value="premiumcomp395">
                                        Premium Component (+€395)
                                      </option>
                                      <option value="premiumpowertrain295">
                                        Premium Power Train (+€295)
                                      </option>
                                    </Form.Control>
                                    {/* { this.formValidator.message('12 months Warranty', this.state.twelvemonthwarrenty ,'required') }								                             */}
                                  </Col>
                                </Form.Group>
                                <Form.Group
                                  as={Row}
                                  controlId="formPlaintextName"
                                >
                                  <Col sm="12">
                                    <Form.Control
                                      className="check-box-style"
                                      type="checkbox"
                                      name="tnc"
                                      placeholder="Terms and Conditions"
                                      value={this.state.tnc}
                                      onChange={(e) => this.handleCheckbox(e)}
                                    />{" "}
                                    I accept Terms and Conditions and Privacy
                                    Policy
                                    {this.formValidator.message(
                                      "Terms and Conditions",
                                      this.state.tnc,
                                      "required"
                                    )}
                                  </Col>
                                </Form.Group>
                                {Object.values(unpaymentcars).indexOf(
                                  this.state.car_id
                                ) > -1 ? (
                                  <>
                                    {/* <button type="button" className="btn btn get-deposit" onClick={e=>this.paycar()}>Include VRT in the Total due for €2</button> */}
                                    {/* <Button variant="primary" className="btn btn deposit" type="button" onClick={ e => this.submitform(e) } disabled={ this.state.isSubmit } >{this.state.isSubmit ? 'Please wait..' : 'Final Price: € '+formatNumber((car_c_p+warranty+vrt_price+this.state.inspection+delivery_price+transfer_price), { fractionDigits: 0 })}</Button> */}
                                    <Button
                                      variant="primary"
                                      className="btn btn deposit"
                                      type="button"
                                      onClick={(e) => this.submitform(e)}
                                      disabled={this.state.isSubmit}
                                    >
                                      {
                                        this.state.isSubmit
                                          ? "Please wait.."
                                          : "Final Price : € " +
                                            formatNumber(
                                              car_c_p +
                                                this.state.inspection +
                                                this.state.warranty +
                                                this.state.delivery_price,
                                              { fractionDigits: 0 }
                                            )

                                        // formatNumber(
                                        //   post?.car_info
                                        //     ?.before_vrt_final_price +
                                        //     this.state.transfer_price +
                                        //     post?.vrt_rate,
                                        //   {
                                        //     fractionDigits: 0,
                                        //   }
                                        // )
                                      }
                                    </Button>
                                  </>
                                ) : (
                                  <>
                                    {/* <Button variant="primary" className="btn btn deposit" type="button" onClick={ e => this.submitform(e) } disabled={ this.state.isSubmit } >{this.state.isSubmit ? 'Please wait..' : 'Final Price: € '+formatNumber((deposit_price+warranty+vrt_price+this.state.inspection+delivery_price+transfer_price), { fractionDigits: 0 })}</Button> */}
                                    <Button
                                      variant="primary"
                                      className="btn btn deposit"
                                      type="button"
                                      onClick={(e) => this.submitform(e)}
                                      disabled={this.state.isSubmit}
                                    >
                                      {
                                        this.state.isSubmit
                                          ? "Please wait.."
                                          : "Final Price : € " +
                                            formatNumber(
                                              deposit_price +
                                                warranty +
                                                this.state.inspection +
                                                // this.state.transfer_price +
                                                delivery_price,
                                              { fractionDigits: 0 }
                                            )
                                        // formatNumber(
                                        //   this.state
                                        //     .before_vrt_final_price_state +
                                        //     this.state.vrt_rate_state +
                                        //     this.state.transfer_price,
                                        //   {
                                        //     fractionDigits: 0,
                                        //   }
                                        // )
                                      }
                                    </Button>
                                  </>
                                )}
                              </Form>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="modal fade" id="signin" role="dialog">
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
                              <h2>Place A Deposit</h2>
                              <p>
                                This contact form is available only for logged
                                in users.
                              </p>
                              <NavLink to="#" onClick={(e) => this.signIn(e)}>
                                Login
                              </NavLink>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Video show */}
                    {/* <div className="modal fade" id="videShow" role="dialog">
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
                              <h2>HOW IT WORKS</h2>
                              <iframe
                                width="100%"
                                height="500"
                                // src="https://www.youtube.com/embed/PRu73zB9Zjs"
                                src="https://www.youtube.com/embed/NaeUgnr3R_o"
                                title="YouTube video player"
                                frameborder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowfullscreen
                              ></iframe>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div> */}
                    <div
                      className="modal fade"
                      id={`pay`}
                      role="dialog"
                      data-backdrop="static"
                      data-keyboard="false"
                    >
                      <div className="login team view-order modal-dialog modal-lg">
                        <div className="vehicle_buy modal-content">
                          <button
                            type="button"
                            className="close"
                            id="close"
                            onClick={(e) => this.closeModal(this.state.car_id)}
                          >
                            ×
                          </button>
                          <div className="row modal-body">
                            <div className="col-sm-12">
                              <h2>Look up VRT</h2>
                            </div>
                            {this.state.pay_loader ? (
                              <div className="col-sm-12">
                                <div className="pay-loader">
                                  <img
                                    className="loader_img"
                                    src="/assets/images/straight-loader.gif"
                                  />
                                </div>
                              </div>
                            ) : (
                              <>
                                <div className="col-sm-12">
                                  <div className="row">
                                    <div className="col-sm-7">
                                      <div className="mobile-summary">
                                        <h2 className="left-title">Summary</h2>
                                        <div className="check-desc">
                                          <table>
                                            <tr>
                                              <th>Product</th>
                                              <th>Subtotal</th>
                                            </tr>
                                            <tr>
                                              <td>{carname}</td>
                                              <td>€2.00</td>
                                            </tr>
                                            <tr>
                                              <td>Subtotal</td>
                                              <td>€2.00</td>
                                            </tr>
                                            <tr className="total-sec">
                                              <td>
                                                <strong>Total</strong>
                                              </td>
                                              <td>
                                                <strong>€2.00</strong>
                                              </td>
                                            </tr>
                                          </table>
                                        </div>
                                      </div>
                                      <h2 className="left-title">
                                        Billing Details
                                      </h2>
                                      <Form ref={(el) => (this.form = el)}>
                                        <Form.Group
                                          as={Row}
                                          controlId="formPlaintextName"
                                        >
                                          <Col sm="6">
                                            <Form.Label column sm="12">
                                              Name{" "}
                                              <span className="red-mark">
                                                *
                                              </span>
                                            </Form.Label>
                                            <Form.Control
                                              type="text"
                                              name="pay_name"
                                              placeholder="Name"
                                              value={this.state.pay_name}
                                              onChange={(e) =>
                                                this.handleChange(e)
                                              }
                                            />
                                            {this.payformValidator.message(
                                              "Name",
                                              this.state.pay_name,
                                              "required"
                                            )}
                                          </Col>
                                          <Col sm="6">
                                            <Form.Label column sm="12">
                                              Email{" "}
                                              <span className="red-mark">
                                                *
                                              </span>
                                            </Form.Label>
                                            <Form.Control
                                              type="email"
                                              name="pay_email"
                                              placeholder="Email"
                                              value={this.state.pay_email}
                                              onChange={(e) =>
                                                this.handleChange(e)
                                              }
                                            />
                                            {this.payformValidator.message(
                                              "Email",
                                              this.state.pay_email,
                                              "required|email"
                                            )}
                                          </Col>
                                          <Col sm="12">
                                            <Form.Label column sm="12">
                                              Address{" "}
                                              <span className="red-mark">
                                                *
                                              </span>
                                            </Form.Label>
                                            <Form.Control
                                              type="text"
                                              name="pay_address"
                                              placeholder="Address"
                                              value={this.state.pay_address}
                                              onChange={(e) =>
                                                this.handleChange(e)
                                              }
                                            />
                                            {this.payformValidator.message(
                                              "Address",
                                              this.state.pay_address,
                                              "required"
                                            )}
                                          </Col>
                                          <Col sm="6">
                                            <Form.Label column sm="6">
                                              City{" "}
                                              <span className="red-mark">
                                                *
                                              </span>
                                            </Form.Label>
                                            <Form.Control
                                              type="text"
                                              name="pay_city"
                                              placeholder="City"
                                              value={this.state.pay_city}
                                              onChange={(e) =>
                                                this.handleChange(e)
                                              }
                                            />
                                            {this.payformValidator.message(
                                              "City",
                                              this.state.pay_city,
                                              "required"
                                            )}
                                          </Col>
                                          <Col sm="6">
                                            <Form.Label column sm="12">
                                              Country{" "}
                                              <span className="red-mark">
                                                *
                                              </span>
                                            </Form.Label>
                                            <Form.Control
                                              type="text"
                                              name="pay_country"
                                              placeholder="Country"
                                              value={this.state.pay_country}
                                              onChange={(e) =>
                                                this.handleChange(e)
                                              }
                                            />
                                            {this.payformValidator.message(
                                              "Country",
                                              this.state.pay_country,
                                              "required"
                                            )}
                                          </Col>
                                        </Form.Group>
                                      </Form>
                                    </div>
                                    <div className="col-sm-5">
                                      <h2 className="left-title">
                                        Car Details
                                      </h2>
                                      <div className="image_sec">
                                        {/* <h2>Buy {cardata.car_name}</h2> */}
                                        <img src={`${carimg}`} />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-sm-12">
                                  <div className="row">
                                    <div className="col-sm-7">
                                      <div className="car-charges section">
                                        <h2 className="left-title">
                                          Payment Details
                                        </h2>
                                        <div onChange={(e) => this.setpay(e)}>
                                          <div className="col-sm-12 card_section">
                                            <Elements stripe={stripePromise}>
                                              <CheckoutForm
                                                info={this.state}
                                                onSuccessfulCheckout={(token) =>
                                                  this.paymentInitiate(token)
                                                }
                                                validateform={(e) =>
                                                  this.payformvalidate(e)
                                                }
                                              />
                                            </Elements>
                                          </div>
                                        </div>

                                        <div className="footer-payment">
                                          <img src="/assets/images/srtipe_payments.png" />
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-sm-5">
                                      <h2 className="left-title">Summary</h2>
                                      <div className="check-desc">
                                        <table>
                                          <tr>
                                            <th>Product</th>
                                            <th>Subtotal</th>
                                          </tr>
                                          <tr>
                                            <td>{carname}</td>
                                            <td>€2.00</td>
                                          </tr>
                                          <tr className="total-sec">
                                            <td>Subtotal</td>
                                            <td>€2.00</td>
                                          </tr>
                                          <tr>
                                            <td>
                                              <strong>Total</strong>
                                            </td>
                                            <td>
                                              <strong>€2.00</strong>
                                            </td>
                                          </tr>
                                        </table>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  getVrtFilterByRole = (defaultValue = "Yes") => {
    return !this.state.userrole || this.state.userrole !== "$aHF667#79+57h%45"
      ? "Yes"
      : defaultValue;
  };
}

// export default withRouter(VehicleList);
const mapStateToProps = (state) => ({
  carsdata: state.car.carsdatanew,
  filteredcardata: state.car.filteredcardatanew,
  carsloading: state.car.carsloadingnew,
  filteredcarloading: state.car.filteredcarloadingnew,
  filterloading: state.car.filterloadingnew,
  filterdata: state.car.filterdatanew,
  filtermodelloading: state.car.filtermodelloading,
  filtermodeldata: state.car.filtermodeldata,
  filterbodystyleloading: state.car.filterbodystyleloading,
  filterbodystyledata: state.car.filterbodystyledata,

  yeardata: state.filter.yearsdata,
  makedata: state.filter.makesdata,
  modeldata: state.filter.modelsdata,
  fueldata: state.filter.fueldata,
  bodystyledata: state.filter.bodystyledata,
  conditiondata: state.filter.conditiondata,
  mileagedata: state.filter.mileagedata,
  transmissiondata: state.filter.transmissiondata,
  enginedata: state.filter.enginedata,
  colordata: state.filter.colordata,

  yearloading: state.filter.yearsloading,
  makeloading: state.filter.makesloading,
  modelloading: state.filter.modelsloading,
  fuelloading: state.filter.fuelloading,
  bodystyleloading: state.filter.bodystyleloading,
  conditionloading: state.filter.conditionloading,
  mileageloading: state.filter.mileageloading,
  transmissionloading: state.filter.transmissionloading,
  engineloading: state.filter.engineloading,
  colorloading: state.filter.colorloading,
  settings: state.common.settings,
  settingsloading: state.common.settingsloading,
  gradeloading: state.filter.gradeloading,
  gradeData: state.filter.gradeData,
  vrtLoading: state.filter.vrtLoading,
  vrtData: state.filter.vrtData,
});
export default connect(mapStateToProps)(UsedCars);
