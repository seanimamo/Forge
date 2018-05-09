//promises are functions to replace using callbacks, they allow us to run specific functions based on whether they are resolved or rejected, which we get to specify the conditions for.
//promises are advantageous to normal callbacks because they can only be called once. As opposed to callbacks which can accidentally be called a second time and be overwritten.
//Additionally, using promises creates cleaner looking code.
// var somePromise = new Promise((resolve,reject) => {

//     setTimeout(() => {
//         //resolve('Hey. It worked!');
//         reject('Unable to fulfill promise');

//     }, 2500);
   
// });

// somePromise.then((message) => {
//     console.log('Success:', message);
// }, (errorMessage) =>{
//     console.log('Error:', errorMessage)
// });


//this is an example of wrapping a promise around a function that normally requires a callback. Using this method we can add promise functionality to things that do not support
//promises in the first place.
var asyncAdd = (a,b) => { 
    return new Promise((resolve,reject) => {
        setTimeout(() => {
            if(typeof a === 'number' && typeof b === 'number'){
                resolve(a + b);
            }else{
                reject('Arguements must be numbers');
            }

        }, 1500);
    });
};

//example of using our asyncAdd function normally
// asyncAdd(5, 7).then((res) => {
//     console.log('result: ', res);
// }, (errorMessage) =>{
//     console.log(errorMessage);
// });

// example of how to chain callbacks together using our asyncAdd function
// As you can see, instead of using an (errorMessage) => {} callback function after our first .then((res) => {}) statement, we close the paranthesis and then attach a then statement
// for the second asynAdd callback's resolve case and then close that callback [and so forth for each additional callback we usse] and then finally 
// add a .catch((errorMessage)) => {} to catch the errors from either one or both of the callbacks
// that have been chanined together.
asyncAdd(5, 7).then((res) => {
    console.log('result: ', res);
    return asyncAdd(res,33);
}).then((res) =>{
    console.log('second chained asyncAdd result: ', res);
    return asyncAdd(res,15);
}).then((res) =>{
    console.log('third chained asyncAdd result: ', res);
}).catch((errorMessage) =>{
    console.log(errorMessage)
});

//WRONG example of how to chain callbacks together using our asyncAdd function
// As you can see if you run this, the first asyncAdd call hits the error message, but the second does not because even though it has a string as one of its arguements.
// This is happening because we have an existing error handler before the .then() statement for the second asnycAdd, thus node assumes everything went correctly, even 
// though in reality it has not. and so the second addAsyc call prints 'seconc chained asyncAdd result: undefined'.
// asyncAdd(5, "7").then((res) => {
//     console.log('result: ', res);
//     return asyncAdd(res,33);
// }, (errorMessage) => {
//     console.log(errorMessage);
// }).then((res)=>{
//     console.log('second chained asyncAdd result: ', res);
// }, (errorMessage) => {
//     console.log(errorMessage);
// });




