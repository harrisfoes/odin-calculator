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

numberBtn.forEach(function (e) {
    e.addEventListener('click', () => receiveNumber(e.textContent));
});

operatorBtn.forEach(function (e) {
    e.addEventListener('click', () => handleOperator(e.textContent));
});

del.addEventListener('click', () => handleDelete());

equal.addEventListener('click', () => handleEqual());

clear.addEventListener('click', () => handleClear());

decimal.addEventListener('click', () => handleDecimal());

window.addEventListener('keydown', handleKeypress);

function appendNumber(num) {
    if (currentNum == '0' && num == '0')
        return;
    else if (currentNum == '0' && num > 0)
        currentNum = num;    
    else if (currentNum.length < 9)
        currentNum = currentNum + num;   
 
}

function operate() {
    if (storedOperator == '+') {
        return Number(storedNum) + Number(currentNum);
    } else if (storedOperator == '-') {
        return Number(storedNum) - Number(currentNum);
    } else if (storedOperator == '×') {
        return Number(storedNum) * Number(currentNum);
    } else if (storedOperator == '÷' || storedOperator == '/') {
        if(Number(currentNum) == 0)
            return 'Bruh..';
        return Number(storedNum) / Number(currentNum);
    }
}

function handleResultLength(result) {
    result = result.toString();

    if (result.includes(".") && result.length > digitLimit) {
        return result.substr(0, digitLimit);
    } else if (result.length > digitLimit) {
        return result.substr(0, digitLimit) + "...";
    }

    return result;

}

function receiveNumber(num) {

    //clean history when number pressed after equal
    if (currentNum == '' && storedOperator == '') {
        secScreen.textContent = '';
        storedNum = '';
    }
    appendNumber(num);
    mainScreen.textContent = currentNum;
}

function handleOperator(op) {
    if (storedOperator == '') {
        storedOperator = op;
        if (storedNum == '')
            storedNum = currentNum;
        currentNum = '';
        secScreen.textContent = handleResultLength(storedNum) + " " + storedOperator;
    }
    if (currentNum != '' && storedNum != '') {
        storedNum = operate().toString();
        mainScreen.textContent = storedNum;
        storedOperator = op;
        secScreen.textContent = handleResultLength(storedNum) + " " + storedOperator;
        currentNum = '';
    }
}

function handleEqual() {
    if (currentNum != '' && storedNum != '' && storedOperator != '') {
        secScreen.textContent = '';
        storedNum = operate().toString();
        mainScreen.textContent = handleResultLength(storedNum);
        storedOperator = '';
        currentNum = '';
    }
}

function handleClear() {
    currentNum = '';
    storedNum = '';
    storedOperator = '';
    mainScreen.textContent = '0';
    secScreen.textContent = '';
}

function handleDecimal() {
    if (currentNum == '' || currentNum == '0'){
        currentNum = "0.";
        mainScreen.textContent = currentNum;
    }
    if (!currentNum.includes(".")) {
        currentNum += ".";
        mainScreen.textContent = currentNum;
    }
}

function handleDelete() {
    currentNum = currentNum.slice(0, -1);

    //current num empty and stored num has value after calculating, refuse del then
    if (storedOperator != '' && currentNum == '')
        mainScreen.textContent = '0';
    else if (storedNum != '' && currentNum == '')
        return;
    if (currentNum == '')
        mainScreen.textContent = '0';
    else {
        mainScreen.textContent = currentNum;
    }
}

function handleKeypress(e) {
    e.preventDefault();

    if (e.key >= 0 && e.key <= 9)
        receiveNumber(e.key);
    else if (e.key == 'Enter' || e.key == '=')
        handleEqual();
    else if (e.key == '+' || e.key == "/" || e.key == '-')
        handleOperator(e.key)
    else if (e.key == '*')
        handleOperator("×")
    else if (e.key == '.')
        handleDecimal()
    else if (e.key == 'Backspace')
        handleDelete();
    else if (e.key == 'Escape')
        handleClear();
}