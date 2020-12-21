const socket = io('http://localhost:5001')
const messageContainer = document.getElementById('message-container')
const messageForm = document.getElementById('send-container')
const messageInput = document.getElementById('message-input')
const showname = document.getElementById('showname');
const feedback = document.getElementById('feedback');


const d = new Date();
const date =d.toLocaleString();





const messages = {}

function onMessage (data) {
  if (messages[data.id]) {
    messages[data.id].messages.push({message: data.message, date: data.date})

  } else {
    messages[data.id] = {
      name: data.name,
      messages: [{message: data.message, date: data.date}]
    }
  }
}

socket.on('chat-message', data => {
  feedback.innerHTML="";
  //appendMessage(`${data.name}: ${data.message}: ${date}`)
  data.date = date
  onMessage(data)
  drawMessageBoxes()
})

//socket.on('connect', () => {
  
//});
const name = showname.innerHTML;
socket.emit('online_user', name)
socket.on('user-connected', name => {
  
  appendMessage(`${name} connected`)
  
})

socket.on('user-disconnected', name => {
  //appendMessage(`${name} disconnected`)
  
})

 
messageInput.addEventListener('keypress', function(){
  socket.emit('typing', showname.innerHTML)
})

socket.on('typing', function(name){
  
  feedback.innerHTML = '<p><em>' + name + ' is typing a message..</em></p>';
})

messageForm.addEventListener('submit', e => {
  e.preventDefault()
  const message = messageInput.value
  appendMessage(`You: ${message} ${date}`)
  
  socket.emit('send-chat-message', {message, showname: showname.innerHTML} )
  messageInput.value = ''
  
})



function appendMessage(sendmessage) {
  const messageElement = document.createElement('div')
  messageElement.innerText = JSON.stringify(sendmessage)
  messageContainer.append(messageElement)
  messageElement.setAttribute("class", 'your-message')
}


function drawMessageBoxes() {

  Object.keys(messages).forEach(key => {
    const listMessages = messages[key].messages 
    
    console.log(messages)
    const element = document.getElementById(key)
    
    if(element){
    
      const lastMessage = messages[key].messages.pop()
      const messageList = document.getElementById(key + 'ul')
      const mes = document.createElement('li')
      mes.innerText = lastMessage.message + ': ' + lastMessage.date
      messageList.appendChild(mes)
      
    }else{ 
      console.log(key, 'drawMessageBoxes')
      
      const messageDiv = document.createElement('div')
      messageContainer.append(messageDiv)
      messageDiv.setAttribute("id", key)
      messageDiv.setAttribute("class", 'list-wrapper')
      console.log(messageDiv)
      const messageList = document.createElement('ul')
      messageList.innerText = messages[key].name
      messageList.setAttribute('id', key + 'ul')
      messageDiv.appendChild(messageList)
      const mes = document.createElement('li')
      mes.innerText = messages[key].messages[0].message + ': ' + messages[key].messages[0].date
      messageList.appendChild(mes)

    }
  })
}