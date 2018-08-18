module.exports.process = (intentData, cb) => {
    // check if this is time intent
    if (intentData.intent[0].value != 'time') {
        cb(new Error(`Expected time intent instead, got ${a.intent[0].value}`))
    }
    if(!intentData.location) {
        cb(new Error('Missing location in time intent'))
    }

    return cb(null, `i will get you time in ${intentData.location[0].resolved.values[0].timezone}`);
}