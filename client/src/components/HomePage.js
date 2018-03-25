import React, { Component } from 'react';
import { Slide } from 'react-slideshow-image';

class HomePage extends Component {

  constructor() {
    super();
    this.renderHomePage = this.renderHomePage.bind(this)
  }

  renderHomePage() {
    const images = [
      'https://i.imgur.com/mQR7daY.png',
      'https://i.imgur.com/LwsALH8.png',
      'https://i.imgur.com/HtjVnT8.png'
    ]
    return(
      <div className="user-home-render-user-profile-container">
        <div className="user-homepage">
          <div className="image-slideshow">
            <Slide
              images={images}
              duration={5000}
              transitionDuration={1000}
            />
          </div>
          <div className="homePage-box2">
            <div className="homePage-box2-contents-container">
              <div className="homePage-box2-contents">
                <h1 className="homePage-box2-h1">How to use : </h1>
              </div>
            </div>
          </div>
          <div className="homePage-box3">
            <div className="homePage-box3-contents-container">
              <div className="homePage-box3-contents">
                <h1 className="homePage-box3-h1">About BeatBox :</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  render() {
    return(
      <div>
        {this.renderHomePage()}
      </div>
    );
  }
}

export default HomePage;
