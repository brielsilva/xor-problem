class NeuralNetwork {
    constructor(numI, numH, numO) {
        // In this architecture all the inputs is connected to all the nodes of the hidden layer
        this.input_nodes = numI; // Input Layer 
        this.hidden_nodes = numH;  // Hidden Layer, Strict one
        this.output_nodes = numO; // Output Layer
    }

    feedForward() {
        // Recieve all the inputs
        // 
    }

    backpropagate() {}
}

const brain = new NeuralNetwork(3,3,1);