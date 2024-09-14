import React, { Component } from "react";
import { withRouter } from "react-router";
import {
  getcarslistingnew,
  getFilteredCarsnew,
  getfiltersnew,
} from "../../store/actions/carActions";
import {
  getfilterdyear,
  getfilterdmake,
  getfilterdmodel,
  getfilterdfuel,
  getfilterdcondition,
  getfilterdbodystyles,
  getfilterdMileage,
  getfilterdtransmission,
  getfilterdengine,
  getfilterdcolor,
} from "../../store/actions/filterActions";
import SimpleReactValidator from "simple-react-validator";
import { Button, Form, Col, Row } from "react-bootstrap";
import { apiBaseUrl } from "../../store/helpers/common";
import toastr from "reactjs-toastr";
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

import swal from "sweetalert";

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

const stripePromise = loadStripe("pk_live_hvQGGPsKi13bSSCm2zoKHfMi00RCjfXZZS");
// const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_TEST_KEY);

const CheckoutForm = ({ info, onSuccessfulCheckout, validateform }) => {
  // console.log(info)
  const stripe = useStripe();
  const elements = useElements();
  const handleSubmit = async (event) => {
    event.preventDefault();
    var validate = validateform();
    // console.log(validate)
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
        toastr.error(result.error.message, { displayDuration: 1500 });
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

class UsedCarsInProcess extends Component {
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
      transfer_price: 450,
      inspection: 295,
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
      bodystylefilter: "",
      conditionfilter: "",
      Mileagefilter: "",
      transmissionfilter: "",
      enginefilter: "",
      colorfilter: "",
      yearlist: [
        { name: "2015", value: "2015" },
        { name: "2016", value: "2016" },
        { name: "2017", value: "2017" },
        { name: "2018", value: "2018" },
        { name: "2019", value: "2019" },
        { name: "2020", value: "2020" },
        { name: "2021", value: "2021" },
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
    };
  }
  componentDidMount() {
    if (localStorage.getItem("token")) {
      const currdetails = parseJwt(localStorage.getItem("token"));
      const role = currdetails.urxrs;
      if (currdetails.urxrs) {
        this.setState({ isLoggedIn: true, userrole: currdetails.urxrs });
      }
    }
    var preffermake = this.props.match.params.brand;
    var preffermodel = this.props.match.params.model;
    // alert(preffermodel)
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
      // console.log(parsed)
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
          color
        )
      );
      // executing filters
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
          color
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
          color
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
          color
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
          color
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
          color
        )
      );
      this.props.dispatch(
        getfilterdcondition(
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
          color
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
          color
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
      } = this.state;
      Make = preffermake;
      if (preffermodel) {
        Model = preffermodel;
      } else {
        Model = "";
      }
      this.setState({ filter: true, Make: Make, Model: Model });
      var pagenum = 0;
      // const {limit,minPrice,maxPrice,price_sort,mileage_sort,body_style,Fuel,transmission_type,Year,minYear,maxYear,Condition,Mileage,minMileage,maxMileage,engine,color} = this.state;
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
          color
        )
      );
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
          color
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
          color
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
          color
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
          color
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
          color
        )
      );
      this.props.dispatch(
        getfilterdcondition(
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
          color
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
          color
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
        getcarslistingnew(0, limit, price_sort, mileage_sort)
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
          color
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
          color
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
          color
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
          color
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
          color
        )
      );
      this.props.dispatch(
        getfilterdcondition(
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
          color
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
          color
        )
      );
    }
    this.props.dispatch(getsettings());
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
      bodystylefilter: nextProps.bodystyledata,
      conditionfilter: nextProps.conditiondata,
      Mileagefilter: nextProps.mileagedata,
      transmissionfilter: nextProps.transmissiondata,
      enginefilter: nextProps.enginedata,
      colorfilter: nextProps.colordata,
      settings: nextProps.settings,
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
          color
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
          color
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
          color
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
          color
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
          color
        )
      );
    } else if (name === "Condition") {
      this.props.dispatch(
        getfilterdcondition(
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
          color
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
          color
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
              // console.log('data :'+JSON.stringify(data.ResponseCode));
              if (data.ResponseCode == 1) {
                toastr.success(data.ResponseText, { displayDuration: 1500 });
                window.location.reload();
              }
            })
            .catch((err) => {
              console.log("err :" + err);
            });
        } else {
          toastr.error("Error.. Please try again.", { displayDuration: 1500 });
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
    if (name === "Make") {
      Make = value;
    } else if (name === "Fuel") {
      Fuel = value;
    } else if (name === "transmission_type") {
      transmission_type = value;
    } else if (name === "body_style") {
      body_style = value;
    } else if (name === "engine") {
      engine = value;
    } else if (name === "Condition") {
      Condition = value;
    } else if (name === "Model") {
      Model = value;
    } else if (name === "minYear") {
      minYear = value;
    } else if (name === "maxYear") {
      maxYear = value;
    } else if (name === "minPrice") {
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
    if (transmission_type) {
      parsed.transmission_type = transmission_type;
    }
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
    this.props.history.push("/used-cars/?" + stringified);
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
          color
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
          color
        )
      );
    }
    if (name !== "transmission_type" && !transmission_type) {
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
          color
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
          color
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
          color
        )
      );
    }
    if (name !== "Condition" && !Condition) {
      this.props.dispatch(
        getfilterdcondition(
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
          color
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
          color
        )
      );
    }
    // executing filters on condition basis
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
        color
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
    } = this.state;
    if (name === "Make") {
      Make = "";
      Model = "";
      body_style = "";
      this.setState({
        Model: "",
        body_style: "",
      });
    } else if (name === "Fuel") {
      Fuel = "";
    } else if (name === "transmission_type") {
      transmission_type = "";
    } else if (name === "body_style") {
      body_style = "";
    } else if (name === "engine") {
      engine = "";
    } else if (name === "Condition") {
      Condition = "";
    } else if (name === "Model") {
      Model = "";
      body_style = "";
      this.setState({
        body_style: "",
      });
    } else if (name === "minYear") {
      minYear = "";
    } else if (name === "maxYear") {
      maxYear = "";
    } else if (name === "minPrice") {
      minPrice = "";
    } else if (name === "maxPrice") {
      maxPrice = "";
    } else if (name === "minMileage") {
      minMileage = "";
    } else if (name === "maxMileage") {
      maxMileage = "";
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
      Condition ||
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
      if (Condition) {
        parsed.Condition = Condition;
      }
      if (Model) {
        parsed.Model = Model;
      }
      if (transmission_type) {
        parsed.transmission_type = transmission_type;
      }
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
          color
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
          color
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
          color
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
          color
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
          color
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
          color
        )
      );
      this.props.dispatch(
        getfilterdcondition(
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
          color
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
          color
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
          color
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
          color
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
          color
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
          color
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
          color
        )
      );
      this.props.dispatch(
        getfilterdcondition(
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
          color
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
          color
        )
      );

      this.props.dispatch(
        getcarslistingnew(0, limit, price_sort, mileage_sort)
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
      var transmission_type = ev.target.value;
    } else {
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
        color
      )
    );
  };
  resetFilters = () => {
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
    this.setState({ filter: false });
    this.props.dispatch(
      getcarslistingnew(
        0,
        this.state.limit,
        this.state.price_sort,
        this.state.mileage_sort
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
        color
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
        color
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
        color
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
        color
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
        color
      )
    );
    this.props.dispatch(
      getfilterdcondition(
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
        color
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
        color
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
          color
        )
      );
    } else {
      this.props.dispatch(
        getcarslistingnew(
          pageNumber - 1,
          this.state.limit,
          this.state.price_sort,
          this.state.mileage_sort
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
          color
        )
      );
    } else {
      this.props.dispatch(
        getcarslistingnew(
          pagenum,
          limit,
          this.state.price_sort,
          this.state.mileage_sort
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
      transfer_price: e.car_info.uktransfer_cost,
    });
    console.log(e);
    const { isLoggedIn } = this.state;
    window.$("#buynow").modal("show");
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
          if (data.ResponseCode == 1) {
            toastr.success(
              "Form Submitted Successfully, We will get back to you soon.",
              { displayDuration: 3000 }
            );
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
          }
        })
        .catch((err) => {
          this.setState({ isSubmit: false });
          console.log("err :" + err);
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
          color
        )
      );
    } else {
      this.props.dispatch(
        getcarslistingnew(pagenum, this.state.limit, price_sort, mileage_sort)
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
              this.state.color
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
            toastr.success(data.ResponseText, { displayDuration: 1500 });
            // toastr.success('Redirecting to Dashboard', { displayDuration: 1500 });
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
            toastr.error(data.ResponseText, { displayDuration: 1500 });
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
        if (car_detailing[i].car_id == carid) {
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
      body_style,
      Condition,
      Mileage,
      transmission_type,
      engine,
      color,
    } = this.state;
    const {
      yearfilter,
      makefilter,
      modelfilter,
      fuelfilter,
      bodystylefilter,
      conditionfilter,
      Mileagefilter,
      transmissionfilter,
      enginefilter,
      colorfilter,
    } = this.state;
    let i = 5000;
    let numbers = [];
    while (i <= 500000) {
      numbers.push(i);
      i = i + 5000;
    }
    // console.log(car_detailing)
    return (
      <>
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
        <section className="banner car-list">
          <div className="container-fluid">
            <div className="row">
              <span
                className="filterbtn"
                onClick={(e) => this.openFilter(true)}
              >
                <i class="fa fa-filter" aria-hidden="true"></i>
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
                          {/* Premiuim car filters */}
                          <div className="car_color premiumcar form-group">
                            <div className="row">
                              <div className="col-md-12">
                                <label className="switch">
                                  <input
                                    type="checkbox"
                                    name="premium_car"
                                    value={this.state.premium_car}
                                    onChange={(e) =>
                                      this.selectpremium(
                                        `premium_car_val`,
                                        !this.state.premium_car_val
                                      )
                                    }
                                  />
                                  <span className="sliderpremium round"></span>
                                </label>
                                <p>
                                  <i className="fa fa-star"></i>&nbsp;Premium
                                  Cars
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="car_color premiumcar form-group">
                            <div className="row">
                              <div className="col-md-12">
                                <label className="switch">
                                  <input
                                    type="checkbox"
                                    name="is_manheim_car"
                                    value={this.state.is_manheim_car}
                                    onChange={(e) =>
                                      this.selectAuction(
                                        `is_manheim_car_val`,
                                        !this.state.is_manheim_car_val
                                      )
                                    }
                                  />
                                  <span className="sliderpremium round"></span>
                                </label>
                                <p>
                                  <i className="fa fa-gavel"></i>&nbsp;Auction
                                  Vehicle
                                </p>
                              </div>
                            </div>
                          </div>
                          {/* Make Filter */}
                          <div className="form-group">
                            <div className="dropdown">
                              {/* <button className="btn btn-secondary dropdown-toggle" onClick={e => this.filterSelect('Make')} type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> */}
                              <button
                                className="btn btn-secondary dropdown-toggle"
                                type="button"
                                id="dropdownMenuButton"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                              >
                                {Make ? (
                                  <span className="selected">{Make}</span>
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
                                      {item.make} ({item.total})
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
                                  <span className="selected">{Model}</span>
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
                                      {item.car_model} ({item.total})
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
                          {/* Condition Filter */}
                          <div className="form-group">
                            <div className="dropdown">
                              {/* <button className="btn btn-secondary dropdown-toggle" onClick={e => this.filterSelect('Condition')} type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> */}
                              <button
                                className="btn btn-secondary dropdown-toggle"
                                type="button"
                                id="dropdownMenuButton"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                              >
                                {Condition ? (
                                  <span className="selected">{Condition}</span>
                                ) : (
                                  "Condition"
                                )}
                              </button>
                              {Condition ? (
                                <a
                                  className="inbtn"
                                  onClick={(e) => this.clearOption("Condition")}
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
                                {this.props.conditionloading ? (
                                  <a className="dropdown-item">
                                    <i className="fa-li fa fa-spinner fa-spin"></i>
                                  </a>
                                ) : conditionfilter.car_condition ? (
                                  conditionfilter.car_condition.map((item) => (
                                    <a
                                      className="dropdown-item"
                                      onClick={(e) =>
                                        this.selectOption(
                                          `Condition`,
                                          item.condition
                                        )
                                      }
                                    >
                                      {item.condition} ({item.total})
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
                          {/* Transmission Filter */}
                          <div className="form-group">
                            <div className="dropdown">
                              {/* <button className="btn btn-secondary dropdown-toggle" onClick={e => this.filterSelect('transmission_type')} type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> */}
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
                          {/* Engine Type */}
                          <div className="form-group">
                            <div className="dropdown">
                              {/* <button className="btn btn-secondary dropdown-toggle" onClick={e => this.filterSelect('engine')} type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> */}
                              <button
                                className="btn btn-secondary dropdown-toggle"
                                type="button"
                                id="dropdownMenuButton"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                              >
                                {engine ? (
                                  <span className="selected">{engine}</span>
                                ) : (
                                  "Engine"
                                )}
                              </button>
                              {engine ? (
                                <a
                                  className="inbtn"
                                  onClick={(e) => this.clearOption("engine")}
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
                                {this.props.engineloading ? (
                                  <a className="dropdown-item">
                                    <i className="fa-li fa fa-spinner fa-spin"></i>
                                  </a>
                                ) : enginefilter.engine ? (
                                  enginefilter.engine.map((item) => (
                                    <a
                                      className="dropdown-item"
                                      onClick={(e) =>
                                        this.selectOption(
                                          `engine`,
                                          item.car_engine
                                        )
                                      }
                                    >
                                      {item.car_engine} ({item.total})
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
                          {/* Fuel Type */}
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
                                      </span>
                                    ) : (
                                      "Min Mileage"
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
                                              {item}
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
                                            {item}
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
                                      </span>
                                    ) : (
                                      "Max Mileage"
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
                                              {item}
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
                                            {item}
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
                                    {minPrice ? (
                                      <span className="selected">
                                        € {minPrice}
                                      </span>
                                    ) : (
                                      "Min Price"
                                    )}
                                  </button>
                                  {minPrice ? (
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
                                    {maxPrice ? (
                                      <span className="selected">
                                        € {maxPrice}
                                      </span>
                                    ) : (
                                      "Max Price"
                                    )}
                                  </button>
                                  {maxPrice ? (
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
                        <div className="w3-container w3-col">
                          <div className="card">
                            <div className="card-body">
                              <p>
                                The list is being updated. Thank you for your
                                patience...
                              </p>
                            </div>
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
      </>
    );
  }
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
});
export default connect(mapStateToProps)(UsedCarsInProcess);
