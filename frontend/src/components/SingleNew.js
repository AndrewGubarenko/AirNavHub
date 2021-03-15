import React from 'react';

class SingleNew extends React.Component {
  render() {
    return(
      <div className="content">
        <div className="inner_news_container">
          <h1 className="news_title">{this.props.singleNew.title}</h1>
          <pre className="news_text">{this.props.singleNew.text}</pre>
        </div>
      </div>
    );
  }
}
export default SingleNew;
