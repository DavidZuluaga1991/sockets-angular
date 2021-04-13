const express = require("express");
const app = express();
const websocket = require('ws');
const servidorWS = new websocket.Server({port: 8081});


servidorWS.on('connection', function connection(ws) {
    console.log('Cliente conectado');
    ws.on('message', function incoming(dato) {
        console.log('Mensaje recibido: ' + dato);
        servidorWS.clients.forEach(function each(cliente) {
            console.log(cliente !== ws);
            if (cliente !== ws && cliente.readyState === websocket.OPEN) {
                console.log('Enviando Dato');
                cliente.send(dato);
            }
        });
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