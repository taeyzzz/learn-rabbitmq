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

    channel.consume(queueName, async (msg) => {
        console.log("receive message")
        console.log(msg);
        const payload = JSON.parse(msg.content.toString())
        console.log(payload)
        channel.ack(msg);

    })
}

run()

process.on('SIGINT', code => {
    connection.close()
    console.log(`Closing`);
    process.exit()
});