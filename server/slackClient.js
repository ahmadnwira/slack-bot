const {
    RTMClient
} = require('@slack/client');

let addAuthenticatedHandler = (rtm, handler) => {
    rtm.on('authenticated', handler);
}

let handleOnMessage = (message, rtm, nlp) => {
    if (!message.subtype && message.user === rtm.activeUserId) {
        return;
    }

    nlp.ask(message.text, (err, res) => {
        if (err) {
            rtm.sendMessage("something went wrong try again later", message.channel);
        }
        if (res) {
            const msg = `i guess your talking about ${JSON.stringify(res)}`;
            rtm.sendMessage(msg, message.channel);
        }
    });
};


let rtmFatory = (token, logLevel, nlp) => {
    const rtm = new RTMClient(token, {
        logLevel: logLevel
    });
    rtm.on('message', (message) => { handleOnMessage(message, rtm, nlp) });
    return rtm;
};

module.exports = {
    rtmFatory,
    addAuthenticatedHandler
}