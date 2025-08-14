/*
 * Write a function that halts the JS thread (make it busy wait) for a given number of milliseconds.
 * During this time the thread should not be able to do anything else.
 * the function should return a promise just like before
 */

function sleep(n){

    return new Promise((resolve) => {
        const start = Date.now();
        while(Date.now() - start < n ){
            // busy  the halts
        }
        resolve()
    })
}

function resumeSleep(){
    console.log("Currently Sleeping.....");
    sleep(3000);
    console.log("Wake up.....")
}

resumeSleep()