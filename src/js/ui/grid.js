const Toolkit=require('../core/toolkit');

class Grid{
    //构造函数
    constructor(container){
        this._$container=container;
    };
    build(){
        //宫加粗 样式数组
        const rowGroupClasses=['row_g_top','row_g_middle','row_g_bottom'];
        const colGroupClasses=['col_g_left','col_g_center','col_g_right'];

        const matrix = Toolkit.matrix.makeMatrix();//类的静态方法
        //两层map，操作的小格
        const $cells = matrix.map(rowValues=>rowValues
            .map((cellValue,colIndex)=>{
                return  $('<span>')
                    .addClass(colGroupClasses[colIndex % 3])
                    .text(cellValue);//将每个小格定义为span
                //     return 'a';
            })
        );
        //一层map，操作一行
        const $divArray = $cells.map(($spanArray,rowIndex)=>{
            return $('<div>')
                .addClass('row')
                .addClass(rowGroupClasses[rowIndex % 3])
                .append($spanArray);
        });

        this._$container.append($divArray);//将整体放入container

    }

    /* 格宽高*/
    layout(){
        const width=$('span:first',this._$container).width();
        $('span',this._$container).height(width).css({
            'line-height':`${width}px`,
            'font-size':width < 32 ? `${width / 2}px`: '',
        });
    }

}

module.exports =  Grid;