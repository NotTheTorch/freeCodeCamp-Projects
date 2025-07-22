const input = document.getElementById('user-input');
const resultDiv = document.getElementById('results-div');
const checkBtn = document.getElementById('check-btn');
const clearBtn = document.getElementById('clear-btn');

checkBtn.addEventListener('click', () => {
  const number = input.value.trim();

  if (number === '') {
    alert('Please provide a phone number');
    return;
  }

  const regex = /^(1\s?)?(\(\d{3}\)|\d{3})[\s\-]?\d{3}[\s\-]?\d{4}$/;

  const isValid = regex.test(number);

  resultDiv.textContent = isValid
    ? `Valid US number: ${number}`
    : `Invalid US number: ${number}`;
});

clearBtn.addEventListener('click', () => {
  input.value = '';
  resultDiv.textContent = '';
});
