import React, { Component } from "react";
import Header from "./Header";
import Footer from "./Footer";
class EmptyLayout extends Component {
  render() {
    // console.log(this.props.location.pathname)
    // if(this.props.location.pathname === '/'){
    //     return (
    //         <>
    //           <Header/>
    //             {/* <div className="container"> */}
    //                 {this.props.children}
    //             {/* </div> */}
    //             <Footer/>
    //         </>
    //     );
    // }else{
    return (
      <>
        <Header />
        {this.props.children}
        <Footer />
      </>
    );
    // }
  }
}
export default EmptyLayout;
