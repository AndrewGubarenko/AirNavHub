import React from 'react';
import RESTORE_PASS_BTN from './../statics/restore-pass-btn-blue.png';

class RestorePassword extends React.Component {
  render() {
    return(
      <div className="content">
        <div className="main-change-pass-container">
          <div className="auth-container auth-container-column">
            <label className="auth__label label__password" style={{borderBottomColor: this.props.borderColorRestorePass}}>
              <span className="label-text">Введіть Ваш Email</span>
              <input  className="auth__input"
                      type="text"
                      onChange={this.props.onChangeEmail}
                      value={this.props.email}
                      />
            </label>
          </div>
          <div className="auth-container last-auth-container">
              <div>
                <img  id="sing__up__btn"
                      src={RESTORE_PASS_BTN}
                      alt=""
                      className="sing__up__btn"
                      onClick={this.props.onClickRestorePass}/>
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
export default RestorePassword;
