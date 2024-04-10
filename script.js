const text = document.querySelector(".text")
const sample = "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolor quasi provident a perferendis unde quidem, qui odit omnis est officiis illo, corrupti at blanditiis iusto voluptatibus, nesciunt temporibus? Perspiciatis ratione officiis voluptatem adipisci consequatur esse temporibus obcaecati necessitatibus labore accusantium."

sample.split("").forEach(el => {
  const span = document.createElement("span")
  span.textContent = el
  span.classList = "letter border border-transparent"
  text.appendChild(span)
})

const letters = document.querySelectorAll(".letter")
const joinBtn = document.querySelector(".join-btn")
const createBtn = document.querySelector(".create-btn")
const socket = new WebSocket('ws://localhost:3000')
let cursor = 0

window.addEventListener("keydown", e => {
  if(e.key == letters[cursor].textContent) {
    letters[cursor].classList.add("text-white", "bg-green-500")
    cursor++
  }
  sendData(cursor)
})

socket.addEventListener('open', (event) => {
  console.log('Connected to the server', event)
})

socket.addEventListener('message', (event) => {
  console.log(event.data)
})

function sendData(data) {
  if (socket.readyState === WebSocket.OPEN) {
    socket.send(data)
  } else {
    console.error('WebSocket connection is not open')
  }
}


// Game UI
//  -User and enemy screen
// Result modal
//  -Reset game
//  -New game
// Get random paragraphs 
// Websocket data
//  -cursor