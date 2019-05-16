
var nn
function start() {
    nn = new NeuralNetwork(4, 64, 3, 2);
}

function storeStringAsTrainingData(inputString, facitString) {
    let data = [];
    for (var i = 0; i < nn.inputs; i++) {
        data[i] = inputString[i];
    }
    nn.inputLayer.trainingData.push(data);
    data = [];
    for (var i = 0; i < nn.outputs; i++){
        data[i] = facitString[i];
    }
    nn.facit.push(data);
}


function forwardString(stringData) {
    let data = [];
    for (var i = 0; i < nn.inputs; i++) {
        data[i] = stringData[i];
    }
    let output = forwardData(data);
    console.log(output);
    document.getElementById("output").value = output;

}

//Only forward 1 set of data
function forwardData(data) {
    data = matrixMultiplication(data, nn.inputLayer.weights);
    data = sigmoid(data);
    for (var i = 0; i < nn.hiddenLayers.length; i++) {
        data = matrixMultiplication(data, nn.hiddenLayers[i].weights);
        data = sigmoid(data);
    }
    return data;
}