"use strict";

var _es6Promise = require("es6-promise");

var _util = require("./util");

var _nanoKONTROL = require("./devices/nanoKONTROL");

var _nanoKONTROL2 = _interopRequireDefault(_nanoKONTROL);

var _nanoKONTROL3 = require("./devices/nanoKONTROL2");

var _nanoKONTROL4 = _interopRequireDefault(_nanoKONTROL3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var debug = require("debug")("korg-nano-kontrol");

var Devices = [_nanoKONTROL2.default, _nanoKONTROL4.default];

module.exports.connect = function (deviceName) {
  switch ((0, _util.getEnv)()) {
    case "browser":
      return connectWebMidi(deviceName);
    case "nodejs":
      return connectNodeMidi(deviceName);
  }
};

function connectWebMidi(deviceName) {
  debug("connectWebMidi(" + deviceName + ")");
  return new _es6Promise.Promise(function (resolve, reject) {
    if (navigator && typeof navigator.requestMIDIAccess !== "function") {
      return reject(new Error("Web MIDI API is not supported"));
    }
    var devices = Devices.filter(function (i) {
      return !deviceName || i.deviceName === deviceName;
    });
    navigator.requestMIDIAccess().then(function (webMidi) {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = webMidi.inputs.values()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var input = _step.value;
          var _iteratorNormalCompletion2 = true;
          var _didIteratorError2 = false;
          var _iteratorError2 = undefined;

          try {
            for (var _iterator2 = devices[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
              var Device = _step2.value;

              if (Device.detect(input.name)) {
                debug("detect " + Device.name);
                return resolve(new Device(input, input.name));
              }
            }
          } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion2 && _iterator2.return) {
                _iterator2.return();
              }
            } finally {
              if (_didIteratorError2) {
                throw _iteratorError2;
              }
            }
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return reject("device not found");
    });
  });
}

function connectNodeMidi(deviceName) {
  var midi = require("midi");
  debug("connectNodeMidi(" + deviceName + ")");
  return new _es6Promise.Promise(function (resolve, reject) {
    var input = new midi.input();
    var devices = Devices.filter(function (device) {
      return !deviceName || device.deviceName === deviceName;
    });

    for (var i = 0; i < input.getPortCount(); i++) {
      var name = input.getPortName(i);
      debug("found device [" + i + "] \"" + name + "\"");

      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = devices[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var Device = _step3.value;

          if (Device.detect(name)) {
            debug("detect \"" + Device.name + "\"");
            debug("openPort " + i);
            input.openPort(i);
            return resolve(new Device(input, name));
          }
        }
      } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion3 && _iterator3.return) {
            _iterator3.return();
          }
        } finally {
          if (_didIteratorError3) {
            throw _iteratorError3;
          }
        }
      }
    }
    return reject("device not found");
  });
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9rb3JnLW5hbm8ta29udHJvbC5lczYiXSwibmFtZXMiOlsiZGVidWciLCJyZXF1aXJlIiwiRGV2aWNlcyIsIm5hbm9LT05UUk9MIiwibmFub0tPTlRST0wyIiwibW9kdWxlIiwiZXhwb3J0cyIsImNvbm5lY3QiLCJkZXZpY2VOYW1lIiwiY29ubmVjdFdlYk1pZGkiLCJjb25uZWN0Tm9kZU1pZGkiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsIm5hdmlnYXRvciIsInJlcXVlc3RNSURJQWNjZXNzIiwiRXJyb3IiLCJkZXZpY2VzIiwiZmlsdGVyIiwiaSIsInRoZW4iLCJ3ZWJNaWRpIiwiaW5wdXRzIiwidmFsdWVzIiwiaW5wdXQiLCJEZXZpY2UiLCJkZXRlY3QiLCJuYW1lIiwibWlkaSIsImRldmljZSIsImdldFBvcnRDb3VudCIsImdldFBvcnROYW1lIiwib3BlblBvcnQiXSwibWFwcGluZ3MiOiJBQUFBOztBQUVBOztBQUdBOztBQUVBOzs7O0FBQ0E7Ozs7OztBQUxBLElBQU1BLFFBQVFDLFFBQVEsT0FBUixFQUFpQixtQkFBakIsQ0FBZDs7QUFPQSxJQUFNQyxVQUFVLENBQ2RDLHFCQURjLEVBRWRDLHFCQUZjLENBQWhCOztBQUtBQyxPQUFPQyxPQUFQLENBQWVDLE9BQWYsR0FBeUIsVUFBU0MsVUFBVCxFQUFvQjtBQUMzQyxVQUFPLG1CQUFQO0FBQ0EsU0FBSyxTQUFMO0FBQ0UsYUFBT0MsZUFBZUQsVUFBZixDQUFQO0FBQ0YsU0FBSyxRQUFMO0FBQ0UsYUFBT0UsZ0JBQWdCRixVQUFoQixDQUFQO0FBSkY7QUFNRCxDQVBEOztBQVNBLFNBQVNDLGNBQVQsQ0FBd0JELFVBQXhCLEVBQW1DO0FBQ2pDUiw0QkFBd0JRLFVBQXhCO0FBQ0EsU0FBTyxJQUFJRyxtQkFBSixDQUFZLFVBQUNDLE9BQUQsRUFBVUMsTUFBVixFQUFxQjtBQUN0QyxRQUFHQyxhQUFhLE9BQU9BLFVBQVVDLGlCQUFqQixLQUF1QyxVQUF2RCxFQUFrRTtBQUNoRSxhQUFPRixPQUFPLElBQUlHLEtBQUosQ0FBVSwrQkFBVixDQUFQLENBQVA7QUFDRDtBQUNELFFBQU1DLFVBQVVmLFFBQVFnQixNQUFSLENBQWUsVUFBQ0MsQ0FBRCxFQUFPO0FBQ3BDLGFBQU8sQ0FBQ1gsVUFBRCxJQUFlVyxFQUFFWCxVQUFGLEtBQWlCQSxVQUF2QztBQUNELEtBRmUsQ0FBaEI7QUFHQU0sY0FBVUMsaUJBQVYsR0FDR0ssSUFESCxDQUNRLG1CQUFXO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQ2YsNkJBQWlCQyxRQUFRQyxNQUFSLENBQWVDLE1BQWYsRUFBakIsOEhBQXlDO0FBQUEsY0FBakNDLEtBQWlDO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQ3ZDLGtDQUFrQlAsT0FBbEIsbUlBQTBCO0FBQUEsa0JBQWxCUSxNQUFrQjs7QUFDeEIsa0JBQUdBLE9BQU9DLE1BQVAsQ0FBY0YsTUFBTUcsSUFBcEIsQ0FBSCxFQUE2QjtBQUMzQjNCLGtDQUFnQnlCLE9BQU9FLElBQXZCO0FBQ0EsdUJBQU9mLFFBQVEsSUFBSWEsTUFBSixDQUFXRCxLQUFYLEVBQWtCQSxNQUFNRyxJQUF4QixDQUFSLENBQVA7QUFDRDtBQUNGO0FBTnNDO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFPeEM7QUFSYztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQVNmLGFBQU9kLE9BQU8sa0JBQVAsQ0FBUDtBQUNELEtBWEg7QUFZRCxHQW5CTSxDQUFQO0FBb0JEOztBQUVELFNBQVNILGVBQVQsQ0FBeUJGLFVBQXpCLEVBQW9DO0FBQ2xDLE1BQU1vQixPQUFPM0IsUUFBUSxNQUFSLENBQWI7QUFDQUQsNkJBQXlCUSxVQUF6QjtBQUNBLFNBQU8sSUFBSUcsbUJBQUosQ0FBWSxVQUFDQyxPQUFELEVBQVVDLE1BQVYsRUFBcUI7QUFDdEMsUUFBTVcsUUFBUSxJQUFJSSxLQUFLSixLQUFULEVBQWQ7QUFDQSxRQUFNUCxVQUFVZixRQUFRZ0IsTUFBUixDQUFlLFVBQVNXLE1BQVQsRUFBZ0I7QUFDN0MsYUFBTyxDQUFDckIsVUFBRCxJQUFlcUIsT0FBT3JCLFVBQVAsS0FBc0JBLFVBQTVDO0FBQ0QsS0FGZSxDQUFoQjs7QUFJQSxTQUFJLElBQUlXLElBQUksQ0FBWixFQUFlQSxJQUFJSyxNQUFNTSxZQUFOLEVBQW5CLEVBQXlDWCxHQUF6QyxFQUE2QztBQUMzQyxVQUFJUSxPQUFPSCxNQUFNTyxXQUFOLENBQWtCWixDQUFsQixDQUFYO0FBQ0FuQiwrQkFBdUJtQixDQUF2QixZQUE4QlEsSUFBOUI7O0FBRjJDO0FBQUE7QUFBQTs7QUFBQTtBQUkzQyw4QkFBa0JWLE9BQWxCLG1JQUEwQjtBQUFBLGNBQWxCUSxNQUFrQjs7QUFDeEIsY0FBR0EsT0FBT0MsTUFBUCxDQUFjQyxJQUFkLENBQUgsRUFBdUI7QUFDckIzQixnQ0FBaUJ5QixPQUFPRSxJQUF4QjtBQUNBM0IsZ0NBQWtCbUIsQ0FBbEI7QUFDQUssa0JBQU1RLFFBQU4sQ0FBZWIsQ0FBZjtBQUNBLG1CQUFPUCxRQUFRLElBQUlhLE1BQUosQ0FBV0QsS0FBWCxFQUFrQkcsSUFBbEIsQ0FBUixDQUFQO0FBQ0Q7QUFDRjtBQVgwQztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBWTVDO0FBQ0QsV0FBT2QsT0FBTyxrQkFBUCxDQUFQO0FBQ0QsR0FwQk0sQ0FBUDtBQXFCRCIsImZpbGUiOiJrb3JnLW5hbm8ta29udHJvbC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQge1Byb21pc2V9IGZyb20gXCJlczYtcHJvbWlzZVwiO1xuY29uc3QgZGVidWcgPSByZXF1aXJlKFwiZGVidWdcIikoXCJrb3JnLW5hbm8ta29udHJvbFwiKTtcblxuaW1wb3J0IHtnZXRFbnZ9IGZyb20gXCIuL3V0aWxcIjtcblxuaW1wb3J0IG5hbm9LT05UUk9MIGZyb20gXCIuL2RldmljZXMvbmFub0tPTlRST0xcIjtcbmltcG9ydCBuYW5vS09OVFJPTDIgZnJvbSBcIi4vZGV2aWNlcy9uYW5vS09OVFJPTDJcIjtcblxuY29uc3QgRGV2aWNlcyA9IFtcbiAgbmFub0tPTlRST0wsXG4gIG5hbm9LT05UUk9MMlxuXTtcblxubW9kdWxlLmV4cG9ydHMuY29ubmVjdCA9IGZ1bmN0aW9uKGRldmljZU5hbWUpe1xuICBzd2l0Y2goZ2V0RW52KCkpe1xuICBjYXNlIFwiYnJvd3NlclwiOlxuICAgIHJldHVybiBjb25uZWN0V2ViTWlkaShkZXZpY2VOYW1lKTtcbiAgY2FzZSBcIm5vZGVqc1wiOlxuICAgIHJldHVybiBjb25uZWN0Tm9kZU1pZGkoZGV2aWNlTmFtZSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gY29ubmVjdFdlYk1pZGkoZGV2aWNlTmFtZSl7XG4gIGRlYnVnKGBjb25uZWN0V2ViTWlkaSgke2RldmljZU5hbWV9KWApO1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIGlmKG5hdmlnYXRvciAmJiB0eXBlb2YgbmF2aWdhdG9yLnJlcXVlc3RNSURJQWNjZXNzICE9PSBcImZ1bmN0aW9uXCIpe1xuICAgICAgcmV0dXJuIHJlamVjdChuZXcgRXJyb3IoXCJXZWIgTUlESSBBUEkgaXMgbm90IHN1cHBvcnRlZFwiKSk7XG4gICAgfVxuICAgIGNvbnN0IGRldmljZXMgPSBEZXZpY2VzLmZpbHRlcigoaSkgPT4ge1xuICAgICAgcmV0dXJuICFkZXZpY2VOYW1lIHx8IGkuZGV2aWNlTmFtZSA9PT0gZGV2aWNlTmFtZTtcbiAgICB9KTtcbiAgICBuYXZpZ2F0b3IucmVxdWVzdE1JRElBY2Nlc3MoKVxuICAgICAgLnRoZW4od2ViTWlkaSA9PiB7XG4gICAgICAgIGZvcihsZXQgaW5wdXQgb2Ygd2ViTWlkaS5pbnB1dHMudmFsdWVzKCkpe1xuICAgICAgICAgIGZvcihsZXQgRGV2aWNlIG9mIGRldmljZXMpe1xuICAgICAgICAgICAgaWYoRGV2aWNlLmRldGVjdChpbnB1dC5uYW1lKSl7XG4gICAgICAgICAgICAgIGRlYnVnKGBkZXRlY3QgJHtEZXZpY2UubmFtZX1gKTtcbiAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUobmV3IERldmljZShpbnB1dCwgaW5wdXQubmFtZSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVqZWN0KFwiZGV2aWNlIG5vdCBmb3VuZFwiKTtcbiAgICAgIH0pO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gY29ubmVjdE5vZGVNaWRpKGRldmljZU5hbWUpe1xuICBjb25zdCBtaWRpID0gcmVxdWlyZShcIm1pZGlcIik7XG4gIGRlYnVnKGBjb25uZWN0Tm9kZU1pZGkoJHtkZXZpY2VOYW1lfSlgKTtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICBjb25zdCBpbnB1dCA9IG5ldyBtaWRpLmlucHV0KCk7XG4gICAgY29uc3QgZGV2aWNlcyA9IERldmljZXMuZmlsdGVyKGZ1bmN0aW9uKGRldmljZSl7XG4gICAgICByZXR1cm4gIWRldmljZU5hbWUgfHwgZGV2aWNlLmRldmljZU5hbWUgPT09IGRldmljZU5hbWU7XG4gICAgfSk7XG5cbiAgICBmb3IobGV0IGkgPSAwOyBpIDwgaW5wdXQuZ2V0UG9ydENvdW50KCk7IGkrKyl7XG4gICAgICBsZXQgbmFtZSA9IGlucHV0LmdldFBvcnROYW1lKGkpO1xuICAgICAgZGVidWcoYGZvdW5kIGRldmljZSBbJHtpfV0gXCIke25hbWV9XCJgKTtcblxuICAgICAgZm9yKGxldCBEZXZpY2Ugb2YgZGV2aWNlcyl7XG4gICAgICAgIGlmKERldmljZS5kZXRlY3QobmFtZSkpe1xuICAgICAgICAgIGRlYnVnKGBkZXRlY3QgXCIke0RldmljZS5uYW1lfVwiYCk7XG4gICAgICAgICAgZGVidWcoYG9wZW5Qb3J0ICR7aX1gKTtcbiAgICAgICAgICBpbnB1dC5vcGVuUG9ydChpKTtcbiAgICAgICAgICByZXR1cm4gcmVzb2x2ZShuZXcgRGV2aWNlKGlucHV0LCBuYW1lKSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJlamVjdChcImRldmljZSBub3QgZm91bmRcIik7XG4gIH0pO1xufVxuIl19