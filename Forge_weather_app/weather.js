//this version of the app.js for our weather app uses promises built in using the axios package
//One of the big reasons people use promises instead of callbacks is that instead of nesting calls we can simply chain them together using promises.
const request = require('request');
const yargs = require('yargs');
const axios = require('axios');


//This is an example of use the axios alias for a get request, as you can see we simply call axios.get('url') instead.
//This is used often to keep our code looking clean.


//This wraps an axios request to an api within a promise returning function that we can easily call so that we can easily choose which address we want to fetch weather API data from.
//This function returns an object called addressWeatherData containing various weather information about the address
var getAddressWeatherData = async (address) =>{
        var encodedAddress = encodeURIComponent(address);
        var geocideUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=AIzaSyBuZ0pYUdnlO6X9KukRNZbN4NFJE8sV7Z0`;
        try{
            const geolocationData = await axios.get(geocideUrl);
            if (geolocationData.data.status ==='ZERO_RESULTS'){
                throw new Error('Unable to find that address.');
            }
            const weatherData = await axios.get(`https://api.darksky.net/forecast/f88a6f819f39df1c28dd43c33a05176d/${geolocationData.data.results[0].geometry.location.lat}, ${geolocationData.data.results[0].geometry.location.lng}`);
            //create object with data we want and return it
            return{
                address: geolocationData.data.results[0].formatted_address,
                lat: geolocationData.data.results[0].geometry.location.lat,
                lng: geolocationData.data.results[0].geometry.location.lng,
                temperature: weatherData.data.currently.temperature,
                apparentTemperature: weatherData.data.currently.apparentTemperature,
                maxTemp: weatherData.data.daily.data[0].temperatureMax,
                minTemp: weatherData.data.daily.data[0].temperatureMin,
                temperatureBlurb: `It is currently ${weatherData.temperature} degrees. But it feels like ${weatherData.apparentTemperature} degrees.`,
                shortSummary: weatherData.data.currently.summary,
                dailySummary: weatherData.data.daily.summary 
            }
        }catch(e){
            if (e.code ==='ENOTFOUND'){
                console.log("unable to connect to Google gecode API servers");
                console.log(e);
                throw new Error(`Unable to connect to Google gecode API servers: ${e}` )
            }else if(e.code ==='ETIMEDOUT'){
                console.log("A timeout occured trying to connect to the api get url");
                console.log(e);
                throw new Error(`A timeout occured trying to connect to the api get url: ${e}` );
            }
            else{
                //note that the e.message attribute is created when we throw our own custom errors. like we do in our .then((response) =>{ throw new Error('Unable to find that address.');})
                //this error object has only a full description of what the error was and then an error.message attribute which is the string you created when originally throwing the custom error.
                console.log('Error quick summary: ',e.message);
                throw new Error(`Error quick summary:  ${e.message}` );
                //this will print the entire custom thrown error object which only includes an unamed attribute called message, which is a summary of the entire actual error message 
                //console.log(e);
            }
            //throw new Error(`Something went wrong with the api data fetch: ${e}`);
        }
};

module.exports = {
    getAddressWeatherData
}

