import React from 'react';
import MainPage from '../components/main-page';
import NewsContainer from './news-container';
import FilesContainer from './file-container';
import UserDataContainer from './user-data-container';
import AuthenticationContainer from './authentication-container';
import {connect} from 'react-redux';
import {setNews} from '../reducers/actions/newsAction';
import {setFiles} from '../reducers/actions/fileAction';
import {representationService, userService} from '../app-context/context';
import {setToMainDisplayMode} from '../reducers/actions/OnMainPageAction';
import {setSpinnerVisibility} from '../reducers/actions/spinnerAction';
import {setIsAuthenticated} from '../reducers/actions/userAction';
import {setAdminDisplayMode} from '../reducers/actions/AdminAction';
import {setIsAuthContainerVisible} from "../reducers/actions/AuthContainerAction";

class MainPageContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      arrowNewsClassName: "expandArrow",
      arrowFilesClassName: "expandArrow",
      newsArray: []
    };
  }

  componentDidMount() {
    this.props.dispatch(setToMainDisplayMode("none"));
    if(this.props.isAuthenticated) {
      representationService.getFullMain(this.props.user.id).then((data) => {
        console.log(data);
        if(data.ok) {
          return data.json();
        } else {
          userService.logout().then(() => {
            this.setState({isBurgerChecked: false});
            this.props.dispatch(setIsAuthenticated(false, null, false));
            this.props.dispatch(setIsAuthContainerVisible("none"));
            this.props.dispatch(setAdminDisplayMode("none"));
            this.props.dispatch(setFiles(null, "none"));
          }).then(() => this.props.history.push("/main"));
        }
      }).then(representation => {
        this.props.dispatch(setNews(representation.newsList));
        this.props.dispatch(setFiles(representation.fileList, "block"));
        if(representation.authorizedUser){
          if(representation.authorizedUser.roles.includes("ADMINISTRATOR")) {
            this.props.dispatch(setIsAuthenticated(true, representation.authorizedUser, true));
            this.props.dispatch(setAdminDisplayMode("block"));
          } else {
            this.props.dispatch(setIsAuthenticated(true, representation.authorizedUser, false));
          }
        }
      }).then(() => {
        this.setFilesContainer();
        this.setNews();
      });
    } else {
      representationService.getTruncatedMain().then((data) => {
        console.log(data);
        return data.json();
      }).then(representation => {
        this.props.dispatch(setNews(representation.newsList));
        this.props.dispatch(setFiles(null, "none"));
      }).then(() => {
        this.setNews();
      });
    }
    this.setState({filesVisibility: this.props.filesVisibility})
    this.props.dispatch(setSpinnerVisibility("none"));
  }

  setNews = () => {
    let shortNewsArray = [];
    if (this.props.news.listOfNews.length) {
      for (let i = 0; i < this.props.news.listOfNews.length && i < 4; i++) {
        shortNewsArray[i] = <NewsContainer
          key={this.props.news.listOfNews[i].id}
          singleNew={this.props.news.listOfNews[i]}
           />
      }
    } else {
      shortNewsArray[0] = <p key="zeroNews">Поки що немає новин..</p>
    }
    this.setState({newsArray: shortNewsArray});
  }

  expandNews = () => {
    let longNewsArray = [];
    if (this.props.news.listOfNews.length) {
      this.props.news.listOfNews.forEach((singleNew, i) => {
        longNewsArray[i] = <NewsContainer
          key={singleNew.id}
          singleNew={singleNew}
           />
      });
    } else {
      longNewsArray[0] = <p key="zeroNews">Поки що немає новин..</p>
    }
    this.setState({newsArray: longNewsArray});
  }

  setUserData = () => {
    if(this.props.isAuthenticated) {
      return(
        <UserDataContainer
          firstName={this.props.user.firstName}
          lastName={this.props.user.lastName}
          count={this.props.user.count}
          gender={this.props.user.gender}
          />
        );
    }
    if(!this.props.isAuthenticated) {
      return(
        <AuthenticationContainer />
        );
    }
  }

  onClickExpandArrowNews = () => {
    if (this.state.arrowNewsClassName === "expandArrow") {
      this.expandNews();
      this.setState({arrowNewsClassName: "expandArrow open"});
    } else if (this.state.arrowNewsClassName === "expandArrow open") {
      this.setNews();
      this.setState({arrowNewsClassName: "expandArrow"});
    }
  }

  setFilesContainer = () => {
    if(this.props.isAuthenticated) {
      return(
        <FilesContainer
          displayFiles={this.props.files.filesVisibility}
          isAuthenticated={this.props.isAuthenticated}
          files={this.props.files}
          />
      );
    }
  }

  render() {
    return(
      <MainPage
        news={this.state.newsArray}
        files={this.state.filesArray}
        user={this.setUserData()}
        onClickExpandArrowNews={this.onClickExpandArrowNews}
        arrowNewsClassName={this.state.arrowNewsClassName}
        FilesContainer={this.setFilesContainer}
        />
    );
  }
}

const mapStateToProps = (state) => {
  return Object.assign({}, state, {
    news: state.news,
    files: state.files,
    user: state.user.user,
    isAuthenticated: state.user.isAuthenticated,
    adminDisplayMode: state.adminDisplayMode,
    spinnerVisibility: state.spinnerVisibility.spinnerVisibility
  });
}

export default connect(mapStateToProps)(MainPageContainer);
