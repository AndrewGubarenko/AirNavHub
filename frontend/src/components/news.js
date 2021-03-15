import React from 'react';
import NEWS_COOL from './../statics/news_cool.png';
import {Link} from 'react-router-dom';

class News extends React.Component {
  render() {
    return(
      <div key={this.props.singleNew.id} className="news-container">
        <div id="news__icon">
          <img id="news__icon__img" src={NEWS_COOL} alt=""/>
        </div>
        <div className="news-theme-container">
          <Link id="news-theme" to={"/news/" + this.props.singleNew.id}>
            {this.props.singleNew.title}
          </Link>
        </div>
      </div>
    );
  }
}
export default News
