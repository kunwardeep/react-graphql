var data = require('./data.json')
var express = require('express')
const app = express()
const port = 3000
app.set('json spaces', 2)

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function (req, res) {
  res.json(data)
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
