import { Room, RoomEvent } from "./modules/livekit-client.esm.js"

const videoGrid = document.querySelector('div')

const handleTrackSubsribed = function (track, publication, participant){
    //const videoTag = document.createElement('video')
    track.setVolume(1)
    videoGrid.appendChild(track.attach())
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