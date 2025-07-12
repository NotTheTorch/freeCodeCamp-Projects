const input_string_container = document.querySelector('#text-input');
const check_button = document.querySelector("#check-btn")
const hidden_block = document.querySelector(".empty-container")

check_button.addEventListener('click',()=>{
    let input_string = input_string_container.value
    if(!input_string)
    {
        return alert("Please input a value");
    }

    let modified_string = input_string.toLowerCase().replace(/[^a-z]/g,"")
    console.log(input_string);
    console.log(modified_string);
    console.log(pallindromeChecker(modified_string));

    hidden_block.innerHTML = htmlGenarator(pallindromeChecker(modified_string),input_string)
    hidden_block.classList.remove('hide');


});


function pallindromeChecker(str)
{
    return str === str.split("").reverse().join("");
}

function htmlGenarator(bool,str)
{
    let htmlString = '';
    if(bool)
    {
        htmlString += `<p class="hidden-text">(${str}). is a palindrome.</p>`
    }
    else
    {
        htmlString += `<p class="hidden-text">(${str}). is not a palindrome.</p>`
    }
    return htmlString;
}