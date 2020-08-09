const socket = io('/');

const videoGrid = document.getElementById('video-grid');
const myVideo = document.createElement('video');
myVideo.muted = true;

let myVideoStream
//For getting user's video and audio from browser
navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true
}).then(stream => {
    myVideoStream = stream;
    addVideoStream(myVideo, stream);
})

socket.emit('join-room', ROOM_ID);

socket.on('user-connected', () => {
    connectToNewUser();
})

const connectToNewUser = () => {
    console.log('new user');
}


const addVideoStream = (video, stream) => {
    video.srcObject = stream;
    video.addEventListener('loadedmetadata', () => {
        video.play();
    })
    videoGrid.append(video);
};