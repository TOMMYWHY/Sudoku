//solution
const Toolkit = require('./toolkit');

class Generator {
    generate(){
        while(!this.internalGenerate()){
            console.warn('try again~!')
        }
    }
    internalGenerate(){
        this.matrix=Toolkit.matrix.makeMatrix();
        this.orders = Toolkit.matrix.makeMatrix()
            .map(row=>row.map((v,i)=>i))
            .map(row=>Toolkit.matrix.shuffle(row));

        // Toolkit.matrix.makeRow()
        //     every
        for(let n = 1; n <= 9; n++){
            if(!this.fillNumber(n)){
                return false;
            }
        }
        return true;
    }

    fillNumber(n){
        return this.fillRow(n, 0);
    }
//递归
    fillRow(n, rowIndex){
        if(rowIndex>8){
            return true;
        }

        const row = this.matrix[rowIndex];
        //随机选择列
        const orders = this.orders[rowIndex];

        for(let i = 0; i < 9; i++){
            const colIndex = orders[i];
            //有值 跳过
            if(row[colIndex]){
                continue;
            }
            //无值    check
            if( !Toolkit.matrix.checkFillable(this.matrix, n, rowIndex, colIndex)){
                continue;
            }
            row[colIndex] = n;//填写成功

            //进入下一行，递归判断
            if(!this.fillRow(n, rowIndex + 1)){
                row[colIndex] = 0;
                continue;//失败
            }
            return true;//完成一次填写。
        }
        return false;//循环结束都没有填写成功
    }
}


const generator =  new Generator();
generator.generate();
console.log(generator.matrix);