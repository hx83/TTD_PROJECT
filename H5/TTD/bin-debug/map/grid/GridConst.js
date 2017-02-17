var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var map;
(function (map) {
    var GridConst = (function () {
        function GridConst() {
        }
        return GridConst;
    }());
    GridConst.GRId_SIZE = 64;
    map.GridConst = GridConst;
    __reflect(GridConst.prototype, "map.GridConst");
    var GridType = (function () {
        function GridType() {
        }
        return GridType;
    }());
    GridType.NORMAL = 0;
    GridType.EMPTY = 1; //空的
    GridType.HALF = 2; //一半宽
    GridType.FIRST = 3; //每一关的起点
    map.GridType = GridType;
    __reflect(GridType.prototype, "map.GridType");
})(map || (map = {}));
//# sourceMappingURL=GridConst.js.map