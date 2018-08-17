const { RTMClient } = require('@slack/client');

let addAuthenticatedHandler = (rtm, handler) => {
    rtm.on('authenticated', handler);
}

let rtmFatory = (token, logLevel) =>(
    new RTMClient(token, {logLevel: logLevel})
);

module.exports = {
    rtmFatory,
    addAuthenticatedHandler
}