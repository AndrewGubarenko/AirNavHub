import React from 'react';
import {setToMainDisplayMode} from "../reducers/actions/OnMainPageAction";
import {setSpinnerVisibility} from "../reducers/actions/spinnerAction";
import PersonalDataProcessing from "../components/personal_data_processing";
import {connect} from "react-redux";

class PersonalDataProcessingContainer extends React.Component {

    componentDidMount() {
        this.props.dispatch(setToMainDisplayMode("block"));
        this.props.dispatch(setSpinnerVisibility("none"));
    }

    render() {
        return(
            <PersonalDataProcessing />
        );
    }
}
const mapStateToProps = (state) => {
    return Object.assign({}, state, {
        spinnerVisibility: state.spinnerVisibility.spinnerVisibility
    });
}

export default connect(mapStateToProps)(PersonalDataProcessingContainer);