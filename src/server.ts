import * as dotenv from 'dotenv'
import http from 'http'
import app from './app'
dotenv.config()

const port = process.env.PORT || '5000'

const server = http.createServer(app)
server.listen(port, () => {
    console.log(`Server beautifully started on port ${port} 🚀`)
})

