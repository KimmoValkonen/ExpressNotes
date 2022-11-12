const express = require('express')
const app = express()
// HTTP GET request it will first check if the build directory contains a file
// corresponding to the request's address. If a correct file is found,
// express will return it.
app.use(express.static('build'))

// Cross-Origin Resource Sharing
const cors = require('cors')
// taking cors into use
app.use(cors())

// Trying to use '.env' file for PORT setting
console.log(require('dotenv').config())

let notes = [
  {
    id: 1,
    content: "HTML is easy",
    date: "2022-05-30T17:30:31.098Z",
    important: true
  },
  {
    id: 2,
    content: "Browser can execute only Javascript",
    date: "2022-05-30T18:39:34.091Z",
    important: false
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    date: "2022-05-30T19:20:14.298Z",
    important: true
  }
]

// requestLogger must be placed up here to be the first route
// in a file so that it can log all routes below!
const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

app.use(requestLogger)

app.use(express.json())

// Prevent favicon.ico 404 error
// Catch the favicon.ico request and send a 204 'No Content' status:
app.get('/favicon.ico', (req, res) => {
  res.status(204).end()
})

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/notes', (request, response) => {
  response.json(notes)
})

app.get('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  const note = notes.find(note => note.id === id)
  if (note) {
    response.json(note)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/notes/:id', (request, response) => {
  // console.log("Deleting id: " + request.params.id)
  const id = Number(request.params.id)
  notes = notes.filter(note => note.id !== id)

  response.status(204).end()
})

const generateId = () => {
  const maxId = notes.length > 0
    ? Math.max(...notes.map(n => n.id))
    : 0
  return maxId + 1
}

app.post('/api/notes', (request, response) => {
  const body = request.body
  // console.log(body)

  if (!body.content) {
    return response.status(400).json({
      error: 'content missing' 
    })
  }

  const note = {
    content: body.content,
    important: body.important || false,
    date: new Date(),
    id: generateId()
  }

  notes = notes.concat(note)

  response.json(note)
})

// unknownEndpoint must be placed down here
// in a file. It will then send response
// if none of the routes above didn't respond!
const unknownEndpoint = (request, response) => {
  response.status(404).send({
    error: 'unknown endpoint'
})
}

app.use(unknownEndpoint)

// When using PaaS (i.e. Platform as a Service) platform
// const PORT = 3001 needs to be defined as a environment variable
// because PaaS will check port from ENVIRONMENT VALUE: 'PORT'
// I set the port from '.env' and not from Operating System environment.
// If problems reading '.env' file or it's missing, fallback to default :3001
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})