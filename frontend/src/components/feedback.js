import React from 'react';
import SEND_BTN from './../statics/send.png';

class Feedback extends React.Component {

  render() {
    return(
      <div className="content">
        <div className="main-change-pass-container">
          <div className="interactive_control_panel" style={{display: this.props.emailThemeControlPanelDisplay}}>
            <div className="interactive_control_panel_row">
              <span>Тема: </span><input className="terminal_input" onChange={this.props.onChangEmailTheme} value={this.props.theme} style={{borderBottomColor: this.props.borderColorEmailTheme}}/>
            </div>
            <div className="interactive_control_panel_row">
              <span>Текст: </span><textarea className="terminal_input admin_news_textarea" onChange={this.props.onChangeEmailBody} value={this.props.body} style={{borderBottomColor: this.props.borderColorEmailBody}}/>
            </div>
          </div>

          <div className="interactive_control_panel">
            <div className="interactive_control_panel_file_upload">
              <span/><span className="input_file_span" >Виберіть файли для відправки: </span>
            </div>
            <div className="interactive_control_panel_file_upload">
              <span/><input id="accounts_file_input_key" className="terminal_input_file" type="file" name="file" onChange={this.props.onChangeUpdateEmailFile} style={{color: this.props.emailFileInputColor}}/>
            </div>
            {this.props.fileLoaders.map(loader => {return(loader)})}
            <button className="admin_screen_btn" onClick={this.props.onClickAddFileLoader} style={{fontSize: "18px", marginTop: "20px"}}>Більше файлів</button>
          </div>

          <div className="auth-container last-auth-container" style={{marginRight: "30px"}}>
              <div>
                <img  id="sing__up__btn"
                      src={SEND_BTN}
                      alt=""
                      className="sing__up__btn"
                      onClick={this.props.onClickSendEmail}/>
              </div>
          </div>
        </div>
        <div className="message_screen">
          {this.props.message}
        </div>
      </div>
    );
  }
}
export default Feedback;
