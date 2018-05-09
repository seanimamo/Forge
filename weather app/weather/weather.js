var request = require('request');
//39.10480320000001, -77.25201009999999
var getWeather = (lat, lng, callback) => {
    //darksky api sends a http 400 code when it runs into api problems
    request({
        url:`https://api.darksky.net/forecast/f88a6f819f39df1c28dd43c33a05176d/${lat}, ${lng}`,
        json: true
    }, (error, response, body) =>{
        if(!error && response.statusCode === 200){
            callback(undefined, {
                temperature : body.currently.temperature,
                actualTemperature : body.currently.apparentTemperature
            });   
        } else{
            callback(`error occured with darksky api.  status code: ${response.statusCode}, error: ${error}`);
        }
    
    
    
    });
}

module.exports.getWeather = getWeather;

