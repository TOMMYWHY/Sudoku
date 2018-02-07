/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
矩阵 数组
 */
var matrixToolkit = {
    /* 创建 父级 行 数组*/
    makeRow: function makeRow() {
        var v = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

        var array = new Array(9);
        array.fill(v);
        return array;
    },

    /*创建 每一行中 matrix数组*/
    makeMatrix: function makeMatrix() {
        var _this = this;

        var v = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

        return Array.from({ length: 9 }, function () {
            return _this.makeRow(v);
        }); //此处Array.from 是将类数组 转为 数组；map函数，
        // 使 unknowable 数组的每一个值进行 map操作,其中map函数当第二个参数传入。
        //此处需要用this 调用模块自身makeRow方法
    },

    /* fisher-yates    洗牌算法*/
    shuffle: function shuffle(array) {
        var endIndex = array.length - 2; //最后一个element不需要交换，因为它之前的一个已经完成过交换。
        for (var i = 0; i <= endIndex; i++) {
            var j = i + Math.floor(Math.random() * (array.length - i)); //floor 向下舍入; j 是被交换的元素
            //es6 解构
            var _ref = [array[j], array[i]];
            array[i] = _ref[0];
            array[j] = _ref[1];
        }
        return array;
    },


    /*check 是否可以填*/
    checkFillable: function checkFillable(matrix, n, rowIndex, colIndex) {
        var row = matrix[rowIndex];
        var column = this.makeRow().map(function (v, i) {
            return matrix[i][colIndex];
        });

        var _boxToolkit$covertToB = boxToolkit.covertToBoxIndex(rowIndex, colIndex),
            boxIndex = _boxToolkit$covertToB.boxIndex;

        var box = boxToolkit.getBoxCells(matrix, boxIndex);
        //return true;
        for (var i = 0; i < 9; i++) {
            if (row[i] === n || column[i] === n || box[i] === n) return false;
        }
        return true;
    }
};

/*
坐标
 */
var boxToolkit = {
    getBoxCells: function getBoxCells(matrix, boxIndex) {
        var startRowIndex = Math.floor(boxIndex / 3) * 3;
        var startColIndex = boxIndex % 3 * 3;
        var result = [];
        for (var cellIndex = 0; cellIndex < 9; cellIndex++) {
            var rowIndex = startRowIndex + Math.floor(cellIndex / 3);
            var colIndex = startColIndex + cellIndex % 3;
            result.push(matrix[rowIndex][colIndex]);
        }
        return result;
    },
    covertToBoxIndex: function covertToBoxIndex(rowIndex, colIndex) {
        return {
            boxIndex: Math.floor(rowIndex / 3) * 3 + Math.floor(colIndex / 3),
            cellIndex: rowIndex % 3 * 3 + colIndex % 3
        };
    },
    convertFromBoxIndex: function convertFromBoxIndex(boxIndex, cellIndex) {
        return {
            rowIndex: Math.floor(boxIndex / 3) * 3 + Math.floor(cellIndex / 3),
            colIndex: boxIndex % 3 * 3 + cellIndex % 3
        };
    }
};

module.exports = function () {
    function Toolkit() {
        _classCallCheck(this, Toolkit);
    }

    _createClass(Toolkit, null, [{
        key: "matrix",

        //数组的静态方法
        get: function get() {
            return matrixToolkit;
        }

        // 坐标 的静态方法

    }, {
        key: "box",
        get: function get() {
            return boxToolkit;
        }
    }]);

    return Toolkit;
}();

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Grid = __webpack_require__(2);
var grid = new Grid($('#container'));
var PopupNumber = __webpack_require__(5);
grid.build();
grid.layout();

var popupNumbers = new PopupNumber($('#popupNumbers'));
grid.bindPopup(popupNumbers);

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Toolkit = __webpack_require__(0);
// const Generator = require('../core/generator');
var Sudoku = __webpack_require__(3);

var Grid = function () {
    //构造函数
    function Grid(container) {
        _classCallCheck(this, Grid);

        this._$container = container;
    }

    _createClass(Grid, [{
        key: 'build',
        value: function build() {
            //宫加粗 样式数组
            var rowGroupClasses = ['row_g_top', 'row_g_middle', 'row_g_bottom'];
            var colGroupClasses = ['col_g_left', 'col_g_center', 'col_g_right'];

            var sudoku = new Sudoku();
            sudoku.make();
            var matrix = sudoku.puzzleMatrix;
            /*
            const generator = new Generator();
            generator.generate();
            // const matrix = Toolkit.matrix.makeMatrix();//类的静态方法
            const matrix = generator.matrix;
            */
            //两层map，操作的小格
            var $cells = matrix.map(function (rowValues) {
                return rowValues.map(function (cellValue, colIndex) {
                    return $('<span>').addClass(colGroupClasses[colIndex % 3]).addClass(cellValue ? "fixed" : 'empty').text(cellValue); //将每个小格定义为span
                    //     return 'a';
                });
            });
            //一层map，操作一行
            var $divArray = $cells.map(function ($spanArray, rowIndex) {
                return $('<div>').addClass('row').addClass(rowGroupClasses[rowIndex % 3]).append($spanArray);
            });

            this._$container.append($divArray); //将整体放入container
        }

        /* 格宽高*/

    }, {
        key: 'layout',
        value: function layout() {
            var width = $('span:first', this._$container).width();
            $('span', this._$container).height(width).css({
                'line-height': width + 'px',
                'font-size': width < 32 ? width / 2 + 'px' : ''
            });
        }
    }, {
        key: 'bindPopup',
        value: function bindPopup(popupNumbers) {
            this._$container.on('click', 'span', function (e) {
                var $cell = $(e.target);
                popupNumbers.popup($cell);
            });
        }
    }]);

    return Grid;
}();

module.exports = Grid;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//3.

var Generator = __webpack_require__(4);

module.exports = function () {
    //1. 完成result
    function Sudoku() {
        _classCallCheck(this, Sudoku);

        var generator = new Generator();
        generator.generate();
        this.solutionMatrix = generator.matrix;
    }
    //2. 随机去除数据


    _createClass(Sudoku, [{
        key: 'make',
        value: function make() {
            var level = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 5;

            var shouldRid = Math.random() * 9 < level;
            this.puzzleMatrix = this.solutionMatrix.map(function (row) {
                return row.map(function (cell) {
                    return Math.random() * 9 < level ? 0 : cell;
                });
            });
        }
    }]);

    return Sudoku;
}();

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//solution
var Toolkit = __webpack_require__(0);

var Generator = function () {
    function Generator() {
        _classCallCheck(this, Generator);
    }

    _createClass(Generator, [{
        key: 'generate',
        value: function generate() {
            while (!this.internalGenerate()) {
                console.warn('try again~!');
            }
        }
    }, {
        key: 'internalGenerate',
        value: function internalGenerate() {
            this.matrix = Toolkit.matrix.makeMatrix();
            this.orders = Toolkit.matrix.makeMatrix().map(function (row) {
                return row.map(function (v, i) {
                    return i;
                });
            }).map(function (row) {
                return Toolkit.matrix.shuffle(row);
            });

            // Toolkit.matrix.makeRow()
            //     every
            for (var n = 1; n <= 9; n++) {
                if (!this.fillNumber(n)) {
                    return false;
                }
            }
            return true;
        }
    }, {
        key: 'fillNumber',
        value: function fillNumber(n) {
            return this.fillRow(n, 0);
        }
        //递归

    }, {
        key: 'fillRow',
        value: function fillRow(n, rowIndex) {
            if (rowIndex > 8) {
                return true;
            }

            var row = this.matrix[rowIndex];
            //随机选择列
            var orders = this.orders[rowIndex];

            for (var i = 0; i < 9; i++) {
                var colIndex = orders[i];
                //有值 跳过
                if (row[colIndex]) {
                    continue;
                }
                //无值    check
                if (!Toolkit.matrix.checkFillable(this.matrix, n, rowIndex, colIndex)) {
                    continue;
                }
                row[colIndex] = n; //填写成功

                //进入下一行，递归判断
                if (!this.fillRow(n, rowIndex + 1)) {
                    row[colIndex] = 0;
                    continue; //失败
                }
                return true; //完成一次填写。
            }
            return false; //循环结束都没有填写成功
        }
    }]);

    return Generator;
}();

;

module.exports = Generator;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

module.exports = function () {
    function PopupNumbers($panel) {
        var _this = this;

        _classCallCheck(this, PopupNumbers);

        this._$panel = $panel.hide().removeClass('hidden');
        this._$panel.on('click', 'span', function (e) {

            var $cell = _this._$targetCell;
            var $span = $(e.target);
            if ($span.hasClass('mark1')) {
                if ($cell.hasClass('mark1')) {
                    $cell.removeClass('mark1');
                } else {
                    $cell.removeClass('mark2').addClass('mark1');
                }
            } else if ($span.hasClass('mark2')) {
                if ($cell.hasClass('mark2')) {
                    $cell.removeClass('mark2');
                } else {
                    $cell.removeClass('mark1').addClass('mark2');
                }
            } else if ($span.hasClass('empty')) {
                $cell.text(0).addClass('empty');
            } else {
                $cell.removeClass('empty').text($span.text());
            }
            _this.hide();
        });
    }

    _createClass(PopupNumbers, [{
        key: 'popup',
        value: function popup($cell) {
            this._$targetCell = $cell;

            var _$cell$position = $cell.position(),
                left = _$cell$position.left,
                top = _$cell$position.top;

            this._$panel.css({
                left: left + 'px',
                top: top + 'px'
            }).show();
        }
    }, {
        key: 'hide',
        value: function hide() {
            this._$panel.hide();
        }
    }]);

    return PopupNumbers;
}();

/***/ })
/******/ ]);
//# sourceMappingURL=index.js.map