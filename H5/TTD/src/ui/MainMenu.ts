module ui 
{
	//游戏主界面
	export class MainMenu extends egret.Sprite
	{
		public constructor()
		{
			super();

			var bg = utils.DisplayObjectUtil.createBitmapByName("main_menu_bg_png");
			this.addChild(bg);
			
			var scale = StageManager.stageWidth/bg.width;
			bg.width *= scale;
			bg.height *= scale;

			bg.y = StageManager.stageHeight - bg.height;


			var btn:egret.Bitmap = utils.DisplayObjectUtil.createBitmapByName("main_menu_start_btn_png");
			btn.width *= scale;
			btn.height *= scale;
			this.addChild(btn);

			btn.x = (StageManager.stageWidth - btn.width)/2;
			btn.y = StageManager.stageHeight - 450*scale - btn.height/2;
			btn.touchEnabled = true;
			btn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.startHandler,this);
		}

		private startHandler(event:egret.TouchEvent):void
		{
			Main.instance.startGame();
		}
	}
}