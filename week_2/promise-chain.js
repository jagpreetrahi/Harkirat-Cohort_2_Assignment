/*
 * Write 3 different functions that return promises that resolve after t1, t2, and t3 seconds respectively.
 * Write a function that sequentially calls all 3 of these functions in order.
 * Return a promise chain which return the time in milliseconds it takes to complete the entire operation.
 * Compare it with the results from 3-promise-all.js
 */

function promise1(t1){
    return new Promise((resolve) => setTimeout(resolve , t1 * 1000))
}

function promise2(t2){
    return new Promise((resolve) => setTimeout(resolve , t2 * 1000))
}

function promise3(t3){
    return new Promise((resolve) => setTimeout(resolve , t3 * 1000))
}

function calculateTime(t1,t2,t3){

   const start = Date.now();
   return promise1(t1).then(() =>  promise1(t2)).then(() =>  promise1(t3)).then(() => {
        const end = Date.now();
        return end - start
    })
   
}

calculateTime(1,2,3).then((value) => {
    console.log(`THe time is ${value} milliseconds`)
})