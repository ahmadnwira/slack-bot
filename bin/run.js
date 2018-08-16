const http = require('http');
const service = require('../server/service');

const server = http.createServer(service);
server.listen(3000);

server.on('listening', () => {
    console.log(`server in on port ${server.address().port} in ${service.get('env')} mode.`);
});