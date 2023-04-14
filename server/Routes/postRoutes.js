import express from 'express'
import { Configuration, OpenAIApi } from 'openai'

const router = express.Router()

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
})
const openai = new OpenAIApi(configuration)

router.get('/', (req, res) => {
    res.json("post route")
})

export default router
