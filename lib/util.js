"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.toArray = toArray;
exports.getEnv = getEnv;
exports.eachWithIndex = eachWithIndex;
function toArray(obj) {
  return Array.prototype.splice.call(obj, 0);
}

function getEnv() {
  if ((typeof window === "undefined" ? "undefined" : _typeof(window)) === "object") {
    return "browser";
  } else {
    return "nodejs";
  }
}

function eachWithIndex(arr, iter) {
  if (!(arr instanceof Array)) {
    return;
  }
  if (typeof iter !== "function") {
    return;
  }
  for (var i = 0; i < arr.length; i++) {
    iter(i, arr[i]);
  }
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy91dGlsLmVzNiJdLCJuYW1lcyI6WyJ0b0FycmF5IiwiZ2V0RW52IiwiZWFjaFdpdGhJbmRleCIsIm9iaiIsIkFycmF5IiwicHJvdG90eXBlIiwic3BsaWNlIiwiY2FsbCIsIndpbmRvdyIsImFyciIsIml0ZXIiLCJpIiwibGVuZ3RoIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7UUFFZ0JBLE8sR0FBQUEsTztRQUlBQyxNLEdBQUFBLE07UUFTQUMsYSxHQUFBQSxhO0FBYlQsU0FBU0YsT0FBVCxDQUFpQkcsR0FBakIsRUFBcUI7QUFDMUIsU0FBT0MsTUFBTUMsU0FBTixDQUFnQkMsTUFBaEIsQ0FBdUJDLElBQXZCLENBQTRCSixHQUE1QixFQUFpQyxDQUFqQyxDQUFQO0FBQ0Q7O0FBRU0sU0FBU0YsTUFBVCxHQUFpQjtBQUN0QixNQUFHLFFBQU9PLE1BQVAseUNBQU9BLE1BQVAsT0FBa0IsUUFBckIsRUFBOEI7QUFDNUIsV0FBTyxTQUFQO0FBQ0QsR0FGRCxNQUdJO0FBQ0YsV0FBTyxRQUFQO0FBQ0Q7QUFDRjs7QUFFTSxTQUFTTixhQUFULENBQXVCTyxHQUF2QixFQUE0QkMsSUFBNUIsRUFBaUM7QUFDdEMsTUFBRyxFQUFFRCxlQUFlTCxLQUFqQixDQUFILEVBQTJCO0FBQUU7QUFBUztBQUN0QyxNQUFHLE9BQU9NLElBQVAsS0FBZ0IsVUFBbkIsRUFBOEI7QUFBRTtBQUFTO0FBQ3pDLE9BQUksSUFBSUMsSUFBSSxDQUFaLEVBQWVBLElBQUlGLElBQUlHLE1BQXZCLEVBQStCRCxHQUEvQixFQUFtQztBQUNqQ0QsU0FBS0MsQ0FBTCxFQUFRRixJQUFJRSxDQUFKLENBQVI7QUFDRDtBQUNGIiwiZmlsZSI6InV0aWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIHRvQXJyYXkob2JqKXtcbiAgcmV0dXJuIEFycmF5LnByb3RvdHlwZS5zcGxpY2UuY2FsbChvYmosIDApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0RW52KCl7XG4gIGlmKHR5cGVvZiB3aW5kb3cgPT09IFwib2JqZWN0XCIpe1xuICAgIHJldHVybiBcImJyb3dzZXJcIjtcbiAgfVxuICBlbHNle1xuICAgIHJldHVybiBcIm5vZGVqc1wiO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBlYWNoV2l0aEluZGV4KGFyciwgaXRlcil7XG4gIGlmKCEoYXJyIGluc3RhbmNlb2YgQXJyYXkpKXsgcmV0dXJuOyB9XG4gIGlmKHR5cGVvZiBpdGVyICE9PSBcImZ1bmN0aW9uXCIpeyByZXR1cm47IH1cbiAgZm9yKGxldCBpID0gMDsgaSA8IGFyci5sZW5ndGg7IGkrKyl7XG4gICAgaXRlcihpLCBhcnJbaV0pO1xuICB9XG59XG4iXX0=