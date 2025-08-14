/*
    Write a function that returns a promise that resolves after n seconds have passed, where n is passed as an argument to the function.
*/

function checkPromiseStatus(n){

    return new Promise((resolve) => {
        setTimeout(() => {
           resolve(`Resolve the promise after ${n} seconds`)
        }, n * 1000)
    })
}

checkPromiseStatus(3).then((value) => {
    console.log("THe value is ", value)
})