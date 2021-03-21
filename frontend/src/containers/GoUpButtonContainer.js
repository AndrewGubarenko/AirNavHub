import React from 'react';
import GO_UP_BUTTON from './../statics/GoUpBtn.png';
import './../styles/goUpButtonStyle.css';
import {scroller} from 'react-scroll';

class GoUpButtonContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      visibilityGoUpButton: "hidden",
      opacityGoUpButton: 0
    };
  }

  componentDidMount() {
    window.addEventListener('scroll', this.onScrollGoUpButton);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScrollGoUpButton);
  }

  onClickGoUpButton = () => {
    scroller.scrollTo("logo", {
      spy: true,
      smooth: true,
      offset:-70,
      duration: 500
    });
  }

  onScrollGoUpButton = () => {
    if (window.scrollY === 0 && this.state.visibilityGoUpButton === "visible") {
        this.setState({visibilityGoUpButton: "hidden"});
        this.setState({opacityGoUpButton: 0});
    }
    else if (window.scrollY !== 0 && this.state.visibilityGoUpButton === "hidden") {
        this.setState({visibilityGoUpButton: "visible"});
        this.setState({opacityGoUpButton: "90%"});
    }
  }

  render() {
    return(
      <div className="go_up_button" style={{visibility: this.state.visibilityGoUpButton, opacity: this.state.opacityGoUpButton}}>
        <img  id="goUp"
              src={GO_UP_BUTTON}
              alt=""
              onClick={this.onClickGoUpButton}/>
      </div>
    );
  }
}
export default GoUpButtonContainer;
