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

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

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

var NanoKONTROL = function (_Device) {
  _inherits(NanoKONTROL, _Device);

  _createClass(NanoKONTROL, null, [{
    key: "detect",
    value: function detect(name) {
      return (/^nanoKONTROL\s/i.test(name)
      );
    }
  }, {
    key: "deviceName",
    get: function get() {
      return "nanoKONTROL";
    }
  }]);

  function NanoKONTROL(input, name) {
    _classCallCheck(this, NanoKONTROL);

    var _this = _possibleConstructorReturn(this, (NanoKONTROL.__proto__ || Object.getPrototypeOf(NanoKONTROL)).call(this, input, name, { globalMidiChannel: true }));

    _this.debug = (0, _debug2.default)("korg-nano-kontrol:nanoKONTROL");
    _this.debug("created");

    if ((0, _util.getEnv)() === "nodejs") {
      _this.input.ignoreTypes(false, false, true);
    }
    _this.setScene(1);

    _this.on("midi:message", function (msg) {
      if (msg.length === 11 && msg[0] === 240 && msg[10] === 247) {
        _this.setScene(msg[9] + 1);
        _this.emit("button:scene", msg[9] + 1);
      }
    });

    _this.button([176, 44], "rec");
    _this.button([176, 45], "play");
    _this.button([176, 46], "stop");
    _this.button([176, 47], "prev");
    _this.button([176, 48], "next");
    _this.button([176, 49], "loop");
    return _this;
  }

  _createClass(NanoKONTROL, [{
    key: "setScene",
    value: function setScene(scene) {
      var _this2 = this;

      this.scene = scene;
      switch (scene) {
        case 1:
          (0, _util.eachWithIndex)([].concat(_toConsumableArray(range(2, 7)), [8, 9, 12, 13]), function (index, code) {
            _this2.slider([176, code], index);
          });
          (0, _util.eachWithIndex)(range(14, 23), function (index, code) {
            _this2.knob([176, code], index);
          });
          (0, _util.eachWithIndex)(range(23, 32), function (index, code) {
            _this2.button([176, code], "a:" + index);
          });
          (0, _util.eachWithIndex)(range(33, 42), function (index, code) {
            _this2.button([176, code], "b:" + index);
          });
          break;
        case 2:
          (0, _util.eachWithIndex)([42, 43].concat(_toConsumableArray(range(50, 57))), function (index, code) {
            _this2.slider([176, code], index);
          });
          (0, _util.eachWithIndex)([].concat(_toConsumableArray(range(57, 64)), [65, 66]), function (index, code) {
            _this2.knob([176, code], index);
          });
          (0, _util.eachWithIndex)(range(67, 76), function (index, code) {
            _this2.button([176, code], "a:" + index);
          });
          (0, _util.eachWithIndex)(range(76, 85), function (index, code) {
            _this2.button([176, code], "b:" + index);
          });
          break;
        case 3:
          (0, _util.eachWithIndex)(range(85, 94), function (index, code) {
            _this2.slider([176, code], index);
          });
          (0, _util.eachWithIndex)([].concat(_toConsumableArray(range(94, 98)), _toConsumableArray(range(102, 107))), function (index, code) {
            _this2.knob([176, code], index);
          });
          (0, _util.eachWithIndex)(range(107, 116), function (index, code) {
            _this2.button([176, code], "a:" + index);
          });
          (0, _util.eachWithIndex)(range(116, 125), function (index, code) {
            _this2.button([176, code], "b:" + index);
          });
          break;
        case 4:
          (0, _util.eachWithIndex)(range(176, 185), function (index, code) {
            _this2.slider([code, 7], index);
          });
          (0, _util.eachWithIndex)(range(176, 185), function (index, code) {
            _this2.knob([code, 10], index);
          });
          (0, _util.eachWithIndex)(range(176, 185), function (index, code) {
            _this2.button([code, 16], "a:" + index);
          });
          (0, _util.eachWithIndex)(range(176, 185), function (index, code) {
            _this2.button([code, 17], "b:" + index);
          });
          break;
      }
    }
  }]);

  return NanoKONTROL;
}(_device2.default);

exports.default = NanoKONTROL;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kZXZpY2VzL25hbm9LT05UUk9MLmVzNiJdLCJuYW1lcyI6WyJyYW5nZSIsInN0YXJ0IiwiZW5kIiwic3RlcCIsImZyb21SaWdodCIsImluZGV4IiwibGVuZ3RoIiwiTWF0aCIsIm1heCIsImNlaWwiLCJyZXN1bHQiLCJBcnJheSIsIk5hbm9LT05UUk9MIiwibmFtZSIsInRlc3QiLCJpbnB1dCIsImdsb2JhbE1pZGlDaGFubmVsIiwiZGVidWciLCJpZ25vcmVUeXBlcyIsInNldFNjZW5lIiwib24iLCJtc2ciLCJlbWl0IiwiYnV0dG9uIiwic2NlbmUiLCJjb2RlIiwic2xpZGVyIiwia25vYiIsIkRldmljZSJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7O0FBY0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7QUFkQSxTQUFTQSxLQUFULENBQWVDLEtBQWYsRUFBc0JDLEdBQXRCLEVBQTJCQyxJQUEzQixFQUFpQ0MsU0FBakMsRUFBNEM7QUFDMUMsTUFBSUMsUUFBUSxDQUFDLENBQWI7QUFBQSxNQUNFQyxTQUFTQyxLQUFLQyxHQUFMLENBQVNELEtBQUtFLElBQUwsQ0FBVSxDQUFDUCxNQUFNRCxLQUFQLEtBQWlCRSxRQUFRLENBQXpCLENBQVYsQ0FBVCxFQUFpRCxDQUFqRCxDQURYO0FBQUEsTUFFRU8sU0FBU0MsTUFBTUwsTUFBTixDQUZYOztBQUlBLFNBQU9BLFFBQVAsRUFBaUI7QUFDZkksV0FBT04sWUFBWUUsTUFBWixHQUFxQixFQUFFRCxLQUE5QixJQUF1Q0osS0FBdkM7QUFDQUEsYUFBU0UsSUFBVDtBQUNEO0FBQ0QsU0FBT08sTUFBUDtBQUNEOztJQU1vQkUsVzs7Ozs7MkJBSUxDLEksRUFBTTtBQUNsQixhQUFPLG1CQUFrQkMsSUFBbEIsQ0FBdUJELElBQXZCO0FBQVA7QUFDRDs7O3dCQUx1QjtBQUN0QixhQUFPLGFBQVA7QUFDRDs7O0FBS0QsdUJBQVlFLEtBQVosRUFBbUJGLElBQW5CLEVBQXlCO0FBQUE7O0FBQUEsMEhB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QUZEO0FBR0EsbUNBQWNMLE1BQU0sR0FBTixFQUFXLEdBQVgsQ0FBZCxFQUErQixVQUFDSyxLQUFELEVBQVFvQixJQUFSLEVBQWlCO0FBQzlDLG1CQUFLRixNQUFMLENBQVksQ0FBQyxHQUFELEVBQU1FLElBQU4sQ0FBWixTQUE4QnBCLEtBQTlCO0FBQ0QsV0FGRDtBQUdBO0FBQ0YsYUFBSyxDQUFMO0FBQ0UsbUNBQWNMLE1BQU0sR0FBTixFQUFXLEdBQVgsQ0FBZCxFQUErQixVQUFDSyxLQUFELEVBQVFvQixJQUFSLEVBQWlCO0FBQzlDLG1CQUFLQyxNQUFMLENBQVksQ0FBQ0QsSUFBRCxFQUFPLENBQVAsQ0FBWixFQUF1QnBCLEtBQXZCO0FBQ0QsV0FGRDtBQUdBLG1DQUFjTCxNQUFNLEdBQU4sRUFBVyxHQUFYLENBQWQsRUFBK0IsVUFBQ0ssS0FBRCxFQUFRb0IsSUFBUixFQUFpQjtBQUM5QyxtQkFBS0UsSUFBTCxDQUFVLENBQUNGLElBQUQsRUFBTyxFQUFQLENBQVYsRUFBc0JwQixLQUF0QjtBQUNELFdBRkQ7QUFHQSxtQ0FBY0wsTUFBTSxHQUFOLEVBQVcsR0FBWCxDQUFkLEVBQStCLFVBQUNLLEtBQUQsRUFBUW9CLElBQVIsRUFBaUI7QUFDOUMsbUJBQUtGLE1BQUwsQ0FBWSxDQUFDRSxJQUFELEVBQU8sRUFBUCxDQUFaLFNBQTZCcEIsS0FBN0I7QUFDRCxXQUZEO0FBR0EsbUNBQWNMLE1BQU0sR0FBTixFQUFXLEdBQVgsQ0FBZCxFQUErQixVQUFDSyxLQUFELEVBQVFvQixJQUFSLEVBQWlCO0FBQzlDLG1CQUFLRixNQUFMLENBQVksQ0FBQ0UsSUFBRCxFQUFPLEVBQVAsQ0FBWixTQUE2QnBCLEtBQTdCO0FBQ0QsV0FGRDtBQUdBO0FBeERKO0FBMEREOzs7O0VBN0ZzQ3VCLGdCOztrQkFBcEJoQixXIiwiZmlsZSI6Im5hbm9LT05UUk9MLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbmZ1bmN0aW9uIHJhbmdlKHN0YXJ0LCBlbmQsIHN0ZXAsIGZyb21SaWdodCkge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICBsZW5ndGggPSBNYXRoLm1heChNYXRoLmNlaWwoKGVuZCAtIHN0YXJ0KSAvIChzdGVwIHx8IDEpKSwgMCksXG4gICAgcmVzdWx0ID0gQXJyYXkobGVuZ3RoKTtcblxuICB3aGlsZSAobGVuZ3RoLS0pIHtcbiAgICByZXN1bHRbZnJvbVJpZ2h0ID8gbGVuZ3RoIDogKytpbmRleF0gPSBzdGFydDtcbiAgICBzdGFydCArPSBzdGVwO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmltcG9ydCBEZWJ1ZyBmcm9tIFwiZGVidWdcIjtcbmltcG9ydCBEZXZpY2UgZnJvbSBcIi4uL2RldmljZVwiO1xuaW1wb3J0IHsgZWFjaFdpdGhJbmRleCwgZ2V0RW52IH0gZnJvbSBcIi4uL3V0aWxcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTmFub0tPTlRST0wgZXh0ZW5kcyBEZXZpY2Uge1xuICBzdGF0aWMgZ2V0IGRldmljZU5hbWUoKSB7XG4gICAgcmV0dXJuIFwibmFub0tPTlRST0xcIjtcbiAgfVxuICBzdGF0aWMgZGV0ZWN0KG5hbWUpIHtcbiAgICByZXR1cm4gL15uYW5vS09OVFJPTFxccy9pLnRlc3QobmFtZSk7XG4gIH1cblxuICBjb25zdHJ1Y3RvcihpbnB1dCwgbmFtZSkge1xuICAgIHN1cGVyKGlucHV0LCBuYW1lLCB7IGdsb2JhbE1pZGlDaGFubmVsOiB0cnVlIH0pO1xuICAgIHRoaXMuZGVidWcgPSBEZWJ1ZyhcImtvcmctbmFuby1rb250cm9sOm5hbm9LT05UUk9MXCIpO1xuICAgIHRoaXMuZGVidWcoXCJjcmVhdGVkXCIpO1xuXG4gICAgaWYgKGdldEVudigpID09PSBcIm5vZGVqc1wiKSB7XG4gICAgICB0aGlzLmlucHV0Lmlnbm9yZVR5cGVzKGZhbHNlLCBmYWxzZSwgdHJ1ZSk7XG4gICAgfVxuICAgIHRoaXMuc2V0U2NlbmUoMSk7XG5cbiAgICB0aGlzLm9uKFwibWlkaTptZXNzYWdlXCIsIG1zZyA9PiB7XG4gICAgICBpZiAobXNnLmxlbmd0aCA9PT0gMTEgJiYgbXNnWzBdID09PSAyNDAgJiYgbXNnWzEwXSA9PT0gMjQ3KSB7XG4gICAgICAgIHRoaXMuc2V0U2NlbmUobXNnWzldICsgMSk7XG4gICAgICAgIHRoaXMuZW1pdChcImJ1dHRvbjpzY2VuZVwiLCBtc2dbOV0gKyAxKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHRoaXMuYnV0dG9uKFsxNzYsIDQ0XSwgXCJyZWNcIik7XG4gICAgdGhpcy5idXR0b24oWzE3NiwgNDVdLCBcInBsYXlcIik7XG4gICAgdGhpcy5idXR0b24oWzE3NiwgNDZdLCBcInN0b3BcIik7XG4gICAgdGhpcy5idXR0b24oWzE3NiwgNDddLCBcInByZXZcIik7XG4gICAgdGhpcy5idXR0b24oWzE3NiwgNDhdLCBcIm5leHRcIik7XG4gICAgdGhpcy5idXR0b24oWzE3NiwgNDldLCBcImxvb3BcIik7XG4gIH1cblxuICBzZXRTY2VuZShzY2VuZSkge1xuICAgIHRoaXMuc2NlbmUgPSBzY2VuZTtcbiAgICBzd2l0Y2ggKHNjZW5lKSB7XG4gICAgICBjYXNlIDE6XG4gICAgICAgIGVhY2hXaXRoSW5kZXgoWy4uLnJhbmdlKDIsIDcpLCA4LCA5LCAxMiwgMTNdLCAoaW5kZXgsIGNvZGUpID0+IHtcbiAgICAgICAgICB0aGlzLnNsaWRlcihbMTc2LCBjb2RlXSwgaW5kZXgpO1xuICAgICAgICB9KTtcbiAgICAgICAgZWFjaFdpdGhJbmRleChyYW5nZSgxNCwgMjMpLCAoaW5kZXgsIGNvZGUpID0+IHtcbiAgICAgICAgICB0aGlzLmtub2IoWzE3NiwgY29kZV0sIGluZGV4KTtcbiAgICAgICAgfSk7XG4gICAgICAgIGVhY2hXaXRoSW5kZXgocmFuZ2UoMjMsIDMyKSwgKGluZGV4LCBjb2RlKSA9PiB7XG4gICAgICAgICAgdGhpcy5idXR0b24oWzE3NiwgY29kZV0sIGBhOiR7aW5kZXh9YCk7XG4gICAgICAgIH0pO1xuICAgICAgICBlYWNoV2l0aEluZGV4KHJhbmdlKDMzLCA0MiksIChpbmRleCwgY29kZSkgPT4ge1xuICAgICAgICAgIHRoaXMuYnV0dG9uKFsxNzYsIGNvZGVdLCBgYjoke2luZGV4fWApO1xuICAgICAgICB9KTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDI6XG4gICAgICAgIGVhY2hXaXRoSW5kZXgoWzQyLCA0MywgLi4ucmFuZ2UoNTAsIDU3KV0sIChpbmRleCwgY29kZSkgPT4ge1xuICAgICAgICAgIHRoaXMuc2xpZGVyKFsxNzYsIGNvZGVdLCBpbmRleCk7XG4gICAgICAgIH0pO1xuICAgICAgICBlYWNoV2l0aEluZGV4KFsuLi5yYW5nZSg1NywgNjQpLCA2NSwgNjZdLCAoaW5kZXgsIGNvZGUpID0+IHtcbiAgICAgICAgICB0aGlzLmtub2IoWzE3NiwgY29kZV0sIGluZGV4KTtcbiAgICAgICAgfSk7XG4gICAgICAgIGVhY2hXaXRoSW5kZXgocmFuZ2UoNjcsIDc2KSwgKGluZGV4LCBjb2RlKSA9PiB7XG4gICAgICAgICAgdGhpcy5idXR0b24oWzE3NiwgY29kZV0sIGBhOiR7aW5kZXh9YCk7XG4gICAgICAgIH0pO1xuICAgICAgICBlYWNoV2l0aEluZGV4KHJhbmdlKDc2LCA4NSksIChpbmRleCwgY29kZSkgPT4ge1xuICAgICAgICAgIHRoaXMuYnV0dG9uKFsxNzYsIGNvZGVdLCBgYjoke2luZGV4fWApO1xuICAgICAgICB9KTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDM6XG4gICAgICAgIGVhY2hXaXRoSW5kZXgocmFuZ2UoODUsIDk0KSwgKGluZGV4LCBjb2RlKSA9PiB7XG4gICAgICAgICAgdGhpcy5zbGlkZXIoWzE3NiwgY29kZV0sIGluZGV4KTtcbiAgICAgICAgfSk7XG4gICAgICAgIGVhY2hXaXRoSW5kZXgoWy4uLnJhbmdlKDk0LCA5OCksIC4uLnJhbmdlKDEwMiwgMTA3KV0sIChpbmRleCwgY29kZSkgPT4ge1xuICAgICAgICAgIHRoaXMua25vYihbMTc2LCBjb2RlXSwgaW5kZXgpO1xuICAgICAgICB9KTtcbiAgICAgICAgZWFjaFdpdGhJbmRleChyYW5nZSgxMDcsIDExNiksIChpbmRleCwgY29kZSkgPT4ge1xuICAgICAgICAgIHRoaXMuYnV0dG9uKFsxNzYsIGNvZGVdLCBgYToke2luZGV4fWApO1xuICAgICAgICB9KTtcbiAgICAgICAgZWFjaFdpdGhJbmRleChyYW5nZSgxMTYsIDEyNSksIChpbmRleCwgY29kZSkgPT4ge1xuICAgICAgICAgIHRoaXMuYnV0dG9uKFsxNzYsIGNvZGVdLCBgYjoke2luZGV4fWApO1xuICAgICAgICB9KTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDQ6XG4gICAgICAgIGVhY2hXaXRoSW5kZXgocmFuZ2UoMTc2LCAxODUpLCAoaW5kZXgsIGNvZGUpID0+IHtcbiAgICAgICAgICB0aGlzLnNsaWRlcihbY29kZSwgN10sIGluZGV4KTtcbiAgICAgICAgfSk7XG4gICAgICAgIGVhY2hXaXRoSW5kZXgocmFuZ2UoMTc2LCAxODUpLCAoaW5kZXgsIGNvZGUpID0+IHtcbiAgICAgICAgICB0aGlzLmtub2IoW2NvZGUsIDEwXSwgaW5kZXgpO1xuICAgICAgICB9KTtcbiAgICAgICAgZWFjaFdpdGhJbmRleChyYW5nZSgxNzYsIDE4NSksIChpbmRleCwgY29kZSkgPT4ge1xuICAgICAgICAgIHRoaXMuYnV0dG9uKFtjb2RlLCAxNl0sIGBhOiR7aW5kZXh9YCk7XG4gICAgICAgIH0pO1xuICAgICAgICBlYWNoV2l0aEluZGV4KHJhbmdlKDE3NiwgMTg1KSwgKGluZGV4LCBjb2RlKSA9PiB7XG4gICAgICAgICAgdGhpcy5idXR0b24oW2NvZGUsIDE3XSwgYGI6JHtpbmRleH1gKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxufVxuIl19