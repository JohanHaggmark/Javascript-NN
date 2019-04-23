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
        var i,j;
        for (i = 0; i < this.nodes; i++) {
            this.weights[i] = new Array(this.nextLayerNodes);
            for (j = 0; j < this.nextLayerNodes; j++) {
                this.weights[i][j] = 2 * Math.random()-1; //Random -1 to 1
            }
        }
        return this.weights;
    }   
}


class Functions {

    static sigmoid(x) {
        for (i = 0; i < x.length; i++) {
            node = x[i];
            for (j = 0; j < node.length; j++) {
                node[j] = 1 / (1 + Math.exp(-node[j]));
            }
        }
        return x;
    }

    static matrixMultiplication(weights, nodes) {
        result = new Array();
        for (i = 0; i < weights.length; i++) {
            weightsOnNode = weights[i];
            for (j = 0; j < weightsOnNode.length; j++) {
                result.push(weightsOnNode[j] * nodes[i]) 
            }
        }
        return result;
    }
}

function createNN(){
    nn = new NeuralNetwork(3,1,1,1);
}

function getNumberOfNodes(){
    console.log(rect.inputs);
    document.getElementById("numberOfInputs").innerHTML = nn.inputs;
    var i;
    var j;
    for(i = 0; i < nn.inputs; i++){
        for(j = 0; j < nn.inputLayer.nextLayerNodes;j++){
            var span = document.createElement("SPAN");
            span.classList.add("dot");
            var size = Math.floor((1+nn.inputLayer.weights[i][j])*20);
            size.toString();
            span.style.width=size.toString()+"px";
            span.style.height=size.toString()+"px";
            var t = document.createTextNode(size.toString());
            span.appendChild(t);
            document.body.appendChild(span);
           
        
            
        }
    }
    var y;
    for(i = 0; i < nn.layers;i++){
        
    }
}