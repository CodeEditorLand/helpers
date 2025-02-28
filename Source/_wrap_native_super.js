import construct from "./_construct";
import getPrototypeOf from "./_get_prototype_of";
import isNativeFunction from "./_is_native_function";
import setPrototypeOf from "./_set_prototype_of";

function wrapNativeSuper(Class) {
	var _cache = typeof Map === "function" ? new Map() : undefined;

	wrapNativeSuper = function wrapNativeSuper(Class) {
		if (Class === null || !isNativeFunction(Class)) return Class;

		if (typeof Class !== "function") {
			throw new TypeError(
				"Super expression must either be null or a function",
			);
		}

		if (typeof _cache !== "undefined") {
			if (_cache.has(Class)) return _cache.get(Class);

			_cache.set(Class, Wrapper);
		}

		function Wrapper() {
			return construct(
				Class,
				arguments,
				getPrototypeOf(this).constructor,
			);
		}

		Wrapper.prototype = Object.create(Class.prototype, {
			constructor: {
				value: Wrapper,
				enumerable: false,
				writable: true,
				configurable: true,
			},
		});
		return setPrototypeOf(Wrapper, Class);
	};

	return wrapNativeSuper(Class);
}

export default function _wrapNativeSuper(Class) {
	return wrapNativeSuper(Class);
}
