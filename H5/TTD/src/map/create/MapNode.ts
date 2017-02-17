module map 
{
	//地图数据的每个点
	export class MapNode 
	{
		public xIndex:number = 0;
		public yIndex:number = 0;
		public dir:player.Direction = player.Direction.TOP;
		public rotaiton;//当前点的转向，控制地图跳的时候的转向
		private _isShowArrow:boolean = false;
		public mapLevel:number = 0;//属于几第个关卡的地图
		//
		//每个节点的前后关系
		public prevNode:MapNode;
		public nextNode:MapNode;

		public type:GridType = GridType.NORMAL;

		public constructor() 
		{
		}

		
		public get centerPoint() : egret.Point 
		{
			return new egret.Point(GridConst.GRId_SIZE/2,GridConst.GRId_SIZE/2);
		}
		
		//是否显示路线变换的箭头
		public set isShowArrow(b : boolean) 
		{
			this._isShowArrow = b;
		}
		
		public get isShowArrow() : boolean
		{
			return this._isShowArrow;
		}

		
	}
}