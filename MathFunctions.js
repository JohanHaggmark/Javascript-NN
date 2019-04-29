
function sigmoid(x) {

    var result = new Array();
    if (x[0].constructor == Array) {
        for (var i = 0; i < x.length; i++) {
            result[i] = new Array();
            for (var j = 0; j < x[0].length; j++) {
                result[i][j] = 1 / (1 + Math.exp(-x[i][j]));
            }
        }
    } else {
        for (var j = 0; j < x.length; j++) {
            result[j] = 1 / (1 + Math.exp(-x[j]));

        }
    }
    return result;
}

function sigmoidPrime(x) {
    var result = new Array();
    if (x[0].constructor == Array) {
        for (var i = 0; i < x.length; i++) {
            result[i] = new Array();
            for (var j = 0; j < x[0].length; j++) {
                result[i][j] = x[i][j] * (1 - x[i][j]);
            }
        }
    } else {
        for (var j = 0; j < x.length; j++) {
            result[j] = x[j] * (1 - x[j]);
        }
    }
    return result;
}

function matrixMultiplication(x, y) {
    var result = new Array();
    var temp;
    if (x[0].constructor == Array) {
        for (var i = 0; i < x.length; i++) {
            var innerResult = new Array();
            for (var h = 0; h < y[0].length; h++) {
                temp = 0;
                for (var j = 0; j < x[0].length; j++) {
                    temp += x[i][j] * y[j][h];
                }
                innerResult.push(temp);
            }
            result.push(innerResult);
        }
    } else {
        for (var i = 0; i < y[0].length; i++) {
            temp = 0;
            for (var j = 0; j < x.length; j++) {
                temp += y[j][i] * x[j];
            }
            result.push(temp);
        }
    }
    return result;
}

function arrayProduct(x, y) {
    var result = new Array();
    for (var i = 0; i < x.length; i++) {
        result[i] = new Array();
        for (var j = 0; j < x[0].length; j++) {
            result[i][j] = x[i][j] * y[i][j];
        }
    }
    return result;
}

function sumArrays(x, y) {
    var result = new Array();
    for (var i = 0; i < x.length; i++) {
        result[i] = new Array();
        for (var j = 0; j < x[0].length; j++) {
            result[i][j] = x[i][j] + y[i][j];
        }
    }
    return result;
}

function reverse(x) {
    var result = new Array();
    for(var i = 0; i < x[0].length; i++){
        innerResult = new Array();
        for(var j = 0; j < x.length; j++){
            innerResult[j] = x[j][i];
        }
        result[i] = innerResult;
    }
    return result;
}

function mean(x) {
    var result = new Array();
    for(var i = 0; i < x.length; i++){
        result[i] = new Array();
        for( var j = 0; j < x[0].length; j++){
            result[i][j] = x[i][j]/x.length;
        }
    }
    return result;
}

function difference(x, y){
    var result = new Array();
    if(x[0].constructor == Array){
        for(var i = 0; i < x.length; i++){
            result[i] = new Array();
            for(var j = 0; j < x[0].length; j++){
                result[i][j] = x[i][j] - y[i][j];
            }
        }
        return result;
    } else {
        for(var i = 0; i < x.length; i++){
            result[i] = x[i] - y[i];
        }
        return result;
    }
}

function meanValue(x){
    var temp = 0;
    if (x[0].constructor == Array) {
        for(var i = 0; i < x.length; i++){
            for(var j = 0; j < x[0].length; j++){
                temp = temp + 1 * x[i][j];
            }
        }
        return temp/(x.length * x[0].length);
    } else {
        for(var i = 0; i < x.length; i++){
            temp += 1 * x[i];
        }
        return temp / x.length;
    }
}

function lambda(rate, x){
    if (x[0].constructor == Array) {
        for(var i = 0; i < x.length; i++){
            for(var j = 0; j < x[0].length; j++){
                x[i][j] = rate * x[i][j];
            }
        }
        return x;
    } else {
        for(var i = 0; i < x.length; i++){
            x[i] = rate * x[i];
        }
        return x;
    }
}
