class NeuralNetwork {
    constructor(numI, numH, numO) {
        // In this architecture all the inputs is connected to all the nodes of the hidden layer
        this.input_nodes = numI; // Input Layer 
        this.hidden_nodes = numH;  // Hidden Layer, Strict one
        this.output_nodes = numO; // Output Layer


        // This is hardcoded to be always a Three layer network.
        this.weights_ih = new Matrix(this.hidden_nodes,this.input_nodes);
        this.weights_ho = new Matrix(this.output_nodes,this.hidden_nodes);
        this.weights_ih.randomize();
        this.weights_ho.randomize();
        this.bias_h = new Matrix(this.hidden_nodes,1);
        this.bias_o = new Matrix(this.output_nodes,1);
        this.bias_h.randomize();
        this.bias_o.randomize();

        this.learning_rate = 0.1;
    }

    sigmoid(x) {
        return 1/(1 + Math.exp(-x));
    }

    feedForward(input_array) {
        let inputs = Matrix.fromArray(input_array);
        let hidden = Matrix.scaleMatrix(this.weights_ih, inputs);
        console.log(hidden);
        hidden.add(this.bias_h);
        hidden.map(this.sigmoid);
        let output = Matrix.scaleMatrix(this.weights_ho,hidden);
        console.log(output);
        output.add(this.bias_o);
        output.map(this.sigmoid);
        console.log(output);
        return output.toArray();
    }

    derivateSigmoid(y) {
        return y * (1 - y);
    }

    train(inputs,answers) {

        let input = Matrix.fromArray(inputs);
        let hidden = Matrix.scaleMatrix(this.weights_ih, input);

        hidden.add(this.bias_h);
        hidden.map(this.sigmoid);

        let output = Matrix.scaleMatrix(this.weights_ho,hidden);
        output.add(this.bias_o);
        output.map(this.sigmoid);

        answers = Matrix.fromArray(answers);

        // Output Errors
        let output_errors = Matrix.subtract(answers, output);

        // Gradient
        let gradients = Matrix.map(output,this.derivateSigmoid)
        console.log(gradients);
        gradients.scale(output_errors);
        gradients.scale(this.learning_rate);
        
        // Deltas
        let hidden_T =  Matrix.transpose(hidden);
        console.log(hidden_T);
        let weight_ho_deltas = Matrix.scaleMatrix(gradients, hidden_T);

        // Adjusting the weights
        console.log(weight_ho_deltas);
        this.weights_ho.add(weight_ho_deltas);
        console.log(this.weights_ho);

        this.bias_o.add(gradients);
        console.log(this.bias_o);
        
        
        // Hidden Errors
        let hidden_errors = Matrix.scaleMatrix(Matrix.transpose(this.weights_ho),output_errors);

        // Gradient Hidden
        let hidden_gradient = Matrix.map(hidden,this.derivateSigmoid)
        hidden_gradient.scale(hidden_errors)
        hidden_gradient.scale(this.learning_rate);

        // input -> hidden deltas

        let inputs_T = Matrix.transpose(input);

        let weights_ih_deltas = Matrix.scaleMatrix(hidden_gradient,inputs_T);

        this.weights_ih.add(weights_ih_deltas);
        this.bias_h.add(hidden_gradient);
    }


    backpropagate() {}
}

const brain = new NeuralNetwork(3,3,1);