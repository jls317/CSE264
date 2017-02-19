/*
 Jeffrey Stewart
 CSE264
 */

//initial variables
var displayscreen = ' 0';
var period = false;
var sign = false; //false when pos, true when neg
var stack = [];
dispclr();

//adds number to display string
//checks current display screen length and limits it to 15 numbers
//limit to 1 decimal point on screen at a time
function dispadd() {
    if ((displayscreen.length < 15 && arguments[0] !== '.') || (displayscreen.length < 15 && arguments[0] === '.' && !period)) {
        if (displayscreen === ' 0') {
            displayscreen = ' ' + arguments[0];
        } else {
            displayscreen = displayscreen + arguments[0];
            if (arguments[0] === '.') {
                period = true;
            }
        }
    }
    document.getElementById("display").innerHTML = displayscreen;
}

//clears display
function dispclr() {
    displayscreen = ' 0';
    period = false;
    document.getElementById("display").innerHTML = displayscreen;
}

//clears both stack and display
function clearAll() {
    stack = [];
    dispclr();
}

function changesign() {
    if (!sign) {
        displayscreen = displayscreen.replace(' ', '-');
        sign = true;
    } else {
        displayscreen = displayscreen.replace('-', ' ');
        sign = false;
    }
    document.getElementById("display").innerHTML = displayscreen;
}

//push displayscreen value to the stack
function push() {
    var float = parseFloat(displayscreen);
    stack.push(float);
    dispclr();
}

function divide() {
    var divisor;
    var dividend;
    var quotient;
    divisor = stack.pop();
    dividend = stack.pop();
    quotient = dividend / divisor;
    stack.push(quotient);
    document.getElementById("display").innerHTML = quotient;
}

function multiply() {
    var multiplier;
    var multiplicand;
    var product;
    multiplicand = stack.pop();
    multiplier = stack.pop();
    product = multiplier * multiplicand;
    stack.push(product);
    document.getElementById("display").innerHTML = product;
}

function subtract() {
    var subtrahend;
    var minuend;
    var difference;
    subtrahend = stack.pop();
    minuend = stack.pop();
    difference = minuend - subtrahend;
    stack.push(difference);
    document.getElementById("display").innerHTML = difference;
}

function add() {
    var augend;
    var addend;
    var sum;
    addend = stack.pop();
    augend = stack.pop();
    sum = augend + addend;
    stack.push(sum);
    document.getElementById("display").innerHTML = sum;
}