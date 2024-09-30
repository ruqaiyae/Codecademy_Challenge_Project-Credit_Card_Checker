// All valid credit card numbers
const valid1 = [4, 5, 3, 9, 6, 7, 7, 9, 0, 8, 0, 1, 6, 8, 0, 8];
const valid2 = [5, 5, 3, 5, 7, 6, 6, 7, 6, 8, 7, 5, 1, 4, 3, 9];
const valid3 = [3, 7, 1, 6, 1, 2, 0, 1, 9, 9, 8, 5, 2, 3, 6];
const valid4 = [6, 0, 1, 1, 1, 4, 4, 3, 4, 0, 6, 8, 2, 9, 0, 5];
const valid5 = [4, 5, 3, 9, 4, 0, 4, 9, 6, 7, 8, 6, 9, 6, 6, 6];

// All invalid credit card numbers
const invalid1 = [4, 5, 3, 2, 7, 7, 8, 7, 7, 1, 0, 9, 1, 7, 9, 5];
const invalid2 = [5, 7, 9, 5, 5, 9, 3, 3, 9, 2, 1, 3, 4, 6, 4, 3];
const invalid3 = [3, 7, 5, 7, 9, 6, 0, 8, 4, 4, 5, 9, 9, 1, 4];
const invalid4 = [6, 0, 1, 1, 1, 2, 7, 9, 6, 1, 7, 7, 7, 9, 3, 5];
const invalid5 = [5, 3, 8, 2, 0, 1, 9, 7, 7, 2, 8, 8, 3, 8, 5, 4];

// Can be either valid or invalid
const mystery1 = [3, 4, 4, 8, 0, 1, 9, 6, 8, 3, 0, 5, 4, 1, 4];
const mystery2 = [5, 4, 6, 6, 1, 0, 0, 8, 6, 1, 6, 2, 0, 2, 3, 9];
const mystery3 = [6, 0, 1, 1, 3, 7, 7, 0, 2, 0, 9, 6, 2, 6, 5, 6, 2, 0, 3];
const mystery4 = [4, 9, 2, 9, 8, 7, 7, 1, 6, 9, 2, 1, 7, 0, 9, 3];
const mystery5 = [4, 9, 1, 3, 5, 4, 0, 4, 6, 3, 0, 7, 2, 5, 2, 3];

// An array of all the arrays above
const batch = [valid1, valid2, valid3, valid4, valid5, invalid1, invalid2, invalid3, invalid4, invalid5, mystery1, mystery2, mystery3, mystery4, mystery5];



// Add your functions below:

// create a functin to calculate sum of array using Luhn algorithm
let getArraySum = (array) => {

  // create a copy of the array
  const copyOfArray = array.slice();

  // reverse the array
  copyOfArray.reverse();

  // create array to find sum
  let arrayToSum = [];

  // iterate over the array & multiply digits in odd positions by 2
  for (let i = 0; i < copyOfArray.length; i++) {
    // check if num is odd
    if (i % 2 === 1) {
      // mulitply by 2
      let newNum = copyOfArray[i] * 2 
      
          // if num is over 9, subtract 9 and push to arrayToSum
          if (newNum > 9) {
            arrayToSum.push(newNum - 9)
            // otherwise push to arrayToSum
          } else {
            arrayToSum.push(newNum)
          }

    // check if num is even
    } else {
      // push the num to arrayToSum
       arrayToSum.push(copyOfArray[i]);
    }
  }

  // sum up the digits of the arrayToSum array
  let sum = 0;
  for (let j = 0; j < arrayToSum.length; j++) {
    sum += arrayToSum[j];
  }

  // return sum of the array, the array to sum, array that is reversed
  let returnValues = [sum, arrayToSum, copyOfArray]
  return returnValues;
  
}



  // function to check if credit card is valid or invalid
  let validateCred = (check_array) => {

  // check if card is valid : sum % 10 === 0 
  let [sum, arrayToSum, copyOfArray] = getArraySum(check_array);
  if (sum % 10 === 0) {
    return true;
  } else {
    return false;
  }
}



  // function to check through the nested array for which numbers are invalid, and return another nested array of invalid cards
let findInvalidCards = (nestedArray) => {

    // create array of invalid cards
    let invalidCards = [];
  
    // iterate over nestedArray to find invalid cards
    for (let n = 0; n < nestedArray.length; n++) {
      if (validateCred(nestedArray[n]) === false) {
        // push invalid cards to invalidCards array
        invalidCards.push(nestedArray[n]);
      }
    }
  
    return invalidCards;
  }
  

  
  // function to identify the credit card companies that have possibly issued these faulty numbers
  let idInvalidCardCompanies = (nestedArrayOfInvalid) => {
  
    // create array of companies
    let companies = [];
  
    // iterate over the array of nestedArrayOfInvalid to check the first digit
    for (let c = 0; c < nestedArrayOfInvalid.length; c++) {
  
      // 3 === Amex (American Express)
      if (nestedArrayOfInvalid[c][0] === 3) {
        // check if companies array already incldes Amex
        if (companies.includes('Amex (American Express)') === false) {
          companies.push('Amex (American Express)')
        }
  
        // 4 === Visa
      } else if (nestedArrayOfInvalid[c][0] === 4) {
        // check if companies array already incldes Visa
        if (companies.includes('Visa') === false) {
          companies.push('Visa')
        }
  
        // 5 === Mastercard
      } else if (nestedArrayOfInvalid[c][0] === 5) {
        // check if companies array already incldes Mastercard
        if (companies.includes('Mastercard') === false) {
          companies.push('Mastercard')
        }
  
        // 6 === Discover
      } else if (nestedArrayOfInvalid[c][0] === 6) {
        // check if companies array already incldes Discover
        if (companies.includes('Discover') === false) {
          companies.push('Discover')
        }
      } else {
        console.log('Company not found')
      }
      
    }
    
    // return companies;
    return companies;

  }



// function to change invalid to valid
let invalidToValid = (check_array) => {


    let [sum, arrayToSum, copyOfArray] = getArraySum(check_array);
    // find remainder 
    let remainder = sum % 10;
  
    // if first digit minus remainder is greater than zero, add 10 to the first digit and minus the remainder
    if (arrayToSum[0] - remainder < 0) {
          arrayToSum[0] += 10 - remainder;
      } else {
        // otherwise subtract remainder from the first digit
          arrayToSum[0] -= remainder;
      }

    // replace the first digit of the reversed array with the first digit of the array to sum
    copyOfArray[0] = arrayToSum[0];

    // declare a variable with a new credit card number and reverse the array
    let newCCNumber = copyOfArray.reverse();

    return newCCNumber;
    }
