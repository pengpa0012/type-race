const text = document.querySelector(".text")
const enemyText = document.querySelector(".enemy-text")
const sample = "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolor quasi provident a perferendis unde quidem, qui odit omnis est officiis illo, corrupti at blanditiis iusto voluptatibus, nesciunt temporibus? Perspiciatis ratione officiis voluptatem adipisci consequatur esse temporibus obcaecati necessitatibus labore accusantium."

// generate text for 2 client
generateLetters(sample, false, text)
generateLetters(sample, true, enemyText)

const letters = document.querySelectorAll(".letter")
const enemyLetters = document.querySelectorAll(".enemy-letter")
const joinBtn = document.querySelector(".join-btn")
const gameUI = document.querySelector(".game-ui")
const startMenu = document.querySelector(".start-menu")
const loader = document.querySelector(".loader")
const createBtn = document.querySelector(".create-btn")
const roomInput = document.querySelector(".room-input")
const roomIDText = document.querySelector(".room-id")
const socket = new WebSocket('ws://localhost:3000')
const wrongSFX = new Audio("./assets/wrong-sfx.mp3")
let cursor = 0
let roomID, gameStart



window.addEventListener("keydown", e => {
  if(!roomID || e.key == "Shift") return
  if(e.key == letters[cursor].textContent) {
    letters.forEach(el => el.classList.remove("current-cursor"))
    letters[cursor].classList.add("text-white", "bg-green-500")
    if(cursor + 1 != letters.length) letters[cursor+1].classList.add("current-cursor")
    cursor++
  } else {
    wrongSFX.play()
  }

  sendData(JSON.stringify(`Room-${roomID}-${cursor}`))

  if(cursor == letters.length) {
    alert("You win!")
    sendData(JSON.stringify(`Winner-${roomID}`))
    gameStart = false
    startMenu.classList.remove("hidden")
    gameUI.classList.add("hidden")
  }
})

joinBtn.addEventListener("click", () => enterRoom(true))
createBtn.addEventListener("click", () => enterRoom(false))

function enterRoom(join) {
  if(!roomInput.value && !gameStart) return
  sendData(JSON.stringify(`${join ? "Join" : "Create"}-${roomInput.value}`))
  roomInput.value = ""
  loader.classList.remove("hidden")
}

socket.addEventListener('open', (event) => {
  console.log('Connected to the server', event)
})

socket.addEventListener('message', (event) => {
  if(event.data.includes("Joined") || event.data.includes("Created")) {
    roomID = event.data.split("-")[1]
    roomIDText.textContent = `Room ID: ${roomID}`
  } else if(event.data.includes("Game Start!")) {
    gameStart = true
    loader.classList.add("hidden")
    startMenu.classList.add("hidden")
    gameUI.classList.remove("hidden")
  } else if(event.data.includes("Room Full!") || event.data.includes("Room does not exist!") || event.data.includes("Other player win!")) {
    alert(event.data)
    loader.classList.add("hidden")
    startMenu.classList.remove("hidden")
    gameUI.classList.add("hidden")
  } else {
    // other client current cursor
    enemyLetters[event.data - 1].classList.add("text-white", "bg-green-500")
  }
})

function sendData(data) {
  if (socket.readyState === WebSocket.OPEN) {
    socket.send(data)
  } else {
    console.error('WebSocket connection is not open')
  }
}

function generateLetters(arr, enemy, parent) {
  arr.split("").forEach((el, i) => {
    const letter = document.createElement("letter")
    letter.textContent = el
    letter.classList = `${enemy ? "enemy-letter" : "letter"} ${(i == 0 && !enemy) && "current-cursor"} border border-transparent`
    parent.appendChild(letter)
  })
}

// Get random paragraphs (API)
// Update style
// Animations