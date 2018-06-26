"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _debug = require("debug");

var _debug2 = _interopRequireDefault(_debug);

var _device = require("../device");

var _device2 = _interopRequireDefault(_device);

var _util = require("../util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function range(start, end, step, fromRight) {
  var index = -1,
      length = Math.max(Math.ceil((end - start) / (step || 1)), 0),
      result = Array(length);

  while (length--) {
    result[fromRight ? length : ++index] = start;
    start += step;
  }
  return result;
}

var NanoKONTROL2 = function (_Device) {
  _inherits(NanoKONTROL2, _Device);

  _createClass(NanoKONTROL2, null, [{
    key: "detect",
    value: function detect(name) {
      return (/^nanoKONTROL2\s/i.test(name)
      );
    }
  }, {
    key: "deviceName",
    get: function get() {
      return "nanoKONTROL2";
    }
  }]);

  function NanoKONTROL2(input, name) {
    _classCallCheck(this, NanoKONTROL2);

    var _this = _possibleConstructorReturn(this, (NanoKONTROL2.__proto__ || Object.getPrototypeOf(NanoKONTROL2)).call(this, input, name));

    _this.debug = (0, _debug2.default)("korg-nano-kontrol:nanoKONTROL2");
    _this.debug("created");

    (0, _util.eachWithIndex)(range(0, 8), function (index, code) {
      _this.slider(code, index);
    });

    (0, _util.eachWithIndex)(range(16, 24), function (index, code) {
      _this.knob(code, index);
    });

    (0, _util.eachWithIndex)(range(32, 40), function (index, code) {
      _this.button(code, "s:" + index);
    });

    (0, _util.eachWithIndex)(range(48, 56), function (index, code) {
      _this.button(code, "m:" + index);
    });

    (0, _util.eachWithIndex)(range(64, 72), function (index, code) {
      _this.button(code, "r:" + index);
    });

    _this.button(41, "play");
    _this.button(42, "stop");
    _this.button(43, "prev");
    _this.button(44, "next");
    _this.button(45, "rec");
    _this.button(46, "cycle");
    _this.button(60, "marker:set");
    _this.button(61, "marker:prev");
    _this.button(62, "marker:next");
    _this.button(58, "track:prev");
    _this.button(59, "track:next");
    return _this;
  }

  return NanoKONTROL2;
}(_device2.default);

exports.default = NanoKONTROL2;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kZXZpY2VzL25hbm9LT05UUk9MMi5lczYiXSwibmFtZXMiOlsicmFuZ2UiLCJzdGFydCIsImVuZCIsInN0ZXAiLCJmcm9tUmlnaHQiLCJpbmRleCIsImxlbmd0aCIsIk1hdGgiLCJtYXgiLCJjZWlsIiwicmVzdWx0IiwiQXJyYXkiLCJOYW5vS09OVFJPTDIiLCJuYW1lIiwidGVzdCIsImlucHV0IiwiZGVidWciLCJjb2RlIiwic2xpZGVyIiwia25vYiIsImJ1dHRvbiIsIkRldmljZSJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7O0FBY0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7O0FBZEEsU0FBU0EsS0FBVCxDQUFlQyxLQUFmLEVBQXNCQyxHQUF0QixFQUEyQkMsSUFBM0IsRUFBaUNDLFNBQWpDLEVBQTRDO0FBQzFDLE1BQUlDLFFBQVEsQ0FBQyxDQUFiO0FBQUEsTUFDRUMsU0FBU0MsS0FBS0MsR0FBTCxDQUFTRCxLQUFLRSxJQUFMLENBQVUsQ0FBQ1AsTUFBTUQsS0FBUCxLQUFpQkUsUUFBUSxDQUF6QixDQUFWLENBQVQsRUFBaUQsQ0FBakQsQ0FEWDtBQUFBLE1BRUVPLFNBQVNDLE1BQU1MLE1BQU4sQ0FGWDs7QUFJQSxTQUFPQSxRQUFQLEVBQWlCO0FBQ2ZJLFdBQU9OLFlBQVlFLE1BQVosR0FBcUIsRUFBRUQsS0FBOUIsSUFBdUNKLEtBQXZDO0FBQ0FBLGFBQVNFLElBQVQ7QUFDRDtBQUNELFNBQU9PLE1BQVA7QUFDRDs7SUFNb0JFLFk7Ozs7OzJCQUlMQyxJLEVBQU07QUFDbEIsYUFBTyxvQkFBbUJDLElBQW5CLENBQXdCRCxJQUF4QjtBQUFQO0FBQ0Q7Ozt3QkFMdUI7QUFDdEIsYUFBTyxjQUFQO0FBQ0Q7OztBQUtELHdCQUFZRSxLQUFaLEVBQW1CRixJQUFuQixFQUF5QjtBQUFBOztBQUFBLDRIQUNqQkUsS0FEaUIsRUFDVkYsSUFEVTs7QUFFdkIsVUFBS0csS0FBTCxHQUFhLHFCQUFNLGdDQUFOLENBQWI7QUFDQSxVQUFLQSxLQUFMLENBQVcsU0FBWDs7QUFFQSw2QkFBY2hCLE1BQU0sQ0FBTixFQUFTLENBQVQsQ0FBZCxFQUEyQixVQUFDSyxLQUFELEVBQVFZLElBQVIsRUFBaUI7QUFDMUMsWUFBS0MsTUFBTCxDQUFZRCxJQUFaLEVBQWtCWixLQUFsQjtBQUNELEtBRkQ7O0FBSUEsNkJBQWNMLE1BQU0sRUFBTixFQUFVLEVBQVYsQ0FBZCxFQUE2QixVQUFDSyxLQUFELEVBQVFZLElBQVIsRUFBaUI7QUFDNUMsWUFBS0UsSUFBTCxDQUFVRixJQUFWLEVBQWdCWixLQUFoQjtBQUNELEtBRkQ7O0FBSUEsNkJBQWNMLE1BQU0sRUFBTixFQUFVLEVBQVYsQ0FBZCxFQUE2QixVQUFDSyxLQUFELEVBQVFZLElBQVIsRUFBaUI7QUFDNUMsWUFBS0csTUFBTCxDQUFZSCxJQUFaLFNBQXVCWixLQUF2QjtBQUNELEtBRkQ7O0FBSUEsNkJBQWNMLE1BQU0sRUFBTixFQUFVLEVBQVYsQ0FBZCxFQUE2QixVQUFDSyxLQUFELEVBQVFZLElBQVIsRUFBaUI7QUFDNUMsWUFBS0csTUFBTCxDQUFZSCxJQUFaLFNBQXVCWixLQUF2QjtBQUNELEtBRkQ7O0FBSUEsNkJBQWNMLE1BQU0sRUFBTixFQUFVLEVBQVYsQ0FBZCxFQUE2QixVQUFDSyxLQUFELEVBQVFZLElBQVIsRUFBaUI7QUFDNUMsWUFBS0csTUFBTCxDQUFZSCxJQUFaLFNBQXVCWixLQUF2QjtBQUNELEtBRkQ7O0FBSUEsVUFBS2UsTUFBTCxDQUFZLEVBQVosRUFBZ0IsTUFBaEI7QUFDQSxVQUFLQSxNQUFMLENBQVksRUFBWixFQUFnQixNQUFoQjtBQUNBLFVBQUtBLE1BQUwsQ0FBWSxFQUFaLEVBQWdCLE1BQWhCO0FBQ0EsVUFBS0EsTUFBTCxDQUFZLEVBQVosRUFBZ0IsTUFBaEI7QUFDQSxVQUFLQSxNQUFMLENBQVksRUFBWixFQUFnQixLQUFoQjtBQUNBLFVBQUtBLE1BQUwsQ0FBWSxFQUFaLEVBQWdCLE9BQWhCO0FBQ0EsVUFBS0EsTUFBTCxDQUFZLEVBQVosRUFBZ0IsWUFBaEI7QUFDQSxVQUFLQSxNQUFMLENBQVksRUFBWixFQUFnQixhQUFoQjtBQUNBLFVBQUtBLE1BQUwsQ0FBWSxFQUFaLEVBQWdCLGFBQWhCO0FBQ0EsVUFBS0EsTUFBTCxDQUFZLEVBQVosRUFBZ0IsWUFBaEI7QUFDQSxVQUFLQSxNQUFMLENBQVksRUFBWixFQUFnQixZQUFoQjtBQW5DdUI7QUFvQ3hCOzs7RUE1Q3VDQyxnQjs7a0JBQXJCVCxZIiwiZmlsZSI6Im5hbm9LT05UUk9MMi5qcyIsInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG5mdW5jdGlvbiByYW5nZShzdGFydCwgZW5kLCBzdGVwLCBmcm9tUmlnaHQpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgbGVuZ3RoID0gTWF0aC5tYXgoTWF0aC5jZWlsKChlbmQgLSBzdGFydCkgLyAoc3RlcCB8fCAxKSksIDApLFxuICAgIHJlc3VsdCA9IEFycmF5KGxlbmd0aCk7XG5cbiAgd2hpbGUgKGxlbmd0aC0tKSB7XG4gICAgcmVzdWx0W2Zyb21SaWdodCA/IGxlbmd0aCA6ICsraW5kZXhdID0gc3RhcnQ7XG4gICAgc3RhcnQgKz0gc3RlcDtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5pbXBvcnQgRGVidWcgZnJvbSBcImRlYnVnXCI7XG5pbXBvcnQgRGV2aWNlIGZyb20gXCIuLi9kZXZpY2VcIjtcbmltcG9ydCB7IGVhY2hXaXRoSW5kZXggfSBmcm9tIFwiLi4vdXRpbFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBOYW5vS09OVFJPTDIgZXh0ZW5kcyBEZXZpY2Uge1xuICBzdGF0aWMgZ2V0IGRldmljZU5hbWUoKSB7XG4gICAgcmV0dXJuIFwibmFub0tPTlRST0wyXCI7XG4gIH1cbiAgc3RhdGljIGRldGVjdChuYW1lKSB7XG4gICAgcmV0dXJuIC9ebmFub0tPTlRST0wyXFxzL2kudGVzdChuYW1lKTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKGlucHV0LCBuYW1lKSB7XG4gICAgc3VwZXIoaW5wdXQsIG5hbWUpO1xuICAgIHRoaXMuZGVidWcgPSBEZWJ1ZyhcImtvcmctbmFuby1rb250cm9sOm5hbm9LT05UUk9MMlwiKTtcbiAgICB0aGlzLmRlYnVnKFwiY3JlYXRlZFwiKTtcblxuICAgIGVhY2hXaXRoSW5kZXgocmFuZ2UoMCwgOCksIChpbmRleCwgY29kZSkgPT4ge1xuICAgICAgdGhpcy5zbGlkZXIoY29kZSwgaW5kZXgpO1xuICAgIH0pO1xuXG4gICAgZWFjaFdpdGhJbmRleChyYW5nZSgxNiwgMjQpLCAoaW5kZXgsIGNvZGUpID0+IHtcbiAgICAgIHRoaXMua25vYihjb2RlLCBpbmRleCk7XG4gICAgfSk7XG5cbiAgICBlYWNoV2l0aEluZGV4KHJhbmdlKDMyLCA0MCksIChpbmRleCwgY29kZSkgPT4ge1xuICAgICAgdGhpcy5idXR0b24oY29kZSwgYHM6JHtpbmRleH1gKTtcbiAgICB9KTtcblxuICAgIGVhY2hXaXRoSW5kZXgocmFuZ2UoNDgsIDU2KSwgKGluZGV4LCBjb2RlKSA9PiB7XG4gICAgICB0aGlzLmJ1dHRvbihjb2RlLCBgbToke2luZGV4fWApO1xuICAgIH0pO1xuXG4gICAgZWFjaFdpdGhJbmRleChyYW5nZSg2NCwgNzIpLCAoaW5kZXgsIGNvZGUpID0+IHtcbiAgICAgIHRoaXMuYnV0dG9uKGNvZGUsIGByOiR7aW5kZXh9YCk7XG4gICAgfSk7XG5cbiAgICB0aGlzLmJ1dHRvbig0MSwgXCJwbGF5XCIpO1xuICAgIHRoaXMuYnV0dG9uKDQyLCBcInN0b3BcIik7XG4gICAgdGhpcy5idXR0b24oNDMsIFwicHJldlwiKTtcbiAgICB0aGlzLmJ1dHRvbig0NCwgXCJuZXh0XCIpO1xuICAgIHRoaXMuYnV0dG9uKDQ1LCBcInJlY1wiKTtcbiAgICB0aGlzLmJ1dHRvbig0NiwgXCJjeWNsZVwiKTtcbiAgICB0aGlzLmJ1dHRvbig2MCwgXCJtYXJrZXI6c2V0XCIpO1xuICAgIHRoaXMuYnV0dG9uKDYxLCBcIm1hcmtlcjpwcmV2XCIpO1xuICAgIHRoaXMuYnV0dG9uKDYyLCBcIm1hcmtlcjpuZXh0XCIpO1xuICAgIHRoaXMuYnV0dG9uKDU4LCBcInRyYWNrOnByZXZcIik7XG4gICAgdGhpcy5idXR0b24oNTksIFwidHJhY2s6bmV4dFwiKTtcbiAgfVxufVxuIl19