import React, {Component} from 'react';
import '../styles/VideoChatControls.sass';

class VideoChatControls extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isAudioMuted: false,
            isVideoMuted: false,
            isFullscreen: false
        }
    }

    toggleAudio = () => {
        this.setState((state, props) => ({
            isAudioMuted: !state.isAudioMuted
        }));
    };

    toggleVideo = () => {
        this.setState((state, props) => ({
            isVideoMuted: !state.isVideoMuted
        }));
    };

    toggleFullscreen = () => {
        this.setState((state, props) => ({
            isFullscreen: !state.isFullscreen
        }));
    };

    render() {
        return (
            <div id="video-controls" className={this.props.hidden ? 'hidden' : null}>
                <i className={"fas fa-microphone-slash " + (this.state.isAudioMuted ? 'toggled' : '')} onClick={() => {
                    this.props.toggleMic();
                    this.toggleAudio();
                }}/>
                <i className="fas fa-phone-slash red" onClick={this.props.hangup}/>
                <i className={"fas fa-video-slash " + (this.state.isVideoMuted ? 'toggled' : '')} onClick={() => {
                    this.props.toggleVideo();
                    this.toggleVideo();
                }}/>
                <i className={"fas fa-expand " + (this.state.isFullscreen ? 'toggled' : '')} onClick={() => {
                    this.props.toggleFullscreen();
                    this.toggleFullscreen();
                }}/>
            </div>
        );
    }
}

export default VideoChatControls;