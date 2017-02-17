var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var StageManager = (function () {
    function StageManager() {
    }
    StageManager.setup = function (stage) {
        this._stage = stage;
    };
    Object.defineProperty(StageManager, "stageWidth", {
        get: function () {
            return this._stage.stageWidth;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StageManager, "stageHeight", {
        get: function () {
            return this._stage.stageHeight;
        },
        enumerable: true,
        configurable: true
    });
    return StageManager;
}());
__reflect(StageManager.prototype, "StageManager");
//# sourceMappingURL=StageManager.js.map