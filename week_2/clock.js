/*
Using 1 - counter.md or 2 - counter.md from the easy section, can you create a
clock that shows you the current machine time?

Can you make it so that it updates every second, and shows time in the following formats - 

 - HH:MM::SS (Eg. 13:45:23)

 - HH:MM::SS AM/PM (Eg 01:45:23 PM)
*/

function createClock() {

    const date = new Date();
    
    // 24 hours foramt 
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')
    const seconds = String(date.getSeconds()).padStart(2, '0')
    const totalTime24 = `${hours}::${minutes}::${seconds}`

    //12 hours format
    const hours12 = String(date.getHours() % 12 || 12).padStart(2, '0');
    const ampere = hours12 >= 12 ? 'PM' : 'AM';
    const totalTime12 = `${hours12}::${minutes}::${seconds}::${ampere}`

    console.log("THe 24 hours formart", totalTime24)
    console.log("THe 12 hours formart", totalTime12)
}

// updates the second after 1s 
setInterval(createClock, 1000)

createClock()