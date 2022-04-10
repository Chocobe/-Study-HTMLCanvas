import { BitmapInfoMap } from "./bitmapInfoMap";
import * as types from "./bitmapTypes";

export const playerBitmapInfoMap: BitmapInfoMap = {
  [types.BITMAP_PLAYER_IDLE]: {
    displayText: "Idle 😱",

    row: 0,
    colCount: 7,
    width: 575,
    height: 523,
    staggerFrames: 5,
  },

  [types.BITMAP_PLAYER_JUMP]: {
    displayText: "Jump 🐫",

    row: 1,
    colCount: 7,
    width: 575,
    height: 523,
    staggerFrames: 5,
  },

  [types.BITMAP_PLAYER_FALL]: {
    displayText: "Fall 😁",

    row: 2,
    colCount: 7,
    width: 575,
    height: 523,
    staggerFrames: 5,
  },

  [types.BITMAP_PLAYER_RUN]: {
    displayText: "Run 🤢",

    row: 3,
    colCount: 9,
    width: 575,
    height: 523,
    staggerFrames: 5,
  },

  [types.BITMAP_PLAYER_DIZZY]: {
    displayText: "Dizzy ⚙",

    row: 4,
    colCount: 11,
    width: 575,
    height: 523,
    staggerFrames: 5,
  },

  [types.BITMAP_PLAYER_SIT]: {
    displayText: "Sit 🤔",

    row: 5,
    colCount: 5,
    width: 575,
    height: 523,
    staggerFrames: 5,
  },

  [types.BITMAP_PLAYER_ROLL]: {
    displayText: "Roll 🚀",

    row: 6,
    colCount: 7,
    width: 575,
    height: 523,
    staggerFrames: 5,
  },

  [types.BITMAP_PLAYER_BITE]: {
    displayText: "Bite 👍",

    row: 7,
    colCount: 7,
    width: 575,
    height: 523,
    staggerFrames: 5,
  },

  [types.BITMAP_PLAYER_KO]: {
    displayText: "KO 🧐",

    row: 8,
    colCount: 10,
    width: 575,
    height: 523,
    staggerFrames: 5,
  },

  [types.BITMAP_PLAYER_GET_HIT]: {
    displayText: "Get Hit 🎈",

    row: 9,
    colCount: 4,
    width: 575,
    height: 523,
    staggerFrames: 5,
  },
};