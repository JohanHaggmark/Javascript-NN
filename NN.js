
class NeuralNetwork {
    //This class works as a holder of all objects of Layer class.
    //number of: input-nodes, hidden-nodes, output-nodes, hidden-layers
    constructor(inputs, hiddens, outputs, layers) {
        this.inputs = inputs;
        this.hiddens = hiddens;
        this.outputs = outputs;
        this.layers = layers;
        this.facit = new Array();
        //creating input layer
        this.inputLayer = new Layer(this.inputs, this.hiddens);
        //creating hidden layers
        this.hiddenLayers = new Array();
        var i;
        for (i = 1; i < this.layers; i++) {
            this.hiddenLayers.push(new Layer(this.hiddens, this.hiddens));
        }
        //creating the last hidden layer (differ from the other hidden layers)
        this.hiddenLayers.push(new Layer(this.hiddens, this.outputs));
        //creating output layer
        this.outputLayer = new Layer(this.outputs, 0);
    }
}

class Layer {
    constructor(nodes, nextLayerNodes) {
        this.nodes = nodes;
        this.nextLayerNodes = nextLayerNodes;
        this.delta;
        this.error;
        this.trainingData = new Array();
        //all layers except outputlayer should have weights:
        if (this.nextLayerNodes > 0) {
            this.weights = this.initializeWeightsOnNodes;
        }
    }

    get initializeWeightsOnNodes() {
        this.weights = new Array(this.nodes);
        var i, j;
        for (i = 0; i < this.nodes; i++) {
            this.weights[i] = new Array(this.nextLayerNodes);
            for (j = 0; j < this.nextLayerNodes; j++) {
                this.weights[i][j] = 2 * Math.random() - 1; //Random -1 to 1
            }
        }
        return this.weights;
    }
}

//call this when running multiple sets of data. e.g. training data.
function forwardTrainingData() {
    var data;
    //visualize inputs
    for (var i = 0; i < nn.inputs; i++) {
        document.getElementById("input" + i.toString()).value = nn.inputLayer.trainingData[0][i];
    }
    data = matrixMultiplication(nn.inputLayer.trainingData, nn.inputLayer.weights);
    data = sigmoid(data);
    for (var i = 0; i < nn.hiddenLayers.length; i++) {
        nn.hiddenLayers[i].trainingData = data;
        data = matrixMultiplication(data, nn.hiddenLayers[i].weights);
        data = sigmoid(data);
    }
    nn.outputLayer.trainingData = data;
    //visualize result
    for (var i = 0; i < nn.outputs; i++) {
        document.getElementById("output" + i.toString()).value = data[0][i];
    }
    setMeanError(data, nn.facit);
    return data;
}

//call this when running only 1 set of data.
function forward() {
    var data = [];
    for (var i = 0; i < nn.inputs; i++) {
        data[i] = document.getElementById("input" + i.toString()).value;
    }
    data = matrixMultiplication(data, nn.inputLayer.weights);
    data = sigmoid(data);
    for (var i = 0; i < nn.hiddenLayers.length; i++) {
        data = matrixMultiplication(data, nn.hiddenLayers[i].weights);
        data = sigmoid(data);
    }
    var facit = [];
    for (var i = 0; i < nn.outputs; i++) {
        facit[i] = document.getElementById("output" + i.toString()).value;
        document.getElementById("output" + i.toString()).value = data[i];
    }
    setMeanError(data, facit);
    return data;
}

function backpropagation() {
    nn.outputLayer.error = difference(nn.facit, nn.outputLayer.trainingData);
    var delta = arrayProduct(nn.outputLayer.error, sigmoidPrime(nn.outputLayer.trainingData));
    for (var i = nn.layers - 1; i >= 0; i--) {
        //alert("delta: " + delta + " weights: " + nn.hiddenLayers[i].weights);
        nn.hiddenLayers[i].error = matrixMultiplication(delta, reverse(nn.hiddenLayers[i].weights));
        nn.hiddenLayers[i].delta = arrayProduct(nn.hiddenLayers[i].error, sigmoidPrime(nn.hiddenLayers[i].trainingData));
        var weights = matrixMultiplication(reverse(nn.hiddenLayers[i].trainingData), delta);
        weights = mean(weights);
        //weights = lambda(rate, weights); //if the learning rate is not satisfying
        nn.hiddenLayers[i].weights = sumArrays(weights, nn.hiddenLayers[i].weights);
        delta = nn.hiddenLayers[i].delta;  
    }
    weights = matrixMultiplication(reverse(nn.inputLayer.trainingData), delta)
    weights = mean(weights);
    //weights = lambda(rate, weights); //if the learning rate is not satisfying
    nn.inputLayer.weights = sumArrays(weights, nn.inputLayer.weights);
}

function trainNetwork() {
    //to get some effect of backpropagation, it should be run multiple times
    for (var i = 0; i < 50; i++) {
        backpropagation();
        forwardTrainingData();
    }
    updateLines();
}

function setMeanError(data, facit) {
    //alert("data: " + data + " faciit: " + nn.facit);
    document.getElementById("error").value = meanValue(data) - meanValue(facit);
}

//Stores new training data from the UI:s text areas
function pushTrainingData() {
    var data = [];
    for (var i = 0; i < nn.inputs; i++) {
        data[i] = document.getElementById("input" + i.toString()).value;
    }
    nn.inputLayer.trainingData.push(data);
    document.getElementById("trainingInputsText").value = nn.inputLayer.trainingData;
    data = [];
    for (var i = 0; i < nn.outputs; i++) {
        data[i] = document.getElementById("output" + i.toString()).value;
    }
    nn.facit.push(data);
    document.getElementById("trainingOutputsText").value = nn.facit;
    forwardTrainingData();
}

function createNN() {
    nn = new NeuralNetwork(4, 8, 3, 2);
}

function createNN2(){
    var inputs = document.getElementById("createInputs").value;
    var hiddens = document.getElementById("createHiddens").value;
    var outputs = document.getElementById("createOutputs").value;
    var layers = document.getElementById("createLayers").value;
    nn = new NeuralNetwork(inputs, hiddens, outputs, layers);
    getNumberOfNodes();
}





