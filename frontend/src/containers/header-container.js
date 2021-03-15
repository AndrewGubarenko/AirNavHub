import React from 'react';
import Header from './../components/header';
import {connect} from 'react-redux';
import {setIsAuthenticated} from './../reducers/actions/userAction';
import {setIsAuthContainerVisible} from './../reducers/actions/AuthContainerAction';
import {setAdminDisplayMode} from './../reducers/actions/AdminAction';
import {setFiles} from './../reducers/actions/fileAction';
import {scroller} from 'react-scroll';
import {userService} from './../app-context/context';

class HeaderContainer extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      adminLinkColor: "red",
      isBurgerChecked: false
    };
  }

  showLoginForm = async () => {
    if(this.props.location.pathname === "/main") {
      await this.props.dispatch(setIsAuthContainerVisible("block"));
      this.setState({isBurgerChecked: false});
      scroller.scrollTo("auth__container", {
        spy: true,
        smooth: true,
        offset:-70,
        duration: 500
      });
    } else {
      await this.props.history.push("/main");
      await this.props.dispatch(setIsAuthContainerVisible("block"));
      this.setState({isBurgerChecked: false});
      scroller.scrollTo("auth__container", {
        spy: true,
        smooth: true,
        offset:-70,
        duration: 500
      });
    }
  }

  onClickToNews = async () => {
    if(this.props.location.pathname === "/main") {
      this.setState({isBurgerChecked: false});
      scroller.scrollTo("news__container", {
        spy: true,
        smooth: true,
        offset:-70,
        duration: 500
      });
    } else {
      await this.props.history.push("/main");
      this.setState({isBurgerChecked: false});
      scroller.scrollTo("news__container", {
        spy: true,
        smooth: true,
        offset:-70,
        duration: 500
      });
    }
  }

  onClickToFiles = async () => {
    if(this.props.location.pathname === "/main") {
      this.setState({isBurgerChecked: false});
      scroller.scrollTo("file__container", {
        spy: true,
        smooth: true,
        offset:-70,
        duration: 500
      });
    } else {
      await this.props.history.push("/main");
      this.setState({isBurgerChecked: false});
      scroller.scrollTo("file__container", {
        spy: true,
        smooth: true,
        offset: 270,
        duration: 500
      });
    }
  }

  onMouseEnter = () => {
    this.setState({adminLinkColor: "#990033"});
  }
  onMouseLeave = () => {
    this.setState({adminLinkColor: "red"});
  }

  onClickToMain = () => {
    this.setState({isBurgerChecked: false});
    this.props.history.push("/main");
  }
  onClickToAdmin = (event) => {
    this.setState({isBurgerChecked: false});
    this.props.history.push("/administrator");
  }

  logInOrLogOut = () => {
      if (this.props.isAuthenticated) {
        return(
          <li className="menu-li burger_menu_li"
              onClick={() => {
                userService.logout().then(response => {
                  if(response.ok) {
                    this.setState({isBurgerChecked: false});
                    this.props.dispatch(setIsAuthenticated(false, null, false));
                    this.props.dispatch(setIsAuthContainerVisible("none"));
                    this.props.dispatch(setAdminDisplayMode("none"));
                    this.props.dispatch(setFiles(null, "none"));
                    this.props.history.push("/main");
                  } else {
                    alert("Халепа! Щось пішло не так.")
                  }
                })
              }}>Вийти</li>
        );
      } else {
        return(
          <li className="menu-li burger_menu_li">
            <div key="logInDiv" onClick={this.showLoginForm}
            >Увійти</div>
          </li>
        );
      }
  }

  onClickLogo = () => {
    this.props.history.push("/main");
  }

  onBurgerClick = () => {
    if(this.state.isBurgerChecked === false) {
      this.setState({isBurgerChecked: true});
    } else {
      this.setState({isBurgerChecked: false});
    }
  }

  render() {
    return(
      <Header
        isBurgerChecked={this.state.isBurgerChecked}
        adminLinkColor={this.state.adminLinkColor}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
        logInOrLogOut={this.logInOrLogOut}
        onClickToNews={this.onClickToNews}
        onClickToFiles={this.onClickToFiles}
        onClickLogo={this.onClickLogo}
        onClickToMain={this.onClickToMain}
        onClickToAdmin={this.onClickToAdmin}
        adminDisplayMode={this.props.adminDisplayMode}
        toMainDisplayMode={this.props.toMainDisplayMode}
        onBurgerClick={this.onBurgerClick}
        isDocsVisible={this.props.files.filesVisibility}
        />
    );
  }

}
const mapStateToProps = (state) => {
  return Object.assign({}, state, {
    user: state.user,
    files: state.files,
    isAuthenticated: state.user.isAuthenticated,
    isAuthVisible: state.authContainer.isAuthVisible,
    adminDisplayMode: state.adminDisplayMode.adminDisplayMode,
    toMainDisplayMode: state.toMainDisplayMode.toMainDisplayMode
  });
}

export default connect(mapStateToProps)(HeaderContainer);
