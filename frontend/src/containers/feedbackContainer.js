import React from 'react';
import Feedback from './../components/feedback';
import {connect} from 'react-redux';
import {setToMainDisplayMode} from '../reducers/actions/OnMainPageAction';
import {userService} from '../app-context/context';
import {setSpinnerVisibility} from '../reducers/actions/spinnerAction';
/*import {cipherService} from '../app-context/context';*/

/*let CryptoJS = require("crypto-js");*/
let count = 0;

class FeedbackContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      from: this.props.user.username,
      theme: "",
      body: "",
      files: [],
      fileLoaders: [],
      borderColorEmailTheme: "darkgrey",
      borderColorEmailBody: "darkgrey",
      emailFileInputColor: "red",
      message: ""
    };
  }

  componentDidMount() {
    this.props.dispatch(setToMainDisplayMode("block"));
    this.props.dispatch(setSpinnerVisibility("none"));
  }

  clearState = () => {
    this.setState({from: this.props.user.username});
    this.setState({theme: ""});
    this.setState({body: ""});
    this.setState({files: []});
    this.setState({fileLoaders: []});
    this.setState({borderColorEmailTheme: "darkgrey"});
    this.setState({borderColorEmailBody: "darkgrey"});
    this.setState({emailFileInputColor: "red"});
    this.setState({message: ""});
  }

  onChangEmailTheme = (event) => {
    this.setState({borderColorEmailTheme: "darkgrey"});
    this.setState({theme: event.target.value});
  }

  onChangeEmailBody = (event) => {
    this.setState({borderColorEmailBody: "darkgrey"});
    this.setState({body: event.target.value});
  }

  toBase64 = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });

  onChangeUpdateEmailFile = async (event) => {
    let filesArray = this.state.files;
    let base64 = await this.toBase64(event.target.files[0]);
    let file = {
      name: event.target.files[0].name,
      base64: base64
    }
    filesArray.push(file);
    await this.setState({
      files: filesArray
    })
    if(this.state.files.length !== 0) {
      this.setState({emailFileInputColor: "#09173f"});
    } else {
      this.setState({fileInputColor: "red"});
    }
  }

  onClickAddFileLoader = async () => {
    count++;
    let fileLoaders = this.state.fileLoaders;
    await fileLoaders.push(<div key={"file_loader_" + count} className="interactive_control_panel">
      <div className="interactive_control_panel_file_upload">
        <span/><span className="input_file_span" >Більше файлів: </span>
      </div>
      <div className="interactive_control_panel_file_upload">
        <span/><input id="accounts_file_input_key" className="terminal_input_file" type="file" name="file" onChange={this.onChangeUpdateEmailFile} style={{color: this.state.emailFileInputColor}}/>
      </div>
    </div>);
    this.setState({fileLoaders: fileLoaders})
  }

  onClickSendEmail = async () => {
    if(this.state.theme === "") {
      this.setState({borderColorEmailTheme: "red"});
    } else if(this.state.body === "") {
      this.setState({borderColorEmailBody: "red"});
    } else {
      this.props.dispatch(setSpinnerVisibility("inline-block"));
      let jsonFiles = this.state.files.map(file => {
        return(file);
      });
      /*let cipheredFrom = this.cipherThis(this.state.from);*/
      let feedback = {
        from: this.state.from,
        theme: this.state.theme,
        body: this.state.body,
        files: jsonFiles
      }
      await userService.sendFeedback(feedback).then(response => {
        response.text().then(message => this.setState({message: message}));
      });
      this.clearState();
      this.props.dispatch(setSpinnerVisibility("none"));
    }
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
      <Feedback
        message={this.state.message}
        theme={this.state.theme}
        body={this.state.body}
        borderColorEmailTheme={this.state.borderColorEmailTheme}
        borderColorEmailBody={this.state.borderColorEmailBody}
        onChangEmailTheme={this.onChangEmailTheme}
        onChangeEmailBody={this.onChangeEmailBody}
        onClickSendEmail={this.onClickSendEmail}
        onClickAddFileLoader={this.onClickAddFileLoader}
        fileLoaders={this.state.fileLoaders}
        onChangeUpdateEmailFile={this.onChangeUpdateEmailFile}
        emailFileInputColor={this.state.emailFileInputColor}
        />
    );
  }
}
const mapStateToProps = (state) => {
  return Object.assign({}, state, {
    user: state.user.user,
    spinnerVisibility: state.spinnerVisibility.spinnerVisibility
  });
}

export default connect(mapStateToProps)(FeedbackContainer);
