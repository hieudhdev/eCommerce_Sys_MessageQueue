'use strict'

const mongoose = require('mongoose')
const connectStr = 'mongodb://localhost:27017/shopDev'

const testSchema = new mongoose.Schema({ name: String })
const testModel = mongoose.model('test', testSchema)

describe('MongoDB connection', () => {
    let connection

    beforeAll(async () => {
        connection = await mongoose.connect(connectStr)
    })

    afterAll(async () => {
        await connection.disconnect()
    })

    // Test 1: connection mongodb
    it('Should connect to mongodb', async () => {
        expect(mongoose.connection.readyState).toBe(1)
    })

    // Test 2: save a document
    it ('Should save a document to the database', async () => {
        const user = new testModel({ name: 'Hieu' })
        await user.save()

        // user.isNew = true (if user instance created but not saved in the database) 
        // user.isNew = false (if user instance created and saved in the database) 
        expect(user.isNew).toBe(false)  
    })

    // Test 3: find a document
    it ('Should find a document to the database', async () => {
        const findUser = await testModel.findOne({ name: 'Hieu' })

        expect(findUser).toBeDefined()
        expect(findUser.name).toBe('Hieu')  
    })

})