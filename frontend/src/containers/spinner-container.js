import React from 'react';
import Spinner from './../components/spinner';
import {connect} from 'react-redux';

class SpinnerContainer extends React.Component {

  render() {
    return(
      <Spinner
        spinnerVisibility={this.props.spinnerVisibility}
        />
    );
  }

}
const mapStateToProps = (state) => {
  return Object.assign({}, state, {
    spinnerVisibility: state.spinnerVisibility.spinnerVisibility
  });
}

export default connect(mapStateToProps)(SpinnerContainer);
