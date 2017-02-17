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
    var GameScene = (function (_super) {
        __extends(GameScene, _super);
        function GameScene() {
            var _this = _super.call(this) || this;
            _this.isStart = false;
            _this.isDead = false;
            _this.bmpStrings = ["num_3_png", "num_2_png", "num_1_png", "go_png"];
            _this.graphics.beginFill(0x00ccff);
            _this.graphics.drawRect(0, 0, StageManager.stageWidth, StageManager.stageHeight);
            _this.graphics.endFill();
            _this._map = new map.Map();
            _this.addChild(_this._map);
            _this.player = new player.Player();
            _this._map.addPlayer(_this.player);
            Camera.setup(_this._map);
            Camera.follow(_this.player);
            _this.timer = new egret.Timer(1000, 5);
            _this.numBmp = new egret.Bitmap();
            _this.touchSprite = new egret.Sprite();
            _this.touchSprite.graphics.beginFill(0, 0.4);
            _this.touchSprite.graphics.drawRect(0, 0, StageManager.stageWidth, StageManager.stageHeight);
            _this.touchSprite.graphics.endFill();
            _this.touchSprite.cacheAsBitmap = true;
            _this.addChild(_this.touchSprite);
            //
            _this.resultPanel = new ui.ResultPanel();
            utils.DisplayObjectUtil.centerObjToStage(_this.resultPanel);
            _this.orResultPanelY = _this.resultPanel.y;
            _this.addEvent();
            return _this;
        }
        GameScene.prototype.addEvent = function () {
            this.timer.addEventListener(egret.TimerEvent.TIMER, this.onTimer, this);
            this.touchSprite.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchHandler, this);
            this.resultPanel.addEventListener(events.GameEvent.RESTART_GAME, this.restartGame, this);
        };
        GameScene.prototype.touchHandler = function (event) {
            if (this.isStart == false || this.isDead == true) {
                return;
            }
            this._map.touchHandler();
        };
        GameScene.prototype.update = function () {
            if (this.isStart == false || this.isDead == true) {
                return;
            }
            //console.log(this._map.isOnMap(this.player.x,this.player.y));
            var grid = this._map.getPlayerGrid();
            if (grid == null) {
                console.warn("dead!");
                this.end();
                return;
            }
            else {
                this._map.mapLevel = grid.info.mapLevel;
            }
            this.player.move();
        };
        GameScene.prototype.start = function () {
            //this.isStart = true;
            this.timer.start();
            this.isDead = false;
        };
        GameScene.prototype.end = function () {
            this.isStart = false;
            this.timer.reset();
            this.touchSprite.touchEnabled = false;
            //
            this.player.dead();
            this.isDead = true;
            this.showResultPanel();
        };
        GameScene.prototype.onTimer = function (event) {
            utils.DisplayObjectUtil.removeFromParent(this.numBmp);
            var n = this.timer.currentCount;
            if (n == 5) {
            }
            else {
                if (n == 4) {
                    this.hideMask();
                    this.touchSprite.touchEnabled = true;
                    this.isStart = true;
                }
                this.numBmp = utils.DisplayObjectUtil.createBitmapByName(this.bmpStrings[n - 1]);
                this.numBmp.alpha = 0;
                utils.DisplayObjectUtil.centerObjToStage(this.numBmp);
                this.numBmp.y = (StageManager.stageHeight - this.numBmp.height) / 2 + this.numBmp.height * 2.5;
                egret.Tween.get(this.numBmp).to({ alpha: 1, y: (StageManager.stageHeight - this.numBmp.height) / 2 + this.numBmp.height * 2.5 - 100 }, 200, egret.Ease.backOut);
                this.addChild(this.numBmp);
            }
        };
        GameScene.prototype.showMask = function () {
            this.touchSprite.alpha = 1;
        };
        GameScene.prototype.hideMask = function () {
            this.touchSprite.alpha = 0;
        };
        //游戏结束时显示结算面板
        GameScene.prototype.showResultPanel = function () {
            var temp = this;
            setTimeout(function () {
                temp.showMask();
                var y = StageManager.stageHeight;
                temp.resultPanel.y = y;
                temp.addChild(temp.resultPanel);
                //
                egret.Tween.get(temp.resultPanel).to({ y: temp.orResultPanelY }, 400, egret.Ease.backOut);
            }, 600);
        };
        GameScene.prototype.hideResultPanel = function () {
            egret.Tween.get(this.resultPanel).to({ y: StageManager.stageHeight }, 400, egret.Ease.backIn);
        };
        GameScene.prototype.restartGame = function (event) {
            this.hideResultPanel();
            this._map.reset();
            this.player.reset();
            this._map.addPlayer(this.player);
            this.start();
        };
        return GameScene;
    }(egret.Sprite));
    ui.GameScene = GameScene;
    __reflect(GameScene.prototype, "ui.GameScene");
})(ui || (ui = {}));
//# sourceMappingURL=GameScene.js.map