const request = require('request');
const yargs = require('yargs');

//geocode.js contains logic for making the google maps geocode api request
const geocode = require('./geocode/geocode.js');

//weather.js contains logic for fetching weather data from the darkskies api
const weather = require('./weather/weather.js');

//note the string: true in yargs.options makes sure yargs always parses the command line --address as a string
//note the .alias after .help() sets an alias for the help command line arguement
const argv = yargs
    .options({
        a:{
        demand:true,
        alias:'address',
        describe: 'Address to fetch weather data for',
        string: true
        }
    })
    .help()
    .alias('help','h')
    .argv;

//will be used to store lat ang lng data we get back from geocoding the given address
var lat, lng;

//here we call our custom function for api calling google maps geocode that even has its own callback for error and results handling.
//notice we chain our getWeather api call function directly after getting the lat and long data from the geocode api call.
geocode.geocodeAddress(argv.address, (errorMessage, geoResults) => {
    if(errorMessage){
        console.log(errorMessage);
    } else{
        console.log(`Welcome to ${geoResults.address}! The Latitude and Longitude of this location is: ${geoResults.latitude}, ${geoResults.longitude}`)

        weather.getWeather(geoResults.latitude, geoResults.longitude, (errorMessage, weatherResults) => {
            if(!errorMessage){
                console.log(`It is currently ${weatherResults.temperature} degrees here.`, `But it feels like ${weatherResults.actualTemperature} degrees.`);
            } else { console.log(errorMessage); }
        });
    }
});






//here we call our custom function for api calling darksky that even has its own callback for error and results handling.
// weather.getWeather(39.10480320000001, -77.25201009999999, (errorMessage, results) => {
//     if(!errorMessage){
//         console.log(JSON.stringify(results, undefined, 2));
//     } else{ console.log(errorMessage); }
// });
