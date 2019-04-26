let nn;
var svg;
var paddingNodes;

class NeuralNetwork {
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
        //all layers except outputlayer:
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


function forwardNetwork() {
    var data;
    
    data = sigmoid(nn.inputLayer.trainingData);
    data = matrixMultiplication(data, nn.inputLayer.weights);
    for (var i = 0; i < nn.hiddenLayers.length; i++) {
        nn.hiddenLayers[i].trainingData = data;
        data = sigmoid(nn.hiddenLayers[i].trainingData);
        data = matrixMultiplication(data, nn.hiddenLayers[i].weights);  
    }
    data = sigmoid(data);
    nn.outputLayer.trainingData = data;
    for (var i = 0; i < nn.outputs; i++) {
        document.getElementById("output" + i.toString()).value = data[0][i];
    }
    setMeanError(data, nn.facit);
    return data;
}

function forward(){
   
    var data = [];
    for (var i = 0; i < nn.inputs; i++) {
        data[i] = document.getElementById("input" + i.toString()).value;
    }
    data = sigmoid(data);
    data = matrixMultiplication(data, nn.inputLayer.weights);
    for (var i = 0; i < nn.hiddenLayers.length; i++) {
        nn.hiddenLayers[i].trainingData = data;
        data = sigmoid(nn.hiddenLayers[i].trainingData);
        data = matrixMultiplication(data, nn.hiddenLayers[i].weights);  
       
    }
    data = sigmoid(data);
    nn.outputLayer.trainingData = data;
    var facit = [];
    for (var i = 0; i < nn.outputs; i++) {
        facit[i] = document.getElementById("output" + i.toString()).value;
        document.getElementById("output" + i.toString()).value = data[i];
    }

    setMeanError(data, facit);
    return data;
}

function backpropagationLoop(){
    for(var i = 0; i < 10; i++){
        backpropagation();
    }
    document.getElementById("error").value = meanValue(nn.outputLayer.error);
    updateLines();
}

function backpropagation() {
    nn.outputLayer.error = difference(nn.outputLayer.trainingData, nn.facit);
    var delta = arrayProduct(nn.outputLayer.error, sigmoidPrime(nn.outputLayer.trainingData));
    for(var i = nn.layers-1; i >= 0; i--){
        //alert("delta: " + delta + " weights: " + nn.hiddenLayers[i].weights);
        nn.hiddenLayers[i].error = matrixMultiplication(delta, reverse(nn.hiddenLayers[i].weights));
        nn.hiddenLayers[i].delta = arrayProduct(nn.hiddenLayers[i].error, sigmoidPrime(nn.hiddenLayers[i].trainingData));
        var weights = matrixMultiplication(reverse(nn.hiddenLayers[i].trainingData),delta);  
        weights = mean(weights);
        nn.hiddenLayers[i].weights = sumArrays(weights, nn.hiddenLayers[i].weights);
        delta = nn.hiddenLayers[i].delta;
        //weights = lambda(rate, weights);
    }
    weights = matrixMultiplication( reverse(nn.inputLayer.trainingData), delta)
    weights = mean(weights);
    nn.inputLayer.weights = sumArrays(weights, nn.inputLayer.weights);
}

function setMeanError(data, facit){
    //alert("data: " + data + " faciit: " + nn.facit);
   document.getElementById("error").value = meanValue(data) - meanValue(facit);
}

function createNN() {
    nn = new NeuralNetwork(4, 3, 2, 2);
}

function getNumberOfNodes() {
    svg = d3.select("#dataviz_area");
    paddingNodes = 100;
    updateLines();

    for (var i = 0; i < nn.inputs; i++) {
        svg.append("circle")
            .attr("cx", 20).attr("cy", 40 + paddingNodes * i).attr("r", 10).style("fill", "blue");
        var container = document.getElementById("inputs");
        var input = document.createElement("INPUT");
        input.type = "text";
        input.className = "css-class-name";
        input.style.top = 50 + paddingNodes * i + "px";
        input.style.left = "10px";
        input.style.position = "absolute";
        input.size = 5;
        input.id = "input" + i.toString();
        input.value = 0.4;
        container.appendChild(input);
    }
    for (var i = 0; i < nn.hiddenLayers.length; i++) {
        for (var j = 0; j < nn.hiddenLayers[i].nodes; j++) {
            svg.append("circle")
                .attr("cx", 60 + paddingNodes * i).attr("cy", 40 + paddingNodes * j).attr("r", 10).style("fill", "blue");
        }
    }
    for (var i = 0; i < nn.outputs; i++) {
        svg.append("circle")
            .attr("cx", 60 + paddingNodes * nn.hiddenLayers.length).attr("cy", 40 + paddingNodes * i).attr("r", 10).style("fill", "blue");
        var container = document.getElementById("inputs");
        var input = document.createElement("INPUT");
        input.type = "text";
        input.className = "css-class-name";
        input.style.top = 50 + paddingNodes * i + "px";
        input.style.left = 60 + paddingNodes * nn.hiddenLayers.length + "px";
        input.style.position = "absolute";
        input.size = 5;
        input.id = "output" + i.toString();
        input.value = 0.1;
        container.appendChild(input);
    }
}

function pushTrainingData(){
    
    var data = [];
    for (var i = 0; i < nn.inputs; i++) {
        data[i] = document.getElementById("input" + i.toString()).value;
    }
    nn.inputLayer.trainingData.push(data);
    document.getElementById("trainingInputsText").value = nn.inputLayer.trainingData;
    data = [];
    for(var i = 0; i < nn.outputs; i++){
        data[i] = document.getElementById("output" + i.toString()).value;
    }
    nn.facit.push(data);
    document.getElementById("trainingOutputsText").value = nn.facit;
}

function updateLines(){
    for (var i = 0; i < nn.inputs; i++) {
        for (var j = 0; j < nn.inputLayer.nextLayerNodes; j++) {
            svg.append("line").attr("x1", 20).attr("y1", 40 + paddingNodes * i).attr("x2", 60).attr("y2", 40 + paddingNodes * j)
                .attr("stroke-width", 1).attr("stroke", "black").style("opacity", nn.inputLayer.weights[i][j]);
        }
    }

    for (var i = 0; i < nn.hiddenLayers.length; i++) {
        for (var j = 0; j < nn.hiddenLayers[i].nodes; j++) {
            for (var y = 0; y < nn.hiddenLayers[i].nextLayerNodes; y++) {
                svg.append("line").attr("x1", 60 + paddingNodes * i).attr("y1", 40 + paddingNodes * j).attr("x2", paddingNodes + 60 + paddingNodes * i).attr("y2", 40 + paddingNodes * y)
                    .attr("stroke-width", 1).attr("stroke", "black").style("opacity", nn.hiddenLayers[i].weights[j][y]);
            }
        }
    }
}
//show the NN in graph:





