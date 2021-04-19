import React from 'react';
import ChangePassword from '../components/RestorePassword';
import {representationService} from '../app-context/context';
import {setToMainDisplayMode} from '../reducers/actions/OnMainPageAction';
import {connect} from 'react-redux';
import {setSpinnerVisibility} from '../reducers/actions/spinnerAction';
import {cipherService} from '../app-context/context';

let CryptoJS = require("crypto-js");
class RestorePasswordContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      email: "",
      borderColorRestorePass: "darkgrey",
      message: ""
    };
  }

  componentDidMount() {
    this.props.dispatch(setToMainDisplayMode("block"));
  }

  onChangeEmail = (event) => {
    this.setState({email: event.target.value});
    this.setState({borderColorRestorePass: "darkgrey"});
  }

  onClickRestorePass = async () => {
    if(this.state.email === "") {
      this.setState({borderColorRestorePass: "red"});
    } else {
      this.props.dispatch(setSpinnerVisibility("inline-block"));
      await representationService.restorePassword(this.state.email).then(response => {
        response.text().then(message => {
          this.setState({email: ""})
          this.setState({message: message});
        });
      });
      this.props.dispatch(setSpinnerVisibility("none"));
    }
  }

  onClickRodger = () => {
    this.props.history.push("/main")
  }

/*  cipherThis = (text) => {
    let iv = CryptoJS.lib.WordArray.random(128/8).toString(CryptoJS.enc.Hex);
    let salt = CryptoJS.lib.WordArray.random(128/8).toString(CryptoJS.enc.Hex);
    if(text) {
      let ciphertext = cipherService.encrypt(salt, iv, text);

      let aesString = (iv + "::" + salt + "::" + ciphertext);
      return btoa(aesString);
    } else {
      return text;
    }
  }*/

  render() {
    return(
      <ChangePassword
        email={this.state.email}
        onChangeEmail={this.onChangeEmail}
        onClickRestorePass={this.onClickRestorePass}
        borderColorRestorePass={this.state.borderColorRestorePass}
        message={this.state.message}
        />
      );
    }
  }

const mapStateToProps = (state) => {
  return Object.assign({}, state, {
    spinnerVisibility: state.spinnerVisibility.spinnerVisibility
  });
}

export default connect(mapStateToProps)(RestorePasswordContainer);
