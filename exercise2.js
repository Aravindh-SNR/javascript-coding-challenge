// Write a javascript function that takes an array of numbers and a target number. 
// The function should find two different numbers in the array that, when added together, give the target number. 
// For example: answer([1,2,3], 4)should return [1,3]

//Function to return pairs of numbers whose sum is the target given
const checkSum = (array, target) => {
    let finalArray = [];

    //Checking the sum of each element and every other element in the array
    for(let i = 0; i < array.length - 1; i++) {
        for(let j = i + 1; j < array.length; j++) {
            if(array[i] + array[j] === target) {

                //adding the number pair to final array without duplication
                if(!JSON.stringify(finalArray).includes(JSON.stringify([array[i], array[j]])) && 
                   !JSON.stringify(finalArray).includes(JSON.stringify([array[j], array[i]]))) {
                    finalArray.push([array[i], array[j]]);
                }
            }
        }
    }
    
    if(finalArray.length === 0) {
        return `No two numbers in your array add up to ${target}`;
    } else if(finalArray.length === 1) {
        return JSON.stringify(finalArray).slice(1, -1);
    } else {
        return JSON.stringify(finalArray);
    }
}

//Getting the input values for the array and target sum,
//and displaying the resultant array
const displaySum = () => {
    const arrayString = document.querySelector("#array2").value.replace(/ /g, "");
    const output = document.querySelector("#output_sum");

    const arrayPattern = /^-?\d+,-?\d+(,-?\d+)*$/;
    if(!arrayPattern.test(arrayString)) {
        output.innerText = "Oops! Incorrect input format, please try again.";
        return;
    }

    const array = arrayString.split(",").map(Number);
    const sum = Number(document.querySelector("#sum").value);

    output.innerText = checkSum(array, sum);
}

//Listening to clicks on the 'Get matching pairs' button
document.querySelector("#submit_sum").addEventListener("click", displaySum);