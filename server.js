import amqp from 'amqplib/callback_api';
import bodyParser from 'body-parser';
import EventEmitter from 'events';
import express from 'express';
import socketIo from 'socket.io';
import routes from './routes/index.js';

const emitter = new EventEmitter();

function Server() {
    const port = process.env.PORT || 8000;

    const app = express();
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use('', routes);

    const server = require('http').Server(app);

    setupRabbitMqClient(process.env.RABBIT_MQ_HOST);
    setupWebsocketListener(server);

    server.listen(port);

    return app;
}

const setupWebsocketListener = (server) => {
    const io = socketIo(server);
    io.of('/api').on('connection', function(socket) {
        console.log('user connected');
        emitter.on('queue-updated', data => {
            socket.emit('queue-updated', { data });
        });
        emitter.on('history-updated', data => {
            socket.emit('history-updated', { data });
        });
    });
}

const setupRabbitMqClient = (rabbitMqHost) => {

    const subscribeTopic = (channel, exchange, callback) => {
        channel.assertExchange(exchange, 'fanout', { durable: false });
            channel.assertQueue('', {
              exclusive: true
            }, (error2, q) => {
                if (error2) {
                    throw error2;
                }
                channel.bindQueue(q.queue, exchange, '');
                channel.consume(q.queue, msg => {
                    if (msg.content) {
                        callback(msg.content.toString());
                    }
                }, { noAck: true });
            });
    }

    amqp.connect(`amqp://${rabbitMqHost}`, (error0, connection) => {
        if (error0) {
            throw error0;
        }

        let onQueueUpdate;

        connection.createChannel((error1, channel) => {
            if (error1) {
                throw error1;
            }

            subscribeTopic(channel, 'queue-updated', msg => {
                emitter.emit('queue-updated', JSON.parse(msg));
            });

            subscribeTopic(channel, 'history-updated', msg => {
                emitter.emit('history-updated', JSON.parse(msg));
            });
            
        });
    });
}

export default Server;
