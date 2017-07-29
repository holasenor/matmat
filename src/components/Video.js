import React from "react"
import Login_Subscription from "./MainMenu/MainMenu";


export default class Video extends React.Component {
  constructor (props) {
          super(props);
          this.state = {
              videoURL: 'http://www.sample-videos.com/video/mp4/720/big_buck_bunny_720p_1mb.mp4',
              myvideo: '/videos/MP4/Diagonal.mp4'
          }
      }


  render() {
    return (
    <div id="myVideo">

    <Login_Subscription />

        <div className="homepage-hero-module">
            <div className="video-container">
                <div className="filter"></div>
                <img className="imageWallpaper" src="/videos/Snapshots/Diagonal1.jpg" />

                <video loop autoPlay muted className="fillWidth background-video">
                    <source src={this.state.myvideo} type="video/mp4" />Your browser does not support the video tag. I suggest you upgrade your browser.
                    <source src="/videos/MP4/Diagonal.webm" type="video/webm" />Your browser does not support the video tag. I suggest you upgrade your browser.
                </video>
            </div>
        </div>


		</div>
    );
  }
}
