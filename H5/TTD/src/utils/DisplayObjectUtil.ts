module utils 
{
	export class DisplayObjectUtil 
	{
		public constructor() {
		}

		public static createBitmapByName(name:string):egret.Bitmap 
		{
			let result = new egret.Bitmap();
			let texture:egret.Texture = RES.getRes(name);
			result.texture = texture;
			return result;
		}

		public static removeFromParent(dis:egret.DisplayObject)
		{
			if(dis != null)
			{
				if(dis.parent != null)
				{
					dis.parent.removeChild(dis);
				}
			}
		}

		public static centerObjToStage(dis:egret.DisplayObject)
		{
			if(dis == null)
			{
				return;
			}
			dis.x = (StageManager.stageWidth - dis.width)/2;
			dis.y = (StageManager.stageHeight - dis.height)/2;
		}

		public static centerObj(dis:egret.DisplayObject,parent:egret.DisplayObject)
		{
			if(dis == null || parent == null)
			{
				return;
			}
			dis.x = (parent.width - dis.width)/2;
			dis.y = (parent.height - dis.height)/2;
		}
	}
}