/*
 * Write 3 different functions that return promises that resolve after t1, t2, and t3 seconds respectively.
 * Write a function that uses the 3 functions to wait for all 3 promises to resolve using Promise.all,
 * Return a promise.all which return the time in milliseconds it takes to complete the entire operation.
 * 
 * 
 * Promise.all is the static method on the promise object , so no need to use new keyword with this
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

    const start  = Date.now()
    return  Promise.all([promise1(t1), promise2(t2), promise3(t3)])
        .then(() => {
            const end = Date.now()
            return end - start
        })
}

calculateTime(1,2,3).then((value) => {
  console.log(`Total time: ${value} milliseconds`);
})