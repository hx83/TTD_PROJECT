var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var tui;
(function (tui) {
    //按钮的注册点在中心点
    var Button = (function (_super) {
        __extends(Button, _super);
        function Button(bmp) {
            var _this = _super.call(this) || this;
            _this._bmp = bmp;
            _this.touchEnabled = true;
            _this._bmp.anchorOffsetX = _this._bmp.width / 2;
            _this._bmp.anchorOffsetY = _this._bmp.height / 2;
            _this.addChild(_this._bmp);
            _this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.pressHandler, _this);
            _this.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, _this.upHandler, _this);
            _this.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.clickHandler, _this);
            return _this;
        }
        // public set onClick(fun:Function)
        // {
        // 	this._clickFun = fun;
        // }
        // public set onPress(fun:Function)
        // {
        // 	this._pressFun = fun;
        // }
        Button.prototype.pressHandler = function (event) {
            egret.Tween.get(this._bmp).to({ scaleX: 0.9, scaleY: 0.9 }, 100);
            if (this._pressFun != null) {
                this._pressFun();
            }
        };
        Button.prototype.clickHandler = function (event) {
            egret.Tween.get(this._bmp).to({ scaleX: 1, scaleY: 1 }, 100);
            if (this._clickFun != null) {
                this._clickFun();
            }
        };
        Button.prototype.upHandler = function (event) {
            egret.Tween.get(this._bmp).to({ scaleX: 1, scaleY: 1 }, 100);
        };
        Button.prototype.dispose = function () {
            this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.pressHandler, this);
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
            this.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.upHandler, this);
        };
        return Button;
    }(egret.DisplayObjectContainer));
    tui.Button = Button;
    __reflect(Button.prototype, "tui.Button");
})(tui || (tui = {}));
//# sourceMappingURL=Button.js.map