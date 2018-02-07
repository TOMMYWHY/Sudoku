const Toolkit=require('../core/toolkit');
// const Generator = require('../core/generator');
const Sudoku = require('../core/sudoku');
const Checker = require('../core/checker');

class Grid{
    //构造函数
    constructor(container){
        this._$container=container;
    };
    build(){
        //宫加粗 样式数组
        const rowGroupClasses=['row_g_top','row_g_middle','row_g_bottom'];
        const colGroupClasses=['col_g_left','col_g_center','col_g_right'];

        const sudoku = new Sudoku();
        sudoku.make();
        const matrix = sudoku.puzzleMatrix;
        /*
        const generator = new Generator();
        generator.generate();
        // const matrix = Toolkit.matrix.makeMatrix();//类的静态方法
        const matrix = generator.matrix;
        */
        //两层map，操作的小格
        const $cells = matrix.map(rowValues=>rowValues
            .map((cellValue,colIndex)=>{
                return  $('<span>')
                    .addClass(colGroupClasses[colIndex % 3])
                    .addClass(cellValue ? "fixed" : 'empty')
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

    bindPopup(popupNumbers){
        this._$container.on('click','span', e=>{
            const $cell = $(e.target);
            if($cell.is('.fixed')){
                return;
            }
            popupNumbers.popup($cell);
        })
    }
//buttoms
    check(){
        const data = this._$container.children()
            .map((rowIndex, div)=> {
                return $(div).children()
                    .map((colIndex, span)=>parseInt($(span).text()) || 0);
            })
            .toArray()
            .map($data => $data.toArray());
        console.log(data);
        const checker = new Checker(data);
        if(checker.check()){
            return true;

        }
        const marks = checker.matrixMarks;
        this._$container.children()
            .each((rowIndex, div) => {
               $(div).children().each((colIndex, span) => {
                   const $span = $(span);
                   if($span.is('.fixed') || marks[rowIndex][colIndex]){
                       $span.removeClass('error');
                   }else {
                       $span.addClass('error');
                   }
                   // $span.addClass('error');
               })
            });

    }
    reset(){
        this._$container.find('span:not(.fixed)')
            .removeClass('error mark1 mark2')
            .addClass('empty')
            .text(0);
    }
    clear(){
        this._$container.find('span.error')
            .removeClass('error');
    }
    rebuild(){
        this._$container.empty();
        this.build();
        this.layout();
    }

}

module.exports =  Grid;