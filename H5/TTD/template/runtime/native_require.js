
var game_file_list = [
    //以下为自动修改，请勿修改
    //----auto game_file_list start----
	"libs/modules/egret/egret.js",
	"libs/modules/egret/egret.native.js",
	"libs/modules/game/game.js",
	"libs/modules/game/game.native.js",
	"libs/modules/res/res.js",
	"libs/modules/tween/tween.js",
	"libs/modules/socket/socket.js",
	"bin-debug/map/grid/BaseGrid.js",
	"bin-debug/Camera.js",
	"bin-debug/Main.js",
	"bin-debug/StageManager.js",
	"bin-debug/compoent/Button.js",
	"bin-debug/events/GameEvent.js",
	"bin-debug/map/Map.js",
	"bin-debug/map/create/MapFactory.js",
	"bin-debug/map/create/MapNode.js",
	"bin-debug/LoadingUI.js",
	"bin-debug/map/grid/FirstGrid.js",
	"bin-debug/map/grid/GridConst.js",
	"bin-debug/player/Direction.js",
	"bin-debug/player/Player.js",
	"bin-debug/ui/GameScene.js",
	"bin-debug/ui/MainMenu.js",
	"bin-debug/ui/ResultPanel.js",
	"bin-debug/utils/Dictionary.js",
	"bin-debug/utils/DisplayObjectUtil.js",
	//----auto game_file_list end----
];

var window = this;

egret_native.setSearchPaths([""]);

egret_native.requireFiles = function () {
    for (var key in game_file_list) {
        var src = game_file_list[key];
        require(src);
    }
};

egret_native.egretInit = function () {
    if(egret_native.featureEnable) {
        //控制一些优化方案是否开启
        egret_native.featureEnable({
            
        });
    }
    egret_native.requireFiles();
    //egret.dom为空实现
    egret.dom = {};
    egret.dom.drawAsCanvas = function () {
    };
};

egret_native.egretStart = function () {
    var option = {
        //以下为自动修改，请勿修改
        //----auto option start----
		entryClassName: "Main",
		frameRate: 30,
		scaleMode: "fixedHeight",
		contentWidth: 640,
		contentHeight: 1136,
		showPaintRect: false,
		showFPS: false,
		fpsStyles: "x:0,y:0,size:12,textColor:0xffffff,bgAlpha:0.9",
		showLog: false,
		logFilter: "",
		maxTouches: 2,
		textureScaleFactor: 1
		//----auto option end----
    };

    egret.native.NativePlayer.option = option;
    egret.runEgret();
    egret_native.Label.createLabel("/system/fonts/DroidSansFallback.ttf", 20, "", 0);
    egret_native.EGTView.preSetOffScreenBufferEnable(true);
};