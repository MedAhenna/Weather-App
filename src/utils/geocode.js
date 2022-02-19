import request from "request"

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + ".json?access_token=pk.eyJ1IjoibWVkYWhlbm5hIiwiYSI6ImNrem45cTJxcDJ2b2Yyb255bTA3MXVhb3YifQ.q2pWfyjm81lDrJW3GgQyUQ&limit=1"

    request({ url: url, json: true }, (error, response) => {

        if (error) {
            callback("unable to connect to location services!", undefined)
        } else if (response.body.features.length === 0) {
            callback("Unbale to find location. Try another search", undefined)
        } else {
            callback(undefined, {
                latitude: response.body.features[0].center[0],
                longitude: response.body.features[0].center[1],
                location: response.body.features[0].place_name
            })
        }
    })
}

export default geocode