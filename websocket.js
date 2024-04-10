const WebSocket = require('ws')
const http = require('http')
const server = http.createServer()
const wss = new WebSocket.Server({ server })

let players = []

wss.on('connection', (ws) => {
  console.log('Player connected')

  // Handle messages from players
  ws.on('message', (message) => {
    console.log(`Received message: ${message}`)
    const splitMessage = JSON.parse(message).split("-")

    if(splitMessage[0] == "Join") {
      // if room is more than 2 client reject, else add
      const roomID = splitMessage[1]

      if(players.filter(el => el.roomID == roomID).length == 2) {
        ws.send("Room Full!")
      } else {
        players.push({user: ws, roomID})
      }
      
    }

    if(splitMessage[0] == "Create") {
      // if room is more than 2 client reject, else add
      const roomID = splitMessage[1]
      console.log("Create", roomID)
      
      if(players.find(el => el.roomID == roomID)) {
        ws.send("Room Already Created!")
      } else {
        players.push({user: ws, roomID})
      }
      players.push({user: ws, roomID})
    }

    // Send cursor data based on room id
    if(splitMessage[0] == "Room") {
      const roomID = splitMessage[1]
      const cursor = splitMessage[2]
    }
  })

  ws.on('close', () => {
    // remove player if disconnected
    players = players.filter(el => el.user != ws)
    console.log('Player disconnected')
  })
})

// Start the server
server.listen(3000, () => {
  console.log('Server listening on http://localhost:3000')
})
