import express from 'express'
import cors from 'cors'
import * as dotenv from 'dotenv'
import connectDB from './db/connect.js'

import postRoutes from './Routes/postRoutes.js'
import dalleRoutes from './Routes/dalleRoutes.js'

dotenv.config()

const app = express()
app.use(express.json({ limit: '50mb' }))
app.use(cors())

app.use('/api/v1/post', postRoutes)
app.use('/api/v1/dalle', dalleRoutes)

app.get('/', (req, res) => {
    res.json("Hello world!")
})

const startServer = async () => {
    try {
        connectDB(process.env.MONGO_URI)
        app.listen(3000, '0.0.0.0', () => console.log('server running on port 3000...'))
    }
    catch (err) {
        console.log(err)
    }
}
startServer()
