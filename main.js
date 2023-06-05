/*
add-subtract-multiply-divide
You should round answers with long decimals so that they don’t overflow the screen.
Pressing = before entering all of the numbers or an operator could cause problems!
Display a snarky error message if the user tries to divide by 0… and don’t let it crash your calculator!
*/

const mainScreen = document.querySelector('.main_screen');
const secScreen = document.querySelector('.history_display');
let firstNum = 0;
let secondNum;

let btns = document.querySelectorAll('button');

function isANumber(str){
  return !/\D/.test(str);
}

function notYetLimit(){
    if(firstNum.toString().length >= 10)
        return false;
    else    
        return true;
}

//check button press
btns.forEach(function(i){
    i.addEventListener('click', function(){

        console.log(i.id);

        //confirm if button pressed is number
        if(isANumber(i.id) && notYetLimit()){
            console.log("this is a number");
            firstNum = recieveNumber(i.id);
            refreshScreen();
        }
        else{
            console.log("this is not a number");
            checkOperator(i.id);
        }
    });
});

function refreshScreen(){
    mainScreen.textContent = firstNum;
}

function recieveNumber(num){
    //need to add limiter if already more than 11 digits
    //console.log(isLimit);

    let i = parseInt(num);
    let retNum = firstNum;

    if(retNum == 0)
        retNum = i;
    else{
        retNum *= 10;
        retNum += i;
    }

    return retNum;
}

function checkOperator(op){
    switch(op){
        case "clear": 
            firstNum = 0;
            refreshScreen();
        break;
        
        case "delete":
        
        break;
    }
}