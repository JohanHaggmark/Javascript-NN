
var nn
function start(){
    nn = new NeuralNetwork(120, 64, 8, 2);
}


function stringToNetwork(stringData){
    let data = [];
    for(var i = 0; i < nn.inputs; i++){
        data[i] = stringData[i];
    }

    let output = forwardString(data);
    //alert(output);
    document.getElementById("output").value = output;   
}

//Only forward 1 set of data
function forwardString(data){
    alert(data);
    data = matrixMultiplication(data, nn.inputLayer.weights);
    data = sigmoid(data);
    alert(data);
    for (var i = 0; i < nn.hiddenLayers.length; i++) {
        data = matrixMultiplication(data, nn.hiddenLayers[i].weights);
        data = sigmoid(data);
    }
    alert(data);
    return data;
}