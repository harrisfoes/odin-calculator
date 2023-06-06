let currentNum = '';
let storedNum = '';
let storedOperator = '';

const digitLimit = 9;

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
        //disallow zero when empty
        if(currentNum == '' && e.textContent == '0')
            return;

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
            secScreen.textContent = handleResultLength(storedNum) + " " + storedOperator;
        }
        if(currentNum != '' && storedNum != ''){
            storedNum = operate().toString();
            mainScreen.textContent = storedNum;
            storedOperator = e.textContent;
            secScreen.textContent =  handleResultLength(storedNum) + " " + storedOperator;
            currentNum = '';
        }
    });
});

del.addEventListener('click', function(){
    currentNum = currentNum.slice(0,-1);

    //current num empty and stored num has value after calculating, refuse del then
    if(storedOperator != '' && currentNum == '')
        mainScreen.textContent = '0';   
    else if(storedNum != '' && currentNum == '')
        return;
    if(currentNum == '')
        mainScreen.textContent = '0';
    else{
        mainScreen.textContent = currentNum;
    }
});

equal.addEventListener('click', function(){
    if(currentNum != '' && storedNum != '' && storedOperator != ''){
        secScreen.textContent = '';
        storedNum = operate().toString();
        mainScreen.textContent = handleResultLength(storedNum);
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

decimal.addEventListener('click', function(){
    if(!currentNum.includes(".")){
        currentNum += ".";
        mainScreen.textContent = currentNum;
    }
});

function appendNumber(num){
    if(currentNum.length < 9)
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

function handleResultLength(result){
    result = result.toString();

    if(result.includes(".") && result.length > digitLimit){
        const toRemove = result.length - digitLimit;
        //result = Number(result);
        return result.substr(0,digitLimit);
    }else if(result.length > digitLimit){
        return result.substr(0,digitLimit) + "...";
    }

    return result;

}