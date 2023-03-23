class Matrix {
    constructor(rows,cols) {
        this.rows = rows;
        this.cols = cols;
        this.matrix = [];

        for(let i = 0; i < rows; i++) {
            this.matrix[i] = [];
            for(let j = 0; j < cols; j++) {
                this.matrix[i][j] = 0;
            }
        }
    }

    static scaleMatrix(matrixOne, matrixTwo) {
        const a = matrixOne.matrix;
        const b = matrixTwo.matrix;
        if(matrixOne.cols === matrixTwo.rows) {
            let result = new Matrix(matrixOne.rows, matrixTwo.cols);
            for(let i = 0; i < result.rows; i++) { // 0, 0
                for(let j = 0; j < result.cols; j++) { // 0, 1
                    let sum = 0;
                    for(let cols = 0; cols < matrixOne.cols; cols++) {
                        // A00 * B00 + A01 * B10, // A00 * B01 + A01 * B11
                        sum += a[i][cols] * b[cols][j];
                    }
                    result.matrix[i][j] = sum;
                }
            }
            return result;
        }
    }
    
    scale(n) {
        for(let i = 0; i < this.rows; i++) {
            for(let j = 0; j < this.cols; j++) {
                this.matrix[i][j] *= n;
            }
        }
    }


    add(n) {
        if (n instanceof Matrix) {
            if(n.rows == this.rows && n.cols == this.cols) {
                for(let i = 0; i < this.rows; i++) {
                    for(let j = 0; j < this.cols; j++) {
                        this.matrix[i][j] += n.matrix[i][j];
                    }
                }    
            } else {
                throw new Error("Matrix must be of the same size NxM")
            }
        } else {
            for(let i = 0; i < this.rows; i++) {
                for(let j = 0; j < this.cols; j++) {
                    this.matrix[i][j] += n;
                }
            }
        }
    }

    randomize() {
        for(let i = 0; i < this.rows; i++) {
            for(let j = 0; j < this.cols; j++) {
                this.matrix[i][j] = Math.floor(Math.random() * 10);
            }
        }
    }

    static transpose(m) {
        const result = new Matrix(m.cols, m.rows);
        for(let i = 0; i < m.rows; i++) {
            for(let j = 0; j < m.cols; j++) {
                result.matrix[j][i] += m.matrix[i][j];
            }
        }
        return result;
    }

    map(func) {
        for(let i = 0; i < this.rows; i++) {
            for(let j = 0; j < this.cols; j++) {
                let val = this.matrix[i][j]
                this.matrix[i][j] = func(val,i,j);
            }
        }
    }
}


const n = new Matrix(2,2);
const m = new Matrix(2,3); // 3 2
n.randomize();
m.randomize();

console.table(n.matrix);
console.table(m.matrix);

console.table(Matrix.scaleMatrix(n,m).matrix);
console.table(Matrix.transpose(m).matrix);