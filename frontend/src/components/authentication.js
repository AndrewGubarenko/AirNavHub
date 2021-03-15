import React from 'react';
import SING_IN_BTN from './../statics/submit-btn-blue.png';
import SHOW_PASS from './../statics/showPass.png';
import {Link} from 'react-router-dom';

class Header extends React.Component {

  render() {
    return(
      <div id="auth__container" style={{display: this.props.isAuthVisible }}>
        <div className="standard-container">

          <p className="container-name">Особисті дані</p>
          <div className="border-plane-container">
            <div className="standard-container-line">
              <svg className="svg-plane-icon">
                <use xlinkHref="#svg-plane"/>
              </svg>
            </div>
          </div>

          <div className="main-auth-container">

            <div className="auth-container auth-container-column">
              <label className="auth__label" style={{borderBottomColor: this.props.borderColorEmail}}>
                <span className="label-text">Email</span>
                <input  className="auth__input"
                        onChange={this.props.onChangeEmail}
                        value={this.props.email}
                        autoComplete="on"/>
              </label>
              <div>
                <label id="forgot_password">
                  <span className="inscription" id="forgot_password_span">
                    <span>Забули пароль? </span>
                    <Link id="forgot_password_link" to="/restore_password">Тисніть сюди!</Link>
                  </span>
                </label>
              </div>
            </div>
            <div className="auth-container auth-container-column">
              <label className="auth__label label__password" style={{borderBottomColor: this.props.borderColorPassword}}>
                <span className="label-text">Password</span>
                <input  className="auth__input"
                        type={this.props.passType}
                        onChange={this.props.onChangePassword}
                        value={this.props.password}/>
                  <img  id="show_pass"
                        src={SHOW_PASS}
                        alt=""
                        onMouseEnter={this.props.onShowPass}
                        onMouseOut={this.props.onHidePass}
                        />
              </label>
              <div>
                <label id="checkbox">
                  <input id="checkbox__input" type="checkbox" name="remember_me" checked={this.props.rememberMe} onChange={this.props.onChangeRememberMe}/>
                  <span className="inscription" id="checkbox__span">Запам'ятати мене</span>
                </label>
              </div>
            </div>
            <div className="auth-container last-auth-container">
              <div id="close__btn" onClick={this.props.onClickClose}>&#10006;</div>
                <div>
                  <img  id="sing__up__btn"
                        src={SING_IN_BTN}
                        alt=""
                        className="sing__up__btn"
                        onClick={this.props.onClickSignUp}/>
                </div>
            </div>

          </div>
          <div className="message_screen">
            {this.props.message}
          </div>
        </div>
      </div>
    );
  }
}
export default Header;
