const http = require('http');
const service = require('../server/service');
const {WitCleint} = require('../server/witClient');
const slackClient = require('../server/slackClient');

const witToken = "ZXLKRJXJCPDC466FABJJZ4STFRDHJGVA";
const wit = new WitCleint(witToken);

const slackToken = "xoxb-417553210130-417117321872-npTQtPxaVFZswbsLUN0iDAsj";
const rtm = slackClient.rtmFatory(slackToken, 'debug', wit);
rtm.start();


const server = http.createServer(service);
// start express server only if authenticated
slackClient.addAuthenticatedHandler(rtm, () => server.listen(3000) );

server.on('listening', () => {
    console.log(`server is listening on port ${server.address().port} in ${service.get('env')} mode.`);
});