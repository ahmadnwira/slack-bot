const http = require('http');
const axios = require('axios');
const service = require('../server/service');

const server = http.createServer(service);
server.listen(3030);

server.on('listening', () => {
    console.log(`time-service is listening on port ${server.address().port} in ${service.get('env')} mode.`);

    let announce = () => {
        axios.put(`http://localhost:3000/service/time/${server.address().port}`)
            .then(res => console.log(res.data))
            .catch(err => {
                console.log('Failed to connect to main application');
            });
    }

    announce();
    setInterval(announce, 3000);
});