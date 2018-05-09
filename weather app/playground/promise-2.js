const request = require('request');

//This a custom version of geoCodeAddress using promices instead of a callback function
var geoCodeAddress = (address) =>{
    return new Promise((resolve,reject) => {
        var encodedAddress = encodeURIComponent(address);
        request({
            url:`https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=AIzaSyBuZ0pYUdnlO6X9KukRNZbN4NFJE8sV7Z0`,
            json: true
        },  (error, response, body) => { 
            //the second arguement of JSON.stringify filters object properties
            //the third object specifies how many spaces to use per indentation
            //console.log(JSON.stringify(response, undefined, 2));
            if (error){
                reject(`unable to connect to google servers: ${error}`);
                //console.log(`unable to connect to google servers: ${error}`);
            }else if(body.status ==="ZERO_RESULTS"){ //what google geocode ap retuns for no results
                reject("No results found for that address.");
            }else{
               resolve({
                address: body.results[0].formatted_address,
                latitude: body.results[0].geometry.location.lat,
                longitude: body.results[0].geometry.location.lng
            });
           }  
        });
    });
};

geoCodeAddress('20878').then((res) => {
    console.log(JSON.stringify(res,undefined,2));
}, (errorMessage) =>{
    console.log(errorMessage);
});




// //takes a string address and uses the google mapes geocode api to return the full address and its lat and long.
// //notice that we built in our own callback function
// geocodeAddress = (address, callback) => {
//     var encodedAddress = encodeURIComponent(address);

//     //the requust function takes two arguements, an object {} and a function(error,response,body). we use the request function to make api calls.
//     // setting json to true tells the request call to return an object.
//     //the url line is the url of your api call
//     request({
//         url:`https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=AIzaSyBuZ0pYUdnlO6X9KukRNZbN4NFJE8sV7Z0`,
//         json: true
//     },  (error, response, body) => {
//         //the second arguement of JSON.stringify filters object properties
//         //the third object specifies how many spaces to use per indentation
//         //console.log(JSON.stringify(response, undefined, 2));
//         if (error){
//             callback(`unable to connect to google servers: ${error}`);
//             //console.log(`unable to connect to google servers: ${error}`);
//         }
//         else if(body.status === "ZERO_RESULTS"){
//             callback("No results found for that address.");
//         }
//         else if(body.status === "OK"){
//             //note that we return an undefined object here for a sucessful api call
//             callback(undefined, {
//                 address: body.results[0].formatted_address,
//                 latitude: body.results[0].geometry.location.lat,
//                 longitude: body.results[0].geometry.location.lng
//             })
//         }
//         else{
//             callback(`Unhandled body code: ${body.status}`);
//         }   
//     });


// }



// var asyncAdd = (a,b) => { 
//     return new Promise((resolve,reject) => {
//         var encodedAddress = encodeURIComponent(address);
//         request({
//             url:`https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=AIzaSyBuZ0pYUdnlO6X9KukRNZbN4NFJE8sV7Z0`,
//             json: true
//         },  (error, response, body) => { 
//             //the second arguement of JSON.stringify filters object properties
//             //the third object specifies how many spaces to use per indentation
//             //console.log(JSON.stringify(response, undefined, 2));
//             if (error){
//                 reject(`unable to connect to google servers: ${error}`);
//                 //console.log(`unable to connect to google servers: ${error}`);
//             }
//            else{
//                resolve({
//                 address: body.results[0].formatted_address,
//                 latitude: body.results[0].geometry.location.lat,
//                 longitude: body.results[0].geometry.location.lng
//             });
//            }  
//         });
//     });
// };




// //takes a string address and uses the google mapes geocode api to return the full address and its lat and long.
// //notice that we built in our own callback function
// geocodeAddress = (address, callback) => {
//     var encodedAddress = encodeURIComponent(address);

//     //the requust function takes two arguements, an object {} and a function(error,response,body). we use the request function to make api calls.
//     // setting json to true tells the request call to return an object.
//     //the url line is the url of your api call
//     request({
//         url:`https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=AIzaSyBuZ0pYUdnlO6X9KukRNZbN4NFJE8sV7Z0`,
//         json: true
//     },  (error, response, body) => {
//         //the second arguement of JSON.stringify filters object properties
//         //the third object specifies how many spaces to use per indentation
//         //console.log(JSON.stringify(response, undefined, 2));
//         if (error){
//             callback(`unable to connect to google servers: ${error}`);
//             //console.log(`unable to connect to google servers: ${error}`);
//         }
//         else if(body.status === "ZERO_RESULTS"){
//             callback("No results found for that address.");
//         }
//         else if(body.status === "OK"){
//             //note that we return an undefined object here for a sucessful api call
//             callback(undefined, {
//                 address: body.results[0].formatted_address,
//                 latitude: body.results[0].geometry.location.lat,
//                 longitude: body.results[0].geometry.location.lng
//             })
//         }
//         else{
//             callback(`Unhandled body code: ${body.status}`);
//         }   
//     });
// }