
//connect to the socket backend
const socket = io()

const formData = document.querySelector('#form')
const locationData = document.querySelector('#location')
const button = document.querySelector('#send')
const displayMesssages = document.querySelector('#messages')

//configure the template
const messageTemp = document.querySelector('#message-template').innerHTML
const messageLoc = document.querySelector('#message-temp').innerHTML

//Render messages
socket.on('message', (message)=> {
    //receives and display the information from the server to the client
    console.log(message)
    //render messages here store the data on html
    const html = Mustache.render(messageTemp, {
        message: message.text,
        createdAt: moment(message.createdAt).format('H:mm a')
    })
    displayMesssages.insertAdjacentHTML('beforeend',html)
})

socket.on('locationMessage', (message)=> {
    console.log(url)
    const location = Mustache.render(messageLoc, {
        url: message.url,
        createdAt: moment(message.createdAt).format('H:mm a')
    })
    displayMesssages.insertAdjacentHTML('beforeend', location)
})

 
formData.addEventListener('submit', (e)=> {
    e.preventDefault()

    button.setAttribute('disabled', 'disabled')
    const messageInput = e.target.elements.message.value.trim()
    e.target.elements.message.value = ''


    socket.emit('sendMessage', messageInput, (message)=> {
        button.removeAttribute('disabled')
        console.log(message)
    })
})

//share location using the builtin geoloation api
locationData.addEventListener('click', ()=> {
   locationData.setAttribute('disabled', 'disabled')
   if(!navigator.geolocation){
    return alert('Geolocation is not supported by your browser')
   }

   navigator.geolocation.getCurrentPosition((postion)=>{
    locationData.removeAttribute('disabled')
    socket.emit('sendLocation', {
        latitude: postion.coords.latitude,
        longitude: postion.coords.latitude
    }, ()=> {
        console.log('location shared')
    })
   })  
})
