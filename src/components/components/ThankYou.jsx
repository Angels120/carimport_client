import React, { Component } from "react";
import { connect } from "react-redux";

class Thankyou extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {}
  componentWillReceiveProps(nextProps) {}
  componentWillUnmount() {}
  render() {
    // console.log('lng: '+longitude+', lat: '+latitude)
    return (
      <>
        <section id="thanks" className="" data-stellar-background-ratio="0.5">
          <div className="container">
            <div className="col-lg-12">
              <h1>Thank you!</h1>
              <img src="/assets/images/thanks.jpg" />
              {/* <p>USA Health MD matches highly qualified, board-certified physicians in your local area who provide cutting edge treatment programs designed to give you the best results. All information shared is private and discreet and used only to share with the corresponding physician. We value your privacy and no information provided is shared with any other entity.</p> */}
              <h3>Thank you very much. We shall be in touch shortly</h3>
            </div>
          </div>
        </section>
      </>
    );
  }
}
const mapStateToProps = (state) => ({});

export default connect(mapStateToProps)(Thankyou);
// export default withRouter(Main);
