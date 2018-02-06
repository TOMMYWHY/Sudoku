const toolkit=require('./toolkit');
const matrix= toolkit.makeMatrix();
console.log(matrix);


class Grid{
    //构造函数
    constructor(container){
        this._$container=container;
    };
    build(){
        const matrix = toolkit.makeMatrix();
        //两层map，操作的小格
        const $cells = matrix.map(rowValues=>rowValues.map(
            cellValue=>{
            return  $('<span>').text(cellValue);//将每个小格定义为span
            //     return 'a';
            })
        );
        //一层map，操作一行
        const $divArray = $cells.map($spanArray=>{
            return $('<div>').append($spanArray);
        });

        this._$container.append($divArray);//将整体放入container

    }


}

new Grid($('#container')).build();