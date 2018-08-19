const axios = require('axios');

module.exports.process = (intentData, registry, cb) => {
    if (intentData.intent[0].value != 'time') {
        cb(new Error(`Expected time intent instead, got ${a.intent[0].value}`))
    }
    if (!intentData.location) {
        cb(new Error('Missing location in time intent'))
    }

    const service = registry.get('time');
    const location = intentData.location[0].resolved.values[0].timezone;
    axios.get(`http://${service.ip}:${service.port}/service/${location}`)
        .then(res => res.data.msg )
        .then(msg => {
            cb(null, `time at ${location} is ${msg}`);
        })
        .catch(err => {
            console.log('what the hell')
    });
}