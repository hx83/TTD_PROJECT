module map 
{
	export class EmptyGrid extends BaseGrid
	{
		public constructor() 
		{
			super();
		}

		protected setGridSkin():void
		{
			var c = this.getGridColor();
			this.graphics.beginFill(c,0.0);
			this.graphics.drawRect(0,0,GridConst.GRId_SIZE,GridConst.GRId_SIZE);
			this.graphics.endFill();
		}

		//能取到当前格子说明PLAYER肯定在格子上
		public isOnGrid(p:player.Player):boolean
		{
			return false;
		}
	}
}