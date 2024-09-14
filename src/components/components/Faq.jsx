import React, { Component } from "react";
import { getfaqs } from "../../store/actions/commonActions";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import ReactHtmlParser from "react-html-parser";

class Faq extends Component {
  constructor(props) {
    super(props);
    this.state = {
      role: "",
      isLoggedIn: false,
      username: "",
      user_id: "",
      singleuser: [],
      faqs: "",
    };
  }
  componentDidMount() {
    this.props.dispatch(getfaqs());
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      faqs: nextProps.faqs.decodedcontent,
    });
    // console.log('faqs :'+JSON.stringify(nextProps.faqs));
  }
  render() {
    const { faqs } = this.state;
    return (
      <>
        <Helmet>
          <title>FAQ &#8211; UK Car Imports</title>
          <meta
            name="description"
            content="We have gathered frequently asked questions for you :)  - UK Car Imports"
          />
        </Helmet>
        <div className="faq py-3">
          <div className="container p-0">
            <div className="row">
              <div className="bs-example">
                {this.props.faqsloading ? (
                  <div className="alltourticksloader">
                    <img
                      className="loader_img"
                      src="/assets/images/straight-loader.gif"
                    />
                  </div>
                ) : faqs.length > 0 ? (
                  faqs.map((faq, index) => (
                    <div className="card">
                      <div className="card-header" id="headingOne">
                        <h2 className="mb-0">
                          <button
                            type="button"
                            className="btn btn-link"
                            data-toggle="collapse"
                            data-target={`#collapse${index}`}
                          >
                            <i className="fa fa-plus"></i> {faq.question}
                          </button>
                        </h2>
                      </div>
                      <div
                        id={`collapse${index}`}
                        className={`collapse ${index === 0 ? "show" : ""}`}
                        aria-labelledby="headingOne"
                        data-parent="#accordionExample"
                      >
                        <div className="card-body">
                          <p>
                            Posted on <strong>{faq.date}</strong>
                          </p>
                          {ReactHtmlParser(faq.answer)}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  "no"
                )}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  faqs: state.common.faqs,
  faqsloading: state.common.faqsloading,
});
export default connect(mapStateToProps)(Faq);
