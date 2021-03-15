import React from 'react';
import FILE from './../statics/file-cool.png';

class File extends React.Component {
  render() {
    return(
      <div key={this.props.file.id} className="news-container">
        <div id="news__icon">
          <img id="news__icon__img" src={FILE} alt=""/>
        </div>
        <div className="news-theme-container">
          <a id="news-theme" href={this.props.file.path} target="blank">
            {this.props.file.name}
          </a>
        </div>
      </div>
    );
  }
}
export default File
