const express = require('express')
const app = express()
const https = require('https')
const fs = require('fs')
const port = 3000

app.get('/', (req, res) => {
  res.send('WORKING!')
})

const httpsOptions = {
  key: fs.readFileSync('./key.pem'),
  cert: fs.readFileSync('./cert.pem')
}
const server = https.createServer(httpsOptions, app).listen(port, () => {
  console.log('server running at ' + port)
})
