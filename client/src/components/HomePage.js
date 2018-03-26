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
                <h1 className="homePage-box2-h1">How to use : <br /><br />
                                                              If you are not a user, please sign up to login and start curating your song playlists!
                                                              Once logged please select if you would like to make your account public for all other 
                                                              users to explore your collection, or private if you would not like to share your details.
                                                              To add songs to your playlist from our database please select Show all Songs or Search 
                                                              songs by lyrics to find all songs with matching lyrics world wide. You are now able to add
                                                              songs to specific playlists. You also have the option to delete songs or playlists you aren't interested in anymore.
                                                              Enjoy!</h1>
              </div>
            </div>
          </div>
          <div className="homePage-box3">
            <div className="homePage-box3-contents-container">
              <div className="homePage-box3-contents">
                <h1 className="homePage-box3-h1">About BeatBox : <br /><br />
                                                                  BeatBox was created by 4 students in the WDI Immersive Program at General Assembly. </h1>
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
