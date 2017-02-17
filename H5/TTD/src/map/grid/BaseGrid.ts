module map 
{
	//地图上的格子基类
	export class BaseGrid extends egret.Sprite
	{
		//protected _type:number;
		protected _info:MapNode;
		public prevGrid:BaseGrid;
		private _nextGrid:BaseGrid;
		

		public constructor() 
		{
			super();

		}
		
		
		//检查某个点是否在格子里
		public checkIsOnRoad(p:egret.Point):boolean
		{
			return true;
		}
		//生成食物的点
		public get foodPoint():egret.Point
		{
			return new egret.Point(GridConst.GRId_SIZE/2,GridConst.GRId_SIZE/2);
		}


		public set info(v:MapNode)
		{
			this._info = v;
			this.x = v.xIndex*GridConst.GRId_SIZE;
			this.y = v.yIndex*GridConst.GRId_SIZE;

			this.setGridSkin();

			if(v.isShowArrow)
			{
				var bmp = utils.DisplayObjectUtil.createBitmapByName("arrow_" + v.nextNode.dir + "_png");
				this.addChild(bmp);
			}
		}

		public get info():MapNode
		{
			return this._info;
		}

		public set nextGrid(v:BaseGrid)
		{
			this._nextGrid = v;

			if(this.nextGrid != null && this.nextGrid.info.dir != this.info.dir)
			{
				//console.log("draw round");
				var c = this.getGridColor();

				this.graphics.clear();
				this.graphics.beginFill(c);
				this.graphics.drawRoundRect(0,0,GridConst.GRId_SIZE,GridConst.GRId_SIZE,GridConst.GRId_SIZE/4,GridConst.GRId_SIZE/4);

				if(this.nextGrid.info.xIndex == this.info.xIndex)
				{
					if(this.info.dir == player.Direction.LEFT)
					{
						this.graphics.drawRect(0,0,GridConst.GRId_SIZE,GridConst.GRId_SIZE/2);
						this.graphics.drawRect(GridConst.GRId_SIZE/2,0,GridConst.GRId_SIZE/2,GridConst.GRId_SIZE);
					}
					else
					{
						this.graphics.drawRect(0,0,GridConst.GRId_SIZE,GridConst.GRId_SIZE/2);
						this.graphics.drawRect(0,0,GridConst.GRId_SIZE/2,GridConst.GRId_SIZE);
					}
				}
				else if(this.nextGrid.info.yIndex == this.info.yIndex)
				{
					if(this.nextGrid.info.dir == player.Direction.LEFT)
					{
						this.graphics.drawRect(0,0,GridConst.GRId_SIZE/2,GridConst.GRId_SIZE);
						this.graphics.drawRect(0,GridConst.GRId_SIZE/2,GridConst.GRId_SIZE,GridConst.GRId_SIZE/2);
					}
					else
					{
						this.graphics.drawRect(GridConst.GRId_SIZE/2,0,GridConst.GRId_SIZE/2,GridConst.GRId_SIZE);
						this.graphics.drawRect(0,GridConst.GRId_SIZE/2,GridConst.GRId_SIZE,GridConst.GRId_SIZE/2);
					}
				}

				this.graphics.endFill();
			}
		}

		public get nextGrid():BaseGrid
		{
			return this._nextGrid;
		}

		protected setGridSkin():void
		{
			var c = this.getGridColor();
			this.graphics.beginFill(c);
			this.graphics.drawRect(0,0,GridConst.GRId_SIZE,GridConst.GRId_SIZE);
			this.graphics.endFill();
		}

		protected getGridColor():number
		{
			var c:number = 0xffffff;
			if(this._info.mapLevel == 2)
			{
				c = 0xffff00;
			}
			else if(this._info.mapLevel == 3)
			{
				c = 0xff0000;
			}
			else if(this._info.mapLevel == 4)
			{
				c = 0xff00ff;
			}
			return c;
		}
	}

	
}