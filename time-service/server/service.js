const express = require('express');
const axios = require('axios');

const service = express();

service.get('/service/:region/:city', (req, res) => {
    const location = req.params.region + '/' + req.params.city;
    axios.get(`https://timezoneapi.io/api/timezone/?${location}`)
        .then(response => response.data)
        .then(data => {
            res.json({msg: data.data.datetime.date_time_txt});
        })
        .catch(err => {
            res.json({msg: 'time service is not available write now'});
        })
});

module.exports = service;