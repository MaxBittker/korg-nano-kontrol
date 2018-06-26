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
    start += step || 1;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kZXZpY2VzL25hbm9LT05UUk9MLmVzNiJdLCJuYW1lcyI6WyJyYW5nZSIsInN0YXJ0IiwiZW5kIiwic3RlcCIsImZyb21SaWdodCIsImluZGV4IiwibGVuZ3RoIiwiTWF0aCIsIm1heCIsImNlaWwiLCJyZXN1bHQiLCJBcnJheSIsIk5hbm9LT05UUk9MIiwibmFtZSIsInRlc3QiLCJpbnB1dCIsImdsb2JhbE1pZGlDaGFubmVsIiwiZGVidWciLCJpZ25vcmVUeXBlcyIsInNldFNjZW5lIiwib24iLCJtc2ciLCJlbWl0IiwiYnV0dG9uIiwic2NlbmUiLCJjb2RlIiwic2xpZGVyIiwia25vYiIsIkRldmljZSJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7O0FBY0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7QUFkQSxTQUFTQSxLQUFULENBQWVDLEtBQWYsRUFBc0JDLEdBQXRCLEVBQTJCQyxJQUEzQixFQUFpQ0MsU0FBakMsRUFBNEM7QUFDMUMsTUFBSUMsUUFBUSxDQUFDLENBQWI7QUFBQSxNQUNFQyxTQUFTQyxLQUFLQyxHQUFMLENBQVNELEtBQUtFLElBQUwsQ0FBVSxDQUFDUCxNQUFNRCxLQUFQLEtBQWlCRSxRQUFRLENBQXpCLENBQVYsQ0FBVCxFQUFpRCxDQUFqRCxDQURYO0FBQUEsTUFFRU8sU0FBU0MsTUFBTUwsTUFBTixDQUZYOztBQUlBLFNBQU9BLFFBQVAsRUFBaUI7QUFDZkksV0FBT04sWUFBWUUsTUFBWixHQUFxQixFQUFFRCxLQUE5QixJQUF1Q0osS0FBdkM7QUFDQUEsYUFBU0UsUUFBUSxDQUFqQjtBQUNEO0FBQ0QsU0FBT08sTUFBUDtBQUNEOztJQU1vQkUsVzs7Ozs7MkJBSUxDLEksRUFBTTtBQUNsQixhQUFPLG1CQUFrQkMsSUFBbEIsQ0FBdUJELElBQXZCO0FBQVA7QUFDRDs7O3dCQUx1QjtBQUN0QixhQUFPLGFBQVA7QUFDRDs7O0FBS0QsdUJBQVlFLEtBQVosRUFBbUJGLElBQW5CLEVBQXlCO0FBQUE7O0FB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QUFDRCxXQUZEO0FBR0EsbUNBQWNMLE1BQU0sR0FBTixFQUFXLEdBQVgsQ0FBZCxFQUErQixVQUFDSyxLQUFELEVBQVFvQixJQUFSLEVBQWlCO0FBQzlDLG1CQUFLRixNQUFMLENBQVksQ0FBQyxHQUFELEVBQU1FLElBQU4sQ0FBWixTQUE4QnBCLEtBQTlCO0FBQ0QsV0FGRDtBQUdBO0FBQ0YsYUFBSyxDQUFMO0FBQ0UsbUNBQWNMLE1BQU0sR0FBTixFQUFXLEdBQVgsQ0FBZCxFQUErQixVQUFDSyxLQUFELEVBQVFvQixJQUFSLEVBQWlCO0FBQzlDLG1CQUFLQyxNQUFMLENBQVksQ0FBQ0QsSUFBRCxFQUFPLENBQVAsQ0FBWixFQUF1QnBCLEtBQXZCO0FBQ0QsV0FGRDtBQUdBLG1DQUFjTCxNQUFNLEdBQU4sRUFBVyxHQUFYLENBQWQsRUFBK0IsVUFBQ0ssS0FBRCxFQUFRb0IsSUFBUixFQUFpQjtBQUM5QyxtQkFBS0UsSUFBTCxDQUFVLENBQUNGLElBQUQsRUFBTyxFQUFQLENBQVYsRUFBc0JwQixLQUF0QjtBQUNELFdBRkQ7QUFHQSxtQ0FBY0wsTUFBTSxHQUFOLEVBQVcsR0FBWCxDQUFkLEVBQStCLFVBQUNLLEtBQUQsRUFBUW9CLElBQVIsRUFBaUI7QUFDOUMsbUJBQUtGLE1BQUwsQ0FBWSxDQUFDRSxJQUFELEVBQU8sRUFBUCxDQUFaLFNBQTZCcEIsS0FBN0I7QUFDRCxXQUZEO0FBR0EsbUNBQWNMLE1BQU0sR0FBTixFQUFXLEdBQVgsQ0FBZCxFQUErQixVQUFDSyxLQUFELEVBQVFvQixJQUFSLEVBQWlCO0FBQzlDLG1CQUFLRixNQUFMLENBQVksQ0FBQ0UsSUFBRCxFQUFPLEVBQVAsQ0FBWixTQUE2QnBCLEtBQTdCO0FBQ0QsV0FGRDtBQUdBO0FBeERKO0FBMEREOzs7O0VBN0ZzQ3VCLGdCOztrQkFBcEJoQixXIiwiZmlsZSI6Im5hbm9LT05UUk9MLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbmZ1bmN0aW9uIHJhbmdlKHN0YXJ0LCBlbmQsIHN0ZXAsIGZyb21SaWdodCkge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICBsZW5ndGggPSBNYXRoLm1heChNYXRoLmNlaWwoKGVuZCAtIHN0YXJ0KSAvIChzdGVwIHx8IDEpKSwgMCksXG4gICAgcmVzdWx0ID0gQXJyYXkobGVuZ3RoKTtcblxuICB3aGlsZSAobGVuZ3RoLS0pIHtcbiAgICByZXN1bHRbZnJvbVJpZ2h0ID8gbGVuZ3RoIDogKytpbmRleF0gPSBzdGFydDtcbiAgICBzdGFydCArPSBzdGVwIHx8IDE7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuaW1wb3J0IERlYnVnIGZyb20gXCJkZWJ1Z1wiO1xuaW1wb3J0IERldmljZSBmcm9tIFwiLi4vZGV2aWNlXCI7XG5pbXBvcnQgeyBlYWNoV2l0aEluZGV4LCBnZXRFbnYgfSBmcm9tIFwiLi4vdXRpbFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBOYW5vS09OVFJPTCBleHRlbmRzIERldmljZSB7XG4gIHN0YXRpYyBnZXQgZGV2aWNlTmFtZSgpIHtcbiAgICByZXR1cm4gXCJuYW5vS09OVFJPTFwiO1xuICB9XG4gIHN0YXRpYyBkZXRlY3QobmFtZSkge1xuICAgIHJldHVybiAvXm5hbm9LT05UUk9MXFxzL2kudGVzdChuYW1lKTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKGlucHV0LCBuYW1lKSB7XG4gICAgc3VwZXIoaW5wdXQsIG5hbWUsIHsgZ2xvYmFsTWlkaUNoYW5uZWw6IHRydWUgfSk7XG4gICAgdGhpcy5kZWJ1ZyA9IERlYnVnKFwia29yZy1uYW5vLWtvbnRyb2w6bmFub0tPTlRST0xcIik7XG4gICAgdGhpcy5kZWJ1ZyhcImNyZWF0ZWRcIik7XG5cbiAgICBpZiAoZ2V0RW52KCkgPT09IFwibm9kZWpzXCIpIHtcbiAgICAgIHRoaXMuaW5wdXQuaWdub3JlVHlwZXMoZmFsc2UsIGZhbHNlLCB0cnVlKTtcbiAgICB9XG4gICAgdGhpcy5zZXRTY2VuZSgxKTtcblxuICAgIHRoaXMub24oXCJtaWRpOm1lc3NhZ2VcIiwgbXNnID0+IHtcbiAgICAgIGlmIChtc2cubGVuZ3RoID09PSAxMSAmJiBtc2dbMF0gPT09IDI0MCAmJiBtc2dbMTBdID09PSAyNDcpIHtcbiAgICAgICAgdGhpcy5zZXRTY2VuZShtc2dbOV0gKyAxKTtcbiAgICAgICAgdGhpcy5lbWl0KFwiYnV0dG9uOnNjZW5lXCIsIG1zZ1s5XSArIDEpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgdGhpcy5idXR0b24oWzE3NiwgNDRdLCBcInJlY1wiKTtcbiAgICB0aGlzLmJ1dHRvbihbMTc2LCA0NV0sIFwicGxheVwiKTtcbiAgICB0aGlzLmJ1dHRvbihbMTc2LCA0Nl0sIFwic3RvcFwiKTtcbiAgICB0aGlzLmJ1dHRvbihbMTc2LCA0N10sIFwicHJldlwiKTtcbiAgICB0aGlzLmJ1dHRvbihbMTc2LCA0OF0sIFwibmV4dFwiKTtcbiAgICB0aGlzLmJ1dHRvbihbMTc2LCA0OV0sIFwibG9vcFwiKTtcbiAgfVxuXG4gIHNldFNjZW5lKHNjZW5lKSB7XG4gICAgdGhpcy5zY2VuZSA9IHNjZW5lO1xuICAgIHN3aXRjaCAoc2NlbmUpIHtcbiAgICAgIGNhc2UgMTpcbiAgICAgICAgZWFjaFdpdGhJbmRleChbLi4ucmFuZ2UoMiwgNyksIDgsIDksIDEyLCAxM10sIChpbmRleCwgY29kZSkgPT4ge1xuICAgICAgICAgIHRoaXMuc2xpZGVyKFsxNzYsIGNvZGVdLCBpbmRleCk7XG4gICAgICAgIH0pO1xuICAgICAgICBlYWNoV2l0aEluZGV4KHJhbmdlKDE0LCAyMyksIChpbmRleCwgY29kZSkgPT4ge1xuICAgICAgICAgIHRoaXMua25vYihbMTc2LCBjb2RlXSwgaW5kZXgpO1xuICAgICAgICB9KTtcbiAgICAgICAgZWFjaFdpdGhJbmRleChyYW5nZSgyMywgMzIpLCAoaW5kZXgsIGNvZGUpID0+IHtcbiAgICAgICAgICB0aGlzLmJ1dHRvbihbMTc2LCBjb2RlXSwgYGE6JHtpbmRleH1gKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGVhY2hXaXRoSW5kZXgocmFuZ2UoMzMsIDQyKSwgKGluZGV4LCBjb2RlKSA9PiB7XG4gICAgICAgICAgdGhpcy5idXR0b24oWzE3NiwgY29kZV0sIGBiOiR7aW5kZXh9YCk7XG4gICAgICAgIH0pO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMjpcbiAgICAgICAgZWFjaFdpdGhJbmRleChbNDIsIDQzLCAuLi5yYW5nZSg1MCwgNTcpXSwgKGluZGV4LCBjb2RlKSA9PiB7XG4gICAgICAgICAgdGhpcy5zbGlkZXIoWzE3NiwgY29kZV0sIGluZGV4KTtcbiAgICAgICAgfSk7XG4gICAgICAgIGVhY2hXaXRoSW5kZXgoWy4uLnJhbmdlKDU3LCA2NCksIDY1LCA2Nl0sIChpbmRleCwgY29kZSkgPT4ge1xuICAgICAgICAgIHRoaXMua25vYihbMTc2LCBjb2RlXSwgaW5kZXgpO1xuICAgICAgICB9KTtcbiAgICAgICAgZWFjaFdpdGhJbmRleChyYW5nZSg2NywgNzYpLCAoaW5kZXgsIGNvZGUpID0+IHtcbiAgICAgICAgICB0aGlzLmJ1dHRvbihbMTc2LCBjb2RlXSwgYGE6JHtpbmRleH1gKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGVhY2hXaXRoSW5kZXgocmFuZ2UoNzYsIDg1KSwgKGluZGV4LCBjb2RlKSA9PiB7XG4gICAgICAgICAgdGhpcy5idXR0b24oWzE3NiwgY29kZV0sIGBiOiR7aW5kZXh9YCk7XG4gICAgICAgIH0pO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMzpcbiAgICAgICAgZWFjaFdpdGhJbmRleChyYW5nZSg4NSwgOTQpLCAoaW5kZXgsIGNvZGUpID0+IHtcbiAgICAgICAgICB0aGlzLnNsaWRlcihbMTc2LCBjb2RlXSwgaW5kZXgpO1xuICAgICAgICB9KTtcbiAgICAgICAgZWFjaFdpdGhJbmRleChbLi4ucmFuZ2UoOTQsIDk4KSwgLi4ucmFuZ2UoMTAyLCAxMDcpXSwgKGluZGV4LCBjb2RlKSA9PiB7XG4gICAgICAgICAgdGhpcy5rbm9iKFsxNzYsIGNvZGVdLCBpbmRleCk7XG4gICAgICAgIH0pO1xuICAgICAgICBlYWNoV2l0aEluZGV4KHJhbmdlKDEwNywgMTE2KSwgKGluZGV4LCBjb2RlKSA9PiB7XG4gICAgICAgICAgdGhpcy5idXR0b24oWzE3NiwgY29kZV0sIGBhOiR7aW5kZXh9YCk7XG4gICAgICAgIH0pO1xuICAgICAgICBlYWNoV2l0aEluZGV4KHJhbmdlKDExNiwgMTI1KSwgKGluZGV4LCBjb2RlKSA9PiB7XG4gICAgICAgICAgdGhpcy5idXR0b24oWzE3NiwgY29kZV0sIGBiOiR7aW5kZXh9YCk7XG4gICAgICAgIH0pO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgNDpcbiAgICAgICAgZWFjaFdpdGhJbmRleChyYW5nZSgxNzYsIDE4NSksIChpbmRleCwgY29kZSkgPT4ge1xuICAgICAgICAgIHRoaXMuc2xpZGVyKFtjb2RlLCA3XSwgaW5kZXgpO1xuICAgICAgICB9KTtcbiAgICAgICAgZWFjaFdpdGhJbmRleChyYW5nZSgxNzYsIDE4NSksIChpbmRleCwgY29kZSkgPT4ge1xuICAgICAgICAgIHRoaXMua25vYihbY29kZSwgMTBdLCBpbmRleCk7XG4gICAgICAgIH0pO1xuICAgICAgICBlYWNoV2l0aEluZGV4KHJhbmdlKDE3NiwgMTg1KSwgKGluZGV4LCBjb2RlKSA9PiB7XG4gICAgICAgICAgdGhpcy5idXR0b24oW2NvZGUsIDE2XSwgYGE6JHtpbmRleH1gKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGVhY2hXaXRoSW5kZXgocmFuZ2UoMTc2LCAxODUpLCAoaW5kZXgsIGNvZGUpID0+IHtcbiAgICAgICAgICB0aGlzLmJ1dHRvbihbY29kZSwgMTddLCBgYjoke2luZGV4fWApO1xuICAgICAgICB9KTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG59XG4iXX0=