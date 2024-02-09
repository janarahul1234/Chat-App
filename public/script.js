const socket = io()

const messageForm = document.querySelector('.message-box__from')
const messageArea = document.querySelector('.message-area')
const messageInput = document.querySelector('#message_input')
const sendButton = document.querySelector('#send-button')

sendButton.style.display = 'none'

messageInput.addEventListener('input', (e) => {
    sendButton.style.display = messageInput.value === '' ? 'none' : 'block'
})

let name

do {
    name = prompt('Enter your name')
} while ( ! name)

messageForm.addEventListener('submit', (e) => {
    e.preventDefault()

    if (messageInput.value !== '') {
        sendMessage(messageInput.value)
    }

    messageInput.value = ''
})

const sendMessage = (message) => {
    let msg = {
        username: name,
        text: message.trim()
    }

    appendMessage(msg, 'outgoing')
    scrollMessage()

    socket.emit('message', msg)
}

const appendMessage = (message, type) => {
    let messageDiv = document.createElement('div')
    let className = type

    messageDiv.classList.add('message', `message--${className}`)

    let markup = `
        <div class="message__username">
            ${message.username}
        </div>
        <div class="message__text">
            ${message.text}
        </div>
    `

    messageDiv.innerHTML = markup
    messageArea.appendChild(messageDiv)
}

socket.on('message', (message) => {
    appendMessage(message, 'incoming')
    scrollMessage()
})

const scrollMessage = () => {
    messageArea.scrollTop = messageArea.scrollHeight
}