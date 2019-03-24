[1mdiff --git a/src/components/LoginPage.js b/src/components/LoginPage.js[m
[1mindex 1c03e4e..4d71b0d 100644[m
[1m--- a/src/components/LoginPage.js[m
[1m+++ b/src/components/LoginPage.js[m
[36m@@ -11,16 +11,15 @@[m [mclass LoginPage extends Component {[m
     }[m
 [m
     handleChange = (e) => {[m
[31m-        if (e.target.value.length < 5)[m
[31m-            this.setState({error: 'room id must be at least 5 characters long'});[m
[31m-        else[m
[31m-            this.setState({error: ''});[m
         this.setState({room: e.target.value});[m
     };[m
 [m
     handleSubmit = (e) => {[m
         e.preventDefault();[m
[31m-        this.props.history.push('/room/' + this.state.room);[m
[32m+[m[32m        if (this.state.room.length < 5)[m
[32m+[m[32m            this.setState({error: 'Room id must be at least 5 characters long'});[m
[32m+[m[32m        else[m
[32m+[m[32m            this.props.history.push('/room/' + this.state.room);[m
     };[m
 [m
     componentWillMount() {[m
[36m@@ -41,7 +40,7 @@[m [mclass LoginPage extends Component {[m
                             <div className="six columns offset-by-three">[m
                                 <input type="text" placeholder="Room" className="u-full-width"[m
                                        onChange={this.handleChange} value={this.state.room}/>[m
[31m-                                <span id="error">{this.state.error}</span>[m
[32m+[m[32m                                <p id="error">{this.state.error}</p>[m
                                 <input className="button-primary u-full-width" type="submit" value="Join"/>[m
                             </div>[m
                         </div>[m
[1mdiff --git a/src/components/VideoChat.js b/src/components/VideoChat.js[m
[1mindex 18f9fb7..bfbb671 100644[m
[1m--- a/src/components/VideoChat.js[m
[1m+++ b/src/components/VideoChat.js[m
[36m@@ -133,7 +133,7 @@[m [mclass VideoChat extends Component {[m
         return ([m
             <div className='videoChat'>[m
                 {!this.state.remoteConnected?<h1 className="info">Waiting for someone to connect</h1>:null}[m
[31m-                <div class="local-video-wrapper">[m
[32m+[m[32m                <div className="local-video-wrapper">[m
                     <video autoPlay muted height={this.state.localVideoHeight} ref={this.localVideo} id='localVideo'/>[m
                 </div>[m
                 <video autoPlay muted={this.muted} ref={this.remoteVideo} id='remoteVideo'/>[m
[1mdiff --git a/src/rtcconfig.js b/src/rtcconfig.js[m
[1mindex 4b5d681..7223385 100644[m
[1m--- a/src/rtcconfig.js[m
[1m+++ b/src/rtcconfig.js[m
[36m@@ -3,8 +3,8 @@[m [mexport default {[m
         {url : "stun:stun2.l.google.com:19302"},[m
         {[m
             urls: 'turn:147.135.153.119:3478',[m
[31m-            username: 'localStream',[m
[31m-            credential: 'localStream'[m
[32m+[m[32m            username: 'webrtc-demo',[m
[32m+[m[32m            credential: 'webrtc-demo'[m
         }[m
     ][m
 }[m
\ No newline at end of file[m
