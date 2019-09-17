const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
const port = process.env.PORT || 3001

app.use(bodyParser.json())
app.use(cors())
app.use(bodyParser.urlencoded({
  extended: false
  })
)

const userActions = require('./actions/actions.js')

app.use('/users', userActions)

app.listen(port, function() {
  console.log('Server is running on port: ' + port)
})