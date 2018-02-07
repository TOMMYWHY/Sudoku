const Grid = require('./ui/grid');
const grid = new Grid($('#container'));
const PopupNumber = require('./ui/popupnumbers')
grid.build();
grid.layout();

const popupNumbers= new PopupNumber($('#popupNumbers'));
grid.bindPopup(popupNumbers);