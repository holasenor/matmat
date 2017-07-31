import React from "react"


export default class Video extends React.Component {
  constructor (props) {
          super(props);
          this.state = {
              myvideo: '/videos/MP4/Diagonal1.mp4'
          }
      }


  render() {
    return (
    <div id="myVideo">

        <div className="homepage-hero-module">
            <div className="video-container">
                <div className="filter"></div>
                <video loop autoPlay muted id="background-video">
                    <source src={this.state.myvideo} type="video/mp4" />Your browser does not support the video tag. I suggest you upgrade your browser.
                </video>
                <img className="imageWallpaper" src="/videos/Snapshots/Diagonal1.jpg" />

            </div>
        </div>


		</div>
    );
  }
}
