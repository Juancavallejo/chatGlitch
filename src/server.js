const express = require ("express");
const {Server} = require ("socket.io");

const app = express ();

const PORT = process.env.PORT || 8080

// Inicializar el servidor de websocket

// crea el servidor de express y lo cocola a funcionar en un puerto
const serverExpress = app.listen (8080, ()=> console.log (`Listening on port ${PORT}`));

// Servidor de webscoket y se coencta con el servidor de express
const io = new Server(serverExpress); 

// Se designa public como pagina del index
app.use (express.static(__dirname+"/public"));

const historicoMensajes = [];


io.on ("connection", (socket) => {
    console.log ("nuevo usuario conectado", socket.id)
    // Enviar a todos menos al socket que se conecta
    socket.broadcast.emit("newUser");
    socket.emit ("historial", 
    historicoMensajes)
    socket.on ("message", data => {
        console.log (data);
        historicoMensajes.push(data);
        // enviar el historial a todos. 
        io.sockets.emit ("historial", historicoMensajes)
    })
})