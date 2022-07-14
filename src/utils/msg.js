
const generateMessage = (text)=> {
    return{
        text,
        createdAt: new Date().getTime()
    }
}

const locationMessage = (text)=> {
    return{
        text,
        createdAt: new Date().getTime()
    } 
}


module.exports = {
    generateMessage,
    locationMessage
}