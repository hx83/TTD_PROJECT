var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ui;
(function (ui) {
    //结算界面
    var ResultPanel = (function (_super) {
        __extends(ResultPanel, _super);
        function ResultPanel() {
            var _this = _super.call(this) || this;
            _this.bg = utils.DisplayObjectUtil.createBitmapByName("result_panel_bg_png");
            _this.addChild(_this.bg);
            _this.width = _this.bg.width;
            _this.height = _this.bg.height;
            _this.scoreBg = utils.DisplayObjectUtil.createBitmapByName("result_panel_score_bg_png");
            utils.DisplayObjectUtil.centerObj(_this.scoreBg, _this);
            _this.scoreBg.y = 100;
            _this.addChild(_this.scoreBg);
            _this.starIcon = utils.DisplayObjectUtil.createBitmapByName("result_panel_gold_icon_png");
            _this.starIcon.x = _this.scoreBg.x + _this.scoreBg.width - _this.starIcon.width - 20;
            _this.starIcon.y = _this.scoreBg.y - 1;
            _this.addChild(_this.starIcon);
            _this.shareIcon = new tui.Button(utils.DisplayObjectUtil.createBitmapByName("share_icon_png"));
            _this.homeIcon = new tui.Button(utils.DisplayObjectUtil.createBitmapByName("home_icon_png"));
            _this.shopIcon = new tui.Button(utils.DisplayObjectUtil.createBitmapByName("shop_icon_png"));
            var iconList = [_this.shareIcon, _this.homeIcon, _this.shopIcon];
            var gap = 95;
            var allIconWidth = _this.shareIcon.width + _this.homeIcon.width + _this.shopIcon.width + 95 * 2;
            var ox = (_this.width - allIconWidth) / 2 + _this.shareIcon.width / 2;
            for (var index = 0; index < iconList.length; index++) {
                var icon = iconList[index];
                icon.x = ox + (icon.width + gap) * index;
                icon.y = _this.height - 90;
                _this.addChild(icon);
            }
            //
            _this.restartBtn = new tui.Button(utils.DisplayObjectUtil.createBitmapByName("result_panel_restart_btn_png"));
            _this.restartBtn.x = _this.width / 2;
            _this.restartBtn.y = _this.height / 2 + 30;
            _this.addChild(_this.restartBtn);
            _this.addEvent();
            return _this;
        }
        ResultPanel.prototype.addEvent = function () {
            this.restartBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.restartGame, this);
        };
        ResultPanel.prototype.restartGame = function (event) {
            this.dispatchEvent(new events.GameEvent(events.GameEvent.RESTART_GAME));
        };
        return ResultPanel;
    }(egret.Sprite));
    ui.ResultPanel = ResultPanel;
    __reflect(ResultPanel.prototype, "ui.ResultPanel");
})(ui || (ui = {}));
//# sourceMappingURL=ResultPanel.js.map