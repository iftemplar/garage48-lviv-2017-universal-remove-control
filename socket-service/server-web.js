const express = require('express')
const app = express()
const https = require('https')
const http = require('http')
const fs = require('fs')
const port = 3000

app.get('/', (req, res) => {
  res.send('WORKING!')
})

app.get('/api/v1/test', (req, res) => {
  console.log('/api/v1/test')
  res.send('works!')
})

// const httpsOptions = {
//   key: fs.readFileSync('./key.pem'),
//   cert: fs.readFileSync('./cert.pem')
// }
// httpsOptions
const server = http.createServer(app).listen(port, () => {
  console.log('server running at ' + port)
})
