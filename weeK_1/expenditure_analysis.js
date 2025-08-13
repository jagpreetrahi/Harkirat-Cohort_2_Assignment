/*
  Implement a function `calculateTotalSpentByCategory` which takes a list of transactions as parameter
  and return a list of objects where each object is unique category-wise and has total price spent as its value.
  transactions is an array where each
  Transaction - an object like 
        {
    id: 1,
    timestamp: 1656076800000,
    price: 10,
    category: 'Food',
    itemName: 'Pizza',
  }
  Output - [{ category: 'Food', totalSpent: 10 }] // Can have multiple categories, only one example is mentioned here
*/

const transactions = [{
    id: 1,
    timestamp: 1656076800000,
    price: 100,
    category: 'Food',
    itemName: 'Pizza',
},
{
    id: 2,
    timestamp: 1656076800000,
    price: 50,
    category: 'Food',
    itemName: 'Burger',
},
{
    id: 1,
    timestamp: 1656076800000,
    price: 1000,
    category: 'clothes',
    itemName: 'pant',
},
{
    id: 1,
    timestamp: 1656076800000,
    price: 500,
    category: 'clothes',
    itemName: 'shirt',
},
{
    id: 1,
    timestamp: 1656076800000,
    price: 1000000000,
    category: 'car',
    itemName: 'bugati chiron',
},
{
    id: 1,
    timestamp: 1656076800000,
    price: 500000,
    category: 'devices',
    itemName: 'phone',
},
{
    id: 1,
    timestamp: 1656076800000,
    price: 700000,
    category: 'devices',
    itemName: 'laptop',
}]

// using the array approach
function calculateTotalSpentByCategory(transactions){
    
    let transaction  = [];
    transactions.forEach(element => {
        
        const categoryIndex = transaction.findIndex(item => item.category === element.category);
        
        // found the category 
        if(categoryIndex !== -1){
           transaction[categoryIndex].totalSpent += element.price;
        }
        else{
            transaction.push({
                category : element.category,
                totalSpent : element.price
            })
        }

    });
    return transaction;

}

// using the object approach
function calculateTotalSpentByObject(transactions){
    
    let transaction  = {};
    transactions.forEach(element => {
        const category = element.category;

        if(transaction[category]){
            transaction[category] += element.price
             
        }
        else{
            transaction[category] = element.price
        }
    })

    const newArray = [];
    for(const [key, value] of Object.entries(transaction)){
        const newObject = {
            category : key,
            totalSpent : value
        }
        newArray.push(newObject)
    }
    return newArray;

}

const result = calculateTotalSpentByObject(transactions);
console.log(result)