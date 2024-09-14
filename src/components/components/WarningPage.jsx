import React, { Component } from 'react';

class WarningPage extends Component {
  render() {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <h1>Access Restricted</h1>
        <p>Sorry you have no permission to access the website.</p>
      </div>
    );
  }
}

export default WarningPage;
