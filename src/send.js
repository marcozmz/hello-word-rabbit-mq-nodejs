//importa o amqplib para usar RabbitMQ
//amqplib é uma biblioteca para trabalhar com RabbitMQ em Node.js
//coloca a ampq em uma constante
const amqp = require('amqplib/callback_api');

//conecta ao RabbitMQ na porta padrão (5672) do localhost
//a função de callback recebe dois parâmetros: error0 e connection
amqp.connect('amqp://localhost', function (error0, connection) {
  
  //se houver um erro na conexão, lança o erro
  if (error0) throw error0;

  //cria um canal de comunicação com o RabbitMQ
  //a função de callback recebe dois parâmetros: error1 e channel
  connection.createChannel(function (error1, channel) {
    
    //se houver um erro ao criar o canal, lança o erro
    if (error1) throw error1;

    //declara uma fila chamada 'hello'
    //a fila é onde as mensagens serão enviadas e recebidas
    const queue = 'hello';
    
    //cria a msg que é a mensagem que será enviada
    //a mensagem é uma string que será convertida em buffer
    const msg = 'Hello world';

    //no canal, assegura que a fila existe
    //o parâmetro { durable: false } indica que a fila não deve persistir após o RabbitMQ ser reiniciado
    //isso significa que as mensagens na fila serão perdidas se o RabbitMQ for reiniciado
    channel.assertQueue(queue, { durable: false });

    //envia a mensagem para a fila
    //o método sendToQueue envia a mensagem para a fila especificada
    channel.sendToQueue(queue, Buffer.from(msg));

    //imprime no console que a mensagem foi enviada
    console.log(" [x] Sent %s", msg);

    //fecha a conexão após um curto período de tempo
    //isso é feito para garantir que a mensagem seja enviada antes de fechar a conexão
    setTimeout(function () {
      
      //fecha a conexão com o RabbitMQ
      //isso é importante para liberar recursos e evitar vazamentos de memória
      connection.close();
      
      //encerra o processo Node.js
      //isso é feito para garantir que o script termine após enviar a mensagem
      process.exit(0);
    }, 500);
  });
});
