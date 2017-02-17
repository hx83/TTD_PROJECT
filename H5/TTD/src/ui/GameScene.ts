module ui 
{
	export class GameScene extends egret.Sprite
	{
		private player:player.Player;
    	private _map:map.Map;
		private isStart:boolean = false;
		private isDead:boolean = false;
		//private countTxt:egret.TextField;
		private timer:egret.Timer;
		private numBmp:egret.Bitmap;

		private bmpStrings:string[] = ["num_3_png","num_2_png","num_1_png","go_png"];

		private touchSprite:egret.Sprite;

		private resultPanel:ResultPanel;
		private orResultPanelY:number;

		public constructor() 
		{
			super();


			this.graphics.beginFill(0x00ccff);
			this.graphics.drawRect(0,0,StageManager.stageWidth,StageManager.stageHeight);
			this.graphics.endFill();


			this._map = new map.Map();
			this.addChild(this._map);
			this.player = new player.Player();
			this._map.addPlayer(this.player);
			
			Camera.setup(this._map);
			Camera.follow(this.player);

			this.timer = new egret.Timer(1000,5);

			this.numBmp = new egret.Bitmap();

			this.touchSprite = new egret.Sprite();
			this.touchSprite.graphics.beginFill(0,0.4);
			this.touchSprite.graphics.drawRect(0,0,StageManager.stageWidth,StageManager.stageHeight);
			this.touchSprite.graphics.endFill();
			this.touchSprite.cacheAsBitmap = true;

			this.addChild(this.touchSprite);

			//
			this.resultPanel = new ResultPanel();
			utils.DisplayObjectUtil.centerObjToStage(this.resultPanel);
			this.orResultPanelY = this.resultPanel.y;
			
			this.addEvent();
		}

		private addEvent():void
		{
			this.timer.addEventListener(egret.TimerEvent.TIMER,this.onTimer,this);

			this.touchSprite.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.touchHandler,this);
			this.resultPanel.addEventListener(events.GameEvent.RESTART_GAME,this.restartGame,this);
		}
		private touchHandler(event:egret.TouchEvent):void
		{
			if(this.isStart == false || this.isDead == true)
			{
				return;
			}
			this._map.touchHandler();
		}

		public update():void
		{
			if(this.isStart == false || this.isDead == true)
			{
				return;
			}
			//console.log(this._map.isOnMap(this.player.x,this.player.y));
			var grid:map.BaseGrid = this._map.getPlayerGrid();
			if(grid == null)
			{
				console.warn("dead!");

				this.end();

				return;
			}
			else
			{
				this._map.mapLevel = grid.info.mapLevel;
			}
			this.player.move();
		}

		public start():void
		{
			//this.isStart = true;
			this.timer.start();
			this.isDead = false;
		}

		public end():void
		{
			this.isStart = false;
			this.timer.reset();
			this.touchSprite.touchEnabled = false;
			//
			this.player.dead();
			this.isDead = true;
			this.showResultPanel();
		}


		private onTimer(event:egret.TimerEvent):void
		{
			utils.DisplayObjectUtil.removeFromParent(this.numBmp);

			var n = this.timer.currentCount;
			if(n == 5)
			{
				
			}
			else
			{
				if(n == 4)
				{
					this.hideMask();
					this.touchSprite.touchEnabled = true;
					this.isStart = true;
				}
				this.numBmp = utils.DisplayObjectUtil.createBitmapByName(this.bmpStrings[n -1]);
				this.numBmp.alpha = 0;
				utils.DisplayObjectUtil.centerObjToStage(this.numBmp);
				this.numBmp.y = (StageManager.stageHeight - this.numBmp.height)/2 + this.numBmp.height*2.5;
				egret.Tween.get(this.numBmp).to({alpha:1,y:(StageManager.stageHeight - this.numBmp.height)/2 + this.numBmp.height*2.5 - 100},200,egret.Ease.backOut);
				this.addChild(this.numBmp);

			}
		}

		private showMask():void
		{
			this.touchSprite.alpha = 1;
		}
		private hideMask():void
		{
			this.touchSprite.alpha = 0;
		}
		//游戏结束时显示结算面板
		private showResultPanel():void
		{
			var temp = this;
			setTimeout(function() {
				temp.showMask();
				var y = StageManager.stageHeight;
				temp.resultPanel.y = y;
				temp.addChild(temp.resultPanel);
				//
				egret.Tween.get(temp.resultPanel).to({y:temp.orResultPanelY},400,egret.Ease.backOut);
			}, 600);
			

		}
		private hideResultPanel():void
		{
			egret.Tween.get(this.resultPanel).to({y:StageManager.stageHeight},400,egret.Ease.backIn);			
		}


		private restartGame(event:events.GameEvent):void
		{
			this.hideResultPanel();
			this._map.reset();
			
			this.player.reset();

			this._map.addPlayer(this.player);

			this.start();
		}
	}
}