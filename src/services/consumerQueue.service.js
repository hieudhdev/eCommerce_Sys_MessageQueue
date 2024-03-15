'use strict'

const { 
    connectToRabbitMQ,
    consumerQueue
} = require('../dbs/init.rabbitmq')

const messageServices = {
    
    consumerToQueue: async (queueName) => {
        try {
            const { channel } = await connectToRabbitMQ()
            await consumerQueue(channel, queueName)
        } catch (err) {
            console.log(`Error consumerQueue: `, err)
        }
    },

    // case processing
    consumerToQueueNormal: async (queueName) => {
        try {
            const { channel } = await connectToRabbitMQ()
            const notiQueue = 'notiQueueProcess'
            
            setTimeout(() => {
                channel.consume(notiQueue, msg => {
                    console.log(`SEND notiQueue process successfully:: ${msg.content.toString()}`)
                    channel.ack(msg)
                })
            }, 15000)
        
        } catch (err) {
            console.log(err)
            throw err
        }
    },

    // case failed processing
    consumerToQueueFailed: async (queueName) => {
        try {
            const { channel, connection } = await connectToRabbitMQ()
            const notiExchangeDLX = 'notiExchangeDLX'       // exchange for Dead Leter
            const notiRoutingKeyDLX = 'notiRoutingKeyDLX'   // routing-key is route
            const notiQueueHandler = 'notiQueueHotFix'      // queue for dead messages

            // 1. create exchange
            await channel.assertExchange(notiExchangeDLX, 'direct', {
                durable: true
            })

            // 2. create queue
            const queueResult = await channel.assertQueue(notiQueueHandler, {
                exclusive: false
            })

            // 3. bind queue
            await channel.bindQueue(queueResult.queue, notiExchangeDLX, notiRoutingKeyDLX)

            // 4. receive dead massage
            await channel.consume(queueResult.queue, msgFail => {
                console.log(`There's the Noti fail, pls hot fix:: ${msgFail.content.toString()}`)
            }, {
                noAck: true
            })

        } catch (err) {
            console.log(err)
            throw err
        }
    },

}

module.exports = messageServices