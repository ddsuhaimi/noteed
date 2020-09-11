const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const passport = require('passport')
require('dotenv').config()

const usersRoute = require('./routes/api/users')
const notesRoute = require('./routes/api/notes')

const app = express()

app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json())

const db = process.env.DB_HOST

mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("MongoDB connected")
}).catch(err => {
    console.error(err)
})

app.use(passport.initialize())

require('./config/passport')(passport)

app.use('/api/users', usersRoute)
app.use('/api/notes', notesRoute)

const port = process.env.PORT || 5000
app.listen(port, () => console.log(`Server and database running on ${port}`)) 