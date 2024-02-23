require('dotenv').config();

const amqp = require('amqplib');
const UsersService = require('./UsersService');
const CacheService = require('./CacheService');
const MailSender = require('./MailSender');
const Listener = require('./listener');

const init = async () => {
  const cacheService = new CacheService();
  const usersService = new UsersService();
  const mailSender = new MailSender();
  const listener = new Listener(cacheService, usersService, mailSender);

  const connection = await amqp.connect(process.env.RABBITMQ_SERVER);
  const channel = await connection.createChannel();

  await channel.assertQueue('auth:verify', {
    durable: true,
  });
  await channel.assertQueue('auth:forgot', {
    durable: true,
  });

  channel.consume('auth:verify', listener.listenVerify, { noAck: true });
  channel.consume('auth:forgot', listener.listenResetPassword, { noAck: true });
};

init();
