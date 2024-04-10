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
      if(players.find(el => el.roomID == roomID) == undefined) {
        ws.send("Room does not exist!")
      } else if(players.filter(el => el.roomID == roomID).length == 2) {
        ws.send("Room Full!")
      } else {
        players.push({user: ws, roomID})
        ws.send(`Room-${roomID}-Joined!`)
        if(players.filter(el => el.roomID == roomID).length == 2) {
          players.forEach(el => {
              if(el.roomID == roomID) {
                el.user.send("Game Start!")
              }
          })
        }
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
        ws.send(`Room-${roomID}-Created!`)
      }
    }

    // Send cursor data based on room id
    if(splitMessage[0] == "Room") {
      const roomID = splitMessage[1]
      const cursor = splitMessage[2]

      const findPlayer = players.find(el => el.user !== ws && el.roomID == roomID)
      findPlayer?.user?.send(cursor)
    }

    // Send other player win alert
    if(splitMessage[0] == "Winner") {
      const roomID = splitMessage[1]

      const findPlayer = players.find(el => el.user != ws && el.roomID == roomID)
      findPlayer.user.send("Other player win!")
      players = players.filter(el => el.roomID !== roomID)
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
