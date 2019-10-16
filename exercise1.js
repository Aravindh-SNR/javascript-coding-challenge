// Clean the room function: given an input of [1,2,4,591,392,391,2,5,10,2,1,1,1,20,20], 
// make a function that organizes these into individual array that is ordered. 
// For example answer(ArrayFromAbove) should return: [[1,1,1,1],[2,2,2], 4,5,10,[20,20], 391, 392,591]. 
// Bonus: Make it so it organizes strings differently from number types. i.e. [1, "2", "3", 2] should return [[1,2], ["2", "3"]]

//Function to organize array items into individual sorted arrays, as stated above
const cleanTheRoom = array => {
	//Copying the value of the original array into another array so as to not modify the original array
	let newArray = array.slice();

	//Sorting newArray from the smallest number to the biggest
	newArray.sort((a, b) => a - b);

	//Storing number and string items in two different arrays
	const numberArray = newArray.filter(item => typeof(item) === "number");
	const stringArray = newArray.filter(item => typeof(item) === "string");

	//Function to group same values into individual arrays
	const groupTheArray = array => array.reduce((accumulator, currentValue) => {
		const firstIndex = array.indexOf(currentValue);
		const lastIndex = array.lastIndexOf(currentValue);
		const count = lastIndex - firstIndex + 1;
		if(count > 1) {
			accumulator.push(Array(count).fill(currentValue))
			array.splice(firstIndex, count, currentValue); //Grouping same values into one single value so that 
			//the currentValue parameter for the next iteration remains correct
		} else {
			accumulator.push(currentValue);
		}
		return accumulator;
	}, [])

	//Returning array grouped into numbers and/or strings based on the input array
	if(numberArray.length > 0 && stringArray.length > 0) {
		return JSON.stringify([groupTheArray(numberArray), groupTheArray(stringArray)]);
	} else if(numberArray.length > 0) {
		return JSON.stringify(groupTheArray(numberArray));
	} else {
		return JSON.stringify(groupTheArray(stringArray));
	}
}

//Getting the input array value and displaying the grouped array
const displayGroupedArray = () => {
	const inputArray = document.querySelector("#array1").value.replace(/ /g, "");
	const outputArray = document.querySelector("#output_array");

	const arrayPattern = /^(-?\d+|\"-?\d+\")(,-?\d+|,\"-?\d+\")*$/;
	if(!arrayPattern.test(inputArray)) {
		outputArray.innerText = "Oops! Incorrect input format, please try again.";
		return;
	}

	const actualArray = inputArray.split(",").map(element => element.charAt(0) === "\"" ? element.slice(1,-1) : Number(element));
	outputArray.innerText = cleanTheRoom(actualArray);
}

//Listening to clicks on the 'Clean array' button
document.querySelector("#submit_array").addEventListener("click", displayGroupedArray);