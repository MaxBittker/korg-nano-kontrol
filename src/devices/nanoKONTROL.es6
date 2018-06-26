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
import { eachWithIndex, getEnv } from "../util";

export default class NanoKONTROL extends Device {
  static get deviceName() {
    return "nanoKONTROL";
  }
  static detect(name) {
    return /^nanoKONTROL\s/i.test(name);
  }

  constructor(input, name) {
    super(input, name, { globalMidiChannel: true });
    this.debug = Debug("korg-nano-kontrol:nanoKONTROL");
    this.debug("created");

    if (getEnv() === "nodejs") {
      this.input.ignoreTypes(false, false, true);
    }
    this.setScene(1);

    this.on("midi:message", msg => {
      if (msg.length === 11 && msg[0] === 240 && msg[10] === 247) {
        this.setScene(msg[9] + 1);
        this.emit("button:scene", msg[9] + 1);
      }
    });

    this.button([176, 44], "rec");
    this.button([176, 45], "play");
    this.button([176, 46], "stop");
    this.button([176, 47], "prev");
    this.button([176, 48], "next");
    this.button([176, 49], "loop");
  }

  setScene(scene) {
    this.scene = scene;
    switch (scene) {
      case 1:
        eachWithIndex([...range(2, 7), 8, 9, 12, 13], (index, code) => {
          this.slider([176, code], index);
        });
        eachWithIndex(range(14, 23), (index, code) => {
          this.knob([176, code], index);
        });
        eachWithIndex(range(23, 32), (index, code) => {
          this.button([176, code], `a:${index}`);
        });
        eachWithIndex(range(33, 42), (index, code) => {
          this.button([176, code], `b:${index}`);
        });
        break;
      case 2:
        eachWithIndex([42, 43, ...range(50, 57)], (index, code) => {
          this.slider([176, code], index);
        });
        eachWithIndex([...range(57, 64), 65, 66], (index, code) => {
          this.knob([176, code], index);
        });
        eachWithIndex(range(67, 76), (index, code) => {
          this.button([176, code], `a:${index}`);
        });
        eachWithIndex(range(76, 85), (index, code) => {
          this.button([176, code], `b:${index}`);
        });
        break;
      case 3:
        eachWithIndex(range(85, 94), (index, code) => {
          this.slider([176, code], index);
        });
        eachWithIndex([...range(94, 98), ...range(102, 107)], (index, code) => {
          this.knob([176, code], index);
        });
        eachWithIndex(range(107, 116), (index, code) => {
          this.button([176, code], `a:${index}`);
        });
        eachWithIndex(range(116, 125), (index, code) => {
          this.button([176, code], `b:${index}`);
        });
        break;
      case 4:
        eachWithIndex(range(176, 185), (index, code) => {
          this.slider([code, 7], index);
        });
        eachWithIndex(range(176, 185), (index, code) => {
          this.knob([code, 10], index);
        });
        eachWithIndex(range(176, 185), (index, code) => {
          this.button([code, 16], `a:${index}`);
        });
        eachWithIndex(range(176, 185), (index, code) => {
          this.button([code, 17], `b:${index}`);
        });
        break;
    }
  }
}
