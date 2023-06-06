let currentNum = '';
let storedNum = '';
let storedOperator = '';

const mainScreen = document.querySelector('.main_screen');
const secScreen = document.querySelector('.history_display');

const numberBtn = document.querySelectorAll('.number');
const operatorBtn = document.querySelectorAll('.operator')

//clear delete equal decimal
const clear = document.querySelector('.clear');
const equal = document.querySelector('.equal');
const del = document.querySelector('.delete');
const decimal = document.querySelector('.decimal');

numberBtn.forEach(function(e) {
    e.addEventListener('click', function(){

        //clean history when number pressed after equal
        if(currentNum == '' && storedOperator == ''){
            secScreen.textContent = '';
            storedNum = '';
        }

        appendNumber(e.textContent);
        mainScreen.textContent = currentNum;
    });
});

operatorBtn.forEach(function(e) {
    e.addEventListener('click', function(){
        if(storedOperator == ''){
            storedOperator = e.textContent;
            if(storedNum == '')
                storedNum = currentNum;
            currentNum = '';
            secScreen.textContent = storedNum + " " + storedOperator;
        }
    });
});

del.addEventListener('click', function(){
    currentNum = currentNum.slice(0,-1);
    
    if(currentNum == '')
        mainScreen.textContent = '0';
    else{
        mainScreen.textContent = currentNum;
    }
});

equal.addEventListener('click', function(){
    if(currentNum != '' && storedNum != '' && storedOperator != ''){
        secScreen.textContent = storedNum + " " + storedOperator + " " + currentNum + " =";
        storedNum = operate().toString();
        mainScreen.textContent = storedNum;
        storedOperator = '';
        currentNum = '';
    }
});

clear.addEventListener('click', function(){
    currentNum = '';
    storedNum = '';
    storedOperator = '';
    mainScreen.textContent = '0';
    secScreen.textContent = '';
});


function appendNumber(num){
    if(currentNum.length < 7)
        currentNum = currentNum + num;
}

function operate(){
    if (storedOperator == '+'){
        return Number(storedNum) + Number(currentNum);
    }else if(storedOperator == '-'){
        return Number(storedNum) - Number(currentNum);
    }else if(storedOperator == '×'){
        return Number(storedNum) * Number(currentNum);
    }else if(storedOperator == '÷'){
        return Number(storedNum) / Number(currentNum);
    }
}