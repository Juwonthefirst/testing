import { Room, RoomEvent } from "./modules/livekit-client.esm.js"

const videoGrid = document.querySelector('.video-grid')

const handleTrackSubsribed = function (track, publication, participant){
    const videoTag = track.attach()
    videoTag.style.height = '300px'
    videoTag.style.width = '200px'
    videoTag.style.backgroundColor = 'black'
    videoTag.autoplay = true
    videoTag.playsinline = true
    console.log('Track event triggered')
    videoGrid.appendChild(videoTag)
}

const getToken = async function() {
    const response = await fetch('https://testing-5aa7.onrender.com/')
    const data = await response.json()
    return data.token
    
}

const startAPI = async function() {
    const wsURL = 'wss://test-8jnftwho.livekit.cloud'
    const token = await getToken()
    const room = new Room()
    await room.connect(wsURL, token)
    room.localParticipant.setCameraEnabled(true)
    room.localParticipant.setMicrophoneEnabled(true)
    room.on(RoomEvent.TrackSubscribed, handleTrackSubsribed)
    console.log(room.localParticipant)
}

startAPI()