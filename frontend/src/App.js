import React, {Component} from 'react';
import {HashRouter, Route} from 'react-router-dom';
import { Redirect } from 'react-router'
import MainPageContainer from './containers/main-page-container';
import HeaderContainer from './containers/header-container';
import Footer from './components/footer';
import ChangePasswordContainer from './containers/changePasswordContainer';
import RestorePasswordContainer from './containers/RestorePasswordContainer';
import SingleNewContainer from './containers/SingleNewContainer';
import AdminPageContainer from './containers/admin-page-container';
import SpinnerContainer from './containers/spinner-container';
import GoUpButtonContainer from './containers/GoUpButtonContainer';
import FeedbackContainer from './containers/feedbackContainer';
import QuestionnaireContainer from './containers/questionnaire_container';
import UserAgreementContainer from './containers/user_agreement_container';
import PersonalDataProcessingContainer from './containers/personal_data_processing_container';

import './App.css';
import {Provider} from 'react-redux';
import {store, persistor} from './reducers/store';
import { PersistGate } from 'redux-persist/integration/react';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
      isAdmin: false
    };
  }

  componentDidMount() {
    store.subscribe(() => {
      this.setState({isAuthenticated: store.getState().user.isAuthenticated});
    })
    store.subscribe(() => {
      this.setState({isAdmin: store.getState().user.isAdmin});
    })
  }

  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <HashRouter>
            <Route exact path="/" render={() => {return(<Redirect to="/main"/>)}} />
            <Route path="/" component={HeaderContainer} />
            <Route path="/" component={SpinnerContainer} />
            <Route path="/" component={GoUpButtonContainer} />
            <Route path="/main" component={MainPageContainer} />
            <Route path="/change_password" render={()=>{
                if(this.state.isAuthenticated) {
                  return(<ChangePasswordContainer/>)
                } else {
                  return(<Redirect to="/main"/>)
                }
              }
            }/>
            <Route path="/feedback" render={()=>{
                if(this.state.isAuthenticated) {
                  return(<FeedbackContainer />)
                } else {
                  return(<Redirect to="/main"/>)
                }
              }
            }/>
           <Route path="/questionnaire" render={()=>{
                if(this.state.isAuthenticated) {
                  return(<QuestionnaireContainer />)
                } else {
                  return(<Redirect to="/main"/>)
                }
              }
            }/>
            <Route path="/restore_password" component={RestorePasswordContainer} />
            <Route path="/news/:id" component={SingleNewContainer} />
            <Route path="/administrator" render={()=>{
                if(this.state.isAdmin) {
                  return(<AdminPageContainer/>)
                } else {
                  return(<Redirect to="/main"/>)
                }
              }
            }/>
            <Route path="/user_agreement" component={UserAgreementContainer} />
            <Route path="/personal_data_processing" component={PersonalDataProcessingContainer} />
            <Route path="/" component={Footer} />
          </HashRouter>
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
