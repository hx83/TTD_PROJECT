module ui 
{
	//结算界面
	export class ResultPanel extends egret.Sprite
	{
		private bg:egret.Bitmap;

		private scoreBg:egret.Bitmap;
		private starIcon:egret.Bitmap;

		private restartBtn:tui.Button;

		private shareIcon:tui.Button;
		private homeIcon:tui.Button;
		private shopIcon:tui.Button;

		public constructor() 
		{
			super();
			this.bg = utils.DisplayObjectUtil.createBitmapByName("result_panel_bg_png");
			this.addChild(this.bg);
			this.width = this.bg.width;
			this.height = this.bg.height;

			this.scoreBg = utils.DisplayObjectUtil.createBitmapByName("result_panel_score_bg_png");
			utils.DisplayObjectUtil.centerObj(this.scoreBg,this);
			this.scoreBg.y = 100;
			this.addChild(this.scoreBg);

			this.starIcon = utils.DisplayObjectUtil.createBitmapByName("result_panel_gold_icon_png");
			this.starIcon.x = this.scoreBg.x + this.scoreBg.width - this.starIcon.width - 20;
			this.starIcon.y = this.scoreBg.y - 1;
			this.addChild(this.starIcon);
	
			this.shareIcon = new tui.Button(utils.DisplayObjectUtil.createBitmapByName("share_icon_png"));
			this.homeIcon = new tui.Button(utils.DisplayObjectUtil.createBitmapByName("home_icon_png"));
			this.shopIcon = new tui.Button(utils.DisplayObjectUtil.createBitmapByName("shop_icon_png"));


			var iconList:tui.Button[] = [this.shareIcon,this.homeIcon,this.shopIcon];
			var gap = 95;
			
			var allIconWidth = this.shareIcon.width + this.homeIcon.width + this.shopIcon.width + 95*2;
			var ox = (this.width - allIconWidth)/2 + this.shareIcon.width/2;

			for (var index = 0; index < iconList.length; index++) 
			{
				var icon:tui.Button = iconList[index];
				icon.x = ox + (icon.width + gap)*index;
				icon.y = this.height - 90;

				this.addChild(icon);
			}
			//
			this.restartBtn = new tui.Button(utils.DisplayObjectUtil.createBitmapByName("result_panel_restart_btn_png"));
			this.restartBtn.x = this.width/2;
			this.restartBtn.y = this.height/2 + 30;
			this.addChild(this.restartBtn);
			

			this.addEvent();
		}

		private addEvent()
		{
			this.restartBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.restartGame,this);
		}

		private restartGame(event:egret.TouchEvent):void
		{
			this.dispatchEvent(new events.GameEvent(events.GameEvent.RESTART_GAME));
		}
	}
}