let nn;

class NeuralNetwork {
    //number of: input-nodes, hidden-nodes, output-nodes, hidden-layers
    constructor(inputs, hiddens, outputs, layers) {
        this.inputs = inputs;
        this.hiddens = hiddens;
        this.outputs = outputs;
        this.layers = layers;

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

    forward(nodes) {
        nextLayer = Functions.sigmoid(Functions.matrixMultiplication(this.inputLayer.weights, nodes));
        for (i = 0; i < this.hiddenLayers.length; i++) {
            nextLayer = Functions.sigmoid(Functions.matrixMultiplication(hiddenLayers.weights, nextLayer));
        }
    }
}


class Layer {
    constructor(nodes, nextLayerNodes) {
        this.nodes = nodes;
        this.nextLayerNodes = nextLayerNodes;
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
    var data = [];
    for (var i = 0; i < nn.inputs; i++) {
        data[i] = document.getElementById("input" + i.toString()).value;
    }

    data = sigmoid(data);
    data = matrixMultiplication(nn.inputLayer.weights, data);

    for (var i = 0; i < nn.hiddenLayers.length; i++) {
        data = sigmoid(data);
        data = matrixMultiplication(nn.hiddenLayers[i].weights, data);
      
    }
    for (var i = 0; i < nn.outputs; i++) {
        document.getElementById("output" + i.toString()).value = data[i];
    }
    return data;
}

function backpropagation(facit, trainingData) {

}

function createNN() {
    nn = new NeuralNetwork(3, 3, 5, 2);
}

function getNumberOfNodes() {
    //console.log(rect.inputs);
    //document.getElementById("numberOfInputs").innerHTML = nn.inputs;


    var svg = d3.select("#dataviz_area")
    var paddingNodes = 100;

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
        container.appendChild(input);


    }

}


//show the NN in graph:





