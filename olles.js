
var nn;
function start() {
    //NeuralNetwork(INPUT NODES, HIDDEN LAYER NODES, OUTPUT NODES, NUMBER OF HIDDEN LAYERS);
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


function train() {
    let batchSize = Number(document.getElementById("batchSize").value);
    let rows = Number(document.getElementById("rounds").value);
    var inputData = nn.inputLayer.trainingData;
    var facit = nn.facit;
    for (let i = 0; i < rows; i++) {
        setAmountTrainingData(batchSize, inputData, facit);
    }
    nn.inputLayer.trainingData = inputData;
    nn.facit = facit;
}

function setAmountTrainingData(batchSize, inputData, facit) {
    let size = inputData.length;
    let batchData = [];
    let batchFacit = [];
    let index;
    for (let i = 0; i < batchSize; i++) {
        index = Math.floor(Math.random() * (size - 1));
        batchFacit.push(facit[index]);
        batchData.push(inputData[index]);
    }
    nn.inputLayer.trainingData = batchData;
    nn.facit = batchFacit;
    trainNetwork();
}

