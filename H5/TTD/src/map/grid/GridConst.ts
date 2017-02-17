module map {
	export class GridConst 
	{
		public static GRId_SIZE:number = 64;

		public constructor() {
		}
	}

	export class GridType
	{
		public static NORMAL:number = 0;
		public static EMPTY:number = 1;//空的
		public static HALF:number = 2;//一半宽
		public static FIRST:number = 3;//每一关的起点
	}
}