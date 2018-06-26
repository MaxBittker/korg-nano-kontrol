"use strict";

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

import Debug from "debug";
import Device from "../device";
import { eachWithIndex } from "../util";

export default class NanoKONTROL2 extends Device {
  static get deviceName() {
    return "nanoKONTROL2";
  }
  static detect(name) {
    return /^nanoKONTROL2\s/i.test(name);
  }

  constructor(input, name) {
    super(input, name);
    this.debug = Debug("korg-nano-kontrol:nanoKONTROL2");
    this.debug("created");

    eachWithIndex(range(0, 8), (index, code) => {
      this.slider(code, index);
    });

    eachWithIndex(range(16, 24), (index, code) => {
      this.knob(code, index);
    });

    eachWithIndex(range(32, 40), (index, code) => {
      this.button(code, `s:${index}`);
    });

    eachWithIndex(range(48, 56), (index, code) => {
      this.button(code, `m:${index}`);
    });

    eachWithIndex(range(64, 72), (index, code) => {
      this.button(code, `r:${index}`);
    });

    this.button(41, "play");
    this.button(42, "stop");
    this.button(43, "prev");
    this.button(44, "next");
    this.button(45, "rec");
    this.button(46, "cycle");
    this.button(60, "marker:set");
    this.button(61, "marker:prev");
    this.button(62, "marker:next");
    this.button(58, "track:prev");
    this.button(59, "track:next");
  }
}
