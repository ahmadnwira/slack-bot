const axios = require('axios');

class WitCleint {

    constructor(token) {
        this.token = token;
    }

    ask(query, cb) {
        axios.get(`https://api.wit.ai/message?v=20180817&q=${query}`, {
                'headers': {
                    'Authorization': "Bearer ZXLKRJXJCPDC466FABJJZ4STFRDHJGVA"
                }
            })
            .then(response => {
                if (!response.data.entities.intent) {
                    cb('I don\'t understand.');
                }
                cb(null, response.data.entities.intent);
            })
            .catch(error => {
                cb(error);
            });
    }
}

module.exports = {
    WitCleint
}