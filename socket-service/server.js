// const WebSocket = require('ws');
var fs = require('fs')
const {createServer} = require('http')
const {createServerFrom} = require('wss')

// const https = createServer({
// 	key: fs.readFileSync('key.pem'),
// 	cert: fs.readFileSync('cert.pem'),
// 	NPNProtocols: ['http/1.1', 'http/1.0']
// })

const http = createServer()

createServerFrom(http, function connectionListener (ws) {
	console.log('new connection');
  ws.send('welcome!')

  ws.on('message', (data) => {
  	console.log('message: %s', data);
    ws.send(data.toString()) // echo-server 
  })
})
.listen(8080, function () {
  const {address, port} = this.address() // this is the http[s].Server 
  console.log('listening on http://%s:%d (%s)', /::/.test(address) ? '0.0.0.0' : address, port)
})


// const wss = new WebSocket.Server({
// 	port: 8080,
// 	hostname: '0.0.0.0'
// });

// console.log('started');
// wss.on('connection', function connection(ws) {
// 	console.log('new connection');

//   ws.on('message', function incoming(message) {
//     console.log('received: %s', message);
//   });
 
//   // ws.send('something');
// });
