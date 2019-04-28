let nn;
var svg;
var paddingNodes;
var paddingHidden;
var paddingInput;
var paddingOutput;
var paddingLayers;

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
        nn.hiddenLayers[i].weights = sumArrays(weights, nn.hiddenLayers[i].weights);
        delta = nn.hiddenLayers[i].delta;
        //weights = lambda(rate, weights);
    }
    weights = matrixMultiplication(reverse(nn.inputLayer.trainingData), delta)
    weights = mean(weights);
    nn.inputLayer.weights = sumArrays(weights, nn.inputLayer.weights);
}

function trainNetwork() {
    //to get some effect of backpropagation, it should be run multiple times
    for (var i = 0; i < 10; i++) {
        backpropagation();
        forwardTrainingData();
    }
    updateLines();
}

function setMeanError(data, facit) {
    //alert("data: " + data + " faciit: " + nn.facit);
    document.getElementById("error").value = meanValue(data) - meanValue(facit);
}

function createNN() {
    nn = new NeuralNetwork(2, 4, 2, 2);
}

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

function getNumberOfNodes() {
    svg = d3.select("#dataviz_area");
    var width = svg.attr("width");
    var height = svg.attr("height");
    paddingNodes = 100;
    paddingInput = height / (nn.inputs + 1);
    paddingHidden = height / (nn.hiddens + 1);
    paddingOutput = height / (nn.outputs + 1);
    paddingLayers = width / (nn.layers + 3);
    updateLines();

    for (var i = 0; i < nn.inputs; i++) {

        svg.append("circle")
            .attr("cx", paddingLayers).attr("cy", paddingInput + paddingInput * i).attr("r", 5).style("fill", "blue");
        var container = document.getElementById("inputs");
        var input = document.createElement("INPUT");
        input.type = "text";
        input.className = "css-class-name";
        input.style.top = paddingInput + paddingInput * i + "px";
        input.style.left = paddingLayers - 65 + "px";
        input.style.position = "absolute";
        input.size = 4;
        input.id = "input" + i.toString();
        input.value = Math.random();
        container.appendChild(input);
    }
    for (var i = 0; i < nn.hiddenLayers.length; i++) {
        for (var j = 0; j < nn.hiddenLayers[i].nodes; j++) {
            svg.append("circle")
                .attr("cx", paddingLayers * 2 + paddingLayers * i).attr("cy", paddingHidden + paddingHidden * j).attr("r", 5).style("fill", "blue");
        }
    }
    for (var i = 0; i < nn.outputs; i++) {
        svg.append("circle")
            .attr("cx", paddingLayers * (nn.layers + 2)).attr("cy", paddingOutput + paddingOutput * i).attr("r", 5).style("fill", "blue");
        var container = document.getElementById("inputs");
        var input = document.createElement("INPUT");
        input.type = "text";
        input.className = "css-class-name";
        input.style.top = paddingOutput + paddingOutput * i + "px";
        input.style.left = 20 + paddingLayers * (nn.layers + 2) + "px";
        input.style.position = "absolute";
        input.size = 4;
        input.id = "output" + i.toString();
        input.value = Math.random();
        container.appendChild(input);
    }
}

function updateLines() {
    //input lines
    for (var i = 0; i < nn.inputs; i++) {
        for (var j = 0; j < nn.inputLayer.nextLayerNodes; j++) {
            if (nn.inputLayer.weights[i][j] > 0) {
                svg.append("line").attr("x1", paddingLayers).attr("y1", paddingInput + paddingInput * i).attr("x2", paddingLayers * 2).attr("y2", paddingHidden + paddingHidden * j)
                    .attr("stroke-width", 1).attr("stroke", "black").style("opacity", nn.inputLayer.weights[i][j]);
            } else {
                svg.append("line").attr("x1", paddingLayers).attr("y1", paddingInput + paddingInput * i).attr("x2", paddingLayers * 2).attr("y2", paddingHidden + paddingHidden * j)
                    .attr("stroke-width", 1).attr("stroke", "red").style("opacity", -nn.inputLayer.weights[i][j]);

            }
        }
    }

    //hidden lines
    for (var i = 0; i < nn.hiddenLayers.length - 1; i++) {
        for (var j = 0; j < nn.hiddenLayers[i].nodes; j++) {
            for (var y = 0; y < nn.hiddenLayers[i].nextLayerNodes; y++) {
                if (nn.hiddenLayers[i].weights[j][y] > 0) {
                    svg.append("line").attr("x1", paddingLayers * 2 + paddingLayers * i).attr("y1", paddingHidden + paddingHidden * j).attr("x2", paddingLayers * 3 + paddingLayers * i).attr("y2", paddingHidden + paddingHidden * y)
                        .attr("stroke-width", 1).attr("stroke", "black").style("opacity", nn.hiddenLayers[i].weights[j][y]);
                } else {
                    svg.append("line").attr("x1", paddingLayers * 2 + paddingLayers * i).attr("y1", paddingHidden + paddingHidden * j).attr("x2", paddingLayers * 3 + paddingLayers * i).attr("y2", paddingHidden + paddingHidden * y)
                        .attr("stroke-width", 1).attr("stroke", "red").style("opacity", -nn.hiddenLayers[i].weights[j][y]);

                }

            }

        }
    }
    //output lines
    for (var j = 0; j < nn.hiddenLayers[nn.hiddenLayers.length - 1].nodes; j++) {
        for (var y = 0; y < nn.hiddenLayers[nn.hiddenLayers.length - 1].nextLayerNodes; y++) {
            if (nn.hiddenLayers[i].weights[j][y] > 0) {
                svg.append("line").attr("x1", paddingLayers * 2 + paddingLayers * i).attr("y1", paddingHidden + paddingHidden * j).attr("x2", paddingLayers * (nn.layers + 2)).attr("y2", paddingOutput + paddingOutput * y)
                    .attr("stroke-width", 1).attr("stroke", "black").style("opacity", nn.hiddenLayers[i].weights[j][y]);
            } else {
                svg.append("line").attr("x1", paddingLayers * 2 + paddingLayers * i).attr("y1", paddingHidden + paddingHidden * j).attr("x2", paddingLayers * (nn.layers + 2)).attr("y2", paddingOutput + paddingOutput * y)
                    .attr("stroke-width", 1).attr("stroke", "red").style("opacity", -nn.hiddenLayers[i].weights[j][y]);

            }

        }

    }
}
//show the NN in graph:





