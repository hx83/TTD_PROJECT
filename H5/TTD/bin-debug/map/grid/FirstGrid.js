var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var map;
(function (map) {
    var FirstGrid = (function (_super) {
        __extends(FirstGrid, _super);
        function FirstGrid() {
            return _super.call(this) || this;
        }
        FirstGrid.prototype.setGridSkin = function () {
            var c = this.getGridColor();
            this.graphics.clear();
            this.graphics.beginFill(c);
            //this.graphics.lineStyle(1,0);
            this.graphics.drawCircle(map.GridConst.GRId_SIZE / 2, 0, map.GridConst.GRId_SIZE * 1.5);
            this.graphics.endFill();
        };
        return FirstGrid;
    }(map.BaseGrid));
    map.FirstGrid = FirstGrid;
    __reflect(FirstGrid.prototype, "map.FirstGrid");
})(map || (map = {}));
//# sourceMappingURL=FirstGrid.js.map