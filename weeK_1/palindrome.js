/*
  Implement a function `isPalindrome` which takes a string as argument and returns true/false as its result.
  Note: the input string is case-insensitive which means 'Nan' is a palindrom as 'N' and 'n' are considered case-insensitive.
*/

function palindrome(string){
  string = string.replace(/[^a-zA-Z]/g, '').toLowerCase();
   let i = 0;
   let j = string.length -1;
   while(i < j){
     if(string[i] !== string[j]){
        return  false
     }
     else{
       i++;
       j--;
     }
   }
   return true;
}

const result = palindrome("A man, a plan, a canal: Panama") ? "This is a palindrome" : "THis is not palindrome"
console.log(result)