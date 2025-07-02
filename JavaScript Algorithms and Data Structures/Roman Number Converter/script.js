const numberInput = document.getElementById('number-input');
const convertButton = document.getElementById('convert-btn');
const answer = document.getElementById('answer-block');
const errorBox = document.getElementById('error-box');

convertButton.addEventListener('click',()=>{
    checker(numberInput.value);
})

numberInput.addEventListener('keydown',(key)=>{
    if(key.code === "Enter")
        checker(numberInput.value);
})

function convertToRoman(num) {
  const romanMap = [
    { value: 1000, symbol: "M" },
    { value: 900, symbol: "CM" },
    { value: 500, symbol: "D" },
    { value: 400, symbol: "CD" },
    { value: 100, symbol: "C" },
    { value: 90, symbol: "XC" },
    { value: 50, symbol: "L" },
    { value: 40, symbol: "XL" },
    { value: 10, symbol: "X" },
    { value: 9, symbol: "IX" },
    { value: 5, symbol: "V" },
    { value: 4, symbol: "IV" },
    { value: 1, symbol: "I" }
  ];

  let romanString = "";

  for (const { value, symbol } of romanMap) {
    while (num >= value) {
      romanString += symbol;
      num -= value;
    }
  }

  return romanString;
}

function checker(value)
{
    if(!value)
    {
        errorBox.textContent = "Please Enter a value to convert!";
    }
    else if(value > 3999)
    {
        errorBox.textContent = "Number should be or below 3999";
    }
    else
    {
    
        answer.textContent = convertToRoman(numberInput.value);
    }
}