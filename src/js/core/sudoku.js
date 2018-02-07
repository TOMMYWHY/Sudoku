

//3.

const Generator = require('../core/generator');

module.exports = class Sudoku{
    //1. 完成result
    constructor(){
        const generator = new Generator();
        generator.generate();
        this.solutionMatrix = generator.matrix;
    }
    //2. 随机去除数据
    make(level = 5){
        const shouldRid = Math.random() * 9 < level;
        this.puzzleMatrix = this.solutionMatrix.map(row =>{
            return row.map(cell => Math.random() * 9 < level ? 0 : cell );
        });
    }
}
