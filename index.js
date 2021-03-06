const express = require('express')
const app = express()
const http = require('http').createServer(app)
const port = process.env.port || 2525
const host = '127.0.0.1'
const { PubSub } = require('@google-cloud/pubsub')
const pubsub = new PubSub()
const dotenv = require('dotenv')
dotenv.config()
const swaggerJsdoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./api/swagger.json')

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

/**
 * @openapi
 * /:
 *  post:
 *    description: use to post email notification
 *    responses:
 *      '200':
 *        description: A successful published event
 */
app.post('/', async (req, res) => {
    try {
         const report = req.body
         await publishMessage(report)
         res.status(200).send()
    } catch(e) {
        console.log(e.message)
        res.status(500).json()
    }
})

const publishMessage = async (report) => {
    const buffer = Buffer.from(JSON.stringify(report))
    const messageId = await pubsub.topic(process.env.TOPIC).publish(buffer)
    console.log('confirmed ', messageId)
}

http.listen(port, host, () => {
    console.log(`microservice is started at http://${host}:${port} `)
})
