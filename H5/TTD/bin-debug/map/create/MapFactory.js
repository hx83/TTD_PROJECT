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
            if (p === void 0) { p = null; }
            //this.dirArr = new Array<player.Direction>();
            //this.dirArr.push(player.Direction.LEFT,player.Direction.RIGHT,player.Direction.TOP);
            this.MAX = map.MapConfig.getMapLength(level);
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
            this.bendingRank = map.MapConfig.getBendingRank(level);
            this.separateRank = map.MapConfig.getSeparateRank(level);
            this.create(level);
            var firstNode = this.list[0];
            firstNode.type = map.GridType.FIRST;
            return this.list;
        };
        MapFactory.create = function (level) {
            var node;
            if (this.count < 10000 || this.count > this.MAX - 100) {
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
                //根据崎岖程度判定是否需要拐弯
                if (this.count % this.bendingRank == 0) {
                    var n = Math.floor(Math.random() * dirArr.length);
                    node = this.createNode(dirArr[n]);
                }
                else {
                    node = this.createNode(this.prevNode.dir);
                }
                //根据空白程度，决定是否将格子变成空白路径
                if (this.count % this.separateRank == 0) {
                    //当前格子创建好以后才能决定他的上一个格子是否可以为空白路，因为当前格子可能就是拐点
                    //如果直接改变当前格子，那么拐点有可能就变成空白格了
                    if (node.prevNode.prevNode != null) {
                        if (node.prevNode.dir == node.dir && node.prevNode.prevNode.dir == node.dir && node.prevNode.prevNode.type != map.GridType.EMPTY) {
                            node.prevNode.type = map.GridType.EMPTY;
                        }
                    }
                }
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
        //根据格子类型，生成具体的格子
        MapFactory.getGridByType = function (type) {
            var grid;
            switch (type) {
                case map.GridType.NORMAL:
                    grid = new map.BaseGrid();
                    break;
                case map.GridType.EMPTY:
                    grid = new map.EmptyGrid();
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