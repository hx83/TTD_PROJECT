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

			var btn:tui.Button = new tui.Button(utils.DisplayObjectUtil.createBitmapByName("main_menu_start_btn_png"));
			this.addChild(btn);

			btn.x = (bg.width)/2;
			btn.y = bg.height - 450;
			btn.touchEnabled = true;
			btn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.startHandler,this);
		}

		private startHandler(event:egret.TouchEvent):void
		{
			Main.instance.startGame();
		}
	}
}