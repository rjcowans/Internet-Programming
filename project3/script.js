function calcSum(values) {
    let start = 0;
    values.forEach(function adder(Element) {
        start = start + Element
    });
    return start;
}

function calcMean(value, amount) {
    return value / amount;
}

function calcMedian(values) {
    let halfpoint = values.length / 2;
    return values.length % 2 !== 0 ? values[Math.floor(halfpoint)] : (values[halfpoint] + values[halfpoint - 1]) / 2.0;
}

function calcMin(values) {
    return values[0]
}

function calcMax(values) {
    return values[values.length - 1]
}

function calcMode(values) {
    let arrayReturn = [];
    let holder = {};
    for (let j = 0; j < values.length; j++) {
        values[j] in holder ? holder[values[j]]++ : holder[values[j]] = 1;
    }
    let top = Number(Object.keys(holder)[0].toString());
    let count = 1;
    arrayReturn.push(top);
    for (const i in holder) {
        const key = Number(i);
        const vals = holder[key];
        if (vals && (!arrayReturn.includes(key))) {
            count++;
            if (holder[top] < vals) {
                arrayReturn = [key];
                top = key;
            } else if (holder[top] === vals) {
                arrayReturn.push(key)
            }
        }
    }
    return arrayReturn.length !== count ? arrayReturn : []
}

function calcVariance(values, mean) {
    let varReturn = 0;
    values.forEach(function diffrence(Element) {
        varReturn += Math.pow(Element - mean, 2)
    });
    return varReturn / values.length
}

function calcStdDev(value) {
    return Math.sqrt(value)
}

function performStatistics() {
    let roughNumbers = document.getElementById("input").value.trim().split(" ");
    let diamondNumber = [];
    let checks = false;
    roughNumbers.forEach(function returnNumber(Element) {
        diamondNumber.push(Number(Element));
        Number(Element) > 100 || Number(Element) < 0 ? checks = true : 0;
    });
    if (checks) {
        alert("Error: Numbers must be between 0 and 100");
        return false;
    }
    if (!(diamondNumber.length >= 5 && diamondNumber.length <= 20)) {
        alert("Error: Not enough Numbers Inside the TextBox");
        return false;
    }
    let sortedDiamondNumbers = diamondNumber.sort(function (a, b) {
        return a - b
    });
    let sumTopass = calcSum(sortedDiamondNumbers);
    let meanTopass = calcMean(sumTopass, sortedDiamondNumbers.length);
    let varience = calcVariance(sortedDiamondNumbers, meanTopass);
    document.getElementById("median").value = calcMedian(sortedDiamondNumbers).toFixed(2);
    document.getElementById("sum").value = sumTopass.toFixed(2);
    document.getElementById("mean").value = meanTopass.toFixed(2);
    document.getElementById("min").value = calcMin(sortedDiamondNumbers).toFixed(2);
    document.getElementById("max").value = calcMax(sortedDiamondNumbers).toFixed(2);
    document.getElementById("mode").value = calcMode(sortedDiamondNumbers).toString().replace(/,/g, " ");
    document.getElementById("var").value = varience.toFixed(2);
    document.getElementById("stdev").value = calcStdDev(varience).toFixed(2);
    return false
}
