/*
add-subtract-multiply-divide
You should round answers with long decimals so that they don’t overflow the screen.
Pressing = before entering all of the numbers or an operator could cause problems!
Display a snarky error message if the user tries to divide by 0… and don’t let it crash your calculator!
*/

const mainScreen = document.querySelector('.main_screen');
const secScreen = document.querySelector('.history_display');
let currentNum = 0;
let storedNum;
let storedOperator = '';
let reset = false;

let btns = document.querySelectorAll('button');

function isANumber(str){
  return !/\D/.test(str);
}

function notYetLimit(){
    if(currentNum.toString().length >= 10)
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
            currentNum = recieveNumber(i.id);
            refreshScreen();
        }
        else{
            console.log("this is not a number");
            checkOperator(i.id);
        }
    });
});

function refreshScreen(){
    mainScreen.textContent = currentNum;
}

function refreshHistory(code){
    switch(code){
        case "opr":
            secScreen.textContent = storedNum + " " + storedOperator;
            break;
        case "eq":
            secScreen.textContent = storedNum + " " + storedOperator + " " + currentNum + " =";
            break;
        case "eqEarly":
            secScreen.textContent = currentNum + " =";
            break;
        case "clear":
            secScreen.textContent = '';
            break;
    }
}

function recieveNumber(num){
    //need to add limiter if already more than 11 digits
    //console.log(isLimit);
    let retNum = currentNum;

    if(retNum == 0 || reset ){
        retNum = num;
        reset = false;
        refreshHistory(clear);
    }
    else{
        retNum = parseFloat(retNum.toString() + num);
    }

    return retNum;
}

function resetValues(){
            storedNum = 0;
            storedOperator = '';  
}

function checkOperator(op){
    switch(op){
        case "clear": 
            currentNum = 0;
            storedNum = 0;
            storedOperator = '';
            refreshHistory("clear");
            refreshScreen();
            break;
        
        case "delete":
            const slicedNum = currentNum.toString().slice(0,-1);
            if(slicedNum.length < 1)
                currentNum = 0
            else
                currentNum = parseFloat(slicedNum);
                refreshScreen();
            break;

        case "dec":
            const decimalAdd = currentNum.toString() + ".";
            currentNum = decimalAdd;
            console.log(decimalAdd);
            refreshScreen();
            break;

        case "add":
            storedNum = currentNum;
            currentNum = 0;
            storedOperator = "+";
            refreshHistory("opr");
            break;

        case "equal":
            if(storedNum > 0 && storedOperator.length > 0){
                refreshHistory("eq");
                currentNum = parseFloat(storedNum) + parseFloat(currentNum);
                refreshScreen();
                resetValues();
                reset = true;
            }else if (currentNum > 0){
                refreshHistory("eqEarly");
            }
            break;


    }
}