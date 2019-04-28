
/*To use this Training set. The network must be defined as:
nn = new NeuralNetwork(3, x, 2, y);
*/

inputData = [[1,1,0],[0,1,0],[0.1,0.1,1], [0,1,1],[1,1,1], [1,1,0]];

facit = [[1,0],[0,1],[0,1],[0,1],[1,1],[1,0.5]];

function setTrainingData() {
    nn.inputLayer.trainingData = inputData;
    document.getElementById("trainingInputsText").value
    nn.facit = facit;
    document.getElementById("trainingOutputsText").value = nn.facit;
    //use forwardTrainingData() to store the training data in the network
    forwardTrainingData();
}

/*If using this for digit recognition, [1,1,0] this should be the pixels of 1 image.
To get an efficient effect of training, not to few and not to many training examples 
should be used. maybe from 2 to 20 training examples might be a good choice
Its good to have input value should be between 0 and 1*/
