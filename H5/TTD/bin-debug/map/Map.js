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
    //游戏地图
    var Map = (function (_super) {
        __extends(Map, _super);
        function Map() {
            var _this = _super.call(this) || this;
            _this.DICT_KEY = "level_";
            _this.reset();
            return _this;
        }
        Map.prototype.reset = function () {
            this._mapLevel = 1;
            this.mapDict = new utils.Dictionary();
            this.allGridDict = new utils.Dictionary();
            if (this.mapLayer != null) {
                this.mapLayer.removeChildren();
            }
            if (this.playerLayer != null) {
                this.playerLayer.removeChildren();
            }
            this.mapLayer = new egret.Sprite();
            this.playerLayer = new egret.Sprite();
            this.addChild(this.mapLayer);
            this.addChild(this.playerLayer);
            //第一次生成两个关卡，保持地图连贯
            this.createMap(this.mapLevel);
            var list = this.mapDict[this.DICT_KEY + this.mapLevel];
            this.createMap(this._mapLevel + 1, list[list.length - 1].info);
        };
        //
        //添加人物
        Map.prototype.addPlayer = function (player) {
            player.pos = this.playerStartPoint;
            this.player = player;
            this.playerLayer.addChild(player);
        };
        Object.defineProperty(Map.prototype, "mapLevel", {
            get: function () {
                return this._mapLevel;
            },
            set: function (v) {
                if (v > this._mapLevel) {
                    this.removeOldMap(this._mapLevel);
                    this._mapLevel = v;
                    var list = this.mapDict[this.DICT_KEY + this.mapLevel];
                    this.createMap(this._mapLevel + 1, list[list.length - 1].info);
                }
            },
            enumerable: true,
            configurable: true
        });
        //以某个格子为起点创建地图
        Map.prototype.createMap = function (level, node) {
            if (node === void 0) { node = null; }
            var prevGrid = null;
            var list = new Array();
            this.mapDict.add(this.DICT_KEY + level, list);
            var arr = map.MapFactory.createMapData(level, node);
            for (var index = 0; index < arr.length; index++) {
                var node = arr[index];
                var grid = map.MapFactory.getGridByType(node.type);
                grid.info = node;
                grid.prevGrid = prevGrid;
                if (prevGrid != null) {
                    prevGrid.nextGrid = grid;
                }
                prevGrid = grid;
                //grid.type = node.
                if (index == 0 && level == 1) {
                    this.playerStartPoint = new egret.Point(grid.x + node.centerPoint.x, grid.y + node.centerPoint.y);
                }
                this.mapLayer.addChild(grid);
                //dict.add(node.xIndex+"_"+node.yIndex,grid);
                list.push(grid);
                this.allGridDict.add(node.xIndex + "_" + node.yIndex, grid);
            }
        };
        //坐标点是否在路径上
        Map.prototype.isOnMap = function (x, y) {
            return (this.getCurrentGrid(x, y) != null);
        };
        //根据X Y坐标获取当前格子
        Map.prototype.getCurrentGrid = function (x, y) {
            var xIndex = Math.floor(x / map.GridConst.GRId_SIZE);
            var yIndex = Math.floor(y / map.GridConst.GRId_SIZE);
            //console.log(x+"|"+y+"|"+xIndex+"|"+yIndex);
            //var dict:utils.Dictionary<BaseGrid> = this.mapDict[this.DICT_KEY + this.mapLevel];
            var dict = this.allGridDict;
            if (dict.containsKey(xIndex + "_" + yIndex) == false) {
                return null;
            }
            else {
                var grid = dict[xIndex + "_" + yIndex];
                return grid;
            }
        };
        //获取人物当前格子
        Map.prototype.getPlayerGrid = function () {
            var x = this.player.x;
            var y = this.player.y;
            return this.getCurrentGrid(x, y);
        };
        // private onAddToStage():void
        // {
        // 	this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.touchHandler,this);
        // }
        Map.prototype.touchHandler = function () {
            var grid = this.getPlayerGrid();
            if (grid != null) {
                var dir = this.getNextMoveDir(grid);
                console.log("touch dir:" + dir);
                if (dir == this.player.direction) {
                    this.player.jump();
                }
                else {
                    this.player.direction = dir;
                }
            }
        };
        //获取下一个行走的方向(如果方向跟当前没有区别。则为跳跃行为)
        Map.prototype.getNextMoveDir = function (grid) {
            var n = 0;
            var nextGrid = grid.nextGrid;
            if (nextGrid == null) {
                return this.player.direction;
            }
            while (n < 3 && nextGrid.info.dir == this.player.direction) {
                n++;
                nextGrid = nextGrid.nextGrid;
                if (nextGrid == null) {
                    return this.player.direction;
                }
            }
            return nextGrid.info.dir;
        };
        Map.prototype.removeOldMap = function (level) {
            var list = this.mapDict[this.DICT_KEY + level];
            if (list != null) {
                list.forEach(function (grid, index, array) {
                    utils.DisplayObjectUtil.removeFromParent(grid);
                });
            }
        };
        return Map;
    }(egret.Sprite));
    map.Map = Map;
    __reflect(Map.prototype, "map.Map");
})(map || (map = {}));
//# sourceMappingURL=Map.js.map