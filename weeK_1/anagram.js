/*
  Write a function `isAnagram` which takes 2 parameters and returns true/false if those are anagrams or not.
  What's Anagram?
  - A word, phrase, or name formed by rearranging the letters of another, such as spar, formed from rasp.
*/

/* this is the normal approach that takes O(n) TC due to iterates through the string */
function isAnagram(str1, str2){  
    if(str1.length !== str2.length) return false;

    for(const char of str1.toLowerCase()){
        if(str2.includes(char)){ // it return always true because it matches only the first value
            return true;
        }
    }
    /* better version for this bcz it return true as it is found matches like "ab" , "ax" so it return true for "a" only
     const arr1 = str1.toLowerCase().split('');
     for(const char of str2.toLowerCase()){
        const index = arr1.indexOf(char);
        if(index === -1) return false ; => char not found;
        arr1.splice(index, 1) why , it prevents the appears of one char multiple time in the one string than in the another one.
     }
        return true
    */
   return false;
}

/*this is the  another approach that takes O( n logn) */
function isAnagramSort(str1, str2){
    if(str1.length !== str2.length) return false;
    const sortString = (str) =>  str.toLowerCase().split('').sort().join('');
        
    const string1 = sortString(str1);
    const string2 = sortString(str2);
  
    if(string1 === string2){
        return true;
    }
    return false;

}

/* Frequency count approach */
function AnagramFrequencyCount(str1, str2){

    if(str1.length !== str2.length) return false;

    const countChar = (str) => {
        let count = {};

        for(const char of str.toLowerCase()){
            count[char] = (count[char] || 0) + 1;
            
        }
      return count;
    }
    const string1 = countChar(str1)
    console.log(string1)
    const string2 = countChar(str2)


    // iterates throught the string1
    for(const char of str1){
        if(string1[char] !== string2[char]){
            return false;
        }
    }
    return true;
}

const result = AnagramFrequencyCount("rasp" , "spar") ? "This is a anagram" : "THis is not an anagram"
console.log(result)
