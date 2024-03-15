'use strict'

const amqp = require('amqplib')

const connectToRabbitMQ = async () => {
    try {   
        const connection = await amqp.connect('amqp://guest:guest@localhost')
        if (!connection) throw new Error('Connection RabbitMQ fail')

        const channel = await connection.createChannel()

        return {connection, channel}
    } catch (err) {
        console.log(err)
    }
}

const TestConnectToRabbitMQ = async () => {
    try {
        const {connection, channel} = await connectToRabbitMQ()

        // push message
        const channelName = 'testMQ'
        const message = 'danghieuyt2@gmail.com'
        await channel.assertQueue(channelName)    // create a queueName or check channel exist or not?
        await channel.sendToQueue(channelName, Buffer.from(message))

        // close connection
        await connection.close()

    } catch (err) {
        console.log(`Connect RabbitMQ fail: `, err)
    }
}

const consumerQueue = async (channel, queueName) => {
    try {
        await channel.assertQueue(queueName, {durable: true})
        console.log(`Waiting for mesaage...`)

        await channel.consume(queueName, (msg) => {
            console.log(`Received message from ${queueName}: `, msg.content.toString())
        }, {
            noAck: true 
        })
    } catch (err) {
        console.log(`Publish message to rabbitMQ fail`, err)
        throw err
    }
}

module.exports = {
    connectToRabbitMQ,
    TestConnectToRabbitMQ,
    consumerQueue
}