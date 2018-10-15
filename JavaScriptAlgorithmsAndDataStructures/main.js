//solution #1
//sample: palindrome("A man, a plan, a canal. Panama");
function palindrome(str) {
    str = str.toUpperCase();
    str = str.replace(/[^A-Z0-9]/g, '')
    let reverseStr = [];
    str.split('').forEach(list => reverseStr.unshift(list));
 	return str === reverseStr.join('');
 }
//solution #2
//sample: convertToRoman(37);
function convertToRoman(num) {
  const ones = num % 10;
  num = Math.floor(num / 10);
  const tens = num % 10;
  num = Math.floor(num / 10);
  const hundreds = num % 10;
  const thousands = Math.floor(num / 10);
  let converted = "";
  for(let i = 0; i < thousands; i++){
    converted += "M";
  }
  converted += assessDigit(hundreds, ["C","D","M"]);
  converted += assessDigit(tens, ["X","L","C"]);
  converted += assessDigit(ones, ["I","V","X"]);
  return converted; 
}
function assessDigit(digit,option){
   const assessor = digit % 10;
   let roman = "";
   switch(assessor){
    case 1:
      roman = option[0];
      break;
    case 2:
      roman = option[0] + option[0];
      break;
    case 3:
      roman = option[0] + option[0] + option[0];
      break;
    case 4:
      roman = option[0] + option[1];
      break;
    case 5:
      roman = option[1];
      break;
    case 6:
      roman = option[1] + option[0];
      break;
    case 7:
      roman = option[1] + option[0] + option[0];
      break;
    case 8:
      roman = option[1] + option[0] + option[0] + option[0];
      break;
    case 9:
      roman = option[0] + option[2];
      break;
    default:
      break;
   }
   return roman;
 }
//solution #3
//sample: rot13("SERR PBQR PNZC");
function rot13(str) {
  str = str.toUpperCase().split("");
  const decoded = str.map(letter => {
    let code = letter.charCodeAt(0);
    if(code >= 65 && code <= 90 ){
        code += 13;
    }
    if(code > 90){
        code -= 26;
    }
    return String.fromCharCode(code);
  })
  return decoded.join('');
}
//solution #4
//sample: telephoneCheck("1 (555) 555-5555");
function telephoneCheck(str) {
  const validator1 = /^[1]{0,1}[\s]{0,1}\d{3}[-\s]{0,1}\d{3}[-\s]{0,1}\d{4}$/;
  const validator2 = /^[1]{0,1}[\s]{0,1}[(]{1}\d{3}[)]{1}[\s]{0,1}\d{3}[-\s]{0,1}\d{4}$/;
  return validator1.test(str) || validator2.test(str);
}
// solution #5
// sample checkCashRegister(3.26, 100, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]])
const moneyValue = [
  {name: "ONE HUNDRED", value: 100},
  {name: "TWENTY", value: 20},
  {name: "TEN", value: 10},
  {name: "FIVE", value: 5},
  {name: "ONE", value: 1},
  {name: "QUARTER", value: 0.25},
  {name: "DIME", value: 0.1},
  {name: "NICKEL", value: 0.05},
  {name: "PENNY", value: 0.01}
]
function checkCashRegister(price, cash, cid) {
  const response = {status: null, change: []};
  let changeValue = cash - price;
  const register = cid.reduce((acc, curr) => {
    acc[curr[0]] = curr[1];
    acc.total += curr[1];
     acc.total = Math.round(acc.total * 100) / 100;
    return acc
  }, {total: 0})
  if(register.total < changeValue){
    console.log("insufiicient")
    response.status = "INSUFFICIENT_FUNDS";
     return response;
  } else if (register.total === changeValue) {
    console.log("exact")
    response.status = "CLOSED";
    response.change = cid;
    return response;
  }
  const change = moneyValue.reduce((acc, curr) => {
    let value = 0;
    while(register[curr.name] > 0 && changeValue >= curr.value){
      console.log(changeValue, acc, curr.name)
      register[curr.name] -= curr.value;
      changeValue -= curr.value;
      value += curr.value
      changeValue = Math.round(changeValue * 100) / 100;
    }
    if (value > 0) {
      acc.push([curr.name, value])
    };
    return acc; 
  },[])

  if(changeValue > 0 ){
    response.status = "INSUFFICIENT_FUNDS";
    return response;
  }
  response.status = "OPEN";
  response.change = change;
  return response;
}




const palindromeInput = document.querySelector('#palindrome-input');
const palindromeOutput = document.querySelector('#palindrome-output');
const converterInput = document.querySelector('#converter-input');
const converterOutput = document.querySelector('#converter-output');
const decoderInput = document.querySelector('#decoder-input');
const decoderOutput = document.querySelector('#decoder-output');
const validatorInput = document.querySelector('#validator-input');
const validatorOutput = document.querySelector('#validator-output');

function palindromeCheck(){
	let answer;
	palindrome(this.value) ? answer = "" : answer = "not";
	palindromeOutput.firstElementChild.textContent = answer;
}

function romanNumeralConvertion(){
	const regex = /\D/;
	const answer = regex.test(this.value) ? "Invalid" : convertToRoman(this.value);
	converterOutput.firstElementChild.textContent = answer;
}

function decoder(){
	const answer = rot13(this.value);
	decoderOutput.firstElementChild.textContent = answer;
}

function validator(){
	const answer = telephoneCheck(this.value) ? "a" : "not";
	validatorOutput.firstElementChild.textContent = answer;
}

palindromeInput.addEventListener('keyup', palindromeCheck);
converterInput.addEventListener('keyup', romanNumeralConvertion);
decoderInput.addEventListener('keyup', decoder);
validatorInput.addEventListener('keyup', validator);