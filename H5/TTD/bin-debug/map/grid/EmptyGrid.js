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
    var EmptyGrid = (function (_super) {
        __extends(EmptyGrid, _super);
        function EmptyGrid() {
            return _super.call(this) || this;
        }
        EmptyGrid.prototype.setGridSkin = function () {
            var c = this.getGridColor();
            this.graphics.beginFill(c, 0.0);
            this.graphics.drawRect(0, 0, map.GridConst.GRId_SIZE, map.GridConst.GRId_SIZE);
            this.graphics.endFill();
        };
        //能取到当前格子说明PLAYER肯定在格子上
        EmptyGrid.prototype.isOnGrid = function (p) {
            return false;
        };
        return EmptyGrid;
    }(map.BaseGrid));
    map.EmptyGrid = EmptyGrid;
    __reflect(EmptyGrid.prototype, "map.EmptyGrid");
})(map || (map = {}));
//# sourceMappingURL=EmptyGrid.js.map