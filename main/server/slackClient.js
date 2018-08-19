const { RTMClient } = require('@slack/client');

let addAuthenticatedHandler = (rtm, handler) => {
    rtm.on('authenticated', handler);
}

let handleOnMessage = (message, rtm, nlp, registry) => {
    if (!message.subtype && message.user === rtm.activeUserId) {
        return;
    }
    nlp.ask(message.text, (err, res) => {
        if (err || !res.intent[0].value) {
            rtm.sendMessage("something went wrong try again later", message.channel);
            return;
        }

        const intent = require(`./intents/${res.intent[0].value}Intent.js`);
        intent.process(res, registry, (error, response) => {
            if (error) {
                console.log(error);
                return;
            }
            rtm.sendMessage(response, message.channel);
        });
    });
};


let rtmFatory = (token, logLevel, nlp, registry) => {
    const rtm = new RTMClient(token, {
        logLevel: logLevel
    });
    rtm.on('message', (message) => {
        handleOnMessage(message, rtm, nlp, registry)
    });
    return rtm;
};

module.exports = {
    rtmFatory,
    addAuthenticatedHandler
}