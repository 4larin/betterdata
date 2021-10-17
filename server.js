const express = require('express')
const mongoose = require('mongoose')
const helmet = require('helmet')
const debug = require('debug')('app:development')
const debugDB = require('debug')('app:database')
const debugHttp = require('debug')('app:http')
const config = require('config')
const morgan = require('morgan')
const dotenv = require('dotenv')

// Routes
const projects = require('./routes/projects')



debug(`Application Name: ${config.get('name')}`)

const DBAccess = config.get('database.connectionString')
mongoose.connect(DBAccess)
    .then(() => console.log("Connected to MongoDB..."))
    .catch((err) => console.log(err))

dotenv.config()

const app = express()

const enviroment = app.get('env')



if (enviroment === 'development') {
    app.use(morgan("dev", { stream: { write: msg => debugHttp(msg) } }))
    debug('Morgan enabled...')
}


app.use(helmet())
app.use(express.json())
app.use(express.static('public'))

app.use('/', projects)

const port = config.get('port')

app.listen(port, () => console.log(`Listening on port ${port}`))