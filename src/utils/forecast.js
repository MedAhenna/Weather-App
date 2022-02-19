import request from "request"

const forecast = ({ latitude, longitude }, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=ab2ae2b795d6319a3f1c8ea2a14a6367&query=' + latitude + ',' + longitude;

    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback("Unable to connect to weather service", undefined)
        } else if (response.body.error) {
            callback("Unable to find location", undefined)
        } else {
            callback(undefined, response.body.current.weather_descriptions[0] + '. It is currently ' + response.body.current.temperature + ' degrees out. It feels like ' + response.body.current.feelslike + ' degrees out.');
        }
    })
}

export default forecast