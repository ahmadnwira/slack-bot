const http = require('http');
const service = require('../server/service');
const slackClient = require('../server/slackClient');

const token = "YOUR-BOT-OAuth-Token";

const rtm = slackClient.rtmFatory(token, 'debug');
rtm.start();

const server = http.createServer(service);

// start slack only if authenticated
slackClient.addAuthenticatedHandler(rtm, () => server.listen(3000) );

server.on('listening', () => {
    console.log(`server in on port ${server.address().port} in ${service.get('env')} mode.`);
});