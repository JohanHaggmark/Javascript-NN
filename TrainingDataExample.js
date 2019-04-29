
/*To use this Training set. The network must be defined as:
nn = new NeuralNetwork(3, x, 2, y);

inputData = [[1,1,0],[0,1,0],[0.1,0.1,1], [0,1,1],[1,1,1], [1,1,0]];
facit = [[1,0],[0,1],[0,1],[0,1],[1,1],[1,0.5]];
*/

inputData = [[1, 0, 0, 0], [1, 1, 0, 0], [0, 0, 0, 1], [0, 0, 1, 1]];
facit = [[1, 0, 0], [0, 1, 0], [0, 0, 1], [0, 1, 0]];

function setTrainingData() {
    nn.inputLayer.trainingData = inputData;
    document.getElementById("trainingInputsText").value
    nn.facit = facit;
    document.getElementById("trainingOutputsText").value = nn.facit;
    //use forwardTrainingData() to store the training data in the network
    forwardTrainingData();
}

function train() {
    let batchSize = Number(document.getElementById("batchSize").value);
    let rows = Number(document.getElementById("rows").value);
    for (let i = 0; i < rows; i++) {
        setAmountTrainingData(batchSize, inputData);
    }
}

function setAmountTrainingData(batchSize, data) {
    let size = data.length;
    let batchData = [];
    let batchFacit = [];
    let index;
    for (let i = 0; i < batchSize; i++) {
        index = Math.floor(Math.random() * (size-1));
        batchFacit.push(facit[index]);
        batchData.push(data[index]);
    }
    nn.inputLayer.trainingData = batchData;
    nn.facit = batchFacit;
    forwardTrainingData();
    trainNetwork(); //fyunkar inte
}

/*If using this for digit recognition, [1,1,0] this should be the pixels of 1 image.
To get an efficient effect of training, not to few and not to many training examples
should be used. maybe from 2 to 20 training examples might be a good choice
Its good to have input value should be between 0 and 1*/
