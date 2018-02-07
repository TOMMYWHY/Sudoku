const Grid = require('./ui/grid');
const grid = new Grid($('#container'));
const PopupNumber = require('./ui/popupnumbers')
grid.build();
grid.layout();

const popupNumbers= new PopupNumber($('#popupNumbers'));
grid.bindPopup(popupNumbers);

$('#check').on('click',e => {
    if(grid.check()){
        alert('congratulation~! you win~!!!')
    }
});
$('#reset').on('click',e => {
    grid.reset();
});
$('#clear').on('click',e => {
    grid.clear();
});

$('#rebuild').on('click',e => {
    grid.rebuild();
});
