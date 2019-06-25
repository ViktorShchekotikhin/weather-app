const request = require('request');

const forecast = (latitide, longtitude, callback) => {
    const url = `https://api.darksky.net/forecast/7a7fdebfbd03179567523ef4fcaaa22b/${encodeURIComponent(latitide)},${encodeURIComponent(longtitude)}?units=si&lang=uk`;
    request({ url, json: true }, (err, {body} ={}) => {
        if (err) {
            callback('Unable connect to map service!', undefined);
        } else if (body.error) {
            callback(body.error, undefined)
        } else {
            const {temperature,precipProbability,summary} = body.currently;
            callback(undefined, {
                temperature,
                precipProbability,
                summary
            })
        }
    })
}

module.exports = forecast;