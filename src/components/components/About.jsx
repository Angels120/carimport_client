import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import { getpage } from "../../store/actions/commonActions";
import ReactHtmlParser from "react-html-parser";

class About extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: "",
    };
  }
  componentDidMount() {
    var slug = "aboutus";
    this.props.dispatch(getpage(slug));
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      page: nextProps.page,
    });
  }

  render() {
    const { page } = this.state;

    return (
      <>
        <Helmet>
          <title>About Us &#8211; UK Car Imports</title>
          <meta name="title" content="About Us - UK Car Imports" />
          <meta
            name="description"
            content="Check the information about our company and Reviews from our happy clients - UK Car Imports"
          />
        </Helmet>
        {this.props.pageloading ? (
          <div className="alltourticksloader">
            <img
              className="loader_img"
              src="/assets/images/straight-loader.gif"
            />
          </div>
        ) : page.content ? (
          <span>{ReactHtmlParser(page.content)}</span>
        ) : (
          <>
            <section className="info">
              <div className="container">
                <div className="row">
                  <div className="richard_info mt-2">
                    <div className="col-md-2 half_richard_info_left">
                      <img src="/assets/images/richard.jpg" />
                      <h3>Richard Smith</h3>
                      <h4>Owner and Managing Director</h4>
                    </div>
                    <div className="col-md-10">
                      <div className="half_richard_info_right">
                        <p>
                          I have a BSc in Molecular Genetics and Pharmacology
                          from UCD and a Doctorate in Pharmacology from the
                          Royal College of Surgeons in Ireland. Before setting
                          up UK Car Imports, I spent 14 years in the area of
                          sales and marketing of pharmaceuticals on the Irish
                          Market. The last 4 years as Managing Director of
                          Daiichi Sankyo Ireland, a Japanese company in the top
                          20 of Global Pharmaceutical sales. Look me up on
                          LinkedIn.
                          <br />
                          <br />
                          Our reputation is important to us, ethics and
                          integrity are basic necessities in modern business. It
                          takes years to gain a reputation and minutes to lose
                          it. In short we do what we say we will do. We believe
                          in taking responsibility, and we do things the right
                          way. Our business depends on it.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="find-car">
              <img className="img-fluid" src="/assets/images/bmwpc.jpg" />
            </section>
            <section className="info">
              <div className="container">
                <div className="row">
                  <div className="richard_info mt-2">
                    <div className="col-md-2 half_richard_info_left">
                      <img
                        className="img-fluid"
                        src="/assets/images/logogray.jpg"
                      />
                      <h3>UK CAR IMPORTS</h3>
                      <h4>
                        Quality, Value and Choice in used cars from the UK
                      </h4>
                    </div>
                    <div className="col-md-10">
                      <div className="half_richard_info_right">
                        <p>
                          Incorporated in July 2013 our company has grown over 6
                          years to become the largest import specialist in
                          Ireland. In the financial year 2017, our sales
                          exceeded €1,500,000 for the first time. For 2019 our
                          sales are just shy of €3,000,000. Our success as a
                          specialist importer is due mainly to price and
                          service. Our website platform ukcarimports.ie is state
                          of the art with a number of unique features. Our VRT
                          program is a first and UK Car Imports remains the only
                          platform with VRT available for 200K-300K UK used
                          cars, allowing potential buyers to view the full price
                          when making a decision for as little as €5.
                        </p>
                        <p>
                          Since December 2019 we have introduced Nitrogen Oxide
                          Levy calculations for all vehicles on our website.
                          This information is available along with VRT and any
                          potential VRT rebate that each vehicle may be entitled
                          to. Our developers have made this information
                          available to help you make the best decision when
                          buying a car.
                        </p>
                        <p>
                          Our unique condition and mechanical inspection reports
                          provide specialist appraisal of the vehicles on our
                          website. These reports are completed by third party
                          professionals with no influence from the owner of the
                          vehicle, protecting you and your investment.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12 half_richard_info_right">
                    <p>
                      Market trends suggest a bright future for technology
                      driven sales of used cars across the globe, some even
                      suggest it heralds the end of the dominance of forecourt
                      sales. Macro developments like BREXIT’s effect on sterling
                      has helped our business in the short term. With sterling
                      so weak it’s surprising anyone buys in Ireland given the
                      savings made by sourcing a UK used car. If sterling should
                      strengthen then we expect Irish second hand car prices to
                      rise also, thus maintaining the relative price advantage
                      of importing a UK second hand vehicle.
                    </p>
                    <p>
                      Of even more relevance is the introduction of the NOx
                      Levy/Tax from January 2020, this will be an additional tax
                      to VRT and VAT and in the short term will reduce the
                      number of older diesels being imported from the UK. In the
                      medium term it will increase the prices of older vehicles
                      on the Irish market as they will become rare and push
                      buyers mainly towards petrol and hybrid vehicles as these
                      have the range that modern electrics do not. Longer term
                      vehicle prices will be heading higher but until they solve
                      the range issues for bigger electric vehicles there will
                      be a requirement for engines that can power family
                      carriers and SUV’s and electric is a long way off that
                    </p>
                    <p>
                      Many if not most of the used vehicles on the Irish market
                      today are imported by Irish traders from the UK. They add
                      on a margin so if the cost price of UK used cars goes up
                      due to stronger sterling or emissions taxes then so will
                      prices on Irish car dealers forecourts. So used cars from
                      the UK have always been cheaper regardless of the strength
                      of sterling. Price, choice and the ease of buying online
                      will grow our market share of the used car market in
                      Ireland. By the end of 2021 we expect to service 5% of the
                      market for imported UK used cars. Our innovation provides
                      quality inspected UK used cars at the right price.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section className="why_us mt-4">
              <div className="container">
                <div className="row">
                  <div className="col-md-12">
                    <div className="facts">
                      <h2 className="text-center mb-4">
                        Some facts about UK Car Imports
                      </h2>
                      <p>
                        <img src="/assets/images/tick.png" />
                        Best prices in Ireland
                      </p>
                      <p>
                        <img src="/assets/images/tick.png" />
                        Providing unique condition and mechanical reports
                      </p>
                      <p>
                        <img src="/assets/images/tick.png" />
                        Accurate VRT &amp; NOx levy for free. Find out if the
                        car you are after qualifies for a VRT rebate.
                      </p>
                      <p>
                        <img src="/assets/images/tick.png" />
                        Working for you since 2013. Annual turnover of €3.5
                        million in 2019 that’s 100% growth in 2 years
                      </p>
                      <p>
                        <img src="/assets/images/tick.png" />
                        We provide a range of unique services such as completing
                        the VRT registration for you and providing an Irish car
                        warranty
                      </p>
                      <p>
                        <img src="/assets/images/tick.png" />
                        Our online platform is leading the industry in providing
                        more information on each car and making it easier to
                        access lower prices from the comfort of your own home.
                        No pushy sales car salesman required!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </>
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  page: state.common.page,
  pageloading: state.common.pageloading,
});

export default connect(mapStateToProps)(About);
