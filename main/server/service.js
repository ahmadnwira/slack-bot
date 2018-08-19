const express = require('express');
const serviceRegistry = require('./serviceRegistry');

const service = express();
const registry = new serviceRegistry();

service.set('registry', registry);

service.put('/service/:intent/:port', (req, res)=>{
    const serviceIntent = req.params.intent;
    const servicePort = req.params.port;

    const serviceIP = req.connection.remoteAddress.includes('::')
    ? `[${req.connection.remoteAddress}]`
    : req.connection.remoteAddress

    registry.add(serviceIntent, serviceIP, servicePort);

    res.json({result: `${serviceIntent} at ${serviceIP}:${servicePort} `});
});

module.exports = service;