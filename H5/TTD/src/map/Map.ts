module map 
{
	//游戏地图
	export class Map extends egret.Sprite
	{
		//记录每个关卡对应的格子
		private mapDict:utils.Dictionary<Array<BaseGrid>>;
		//地图上所有的格子
		private allGridDict:utils.Dictionary<BaseGrid>;

		private DICT_KEY:string = "level_";

		private mapLayer:egret.Sprite;
		private playerLayer:egret.Sprite;
		//地图关卡
		private _mapLevel:number;
		private playerStartPoint:egret.Point;
		private player:player.Player;

		public constructor() 
		{
			super();

			this.reset();
		}

		public reset():void
		{
			this._mapLevel = 1;
			
			this.mapDict = new utils.Dictionary<Array<BaseGrid>>();
			this.allGridDict = new utils.Dictionary<BaseGrid>();
			if(this.mapLayer != null)
			{
				this.mapLayer.removeChildren();
			}
			if(this.playerLayer != null)
			{
				this.playerLayer.removeChildren();
			}
			this.mapLayer = new egret.Sprite();
			this.playerLayer = new egret.Sprite();

			this.addChild(this.mapLayer);
			this.addChild(this.playerLayer);
			
			//第一次生成两个关卡，保持地图连贯
			this.createMap(this.mapLevel);
				
			var list:Array<BaseGrid> = this.mapDict[this.DICT_KEY+this.mapLevel];
			this.createMap(this._mapLevel+1,list[list.length-1].info);
		}
		//
		//添加人物
		public addPlayer(player:player.Player):void
		{
			player.pos = this.playerStartPoint;
			this.player = player;
			this.playerLayer.addChild(player);
		}
		public get mapLevel():number
		{
			return this._mapLevel;
		}

		public set mapLevel(v:number)
		{
			if(v > this._mapLevel)
			{
				this.removeOldMap(this._mapLevel);
				this._mapLevel = v;
				var list:Array<BaseGrid> = this.mapDict[this.DICT_KEY+this.mapLevel];
				this.createMap(this._mapLevel+1,list[list.length-1].info);
			}
		}
		//以某个格子为起点创建地图
		private createMap(level:number,node:MapNode = null)
		{
			var prevGrid:BaseGrid = null;

			var list:Array<BaseGrid> = new Array<BaseGrid>();
			this.mapDict.add(this.DICT_KEY + level,list);

			var arr:Array<MapNode> = MapFactory.createMapData(level,node);
			for (var index = 0; index < arr.length; index++) 
			{
				var node:MapNode = arr[index];
				var grid:BaseGrid = MapFactory.getGridByType(node.type);
				grid.info = node;                                                                                                                                                                         

				grid.prevGrid = prevGrid;
				if(prevGrid != null)
				{
					prevGrid.nextGrid = grid;
				}	

				prevGrid = grid;
				//grid.type = node.
				if(index == 0 && level == 1)
				{
					this.playerStartPoint = new egret.Point(grid.x + node.centerPoint.x,grid.y + node.centerPoint.y);
				}
				this.mapLayer.addChild(grid);
				//dict.add(node.xIndex+"_"+node.yIndex,grid);
				list.push(grid);
				this.allGridDict.add(node.xIndex+"_"+node.yIndex,grid);
			}
		}
		//坐标点是否在路径上
		public isOnMap(x:number,y:number):boolean
		{
			return (this.getCurrentGrid(x,y) != null);
		}
		//根据X Y坐标获取当前格子
		private getCurrentGrid(x:number,y:number):BaseGrid
		{
			var xIndex = Math.floor(x/GridConst.GRId_SIZE);
			var yIndex = Math.floor(y/GridConst.GRId_SIZE);
			//console.log(x+"|"+y+"|"+xIndex+"|"+yIndex);
			//var dict:utils.Dictionary<BaseGrid> = this.mapDict[this.DICT_KEY + this.mapLevel];
			var dict = this.allGridDict;
			if(dict.containsKey(xIndex+"_"+yIndex) == false)
			{
				return null;
			}
			else
			{
				var grid:BaseGrid = dict[xIndex+"_"+yIndex];
				return grid;
			}
		}
		//获取人物当前格子
		public getPlayerGrid():BaseGrid
		{
			var x:number = this.player.x;
			var y:number = this.player.y;

			return this.getCurrentGrid(x,y);
		}
		// private onAddToStage():void
		// {
		// 	this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.touchHandler,this);
		// }

		public touchHandler():void
		{
			var grid:BaseGrid = this.getPlayerGrid();
			if(grid != null)
			{
				var dir = this.getNextMoveDir(grid);
				console.log("touch dir:"+dir);
				if(dir == this.player.direction)
				{
					this.player.jump();
				}
				else
				{
					this.player.direction = dir;
				}
			}
		}
		//获取下一个行走的方向(如果方向跟当前没有区别。则为跳跃行为)
		private getNextMoveDir(grid:BaseGrid):player.Direction
		{
			var n = 0;
			var nextGrid:BaseGrid =  grid.nextGrid;
			if(nextGrid == null)
			{
				return this.player.direction;
			}

			while(n <3 && nextGrid.info.dir == this.player.direction)
			{
				n++;
				nextGrid = nextGrid.nextGrid;
				if(nextGrid == null)
				{
					return this.player.direction;
				}		
			}

			return nextGrid.info.dir;
		}

		private removeOldMap(level:number)
		{
			var list:Array<BaseGrid> = this.mapDict[this.DICT_KEY+level];
			if(list != null)
			{
				list.forEach((grid:BaseGrid,index:number,array:BaseGrid[])=>
				{
					utils.DisplayObjectUtil.removeFromParent(grid);
				});
			}
		}
	}
}