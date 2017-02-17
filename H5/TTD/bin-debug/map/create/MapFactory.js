var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var map;
(function (map) {
    //负责生成地图
    var MapFactory = (function () {
        function MapFactory() {
        }
        //根据初始点创建地图
        MapFactory.createMapData = function (level, p) {
            //this.dirArr = new Array<player.Direction>();
            //this.dirArr.push(player.Direction.LEFT,player.Direction.RIGHT,player.Direction.TOP);
            if (p === void 0) { p = null; }
            this.count = 0;
            if (p == null) {
                this.prevNode = new map.MapNode();
            }
            else {
                this.prevNode = p;
            }
            this.list = new Array();
            if (p == null) {
                this.list.push(this.prevNode);
            }
            this.create(level);
            var firstNode = this.list[0];
            firstNode.type = map.GridType.FIRST;
            return this.list;
        };
        MapFactory.create = function (level) {
            var node;
            if (this.count < 5 || this.count > this.MAX - 5) {
                node = this.createNode(player.Direction.TOP);
            }
            else {
                var dirArr = [];
                if (this.prevNode.dir == player.Direction.TOP) {
                    dirArr.push(player.Direction.LEFT, player.Direction.RIGHT, player.Direction.TOP);
                }
                else if (this.prevNode.dir == player.Direction.LEFT) {
                    dirArr.push(player.Direction.LEFT, player.Direction.TOP);
                }
                else if (this.prevNode.dir == player.Direction.RIGHT) {
                    dirArr.push(player.Direction.RIGHT, player.Direction.TOP);
                }
                var n = Math.floor(Math.random() * dirArr.length);
                node = this.createNode(dirArr[n]);
            }
            node.mapLevel = level;
            //
            this.prevNode = node;
            this.list.push(node);
            //
            this.count++;
            if (this.count < this.MAX) {
                this.create(level);
            }
        };
        MapFactory.createNode = function (dir) {
            var node = new map.MapNode();
            switch (dir) {
                case player.Direction.TOP:
                    node.xIndex = this.prevNode.xIndex;
                    node.yIndex = this.prevNode.yIndex - 1; //坐标系是左上角为0,0
                    node.dir = player.Direction.TOP;
                    break;
                case player.Direction.LEFT:
                    node.xIndex = this.prevNode.xIndex - 1;
                    node.yIndex = this.prevNode.yIndex;
                    node.dir = player.Direction.LEFT;
                    break;
                case player.Direction.RIGHT:
                    node.xIndex = this.prevNode.xIndex + 1;
                    node.yIndex = this.prevNode.yIndex;
                    node.dir = player.Direction.RIGHT;
                    break;
                default:
                    node.xIndex = this.prevNode.xIndex;
                    node.yIndex = this.prevNode.yIndex - 1;
                    node.dir = player.Direction.TOP;
                    break;
            }
            node.prevNode = this.prevNode;
            this.prevNode.nextNode = node;
            if (node.dir != this.prevNode.dir) {
                this.prevNode.isShowArrow = true;
            }
            return node;
        };
        MapFactory.getGridByType = function (type) {
            var grid;
            switch (type) {
                case map.GridType.NORMAL:
                    grid = new map.BaseGrid();
                    break;
                case map.GridType.FIRST:
                    grid = new map.FirstGrid();
                    break;
                default:
                    grid = new map.BaseGrid();
                    break;
            }
            return grid;
        };
        return MapFactory;
    }());
    //private static dirArr:Array<player.Direction>;
    MapFactory.MAX = 100;
    map.MapFactory = MapFactory;
    __reflect(MapFactory.prototype, "map.MapFactory");
})(map || (map = {}));
//# sourceMappingURL=MapFactory.js.map