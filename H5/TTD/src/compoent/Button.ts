module tui 
{
	//按钮的注册点在中心点
	export class Button extends egret.DisplayObjectContainer
	{
		private _bmp:egret.DisplayObject;
		private _clickFun:Function;
		private _pressFun:Function;

		public constructor(bmp:egret.DisplayObject) 
		{
			super();
			this._bmp = bmp;
			
			this.touchEnabled = true;

			this._bmp.anchorOffsetX = this._bmp.width/2;
			this._bmp.anchorOffsetY = this._bmp.height/2;
			this.addChild(this._bmp);

			this.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.pressHandler,this);
			this.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE,this.upHandler,this);
			this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.clickHandler,this);
			
		}

		// public set onClick(fun:Function)
		// {
		// 	this._clickFun = fun;
		// }
		// public set onPress(fun:Function)
		// {
		// 	this._pressFun = fun;
		// }

		private pressHandler(event:egret.TouchEvent):void
		{
			egret.Tween.get(this._bmp).to({scaleX:0.9,scaleY:0.9},100);
			if(this._pressFun != null)
			{
				this._pressFun();
			}
		}
		private clickHandler(event:egret.TouchEvent):void
		{
			egret.Tween.get(this._bmp).to({scaleX:1,scaleY:1},100);
			if(this._clickFun != null)
			{
				this._clickFun();
			}
		}


		private upHandler(event:egret.TouchEvent):void
		{
			egret.Tween.get(this._bmp).to({scaleX:1,scaleY:1},100);
		}

		public dispose()
		{
			this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN,this.pressHandler,this);
			this.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.clickHandler,this);
			this.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE,this.upHandler,this);
		}
	}
}