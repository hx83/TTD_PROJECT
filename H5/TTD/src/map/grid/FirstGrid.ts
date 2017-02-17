module map 
{
	export class FirstGrid extends BaseGrid
	{
		public constructor() 
		{
			super();
		}

		protected setGridSkin():void
		{
			var c = this.getGridColor();
			
			this.graphics.clear();
			this.graphics.beginFill(c);
			//this.graphics.lineStyle(1,0);
			this.graphics.drawCircle(GridConst.GRId_SIZE/2,0,GridConst.GRId_SIZE*1.5);
			this.graphics.endFill();

		}


	}
}