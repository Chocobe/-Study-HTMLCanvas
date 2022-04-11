import { BitmapInfoMap } from "@/bitmapInfoMap/bitmapInfoMap";
import * as states from "@/bitmapInfoMap/bitmapStates";

export const playerBitmapInfoMap: BitmapInfoMap = {
  [states.BITMAP_PLAYER_IDLE]: {
    displayText: "대기중 🚀",

    row: 0,
    numOfCols: 7,
    staggerFrames: 5,

    width: 575,
    height: 523,
  },

  [states.BITMAP_PLAYER_JUMP]: {
    displayText: "점프 🎈",

    row: 1,
    numOfCols: 7,
    staggerFrames: 5,

    width: 575,
    height: 523,
  },

  [states.BITMAP_PLAYER_FALL]: {
    displayText: "낙하중 🧐",

    row: 2,
    numOfCols: 7,
    staggerFrames: 5,

    width: 575,
    height: 523,
  },

  [states.BITMAP_PLAYER_RUN]: {
    displayText: "뛰는중 👍",

    row: 3,
    numOfCols: 9,
    staggerFrames: 5,

    width: 575,
    height: 523,
  },

  [states.BITMAP_PLAYER_DIZZY]: {
    displayText: "헤롱~ 🤔",

    row: 4,
    numOfCols: 11,
    staggerFrames: 5,

    width: 575,
    height: 523,
  },

  [states.BITMAP_PLAYER_SIT]: {
    displayText: "앉음 ⚙",

    row: 5,
    numOfCols: 5,
    staggerFrames: 5,

    width: 575,
    height: 523,
  },

  [states.BITMAP_PLAYER_ROLL]: {
    displayText: "구른다 🤢",

    row: 6,
    numOfCols: 7,
    staggerFrames: 5,

    width: 575,
    height: 523,
  },

  [states.BITMAP_PLAYER]: {
    displayText: "일어남 😁",

    row: 7,
    numOfCols: 7,
    staggerFrames: 5,

    width: 575,
    height: 523,
  },

  [states.BITMAP_PLAYER_KO]: {
    displayText: "KO 🐫",

    row: 8,
    numOfCols: 10,
    staggerFrames: 5,

    width: 575,
    height: 523,
  },

  [states.BITMAP_PLAYER_GET_HIT]: {
    displayText: "아픔 😱",

    row: 9,
    numOfCols: 4,
    staggerFrames: 5,

    width: 575,
    height: 523,
  },
};