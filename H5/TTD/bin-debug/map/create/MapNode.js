var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var map;
(function (map) {
    //地图数据的每个点
    var MapNode = (function () {
        function MapNode() {
            this.xIndex = 0;
            this.yIndex = 0;
            this.dir = player.Direction.TOP;
            this._isShowArrow = false;
            this.mapLevel = 0; //属于几第个关卡的地图
            this.type = map.GridType.NORMAL;
        }
        Object.defineProperty(MapNode.prototype, "centerPoint", {
            get: function () {
                return new egret.Point(map.GridConst.GRId_SIZE / 2, map.GridConst.GRId_SIZE / 2);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MapNode.prototype, "isShowArrow", {
            get: function () {
                return this._isShowArrow;
            },
            //是否显示路线变换的箭头
            set: function (b) {
                this._isShowArrow = b;
            },
            enumerable: true,
            configurable: true
        });
        return MapNode;
    }());
    map.MapNode = MapNode;
    __reflect(MapNode.prototype, "map.MapNode");
})(map || (map = {}));
//# sourceMappingURL=MapNode.js.map