/*
Counter without setInterval

Without using setInterval, try to code a counter in Javascript. There is a hint at the bottom of the file if you get stuck.

two ways for doing this one is --- using the recursion approach and other is iterative approach.
*/

/* this is the recursive approach */
let count = 1;
function counter(){
    
    setTimeout(() => {
        console.log(count);
        count++;
        counter();
        
    }, 1000)
}

counter();

/* this is by iterative approach */

function counter(n){
    let count = 1;
    for(let i = 0; i< n; i++){
        setTimeout(() => {
            console.log(count);
            count++;
        }, 1000 * i)
    }
 
}
counter(10);