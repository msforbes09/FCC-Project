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

const palindromeInput = document.querySelector('#palindrome-input');
const palindromeOutput = document.querySelector('#palindrome-output');
const converterInput = document.querySelector('#converter-input');
const converterOutput = document.querySelector('#converter-output');

function palindromeCheck(){
	let answer;
	palindrome(this.value) ? answer = "" : answer = "not";
	palindromeOutput.firstElementChild.textContent = answer;
}

palindromeInput.addEventListener('keyup', palindromeCheck);
convertInput.addEventListener('keyup', romanNumeralConvertion);