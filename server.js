//load all envirement varaible from .env
require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const port = 3000 || process.env.PORT
app.use(
    cors({
        origin:'http://127.0.0.1:5500',
        credentials: true    
    })
)

//connection with mongodb
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', (error) => console.log('connected to database'))

app.use(express.json())

const iceRouter = require('./routes/ice')
app.use('/ice', iceRouter)

app.listen(port, () => {
    console.log('server started')
})