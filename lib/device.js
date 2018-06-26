"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _eventemitter = require("eventemitter2");

var _util = require("./util");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Device = function (_EventEmitter) {
  _inherits(Device, _EventEmitter);

  function Device(input, name) {
    var opts = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : { globalMidiChannel: false };

    _classCallCheck(this, Device);

    var _this = _possibleConstructorReturn(this, (Device.__proto__ || Object.getPrototypeOf(Device)).call(this, {
      wildcard: true,
      delimiter: ":"
    }));

    _this.input = input;
    _this.name = name;
    _this.opts = opts;

    _this.codes = {};
    _this.default = {
      type: "analog"
    };

    switch ((0, _util.getEnv)()) {
      case "browser":
        _this.input.onmidimessage = function (msg) {
          _this.emit("midi:message", Array.prototype.slice.call(msg.data));
        };
        break;
      case "nodejs":
        _this.input.on("message", function (deltaTime, msg) {
          _this.emit("midi:message", msg);
        });
        break;
    }

    _this.on("midi:message", function (msg) {
      _this.debug(msg);
      var e = _this.codes[opts.globalMidiChannel ? msg[0] + "," + msg[1] : msg[1]];
      if (!e) {
        return;
      }
      if (e.type === "digital") {
        _this.emit(e.name, msg[2] > 0);
      } else {
        _this.emit(e.name, msg[2]);
      }
    });
    return _this;
  }

  _createClass(Device, [{
    key: "close",
    value: function close() {
      this.debug("closePort");
      this.input.closePort();
    }
  }, {
    key: "register",
    value: function register(code, opts) {
      var _this2 = this;

      Object.keys(this.default).forEach(function (key) {
        if (!opts.hasOwnProperty(key)) {
          opts[key] = _this2.default[key];
        }
      });
      if (code instanceof Array) {
        code = code.join(",");
      }
      this.codes[code] = opts;
    }
  }, {
    key: "button",
    value: function button(code, name) {
      var opts = {
        name: "button:" + name,
        type: "digital"
      };
      this.register(code, opts);
    }
  }, {
    key: "knob",
    value: function knob(code, name) {
      var opts = { name: "knob:" + name };
      this.register(code, opts);
    }
  }, {
    key: "slider",
    value: function slider(code, name) {
      var opts = { name: "slider:" + name };
      this.register(code, opts);
    }
  }]);

  return Device;
}(_eventemitter.EventEmitter2);

exports.default = Device;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9kZXZpY2UuZXM2Il0sIm5hbWVzIjpbIkRldmljZSIsImlucHV0IiwibmFtZSIsIm9wdHMiLCJnbG9iYWxNaWRpQ2hhbm5lbCIsIndpbGRjYXJkIiwiZGVsaW1pdGVyIiwiY29kZXMiLCJkZWZhdWx0IiwidHlwZSIsIm9ubWlkaW1lc3NhZ2UiLCJtc2ciLCJlbWl0IiwiQXJyYXkiLCJwcm90b3R5cGUiLCJzbGljZSIsImNhbGwiLCJkYXRhIiwib24iLCJkZWx0YVRpbWUiLCJkZWJ1ZyIsImUiLCJjbG9zZVBvcnQiLCJjb2RlIiwiT2JqZWN0Iiwia2V5cyIsImZvckVhY2giLCJoYXNPd25Qcm9wZXJ0eSIsImtleSIsImpvaW4iLCJyZWdpc3RlciIsIkV2ZW50RW1pdHRlcjIiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7OztBQUVBOztBQUNBOzs7Ozs7OztJQUVxQkEsTTs7O0FBRW5CLGtCQUFZQyxLQUFaLEVBQW1CQyxJQUFuQixFQUEyRDtBQUFBLFFBQWxDQyxJQUFrQyx1RUFBM0IsRUFBQ0MsbUJBQW1CLEtBQXBCLEVBQTJCOztBQUFBOztBQUFBLGdIQUNuRDtBQUNKQyxnQkFBVSxJQUROO0FBRUpDLGlCQUFXO0FBRlAsS0FEbUQ7O0FBS3pELFVBQUtMLEtBQUwsR0FBYUEsS0FBYjtBQUNBLFVBQUtDLElBQUwsR0FBWUEsSUFBWjtBQUNBLFVBQUtDLElBQUwsR0FBWUEsSUFBWjs7QUFFQSxVQUFLSSxLQUFMLEdBQWEsRUFBYjtBQUNBLFVBQUtDLE9BQUwsR0FBZTtBQUNiQyxZQUFNO0FBRE8sS0FBZjs7QUFJQSxZQUFPLG1CQUFQO0FBQ0EsV0FBSyxTQUFMO0FBQ0UsY0FBS1IsS0FBTCxDQUFXUyxhQUFYLEdBQTJCLFVBQUNDLEdBQUQsRUFBUztBQUNsQyxnQkFBS0MsSUFBTCxDQUFVLGNBQVYsRUFBMEJDLE1BQU1DLFNBQU4sQ0FBZ0JDLEtBQWhCLENBQXNCQyxJQUF0QixDQUEyQkwsSUFBSU0sSUFBL0IsQ0FBMUI7QUFDRCxTQUZEO0FBR0E7QUFDRixXQUFLLFFBQUw7QUFDRSxjQUFLaEIsS0FBTCxDQUFXaUIsRUFBWCxDQUFjLFNBQWQsRUFBeUIsVUFBQ0MsU0FBRCxFQUFZUixHQUFaLEVBQW9CO0FBQzNDLGdCQUFLQyxJQUFMLENBQVUsY0FBVixFQUEwQkQsR0FBMUI7QUFDRCxTQUZEO0FBR0E7QUFWRjs7QUFhQSxVQUFLTyxFQUFMLENBQVEsY0FBUixFQUF3QixVQUFDUCxHQUFELEVBQVM7QUFDL0IsWUFBS1MsS0FBTCxDQUFXVCxHQUFYO0FBQ0EsVUFBTVUsSUFBSSxNQUFLZCxLQUFMLENBQVdKLEtBQUtDLGlCQUFMLEdBQTRCTyxJQUFJLENBQUosQ0FBNUIsU0FBc0NBLElBQUksQ0FBSixDQUF0QyxHQUFpREEsSUFBSSxDQUFKLENBQTVELENBQVY7QUFDQSxVQUFHLENBQUNVLENBQUosRUFBTTtBQUFFO0FBQVM7QUFDakIsVUFBR0EsRUFBRVosSUFBRixLQUFXLFNBQWQsRUFBd0I7QUFDdEIsY0FBS0csSUFBTCxDQUFVUyxFQUFFbkIsSUFBWixFQUFrQlMsSUFBSSxDQUFKLElBQVMsQ0FBM0I7QUFDRCxPQUZELE1BR0k7QUFDRixjQUFLQyxJQUFMLENBQVVTLEVBQUVuQixJQUFaLEVBQWtCUyxJQUFJLENBQUosQ0FBbEI7QUFDRDtBQUNGLEtBVkQ7QUEzQnlEO0FBc0MxRDs7Ozs0QkFFTTtBQUNMLFdBQUtTLEtBQUwsQ0FBVyxXQUFYO0FBQ0EsV0FBS25CLEtBQUwsQ0FBV3FCLFNBQVg7QUFDRDs7OzZCQUVRQyxJLEVBQU1wQixJLEVBQUs7QUFBQTs7QUFDbEJxQixhQUFPQyxJQUFQLENBQVksS0FBS2pCLE9BQWpCLEVBQTBCa0IsT0FBMUIsQ0FBa0MsZUFBTztBQUN2QyxZQUFHLENBQUN2QixLQUFLd0IsY0FBTCxDQUFvQkMsR0FBcEIsQ0FBSixFQUE2QjtBQUMzQnpCLGVBQUt5QixHQUFMLElBQVksT0FBS3BCLE9BQUwsQ0FBYW9CLEdBQWIsQ0FBWjtBQUNEO0FBQ0YsT0FKRDtBQUtBLFVBQUdMLGdCQUFnQlYsS0FBbkIsRUFBeUI7QUFDdkJVLGVBQU9BLEtBQUtNLElBQUwsQ0FBVSxHQUFWLENBQVA7QUFDRDtBQUNELFdBQUt0QixLQUFMLENBQVdnQixJQUFYLElBQW1CcEIsSUFBbkI7QUFDRDs7OzJCQUVNb0IsSSxFQUFNckIsSSxFQUFLO0FBQ2hCLFVBQU1DLE9BQU87QUFDWEQsMEJBQWdCQSxJQURMO0FBRVhPLGNBQU07QUFGSyxPQUFiO0FBSUEsV0FBS3FCLFFBQUwsQ0FBY1AsSUFBZCxFQUFvQnBCLElBQXBCO0FBQ0Q7Ozt5QkFFSW9CLEksRUFBTXJCLEksRUFBSztBQUNkLFVBQU1DLE9BQU8sRUFBQ0QsZ0JBQWNBLElBQWYsRUFBYjtBQUNBLFdBQUs0QixRQUFMLENBQWNQLElBQWQsRUFBb0JwQixJQUFwQjtBQUNEOzs7MkJBRU1vQixJLEVBQU1yQixJLEVBQUs7QUFDaEIsVUFBTUMsT0FBTyxFQUFDRCxrQkFBZ0JBLElBQWpCLEVBQWI7QUFDQSxXQUFLNEIsUUFBTCxDQUFjUCxJQUFkLEVBQW9CcEIsSUFBcEI7QUFDRDs7OztFQTNFaUM0QiwyQjs7a0JBQWYvQixNIiwiZmlsZSI6ImRldmljZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQge0V2ZW50RW1pdHRlcjJ9IGZyb20gXCJldmVudGVtaXR0ZXIyXCI7XG5pbXBvcnQge2dldEVudn0gZnJvbSBcIi4vdXRpbFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEZXZpY2UgZXh0ZW5kcyBFdmVudEVtaXR0ZXIyIHtcblxuICBjb25zdHJ1Y3RvcihpbnB1dCwgbmFtZSwgb3B0cyA9IHtnbG9iYWxNaWRpQ2hhbm5lbDogZmFsc2V9KXtcbiAgICBzdXBlcih7XG4gICAgICB3aWxkY2FyZDogdHJ1ZSxcbiAgICAgIGRlbGltaXRlcjogXCI6XCJcbiAgICB9KTtcbiAgICB0aGlzLmlucHV0ID0gaW5wdXQ7XG4gICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICB0aGlzLm9wdHMgPSBvcHRzO1xuXG4gICAgdGhpcy5jb2RlcyA9IHt9O1xuICAgIHRoaXMuZGVmYXVsdCA9IHtcbiAgICAgIHR5cGU6IFwiYW5hbG9nXCJcbiAgICB9O1xuXG4gICAgc3dpdGNoKGdldEVudigpKXtcbiAgICBjYXNlIFwiYnJvd3NlclwiOlxuICAgICAgdGhpcy5pbnB1dC5vbm1pZGltZXNzYWdlID0gKG1zZykgPT4ge1xuICAgICAgICB0aGlzLmVtaXQoXCJtaWRpOm1lc3NhZ2VcIiwgQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwobXNnLmRhdGEpKTtcbiAgICAgIH07XG4gICAgICBicmVhaztcbiAgICBjYXNlIFwibm9kZWpzXCI6XG4gICAgICB0aGlzLmlucHV0Lm9uKFwibWVzc2FnZVwiLCAoZGVsdGFUaW1lLCBtc2cpID0+IHtcbiAgICAgICAgdGhpcy5lbWl0KFwibWlkaTptZXNzYWdlXCIsIG1zZyk7XG4gICAgICB9KTtcbiAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIHRoaXMub24oXCJtaWRpOm1lc3NhZ2VcIiwgKG1zZykgPT4ge1xuICAgICAgdGhpcy5kZWJ1Zyhtc2cpO1xuICAgICAgY29uc3QgZSA9IHRoaXMuY29kZXNbb3B0cy5nbG9iYWxNaWRpQ2hhbm5lbCA/IGAke21zZ1swXX0sJHttc2dbMV19YCA6IG1zZ1sxXV07XG4gICAgICBpZighZSl7IHJldHVybjsgfVxuICAgICAgaWYoZS50eXBlID09PSBcImRpZ2l0YWxcIil7XG4gICAgICAgIHRoaXMuZW1pdChlLm5hbWUsIG1zZ1syXSA+IDApO1xuICAgICAgfVxuICAgICAgZWxzZXtcbiAgICAgICAgdGhpcy5lbWl0KGUubmFtZSwgbXNnWzJdKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGNsb3NlKCl7XG4gICAgdGhpcy5kZWJ1ZyhcImNsb3NlUG9ydFwiKTtcbiAgICB0aGlzLmlucHV0LmNsb3NlUG9ydCgpO1xuICB9XG5cbiAgcmVnaXN0ZXIoY29kZSwgb3B0cyl7XG4gICAgT2JqZWN0LmtleXModGhpcy5kZWZhdWx0KS5mb3JFYWNoKGtleSA9PiB7XG4gICAgICBpZighb3B0cy5oYXNPd25Qcm9wZXJ0eShrZXkpKXtcbiAgICAgICAgb3B0c1trZXldID0gdGhpcy5kZWZhdWx0W2tleV07XG4gICAgICB9XG4gICAgfSk7XG4gICAgaWYoY29kZSBpbnN0YW5jZW9mIEFycmF5KXtcbiAgICAgIGNvZGUgPSBjb2RlLmpvaW4oXCIsXCIpO1xuICAgIH1cbiAgICB0aGlzLmNvZGVzW2NvZGVdID0gb3B0cztcbiAgfVxuXG4gIGJ1dHRvbihjb2RlLCBuYW1lKXtcbiAgICBjb25zdCBvcHRzID0ge1xuICAgICAgbmFtZTogYGJ1dHRvbjoke25hbWV9YCxcbiAgICAgIHR5cGU6IFwiZGlnaXRhbFwiXG4gICAgfTtcbiAgICB0aGlzLnJlZ2lzdGVyKGNvZGUsIG9wdHMpO1xuICB9XG5cbiAga25vYihjb2RlLCBuYW1lKXtcbiAgICBjb25zdCBvcHRzID0ge25hbWU6IGBrbm9iOiR7bmFtZX1gfTtcbiAgICB0aGlzLnJlZ2lzdGVyKGNvZGUsIG9wdHMpO1xuICB9XG5cbiAgc2xpZGVyKGNvZGUsIG5hbWUpe1xuICAgIGNvbnN0IG9wdHMgPSB7bmFtZTogYHNsaWRlcjoke25hbWV9YH07XG4gICAgdGhpcy5yZWdpc3Rlcihjb2RlLCBvcHRzKTtcbiAgfVxufVxuIl19