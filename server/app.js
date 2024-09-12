const jsonServer = require('json-server')
const cors = require('cors')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

// Set up CORS with custom headers
const corsOptions = {
  origin: 'http://localhost:8080', // Allow requests from this origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'] // Add 'foo' header or any other custom headers you're using
}

// Apply CORS options
server.use(cors(corsOptions))
server.use(middlewares)
server.use(router)

server.listen(3000, () => {
  console.log('JSON Server is running on http://localhost:3000')
})
