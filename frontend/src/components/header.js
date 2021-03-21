import React from 'react';
import LOGO from './../statics/shit-style-fly-stamp-blue.png';

class Header extends React.Component {

  render() {
    return(
      <div className="header-container">
        <div className="logo-container">
          <img  id="logo"
                src={LOGO}
                alt=""
                onClick={this.props.onClickLogo}/>
        </div>
        <div className="menu-container">
          <ul className="menu-ul">
            <li className="menu-li" style={{display: this.props.toMainDisplayMode}}>
              <div key="toMain" onClick={this.props.onClickToMain}
              >Головна</div>
            </li>
            <li className="menu-li">
              <div key="newsDiv" onClick={this.props.onClickToNews}
              >Новини</div>
            </li>
            <li className="menu-li">
              <div key="filesDiv" style={{display: this.props.isDocsVisible}} onClick={this.props.onClickToFiles}
              >Документи</div>
            </li>
            {this.props.logInOrLogOut()}
            <li className="menu-li" style={{color: this.props.adminLinkColor, display: this.props.adminDisplayMode, transition: "color 0.2s linear"}} onMouseEnter={this.props.onMouseEnter} onMouseLeave={this.props.onMouseLeave}>
              <div key="adminDiv" onClick={this.props.onClickToAdmin}
              >Admin</div>
            </li>
          </ul>
        </div>

        <div className="navigation_burger_menu">
          <input id="menu__toggle" checked={this.props.isBurgerChecked} type="checkbox" onClick={this.props.onBurgerClick} readOnly={true}/>
          <label className="menu__btn" htmlFor="menu__toggle">
            <span/>
          </label>

            <ul className="menu__box">
              <li className="menu-li burger_menu_li" style={{display: this.props.toMainDisplayMode}}>
                <div key="toMain" className="click_me" onClick={this.props.onClickToMain}
                >Головна</div>
              </li>
              <li className="menu-li burger_menu_li">
                <div key="newsDiv" className="click_me" onClick={this.props.onClickToNews}
                >Новини</div>
              </li>
              <li className="menu-li burger_menu_li">
                <div key="filesDiv" className="click_me" onClick={this.props.onClickToFiles}
                >Документи</div>
              </li>
              {this.props.logInOrLogOut()}
              <li className="menu-li burger_menu_li" style={{color: this.props.adminLinkColor, display: this.props.adminDisplayMode, transition: "color 0.2s linear"}} onMouseEnter={this.props.onMouseEnter} onMouseLeave={this.props.onMouseLeave}>
                <div key="adminDiv" className="click_me" onClick={this.props.onClickToAdmin}
                >Admin</div>
              </li>
            </ul>

        </div>


      </div>
    );
  }
}
export default Header;
