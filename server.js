const http = require('http');
const WebSocket = require('ws');

const server = http.createServer();
const wss = new WebSocket.Server({ server });

// Arduino WebSocket clientt
const WebSocketClient = require('websocket').client;
const webSocketClient = new WebSocketClient();

webSocketClient.on('connectFailed', function (error) {
    console.log('WebSocket connect error: ' + error.toString());
});

webSocketClient.on('connect', function (connection) {
    console.log('WebSocket client connected');

    wss.on('connection', function (ws) {
        console.log('Websocket server connected');

        ws.on('message', function (message) {
            console.log('Received message:', message);

            if (message === 'turn-on') {
                console.log('Turning LED on...');
                connection.sendUTF('on');
            } else if (message === 'turn-off') {
                console.log('Turning LED off...');
                connection.sendUTF('off');
            }
        });
    });
});

webSocketClient.connect('ws://127.0.0.1:1000/', '');



server.listen(1000, () => {
    console.log('Server listening on port 1000.');
});
