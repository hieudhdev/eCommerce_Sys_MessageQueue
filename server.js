'use strict'

const { 
    consumerToQueue,
    consumerToQueueNormal,
    consumerToQueueFailed
} = require('./src/services/consumerQueue.service')

const queueName = 'HardQueueName'

// consumerToQueue(queueName).then(() => {
//     console.log(`Message consumer started: ${queueName}`)
// }).catch((err) => {
//     console.log(err)
// })

consumerToQueueNormal(queueName).then(() => {
    console.log(`Message consumerToQueueNormal started: ${queueName}`)
}).catch((err) => {
    console.log(err)
})

consumerToQueueFailed(queueName).then(() => {
    console.log(`Message consumerToQueueFailed started: ${queueName}`)
}).catch((err) => {
    console.log(err)
})
