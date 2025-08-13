/*
  Write a function `findLargestElement` that takes an array of numbers and returns the largest element.
  Example:
  - Input: [3, 7, 2, 9, 1]
  - Output: 9
*/

function findLargestElement(arr){

    if(arr.length === 0) return undefined ;
    
    const result = arr.reduce((max , current) => Math.max(max, current));
    
    return result;
}

const arr = [2,4,8,-3,10];
const result = findLargestElement(arr);
console.log("the largest elements is ", result)