const amqp = require('amqplib');

let connection;
let channel;
const rabbitQueueUrl = "amqp://admin:password@localhost:5672"
const queueName = 'user-queue'

const initializeConnection = () => {
    return amqp.connect(rabbitQueueUrl)
}

const delay = async (seconds) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(), seconds * 1000)
    })
}

const run = async () => {
    connection = await initializeConnection()
    channel = await connection.createChannel()
    channel.assertQueue(queueName, {
        durable: true
    });

    for (let i = 0; i<= 10; i++) {
        const payload = {
            message: `welcome message ${i}`,
            name: `User ${i}`,
            age: i
        }
        console.log("sending")
        channel.sendToQueue(queueName, Buffer.from(JSON.stringify(payload)));
        await delay(1)
    }
    console.log("DONE")
}

run()

process.on('SIGINT', code => {
    connection.close()
    console.log(`Closing`);
    process.exit()
});