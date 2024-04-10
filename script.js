console.log("Hello World")
const text = document.querySelector(".text")
const sample = "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolor quasi provident a perferendis unde quidem, qui odit omnis est officiis illo, corrupti at blanditiis iusto voluptatibus, nesciunt temporibus? Perspiciatis ratione officiis voluptatem adipisci consequatur esse temporibus obcaecati necessitatibus labore accusantium."

sample.split("").forEach(el => {
  const span = document.createElement("span")
  span.textContent = el
  span.classList = "letter border border-transparent"
  text.appendChild(span)
})

const letters = document.querySelectorAll(".letter")
let cursor = 0

window.addEventListener("keydown", e => {
  if(e.key == letters[cursor].textContent) {
    letters[cursor].classList.add("text-white", "bg-green-500")
    cursor++
  }
})



// Menu UI
//  -Room input
// Game UI
//  -User and enemy screen
// Result modal
//  -Reset game
//  -New game
// Get random paragraphs 
// Websocket data
//  -cursor