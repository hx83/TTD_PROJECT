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
    //游戏主界面
    var MainMenu = (function (_super) {
        __extends(MainMenu, _super);
        function MainMenu() {
            var _this = _super.call(this) || this;
            var bg = utils.DisplayObjectUtil.createBitmapByName("main_menu_bg_png");
            _this.addChild(bg);
            var btn = new tui.Button(utils.DisplayObjectUtil.createBitmapByName("main_menu_start_btn_png"));
            _this.addChild(btn);
            btn.x = (bg.width) / 2;
            btn.y = bg.height - 450;
            btn.touchEnabled = true;
            btn.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.startHandler, _this);
            return _this;
        }
        MainMenu.prototype.startHandler = function (event) {
            Main.instance.startGame();
        };
        return MainMenu;
    }(egret.Sprite));
    ui.MainMenu = MainMenu;
    __reflect(MainMenu.prototype, "ui.MainMenu");
})(ui || (ui = {}));
//# sourceMappingURL=MainMenu.js.map