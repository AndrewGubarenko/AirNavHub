import React from 'react';
import {setToMainDisplayMode} from "../reducers/actions/OnMainPageAction";
import {setSpinnerVisibility} from "../reducers/actions/spinnerAction";
import UserAgreement from "../components/user_agreement";
import {connect} from "react-redux";

class UserAgreementContainer extends React.Component {

    componentDidMount() {
        this.props.dispatch(setToMainDisplayMode("block"));
        this.props.dispatch(setSpinnerVisibility("none"));
    }

    render() {
        return (
            <UserAgreement/>
        );
    }
}

const mapStateToProps = (state) => {
    return Object.assign({}, state, {
        spinnerVisibility: state.spinnerVisibility.spinnerVisibility
    });
}

export default connect(mapStateToProps)(UserAgreementContainer);
