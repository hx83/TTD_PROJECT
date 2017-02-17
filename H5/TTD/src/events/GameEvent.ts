module events 
{
	export class GameEvent extends egret.Event
	{
		public static RESTART_GAME:string = "restartGame";
		
		public constructor(type: string) 
		{
			
			super(type);
		}
	}
}