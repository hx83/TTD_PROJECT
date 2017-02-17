module utils {
	export class Dictionary<T>
	{
		private _keys:Array<string>;
		private _values:Array<T>;

		public constructor() 
		{
			this._keys = new Array<string>();
			this._values = new Array<T>();
		}

		

		public add(key: string, value: T) 
		{
			this[key] = value;
			this._keys.push(key);
			this._values.push(value);
		}

		public remove(key: string) 
		{
			var index = this._keys.indexOf(key, 0);
			this._keys.splice(index, 1);
			this._values.splice(index, 1);

			delete this[key];
		}

		public keys():Array<string>
		{
			return this._keys;
		}

		public values(): Array<T>
		{
			return this._values;
		}

		public containsKey(key: string)
		{
			if (typeof this[key] === "undefined") {
				return false;
			}

			return true;
		}
	}
}