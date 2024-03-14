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
        await channel.assertQueue(channelName)    // check channel exist or not?
        await channel.sendToQueue(channelName, Buffer.from(message))

        // close connection
        await connection.close()

    } catch (err) {
        console.log(`Connect RabbitMQ fail: `, err)
    }
}

module.exports = {
    connectToRabbitMQ,
    TestConnectToRabbitMQ
}