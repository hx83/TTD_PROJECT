class StageManager 
{
	private static _stage:egret.Stage;

	public constructor() {
	}

	public static setup(stage:egret.Stage):void
	{
		this._stage = stage;
	}

	public static get stageWidth():number
	{
		return this._stage.stageWidth;
	}
	public static get stageHeight():number
	{
		return this._stage.stageHeight;
	}
}