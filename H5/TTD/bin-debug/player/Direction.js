var player;
(function (player) {
    // export class Direction 
    // {
    // 	//
    // 	public static LEFT:number = 0;
    // 	public static TOP:number = 1;
    // 	public static RIGHT:number = 2;
    // 	public static BOTTOM:number = 3;
    // 	public constructor() {
    // 	}
    // }
    var Direction;
    (function (Direction) {
        Direction[Direction["LEFT"] = 0] = "LEFT";
        Direction[Direction["TOP"] = 1] = "TOP";
        Direction[Direction["RIGHT"] = 2] = "RIGHT";
        Direction[Direction["BOTTOM"] = 3] = "BOTTOM";
    })(Direction = player.Direction || (player.Direction = {}));
})(player || (player = {}));
//# sourceMappingURL=Direction.js.map