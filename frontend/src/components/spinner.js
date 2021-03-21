import React from 'react';
import './../styles/spinnerStyle.css'

class Spinner extends React.Component {
  render() {
    return(
      <div className="spinner" style={{display: this.props.spinnerVisibility}}>
        <div/><div/>
      </div>
    );
  };
}
export default Spinner;
