var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Camera = (function () {
    function Camera() {
    }
    Camera.setup = function (map) {
        this._map = map;
    };
    Object.defineProperty(Camera, "instance", {
        get: function () {
            if (this._instance == null) {
                this._instance = new Camera();
            }
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    //跟随某个NPC，将其显示在地图中心
    Camera.follow = function (player) {
        if (player == null) {
            return;
        }
        if (this.target != null) {
            this.target.removeEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
        }
        this.target = player;
        this.target.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
    };
    Camera.onEnterFrame = function () {
        if (this._map == null) {
            console.error("map is null");
            return;
        }
        this._map.x = StageManager.stageWidth / 2 - this.target.x;
        this._map.y = StageManager.stageHeight / 2 - this.target.y;
    };
    return Camera;
}());
__reflect(Camera.prototype, "Camera");
//# sourceMappingURL=Camera.js.map