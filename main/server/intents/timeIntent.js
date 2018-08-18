const axios = require('axios');

module.exports.process = (intentData, cb) => {
    // check if this is time intent
    if (intentData.intent[0].value != 'time') {
        cb(new Error(`Expected time intent instead, got ${a.intent[0].value}`))
    }
    if (!intentData.location) {
        cb(new Error('Missing location in time intent'))
    }

    const location = intentData.location[0].resolved.values[0].timezone;
    axios.get(`http://localhost:3030/service/${location}`)
        .then(res => res.data.msg )
        .then(msg => {
            cb(null, `time at ${location} is ${msg}`);
        })
        .catch(err => {
            console.log(err)
        });
}