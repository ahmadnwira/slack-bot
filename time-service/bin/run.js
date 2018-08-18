const http = require('http');
const service = require('../server/service');


const server = http.createServer(service);
server.listen(3030);

server.on('listening', () => {
    console.log(`time-service is listening on port ${server.address().port} in ${service.get('env')} mode.`);
});