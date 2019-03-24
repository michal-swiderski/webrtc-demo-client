import React, {Component} from 'react';
import VideoChatControls from './VideoChatControls';
import '../styles/VideoChat.sass'
import {subscribe, emit, unsubscribe} from '../socket/socket.js'
import config from '../rtcconfig';

class VideoChat extends Component {
    constructor(props){
        super(props);
        this.localVideo = React.createRef();
        this.remoteVideo = React.createRef();
        this.state = {
            localVideoHeight : 200,
            isRemoteVideoMuted : false,
            remoteConnected : false,
            controlsHidden : false
        };
        subscribe('login', (data)=>{
            console.log('logged in');
           if(!data.success){
               this.props.history.push('/?error=full');
           }
           else{
               this.connection = new RTCPeerConnection(config);
               this.connection.ontrack = (e)=>{
                   console.log('got stream');
                   this.remoteVideo.current.srcObject = e.streams[0];
               };
               this.connection.onicecandidate = (e) => {
                   if(e.candidate){
                       emit('candidate', {candidate: e.candidate});
                       console.log('sent candidate');
                   }
               };

               this.localVideo.current.srcObject = this.localStream;

               this.localStream.getTracks().forEach((track)=>{
                   this.connection.addTrack(track, this.localStream);
               });
               console.log('added stream');
           }
        });

        subscribe('joined', (data)=>{
            console.log('joined');
            this.setState({remoteConnected: true});
            //prepare an offer
            this.connection.createOffer((offer)=>{
                console.log('sending an offer');
                emit('offer', {offer});
                this.connection.setLocalDescription(offer).catch((e)=>{console.log(e)});
            }, (error)=>{console.log(error)});
        });

        subscribe('offer', (data)=>{
            console.log('recieved an offer');
            this.connection.setRemoteDescription(data.offer);

            this.connection.createAnswer((answer)=>{
                this.connection.setLocalDescription(answer);
                emit('answer', {answer});
                console.log('sent answer');
                this.setState({remoteConnected: true});
            }, (error) => {console.log(error)});
        });

        subscribe('answer', (data)=>{
            console.log('recieved answer');
            this.connection.setRemoteDescription(new RTCSessionDescription(data.answer));
        });

        subscribe('candidate', (data)=>{
            console.log('recieved candidate');
            console.log(data.candidate);
            this.connection.addIceCandidate(new RTCIceCandidate(data.candidate));
        });

        subscribe('peerdisconnected', ()=>{
            this.setState({remoteConnected : false});
            this.remoteVideo.current.srcObject = null;
            // this.connection.close();
            // this.connection.onicecandidate = null;
            // this.connection.ontrack = null;
        });
    }

    componentDidMount(){
        navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then( (localStream) =>{
            this.localStream = localStream;
            emit('login', {
                room : this.props.match.params.room
            });
        });
    }

    componentWillUnmount() {
        unsubscribe('login');
        unsubscribe('joined');
        unsubscribe('offer');
        unsubscribe('answer');
        unsubscribe('candidate');
        unsubscribe('peerdisconnected');
        emit('hangup');
        this.connection.close();;
    }

    toggleMic = () => {
        this.localStream.getAudioTracks()[0].enabled = !this.localStream.getAudioTracks()[0].enabled;
    };

    toggleVideo = () => {
        this.localStream.getVideoTracks()[0].enabled = !this.localStream.getVideoTracks()[0].enabled;
    };

    hangup = () => {
        this.props.history.push('/');
    };

    toggleFullscreen = () => {
        if(!this.state.isFullscreen)
            document.body.requestFullscreen().then(()=>{
                this.setState({isFullscreen : true});
            });
        else{
            document.exitFullscreen().then(()=>{
                this.setState({isFullscreen : false});
            });
        }
    };

    render() {
        return (
            <div className='videoChat'>
                {!this.state.remoteConnected?<h1 className="info">Waiting for someone to connect</h1>:null}
                <div class="local-video-wrapper">
                    <video autoPlay muted height={this.state.localVideoHeight} ref={this.localVideo} id='localVideo'/>
                </div>
                <video autoPlay muted={this.muted} ref={this.remoteVideo} id='remoteVideo'/>
                <VideoChatControls hidden={this.state.controlsHidden} toggleMic={this.toggleMic} toggleVideo={this.toggleVideo} hangup={this.hangup} toggleFullscreen = {this.toggleFullscreen}/>
            </div>
        );
    }
}

export default VideoChat;