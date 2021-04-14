const express = require("express");
const app = express();
const websocket = require('ws');
const servidorWS = new websocket.Server({port: 8081});
const clients = new Set();

servidorWS.on('connection', ws => {
  ws.on('message', dato => {
    clients.add(ws);
    for(let client of clients) {
      console.log(clients.size);
      client.send(dato);
      // clients.delete(client);
    }
  });
});

// nuestra primera ruta
app.get('/quotes', (req, res) => {
  res.json([
    { text: "Quote 1", author: "Author 1" },
    { text: "Quote 2", author: "Author 2"}
  ])
})

app.listen(3000, () => console.log("Servidor listo ..."))