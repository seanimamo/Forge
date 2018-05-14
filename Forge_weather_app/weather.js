//this version of the app.js for our weather app uses promises built in using the axios package
//One of the big reasons people use promises instead of callbacks is that instead of nesting calls we can simply chain them together using promises.
const request = require('request');
const yargs = require('yargs');
const axios = require('axios');


//This is an example of use the axios alias for a get request, as you can see we simply call axios.get('url') instead.
//This is used often to keep our code looking clean.


//This wraps an axios request to an api within a promise returning function that we can easily call so that we can easily choose which address we want to fetch weather API data from.
var getAddressWeatherData = (address) =>{
    return new Promise((resolve,reject) => {
        var encodedAddress = encodeURIComponent(address);
        var geocideUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=AIzaSyBuZ0pYUdnlO6X9KukRNZbN4NFJE8sV7Z0`;

        axios.get(geocideUrl).then((response) =>{
            if (response.data.status ==='ZERO_RESULTS'){
                throw new Error('Unable to find that address.');
            }
            //prints formatted address obtained from our successful google api request
            console.log('successful results: ',response.data.results[0].formatted_address);
            //console.log(response.data)
            var lat = response.data.results[0].geometry.location.lat;
            var lng = response.data.results[0].geometry.location.lng;
            var darkskyWeatherURL = `https://api.darksky.net/forecast/f88a6f819f39df1c28dd43c33a05176d/${lat}, ${lng}`;
            return axios.get(darkskyWeatherURL);    
        }).then((response)=>{
            var temperature = response.data.currently.temperature;
            var actualTemperature = response.data.currently.apparentTemperature;
            console.log(`It is currently ${temperature} degrees here.`, `But it feels like ${actualTemperature} degrees.`);
            temperatureBlurb =  `It is currently ${temperature} degrees. But it feels like ${actualTemperature} degrees.`;
            resolve({
                temperature,
                actualTemperature,
                temperatureBlurb
            });
            //console.log(response.data);
        }).catch((e) =>{
            if (e.code ==='ENOTFOUND'){
                console.log("unable to connect to Google gecode API servers");
                console.log(e);
                reject(`Unable to connect to Google gecode API servers: ${e}` )
            }else if(e.code ==='ETIMEDOUT'){
                console.log("A timeout occured trying to connect to the api get url");
                console.log(e);
                reject(`A timeout occured trying to connect to the api get url: ${e}` );
            }
            else{
                //note that the e.message attribute is created when we throw our own custom errors. like we do in our .then((response) =>{ throw new Error('Unable to find that address.');})
                //this error object has only a full description of what the error was and then an error.message attribute which is the string you created when originally throwing the custom error.
                console.log('Error quick summary: ',e.message);
                reject(`Error quick summary:  ${e.message}` );
                //this will print the entire custom thrown error object which only includes an unamed attribute called message, which is a summary of the entire actual error message 
                //console.log(e);
            }
        });
    });
};






module.exports = {
    getAddressWeatherData
}
