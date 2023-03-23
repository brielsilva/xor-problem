let training_data = [
    {
        inputs: [0,0],
        targets: [1],
    },
    {
        inputs: [0,1],
        targets: [0],
    },
    {
        inputs: [1,0],
        targets: [0],
    },
    {
        inputs: [1,1],
        targets: [1],
    },
]

function setup() {
    let nn = new NeuralNetwork(2,2,1);

    // for (let i = 0; i < 100; i++) {
    //     for(data of training_data) {
    //     }
    // }
    nn.train(training_data[0].inputs,training_data[0].targets);
    let guess = nn.feedForward([0,0]);
    console.log(guess);
    console.table(guess.matrix);
    // let output = nn.feedForward(input);

    // console.log(output);
}

setup();