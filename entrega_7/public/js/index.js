const formProduct = document.querySelector('#formProduct')
const title = document.querySelector('#title')
const price = document.querySelector('#price')
const thumbnail = document.querySelector('#thumbnail')

const tBody = document.querySelector('#tBody')

const chat = document.querySelector('#chat')

const allMessages = document.querySelector('#allMessages')


const socket = io();


formProduct.addEventListener('submit', (e) =>{
    e.preventDefault()

    let newProduct = {
        title: title.value,
        price: price.value,
        thumbnail: thumbnail.value
    }
    console.log('se ha emitido la señal para agregar un nuevo producto')
    socket.emit('addProduct', newProduct)

    title.value = ""
    price.value = ""
    thumbnail.value = ""
})


socket.on('addTable',(data) =>{
    const trInput = document.createElement('tr')

    const id = document.createElement('td')
    const title = document.createElement('td')
    const price = document.createElement('td')
    const thumbnail = document.createElement('td')

    
    id.innerText = data.id
    title.innerText = data.title
    price.innerText = data.price
    thumbnail.innerText = data.thumbnail
    
    trInput.appendChild(id)
    trInput.appendChild(title)
    trInput.appendChild(price)
    trInput.appendChild(thumbnail)

    tBody.appendChild(trInput)
})


chat.addEventListener('submit', (e) =>{
    e.preventDefault()

    let newMessage = {
        email: email.value,
        message: message.value
    }

    socket.emit('addMessage', newMessage)

    email.value= ''
    message.value = ''
})



socket.on('showMessage', (data) =>{
    const messageContainer = document.createElement('div')
    const pContainer = document.createElement('p')
    const messageEmail = document.createElement('span')
    const messageTime = document.createElement('span')
    const messageText = document.createElement('p')

    messageEmail.innerText = data.email + '     '
    messageText.innerText = data.msg
    messageTime.innerText = data.time

    messageEmail.setAttribute('class', 'text')

    pContainer.appendChild(messageEmail)
    pContainer.appendChild(messageTime)
    messageContainer.appendChild(pContainer)
    messageContainer.appendChild(messageText)

    allMessages.appendChild(messageContainer)
})

