import { BitmapInfoMap } from "@/bitmapInfoMap/bitmapInfoMap";
import * as states from "@/bitmapInfoMap/bitmapStates";

export const playerBitmapInfoMap: BitmapInfoMap = {
  [states.BITMAP_PLAYER_IDLE]: {
    displayText: "λκΈ°μ€ π",

    row: 0,
    numOfCols: 7,
    staggerFrames: 5,

    width: 575,
    height: 523,
  },

  [states.BITMAP_PLAYER_JUMP]: {
    displayText: "μ ν π",

    row: 1,
    numOfCols: 7,
    staggerFrames: 5,

    width: 575,
    height: 523,
  },

  [states.BITMAP_PLAYER_FALL]: {
    displayText: "λνμ€ π§",

    row: 2,
    numOfCols: 7,
    staggerFrames: 5,

    width: 575,
    height: 523,
  },

  [states.BITMAP_PLAYER_RUN]: {
    displayText: "λ°λμ€ π",

    row: 3,
    numOfCols: 9,
    staggerFrames: 5,

    width: 575,
    height: 523,
  },

  [states.BITMAP_PLAYER_DIZZY]: {
    displayText: "ν€λ‘±~ π€",

    row: 4,
    numOfCols: 11,
    staggerFrames: 5,

    width: 575,
    height: 523,
  },

  [states.BITMAP_PLAYER_SIT]: {
    displayText: "μμ β",

    row: 5,
    numOfCols: 5,
    staggerFrames: 5,

    width: 575,
    height: 523,
  },

  [states.BITMAP_PLAYER_ROLL]: {
    displayText: "κ΅¬λ₯Έλ€ π€’",

    row: 6,
    numOfCols: 7,
    staggerFrames: 5,

    width: 575,
    height: 523,
  },

  [states.BITMAP_PLAYER]: {
    displayText: "μΌμ΄λ¨ π",

    row: 7,
    numOfCols: 7,
    staggerFrames: 5,

    width: 575,
    height: 523,
  },

  [states.BITMAP_PLAYER_KO]: {
    displayText: "KO π«",

    row: 8,
    numOfCols: 10,
    staggerFrames: 5,

    width: 575,
    height: 523,
  },

  [states.BITMAP_PLAYER_GET_HIT]: {
    displayText: "μν π±",

    row: 9,
    numOfCols: 4,
    staggerFrames: 5,

    width: 575,
    height: 523,
  },
};