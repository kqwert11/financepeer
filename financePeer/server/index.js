const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const fileUpload = require('express-fileupload');


const app = express()
const apiPort = 8080

const myUserRouter = require('./routes/user-router')

app.use(cors())

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(fileUpload());


app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use('/api', myUserRouter)

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))














