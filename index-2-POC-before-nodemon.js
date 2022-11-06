const express = require('express')
const app = express()

let notes = [
  ...
]

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/notes', (request, response) => {
  response.json(notes)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
// If we make changes to the application's code we have to restart the application
// in order to see the changes.We restart the application by first shutting it down
// by typing Ctrl + C and then restarting the application.Compared to the convenient
// workflow in React where the browser automatically reloaded after changes were made,
// this feels slightly cumbersome.
// The solution to this problem is nodemon
// nodemon will watch the files in the directory in which nodemon was started,
// and if any files change, nodemon will automatically restart your node application.
// Let's install nodemon:
// npm install --save-dev nodemon