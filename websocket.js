const WebSocket = require('ws')
const http = require('http')
const server = http.createServer()
const wss = new WebSocket.Server({ server })

wss.on('connection', (ws) => {
  console.log('Player connected')

  // Handle messages from players
  ws.on('message', (message) => {
    console.log(`Received message: ${message}`)
  })

  ws.on('close', () => {
    console.log('Player disconnected')
  })
})

// Start the server
server.listen(3000, () => {
  console.log('Server listening on http://localhost:3000')
})
