import React from 'react';
import SingleNew from '../components/SingleNew';
import {setToMainDisplayMode} from '../reducers/actions/OnMainPageAction';
import {connect} from 'react-redux';
import {setSpinnerVisibility} from '../reducers/actions/spinnerAction';

class SingleNewContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      singleNew: {}
    };
  }

  componentDidMount() {
    this.props.dispatch(setToMainDisplayMode("block"));
    let id = this.props.match.params.id;
    this.props.news.forEach((sNew, i) => {
      if(sNew.id === id) {
        this.setState({singleNew: sNew});
      }
    });
    this.props.dispatch(setSpinnerVisibility("none"));
  }

  render() {
    return(
      <SingleNew
        singleNew={this.state.singleNew}
        />
      );
    }
  }

const mapStateToProps = (state) => {
  return Object.assign({}, state, {
    news: state.news.listOfNews,
    spinnerVisibility: state.spinnerVisibility.spinnerVisibility
  });
}

export default connect(mapStateToProps)(SingleNewContainer);
