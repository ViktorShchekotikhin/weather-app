const request = require('request');

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1Ijoic2hjaGVrb3Rpa2hpbiIsImEiOiJjancwenNxbmowZmQ4NDVrdDRqd25paDl4In0.JV5JB7doe8c97-LP5rMGzA&lan&limit=1&language=uk`;
    request({ url, json: true }, (err, {body} ={}) => {
        if (err) {
            callback('Unable connect to map service!', undefined);
        } else if (body.features.length === 0) {
            callback('Can`t find location', undefined);
        } else {
            const {center, place_name} = body.features[0];
            callback(undefined, {
                latitide: center[1],
                longitude: center[0],
                place_name
            })
        }
    })
}
module.exports = geocode;