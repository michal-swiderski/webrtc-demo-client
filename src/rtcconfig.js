export default {
    iceServers : [
        {url : "stun:stun2.l.google.com:19302"},
        {
            urls: 'turn:147.135.153.119:3478',
            username: 'localStream',
            credential: 'localStream'
        }
    ]
}