module map 
{
	//负责生成地图
	export class MapFactory 
	{
		//private static dirArr:Array<player.Direction>;
		private static MAX:number = 100;
		private static list:Array<MapNode>;
		private static prevNode:MapNode;
		
		private static count : number;

		public constructor() 
		{
		}
		//根据初始点创建地图
		public static createMapData(level:number,p:MapNode = null):Array<MapNode>
		{
			//this.dirArr = new Array<player.Direction>();
			//this.dirArr.push(player.Direction.LEFT,player.Direction.RIGHT,player.Direction.TOP);

			this.count = 0;
			if(p == null)
			{
				this.prevNode = new MapNode();
			}
			else
			{
				this.prevNode = p;
			}
			this.list = new Array<MapNode>();
			if(p == null)
			{
				this.list.push(this.prevNode);
			}
			this.create(level);

			var firstNode:MapNode = this.list[0];
			firstNode.type = GridType.FIRST;
			return this.list;
		}

		private static create(level:number):void
		{
			var node:MapNode;
			if(this.count < 5 || this.count > this.MAX - 5)
			{
				node = this.createNode(player.Direction.TOP);				
			}
			
			else
			{
				var dirArr = [];
				if(this.prevNode.dir == player.Direction.TOP)
				{
					dirArr.push(player.Direction.LEFT,player.Direction.RIGHT,player.Direction.TOP);
				}
				else if(this.prevNode.dir == player.Direction.LEFT)
				{
					dirArr.push(player.Direction.LEFT,player.Direction.TOP);
				}
				else if(this.prevNode.dir == player.Direction.RIGHT)
				{
					dirArr.push(player.Direction.RIGHT,player.Direction.TOP);
				}

				var n: number = Math.floor(Math.random()*dirArr.length);
				node = this.createNode(dirArr[n]);				
			}
			node.mapLevel = level;
			//
			this.prevNode = node;
			this.list.push(node);
			//
			this.count++;
			if(this.count < this.MAX)
			{
				this.create(level);
			}
		}

		private static createNode(dir:player.Direction):MapNode
		{
			var node:MapNode = new MapNode();
			switch(dir)
			{
				case player.Direction.TOP:
					node.xIndex = this.prevNode.xIndex;
					node.yIndex = this.prevNode.yIndex - 1;//坐标系是左上角为0,0
					node.dir = player.Direction.TOP;
				break;
				case player.Direction.LEFT:
					node.xIndex = this.prevNode.xIndex - 1;
					node.yIndex = this.prevNode.yIndex;
					node.dir = player.Direction.LEFT;
				break;
				case player.Direction.RIGHT:
					node.xIndex = this.prevNode.xIndex + 1;
					node.yIndex = this.prevNode.yIndex;
					node.dir = player.Direction.RIGHT;
					
				break;
				default:
					node.xIndex = this.prevNode.xIndex;
					node.yIndex = this.prevNode.yIndex - 1;
					node.dir = player.Direction.TOP;
				break;
			}
			
			node.prevNode = this.prevNode;
			this.prevNode.nextNode = node;

			if(node.dir != this.prevNode.dir)
			{
				this.prevNode.isShowArrow = true;
			}
			return node;
		}


		public static getGridByType(type:GridType):BaseGrid
		{
			var grid:BaseGrid;
			switch(type)
			{
				case GridType.NORMAL:
					grid = new BaseGrid();
				break;
				case GridType.FIRST:
					grid = new FirstGrid();
				break;
				default:
					grid = new BaseGrid()
				break;
			}
			return grid;
		}
	}
}