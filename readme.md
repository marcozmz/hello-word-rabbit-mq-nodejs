# Projeto Exemplo: RabbitMQ "Olá Mundo" com Node.js

Este projeto demonstra um exemplo simples de envio e recebimento de mensagens usando RabbitMQ com Node.js, utilizando a biblioteca [amqplib](https://www.npmjs.com/package/amqplib).

## Pré-requisitos

- [Node.js](https://nodejs.org/) instalado
- [RabbitMQ](https://www.rabbitmq.com/download.html) instalado e em execução localmente (porta padrão 5672)
- Instalar as dependências do projeto:

```bash
npm install amqplib
```

## Estrutura dos arquivos

- `src/send.js` — Envia uma mensagem para a fila `hello`
- `src/receive.js` — Consome mensagens da fila `hello`

## Como executar

1. **Inicie o consumidor** (para receber mensagens):

   ```bash
   node src/receive.js
   ```

   Você verá no terminal:
   ```
   [*] Waiting for messages in hello. To exit press CTRL+C
   ```

2. **Envie uma mensagem**:

   Em outro terminal, execute:

   ```bash
   node src/send.js
   ```

   Você verá:
   ```
   [x] Sent Hello world
   ```

   E no terminal do consumidor:
   ```
   [x] Received Hello world
   ```

## Observações

- A fila `hello` não é durável (`durable: false`), ou seja, será perdida se o RabbitMQ for reiniciado.
- O projeto utiliza a API de callbacks do amqplib para simplicidade.

## Referências

- [RabbitMQ Tutorials - Hello World](https://www.rabbitmq.com/tutorials/tutorial-one-javascript.html)