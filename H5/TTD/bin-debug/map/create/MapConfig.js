var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var map;
(function (map) {
    var MapConfig = (function () {
        function MapConfig() {
        }
        /**获取地图配置的崎岖度 -- 控制拐点频率*/
        MapConfig.getBendingRank = function (mapLevel) {
            if (mapLevel == 1) {
                var n = this.MAX - 1;
                if (n > 5) {
                    n = 5;
                }
                return n;
            }
            else {
                var n = this.MAX - 10;
                if (n <= 0) {
                    n = 1;
                }
                return n;
            }
        };
        /**获取地图配置的间隔度 -- 控制路径上出现空白的频率*/
        MapConfig.getSeparateRank = function (mapLevel) {
            if (mapLevel == 1) {
                var n = this.MAX - 1;
                return n;
            }
            else {
                var n = this.MAX - 10;
                if (n <= 0) {
                    n = 1;
                }
                return n;
            }
        };
        return MapConfig;
    }());
    MapConfig.MAX = 10;
    map.MapConfig = MapConfig;
    __reflect(MapConfig.prototype, "map.MapConfig");
})(map || (map = {}));
//# sourceMappingURL=MapConfig.js.map