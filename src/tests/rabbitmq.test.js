'use strict'

const {
    TestConnectToRabbitMQ
} = require('../dbs/init.rabbitmq.js')

test('Test RabbitMQ', async () => {
    const result = await TestConnectToRabbitMQ()
    expect(result).toBe(undefined)
})