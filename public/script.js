const socket = io('/');

const videoGrid = document.getElementById('video-grid');
const myVideo = document.createElement('video');
myVideo.muted = true;

const addVideoStream = (video, stream) => {
    video.srcObject = stream;
    video.addEventListener('loadedmetadata', () => {
        video.play();
    })
    videoGrid.append(video);
};

const peer = new Peer(undefined, {
    path: '/peerjs',
    host: '/',
    port: '3030'
  })

let myVideoStream
//For getting user's video and audio from browser
navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true
}).then(stream => {
    myVideoStream = stream;
    addVideoStream(myVideo, stream);
})

peer.on('open', id => {
    socket.emit('join-room', ROOM_ID, id);
})

socket.on('user-connected', (userId) => {
    connectToNewUser(userId);
})

const connectToNewUser = (userId) => {
    console.log(userId);
}