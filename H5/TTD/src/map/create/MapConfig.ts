module map
 {
	export class MapConfig 
	{
		private static MAX:number = 10;
		public constructor() 
		{
		}
		public static getMapLength(mapLevel:number):number
		{
			return 100;
		}
		/**获取地图配置的崎岖度 -- 控制拐点频率*/
		public static getBendingRank(mapLevel:number):number
		{
			if(mapLevel == 1)
			{
				var n = this.MAX - 1;
				if(n > 5) 
				{
					n = 5;
				}
				return n;
			}
			else
			{
				var n = this.MAX - 10;
				if( n <= 0) 
				{
					n = 1;
				}
				return 3;
			}
		}
		/**获取地图配置的间隔度 -- 控制路径上出现空白的频率*/
		public static getSeparateRank(mapLevel:number):number
		{
			if(mapLevel == 1)
			{
				var n = this.MAX - 1;
				
				return n;
			}
			else
			{
				var n = this.MAX - 10;
				if( n <= 0) 
				{
					n = 1;
				}
				return 3;
			}
		}
	}
}