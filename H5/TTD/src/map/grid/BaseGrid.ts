module map 
{
	//地图上的格子基类
	export class BaseGrid extends egret.Sprite
	{
		//protected _type:number;
		protected _info:MapNode;
		private _prevGrid:BaseGrid;
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

			
			//根据路径的情况绘制不同的形状
			var c = this.getGridColor();
			if(this.info.prevNode != null && this.info.nextNode != null && this.info.prevNode.type == GridType.EMPTY && this.info.nextNode.type == GridType.EMPTY)
			{
				this.info.isShowArrow = true;

				this.graphics.clear();
				this.graphics.beginFill(c);
				this.graphics.drawCircle(GridConst.GRId_SIZE/2,GridConst.GRId_SIZE/2,GridConst.GRId_SIZE/2);
				this.graphics.endFill();
			}
			else if(this.info.nextNode != null && this.info.nextNode.type == GridType.EMPTY)
			{
				this.info.isShowArrow = true;

				this.graphics.clear();
				this.graphics.beginFill(c);
				this.graphics.drawCircle(GridConst.GRId_SIZE/2,GridConst.GRId_SIZE/2,GridConst.GRId_SIZE/2);
				
				if(this.info.dir == player.Direction.TOP)
				{
					this.graphics.drawRect(0,GridConst.GRId_SIZE/2,GridConst.GRId_SIZE,GridConst.GRId_SIZE/2);
				}
				else if(this.info.dir == player.Direction.BOTTOM)
				{
					this.graphics.drawRect(0,0,GridConst.GRId_SIZE,GridConst.GRId_SIZE/2);
				}
				else if(this.info.dir == player.Direction.LEFT)
				{
					this.graphics.drawRect(GridConst.GRId_SIZE/2,0,GridConst.GRId_SIZE/2,GridConst.GRId_SIZE);
				}
				else if(this.info.dir == player.Direction.RIGHT)
				{
					this.graphics.drawRect(0,0,GridConst.GRId_SIZE/2,GridConst.GRId_SIZE);
				}
				this.graphics.endFill();
			}
			else if(this.info.prevNode != null && this.info.prevNode.type == GridType.EMPTY)
			{
				this.info.isShowArrow = true;
				
				this.graphics.clear();
				this.graphics.beginFill(c);
				this.graphics.drawCircle(GridConst.GRId_SIZE/2,GridConst.GRId_SIZE/2,GridConst.GRId_SIZE/2);
				
				var dir:player.Direction = this.info.nextNode.dir;
				if(dir  == player.Direction.TOP)
				{
					this.graphics.drawRect(0,0,GridConst.GRId_SIZE,GridConst.GRId_SIZE/2);
				}
				else if(dir == player.Direction.BOTTOM)
				{
					this.graphics.drawRect(0,GridConst.GRId_SIZE/2,GridConst.GRId_SIZE,GridConst.GRId_SIZE/2);
				}
				else if(dir == player.Direction.LEFT)
				{
					this.graphics.drawRect(0,0,GridConst.GRId_SIZE/2,GridConst.GRId_SIZE);
				}
				else if(dir == player.Direction.RIGHT)
				{
					this.graphics.drawRect(GridConst.GRId_SIZE/2,0,GridConst.GRId_SIZE/2,GridConst.GRId_SIZE);
				}
				this.graphics.endFill();
			}
			else if(this.info.nextNode != null && this.info.nextNode.dir != this.info.dir)
			{
				//如果是拐角，则要圆角矩形
				this.graphics.clear();
				this.graphics.beginFill(c);
				this.graphics.drawRoundRect(0,0,GridConst.GRId_SIZE,GridConst.GRId_SIZE,GridConst.GRId_SIZE/4,GridConst.GRId_SIZE/4);

				if(this.info.nextNode.xIndex == this.info.xIndex)
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
				else if(this.info.nextNode.yIndex == this.info.yIndex)
				{
					if(this.info.nextNode.dir == player.Direction.LEFT)
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
			//
			if(this.info.isShowArrow)
			{
				var bmp = utils.DisplayObjectUtil.createBitmapByName("arrow_" + v.nextNode.dir + "_png");
				this.addChild(bmp);
			}
		}

		public get info():MapNode
		{
			return this._info;
		}

		public set prevGrid(v:BaseGrid)
		{
			this._prevGrid = v;
			/** 
			if(this._prevGrid != null)
			{
				var c = this.getGridColor();
				if(this.prevGrid.info.type == GridType.EMPTY)
				{
					//上一个为空白路径，要变半圆形接头
					this.graphics.clear();
					this.graphics.beginFill(c);
					this.graphics.drawCircle(GridConst.GRId_SIZE/2,GridConst.GRId_SIZE/2,GridConst.GRId_SIZE/2);
					
					if(this.info.dir == player.Direction.TOP)
					{
						this.graphics.drawRect(0,0,GridConst.GRId_SIZE,GridConst.GRId_SIZE/2);
					}
					else if(this.info.dir == player.Direction.BOTTOM)
					{
						this.graphics.drawRect(0,GridConst.GRId_SIZE/2,GridConst.GRId_SIZE,GridConst.GRId_SIZE/2);
					}
					else if(this.info.dir == player.Direction.LEFT)
					{
						this.graphics.drawRect(0,0,GridConst.GRId_SIZE/2,GridConst.GRId_SIZE);
					}
					else if(this.info.dir == player.Direction.RIGHT)
					{
						this.graphics.drawRect(GridConst.GRId_SIZE/2,0,GridConst.GRId_SIZE/2,GridConst.GRId_SIZE);
					}
					this.graphics.endFill();
				}
			}

			*/
		}
		public get prevGrid():BaseGrid
		{
			return this._prevGrid;
		}
		public set nextGrid(v:BaseGrid)
		{
			this._nextGrid = v;
/**
			if(this.nextGrid != null)
			{
				var c = this.getGridColor();
				
				if(this.nextGrid.info.type == GridType.EMPTY)
				{
					//下一个为空白路径，要变半圆形接头
					this.graphics.clear();
					this.graphics.beginFill(c);
					this.graphics.drawCircle(GridConst.GRId_SIZE/2,GridConst.GRId_SIZE/2,GridConst.GRId_SIZE/2);
					
					if(this.prevGrid.info.type == GridType.EMPTY)
					{
						//如果前后都为空白的，那就直接是圆形了
						return;
					}

					if(this.info.dir == player.Direction.TOP)
					{
						this.graphics.drawRect(0,GridConst.GRId_SIZE/2,GridConst.GRId_SIZE,GridConst.GRId_SIZE/2);
					}
					else if(this.info.dir == player.Direction.BOTTOM)
					{
						this.graphics.drawRect(0,0,GridConst.GRId_SIZE,GridConst.GRId_SIZE/2);
					}
					else if(this.info.dir == player.Direction.LEFT)
					{
						this.graphics.drawRect(GridConst.GRId_SIZE/2,0,GridConst.GRId_SIZE/2,GridConst.GRId_SIZE);
					}
					else if(this.info.dir == player.Direction.RIGHT)
					{
						this.graphics.drawRect(0,0,GridConst.GRId_SIZE/2,GridConst.GRId_SIZE);
					}
					this.graphics.endFill();
				}
				else if(this.nextGrid.info.dir != this.info.dir && this.prevGrid.info.type != GridType.EMPTY)
				{
					//如果是拐角，则要圆角矩形
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
			 */
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