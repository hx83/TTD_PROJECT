var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var events;
(function (events) {
    var GameEvent = (function (_super) {
        __extends(GameEvent, _super);
        function GameEvent(type) {
            return _super.call(this, type) || this;
        }
        return GameEvent;
    }(egret.Event));
    GameEvent.RESTART_GAME = "restartGame";
    events.GameEvent = GameEvent;
    __reflect(GameEvent.prototype, "events.GameEvent");
})(events || (events = {}));
//# sourceMappingURL=GameEvent.js.map