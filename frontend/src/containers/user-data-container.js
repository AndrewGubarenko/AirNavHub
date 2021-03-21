import React from 'react';
import UserData from '../components/user-data';

class UserDataContainer extends React.Component {

  render() {
    return(
      <UserData
        firstName={this.props.firstName}
        lastName={this.props.lastName}
        count={this.props.count}
        gender={this.props.gender}
        />
    );
  }
}
export default UserDataContainer;
