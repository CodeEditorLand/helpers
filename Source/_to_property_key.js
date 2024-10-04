import toPrimitive from "./_to_primitive";
import _typeof from "./_type_of";

export default function _toPropertyKey(arg) {
	var key = toPrimitive(arg, "string");
	return _typeof(key) === "symbol" ? key : String(key);
}
