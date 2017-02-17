
class Camera 
{
	private static _instance:Camera;
	private static _map:map.Map;
	private static target:player.Player;

	public constructor() 
	{
	}
	public static setup(map:map.Map):void
	{
		this._map = map;
	}
	private static get instance():Camera
	{
		if(this._instance == null)
		{
			this._instance = new Camera();
		}
		return this._instance;
	}
	//跟随某个NPC，将其显示在地图中心
	public static follow(player:player.Player):void
	{
		if(player == null)
		{
			return;
		}
		if(this.target != null)
		{
			this.target.removeEventListener(egret.Event.ENTER_FRAME,this.onEnterFrame,this);
		}
		this.target = player;
		this.target.addEventListener(egret.Event.ENTER_FRAME,this.onEnterFrame,this);
	}


	private static onEnterFrame():void
	{
		if(this._map == null)
		{
			console.error("map is null");
			return;
		}
		this._map.x = StageManager.stageWidth/2 - this.target.x;
		this._map.y = StageManager.stageHeight/2 - this.target.y;
	}
}
