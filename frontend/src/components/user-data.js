import React from 'react';
import {Link} from 'react-router-dom';
import USER_ICON_MALE from './../statics/user-icon-male.png';
import USER_ICON_FEMALE from './../statics/user-icon-female.png';
import CHANGE_PASSWORD_BTN from './../statics/change-pass-btn-blue.png';
import FEEDBACK_BTN from './../statics/feedback.png';
import QUESTIONNAIRE_BTN from './../statics/questionnaire.png';

class UserData extends React.Component {

  getGender = () => {
    if(this.props.gender === "FEMALE") {
      return USER_ICON_FEMALE;
    } else {
      return USER_ICON_MALE;
    }
  }

  render() {
    return(
      <div className="standard-container">

        <p className="container-name">Особисті дані</p>
        <div className="border-plane-container">
          <div className="standard-container-line">
            <svg className="svg-plane-icon">
              <use xlinkHref="#svg-plane"/>
            </svg>
          </div>
        </div>

        <div className="user-container">
          <div id="user-icon-container">
            <img id="user-icon-image" src={this.getGender()} alt=""/>
          </div>

          <div className="user-data-container">
            <p id="user__name">{this.props.firstName} {this.props.lastName}</p>
          </div>
          <div className="user-data-container">
            <p id="user__count">на Вашому рахунку:
              <br/>
              {this.props.count} грн.
            </p>
          </div>
        </div>

        <div className="user-container">
          <Link className="password__change__button" to="/change_password">
            <img className="password__change__button__img" src={CHANGE_PASSWORD_BTN} alt=""/>
          </Link>
          <Link className="password__change__button" to="/feedback">
            <img className="password__change__button__img" src={FEEDBACK_BTN} alt=""/>
          </Link>
          <Link className="password__change__button" to="/questionnaire">
            <img className="password__change__button__img" src={QUESTIONNAIRE_BTN} alt=""/>
          </Link>
        </div>

      </div>
    );
  }
}
export default UserData;
