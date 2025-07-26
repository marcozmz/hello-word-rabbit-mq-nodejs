const amqp = require('amqplib/callback_api');

// Conecta ao RabbitMQ na porta padrão (5672) do localhost
// A função de callback recebe dois parâmetros: error0 e connection
amqp.connect('amqp://localhost', function (error0, connection) {
  if (error0) throw error0;

  // Cria um canal de comunicação com o RabbitMQ
  // A função de callback recebe dois parâmetros: error1 e channel
  connection.createChannel(function (error1, channel) {
    if (error1) throw error1;

    // Declara uma fila chamada 'hello'
    // A fila é onde as mensagens serão enviadas e recebidas
    const queue = 'hello'; // ✅ Declare aqui

    // Assegura que a fila existe
    // O parâmetro { durable: false } indica que a fila não deve persistir após o RabbitMQ ser reiniciado
    // Isso significa que as mensagens na fila serão perdidas se o RabbitMQ for reiniciado
    channel.assertQueue(queue, { durable: false });

    // Imprime no console que está aguardando mensagens na fila
    // O parâmetro 'queue' é a fila onde as mensagens serão recebidas
    console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue); // ✅ Agora funciona

    // Consome mensagens da fila
    // O método consume recebe dois parâmetros: a fila e uma função de callback
    channel.consume(queue, function (msg) {
      
      // Imprime no console a mensagem recebida
      // msg.content.toString() converte o buffer da mensagem em uma string
      console.log(" [x] Received %s", msg.content.toString());
    }, {
      
      // O parâmetro noAck: true indica que as mensagens não precisam ser confirmadas
      // Isso significa que o RabbitMQ não espera uma confirmação de recebimento da mensagem
      noAck: true
    });
  });
});
