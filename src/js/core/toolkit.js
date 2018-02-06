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
    }
};

/*
坐标
 */
const boxToolkit= {
//TODO
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