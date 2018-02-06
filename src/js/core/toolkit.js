/*
矩阵 数组
 */
const  matrixToolkit = {
    /* 创建 父级 行 数组*/
     makeRow(v=0) {
    const array=new Array(9);
    array.fill(v);
    return array;
    },
    /*创建 每一行中 matrix数组*/
     makeMatrix(v=0) {
        return  Array.from({length:9},()=>this.makeRow(v));//此处Array.from 是将类数组 转为 数组；map函数，
         // 使 unknowable 数组的每一个值进行 map操作,其中map函数当第二个参数传入。
         //此处需要用this 调用模块自身makeRow方法
    },
    /* fisher-yates    洗牌算法*/
     shuffle(array) {
        const endIndex=array.length-2;//最后一个element不需要交换，因为它之前的一个已经完成过交换。
        for(let i = 0; i <= endIndex; i++){
            const j= i + Math.floor(Math.random()*(array.length-i)); //floor 向下舍入; j 是被交换的元素
            [array[i],array[j]]=[array[j],array[i]];//es6 解构
        }
        return array;
    },

    /*check 是否可以填*/
    checkFillable(matrix, n, rowIndex, colIndex){
        const row = matrix[rowIndex];
        const column = this.makeRow()
            .map((v,i)=>matrix[i][colIndex]);
        const { boxIndex } = boxToolkit.covertToBoxIndex(rowIndex, colIndex);
        const box = boxToolkit.getBoxCells(matrix, boxIndex);
        //return true;
        for(let i = 0; i < 9; i++){
            if(row[i]=== n || column[i] === n || box[i] === n)
                return false;
        }
        return true;
    }
};



/*
坐标
 */
const boxToolkit= {
    getBoxCells(matrix, boxIndex){
        const startRowIndex = Math.floor(boxIndex / 3) * 3;
        const startColIndex = boxIndex % 3 * 3;
        const result = [];
        for(let cellIndex = 0; cellIndex < 9; cellIndex++){
            const rowIndex = startRowIndex + Math.floor( cellIndex / 3);
            const colIndex = startColIndex + cellIndex % 3;
            result.push(matrix[rowIndex][colIndex]);
        }
        return result;
    },

    covertToBoxIndex(rowIndex,colIndex){
        return{
            boxIndex: Math.floor(rowIndex / 3) * 3 + Math.floor(colIndex / 3),
            cellIndex: rowIndex % 3 * 3 + colIndex % 3
        }
    },
    convertFromBoxIndex(boxIndex,cellIndex){
        return {
            rowIndex: Math.floor(boxIndex / 3) * 3 + Math.floor(cellIndex / 3),
            colIndex: boxIndex % 3 *3 + cellIndex % 3
        }
    }

};

module.exports = class Toolkit{
    //数组的静态方法
    static get matrix(){
        return matrixToolkit;
    }

    // 坐标 的静态方法
    static  get box(){
        return boxToolkit;
    }
};