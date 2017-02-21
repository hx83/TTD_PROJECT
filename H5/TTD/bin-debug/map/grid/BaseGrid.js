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
    //地图上的格子基类
    var BaseGrid = (function (_super) {
        __extends(BaseGrid, _super);
        function BaseGrid() {
            return _super.call(this) || this;
        }
        //检查某个点是否在格子里
        BaseGrid.prototype.checkIsOnRoad = function (p) {
            return true;
        };
        Object.defineProperty(BaseGrid.prototype, "foodPoint", {
            //生成食物的点
            get: function () {
                return new egret.Point(map.GridConst.GRId_SIZE / 2, map.GridConst.GRId_SIZE / 2);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BaseGrid.prototype, "info", {
            get: function () {
                return this._info;
            },
            set: function (v) {
                this._info = v;
                this.x = v.xIndex * map.GridConst.GRId_SIZE;
                this.y = v.yIndex * map.GridConst.GRId_SIZE;
                this.setGridSkin();
                //根据路径的情况绘制不同的形状
                var c = this.getGridColor();
                if (this.info.prevNode != null && this.info.nextNode != null && this.info.prevNode.type == map.GridType.EMPTY && this.info.nextNode.type == map.GridType.EMPTY) {
                    this.info.isShowArrow = true;
                    this.graphics.clear();
                    this.graphics.beginFill(c);
                    this.graphics.drawCircle(map.GridConst.GRId_SIZE / 2, map.GridConst.GRId_SIZE / 2, map.GridConst.GRId_SIZE / 2);
                    this.graphics.endFill();
                }
                else if (this.info.nextNode != null && this.info.nextNode.type == map.GridType.EMPTY) {
                    this.info.isShowArrow = true;
                    this.graphics.clear();
                    this.graphics.beginFill(c);
                    this.graphics.drawCircle(map.GridConst.GRId_SIZE / 2, map.GridConst.GRId_SIZE / 2, map.GridConst.GRId_SIZE / 2);
                    if (this.info.dir == player.Direction.TOP) {
                        this.graphics.drawRect(0, map.GridConst.GRId_SIZE / 2, map.GridConst.GRId_SIZE, map.GridConst.GRId_SIZE / 2);
                    }
                    else if (this.info.dir == player.Direction.BOTTOM) {
                        this.graphics.drawRect(0, 0, map.GridConst.GRId_SIZE, map.GridConst.GRId_SIZE / 2);
                    }
                    else if (this.info.dir == player.Direction.LEFT) {
                        this.graphics.drawRect(map.GridConst.GRId_SIZE / 2, 0, map.GridConst.GRId_SIZE / 2, map.GridConst.GRId_SIZE);
                    }
                    else if (this.info.dir == player.Direction.RIGHT) {
                        this.graphics.drawRect(0, 0, map.GridConst.GRId_SIZE / 2, map.GridConst.GRId_SIZE);
                    }
                    this.graphics.endFill();
                }
                else if (this.info.prevNode != null && this.info.prevNode.type == map.GridType.EMPTY) {
                    this.info.isShowArrow = true;
                    this.graphics.clear();
                    this.graphics.beginFill(c);
                    this.graphics.drawCircle(map.GridConst.GRId_SIZE / 2, map.GridConst.GRId_SIZE / 2, map.GridConst.GRId_SIZE / 2);
                    var dir = this.info.nextNode.dir;
                    if (dir == player.Direction.TOP) {
                        this.graphics.drawRect(0, 0, map.GridConst.GRId_SIZE, map.GridConst.GRId_SIZE / 2);
                    }
                    else if (dir == player.Direction.BOTTOM) {
                        this.graphics.drawRect(0, map.GridConst.GRId_SIZE / 2, map.GridConst.GRId_SIZE, map.GridConst.GRId_SIZE / 2);
                    }
                    else if (dir == player.Direction.LEFT) {
                        this.graphics.drawRect(0, 0, map.GridConst.GRId_SIZE / 2, map.GridConst.GRId_SIZE);
                    }
                    else if (dir == player.Direction.RIGHT) {
                        this.graphics.drawRect(map.GridConst.GRId_SIZE / 2, 0, map.GridConst.GRId_SIZE / 2, map.GridConst.GRId_SIZE);
                    }
                    this.graphics.endFill();
                }
                else if (this.info.nextNode != null && this.info.nextNode.dir != this.info.dir) {
                    //如果是拐角，则要圆角矩形
                    this.graphics.clear();
                    this.graphics.beginFill(c);
                    this.graphics.drawRoundRect(0, 0, map.GridConst.GRId_SIZE, map.GridConst.GRId_SIZE, map.GridConst.GRId_SIZE / 4, map.GridConst.GRId_SIZE / 4);
                    if (this.info.nextNode.xIndex == this.info.xIndex) {
                        if (this.info.dir == player.Direction.LEFT) {
                            this.graphics.drawRect(0, 0, map.GridConst.GRId_SIZE, map.GridConst.GRId_SIZE / 2);
                            this.graphics.drawRect(map.GridConst.GRId_SIZE / 2, 0, map.GridConst.GRId_SIZE / 2, map.GridConst.GRId_SIZE);
                        }
                        else {
                            this.graphics.drawRect(0, 0, map.GridConst.GRId_SIZE, map.GridConst.GRId_SIZE / 2);
                            this.graphics.drawRect(0, 0, map.GridConst.GRId_SIZE / 2, map.GridConst.GRId_SIZE);
                        }
                    }
                    else if (this.info.nextNode.yIndex == this.info.yIndex) {
                        if (this.info.nextNode.dir == player.Direction.LEFT) {
                            this.graphics.drawRect(0, 0, map.GridConst.GRId_SIZE / 2, map.GridConst.GRId_SIZE);
                            this.graphics.drawRect(0, map.GridConst.GRId_SIZE / 2, map.GridConst.GRId_SIZE, map.GridConst.GRId_SIZE / 2);
                        }
                        else {
                            this.graphics.drawRect(map.GridConst.GRId_SIZE / 2, 0, map.GridConst.GRId_SIZE / 2, map.GridConst.GRId_SIZE);
                            this.graphics.drawRect(0, map.GridConst.GRId_SIZE / 2, map.GridConst.GRId_SIZE, map.GridConst.GRId_SIZE / 2);
                        }
                    }
                    this.graphics.endFill();
                }
                //
                if (this.info.isShowArrow) {
                    var bmp = utils.DisplayObjectUtil.createBitmapByName("arrow_" + v.nextNode.dir + "_png");
                    this.addChild(bmp);
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BaseGrid.prototype, "prevGrid", {
            get: function () {
                return this._prevGrid;
            },
            set: function (v) {
                this._prevGrid = v;
                /**
                if(this._prevGrid != null)
                {
                    var c = this.getGridColor();
                    if(this.prevGrid.info.type == GridType.EMPTY)
                    {
                        //上一个为空白路径，要变半圆形接头
                        this.graphics.clear();
                        this.graphics.beginFill(c);
                        this.graphics.drawCircle(GridConst.GRId_SIZE/2,GridConst.GRId_SIZE/2,GridConst.GRId_SIZE/2);
                        
                        if(this.info.dir == player.Direction.TOP)
                        {
                            this.graphics.drawRect(0,0,GridConst.GRId_SIZE,GridConst.GRId_SIZE/2);
                        }
                        else if(this.info.dir == player.Direction.BOTTOM)
                        {
                            this.graphics.drawRect(0,GridConst.GRId_SIZE/2,GridConst.GRId_SIZE,GridConst.GRId_SIZE/2);
                        }
                        else if(this.info.dir == player.Direction.LEFT)
                        {
                            this.graphics.drawRect(0,0,GridConst.GRId_SIZE/2,GridConst.GRId_SIZE);
                        }
                        else if(this.info.dir == player.Direction.RIGHT)
                        {
                            this.graphics.drawRect(GridConst.GRId_SIZE/2,0,GridConst.GRId_SIZE/2,GridConst.GRId_SIZE);
                        }
                        this.graphics.endFill();
                    }
                }
    
                */
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BaseGrid.prototype, "nextGrid", {
            get: function () {
                return this._nextGrid;
            },
            set: function (v) {
                this._nextGrid = v;
                /**
                            if(this.nextGrid != null)
                            {
                                var c = this.getGridColor();
                                
                                if(this.nextGrid.info.type == GridType.EMPTY)
                                {
                                    //下一个为空白路径，要变半圆形接头
                                    this.graphics.clear();
                                    this.graphics.beginFill(c);
                                    this.graphics.drawCircle(GridConst.GRId_SIZE/2,GridConst.GRId_SIZE/2,GridConst.GRId_SIZE/2);
                                    
                                    if(this.prevGrid.info.type == GridType.EMPTY)
                                    {
                                        //如果前后都为空白的，那就直接是圆形了
                                        return;
                                    }
                
                                    if(this.info.dir == player.Direction.TOP)
                                    {
                                        this.graphics.drawRect(0,GridConst.GRId_SIZE/2,GridConst.GRId_SIZE,GridConst.GRId_SIZE/2);
                                    }
                                    else if(this.info.dir == player.Direction.BOTTOM)
                                    {
                                        this.graphics.drawRect(0,0,GridConst.GRId_SIZE,GridConst.GRId_SIZE/2);
                                    }
                                    else if(this.info.dir == player.Direction.LEFT)
                                    {
                                        this.graphics.drawRect(GridConst.GRId_SIZE/2,0,GridConst.GRId_SIZE/2,GridConst.GRId_SIZE);
                                    }
                                    else if(this.info.dir == player.Direction.RIGHT)
                                    {
                                        this.graphics.drawRect(0,0,GridConst.GRId_SIZE/2,GridConst.GRId_SIZE);
                                    }
                                    this.graphics.endFill();
                                }
                                else if(this.nextGrid.info.dir != this.info.dir && this.prevGrid.info.type != GridType.EMPTY)
                                {
                                    //如果是拐角，则要圆角矩形
                                    this.graphics.clear();
                                    this.graphics.beginFill(c);
                                    this.graphics.drawRoundRect(0,0,GridConst.GRId_SIZE,GridConst.GRId_SIZE,GridConst.GRId_SIZE/4,GridConst.GRId_SIZE/4);
                
                                    if(this.nextGrid.info.xIndex == this.info.xIndex)
                                    {
                                        if(this.info.dir == player.Direction.LEFT)
                                        {
                                            this.graphics.drawRect(0,0,GridConst.GRId_SIZE,GridConst.GRId_SIZE/2);
                                            this.graphics.drawRect(GridConst.GRId_SIZE/2,0,GridConst.GRId_SIZE/2,GridConst.GRId_SIZE);
                                        }
                                        else
                                        {
                                            this.graphics.drawRect(0,0,GridConst.GRId_SIZE,GridConst.GRId_SIZE/2);
                                            this.graphics.drawRect(0,0,GridConst.GRId_SIZE/2,GridConst.GRId_SIZE);
                                        }
                                    }
                                    else if(this.nextGrid.info.yIndex == this.info.yIndex)
                                    {
                                        if(this.nextGrid.info.dir == player.Direction.LEFT)
                                        {
                                            this.graphics.drawRect(0,0,GridConst.GRId_SIZE/2,GridConst.GRId_SIZE);
                                            this.graphics.drawRect(0,GridConst.GRId_SIZE/2,GridConst.GRId_SIZE,GridConst.GRId_SIZE/2);
                                        }
                                        else
                                        {
                                            this.graphics.drawRect(GridConst.GRId_SIZE/2,0,GridConst.GRId_SIZE/2,GridConst.GRId_SIZE);
                                            this.graphics.drawRect(0,GridConst.GRId_SIZE/2,GridConst.GRId_SIZE,GridConst.GRId_SIZE/2);
                                        }
                                    }
                
                                    this.graphics.endFill();
                                }
                            }
                             */
            },
            enumerable: true,
            configurable: true
        });
        BaseGrid.prototype.setGridSkin = function () {
            var c = this.getGridColor();
            this.graphics.beginFill(c);
            this.graphics.drawRect(0, 0, map.GridConst.GRId_SIZE, map.GridConst.GRId_SIZE);
            this.graphics.endFill();
        };
        BaseGrid.prototype.getGridColor = function () {
            var c = 0xffffff;
            if (this._info.mapLevel == 2) {
                c = 0xffff00;
            }
            else if (this._info.mapLevel == 3) {
                c = 0xff0000;
            }
            else if (this._info.mapLevel == 4) {
                c = 0xff00ff;
            }
            return c;
        };
        return BaseGrid;
    }(egret.Sprite));
    map.BaseGrid = BaseGrid;
    __reflect(BaseGrid.prototype, "map.BaseGrid");
})(map || (map = {}));
//# sourceMappingURL=BaseGrid.js.map