
    function sigmoid(x) {
        if (x[0].constructor == Array) {
            for (var i = 0; i < x.length; i++) {
                for (var j = 0; j < x[0].length; j++) {
                    x[i][j] = 1 / (1 + Math.exp(-x[i][j]));
                }
            }
        } else {
            for (var j = 0; j < x.length; j++) {
                x[j] = 1 / (1 + Math.exp(-x[j]));
               
            }
        }
        return x;
    }

    function matrixMultiplication(x, y) {
       var result = new Array();
        if (y[0].constructor == Array) {
            var result = new Array();
            for (var i = 0; i < x; i++) {
                innerResult = new Array();
                for (var h = 0; h < y.length; h++) {
                    var temp = 0;
                    for (var j = 0; j < x.length; j++) {
                        temp += x[j][i] * y[h][j];
                    }
                    innerResult.push(temp);
                }
                result.push(innerResult);
            }
        } else {
            var temp;
            for(var i = 0; i < x[0].length; i++){
                temp = 0;
                for(var j = 0; j < x.length; j++){
                    temp += x[j][i]*y[j];
                }
                result.push(temp);
            }
        }
        return result;
    }
