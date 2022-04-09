import BitmapInfoGroup, {
  BitmapInfo,
} from "@/BitmapInfoGroup/BitmapInfo";

import * as types from "@/BitmapInfoGroup/bitmapTypes";

export default new BitmapInfoGroup({
  [types.extractPlayerStateKey(
    types.BITMAP_PLAYER_IDLE
  )]: {
    row: 0,
    colCount: 7,
    width: 575,
    height: 523,
    staggerFrames: 5,
  },

  [types.extractPlayerStateKey(
    types.BITMAP_PLAYER_JUMP
  )]: {
    row: 1,
    colCount: 7,
    width: 575,
    height: 523,
    staggerFrames: 5,
  },

  [types.extractPlayerStateKey(
    types.BITMAP_PLAYER_FALL
  )]: {
    row: 2,
    colCount: 7,
    width: 575,
    height: 523,
    staggerFrames: 5,
  },

  [types.extractPlayerStateKey(
    types.BITMAP_PLAYER_RUN
  )]: {
    row: 3,
    colCount: 9,
    width: 575,
    height: 523,
    staggerFrames: 5,
  },

  [types.extractPlayerStateKey(
    types.BITMAP_PLAYER_DIZZY
  )]: {
    row: 4,
    colCount: 11,
    width: 575,
    height: 523,
    staggerFrames: 5,
  },

  [types.extractPlayerStateKey(
    types.BITMAP_PLAYER_SIT
  )]: {
    row: 5,
    colCount: 5,
    width: 575,
    height: 523,
    staggerFrames: 5,
  },

  [types.extractPlayerStateKey(
    types.BITMAP_PLAYER_ROLL
  )]: {
    row: 6,
    colCount: 7,
    width: 575,
    height: 523,
    staggerFrames: 5,
  },

  [types.extractPlayerStateKey(
    types.BITMPA_PLAYER_BITE
  )]: {
    row: 7,
    colCount: 7,
    width: 575,
    height: 523,
    staggerFrames: 5,
  },

  [types.extractPlayerStateKey(
    types.BITMAP_PLAYER_KO
  )]: {
    row: 8,
    colCount: 10,
    width: 575,
    height: 523,
    staggerFrames: 5,
  },

  [types.extractPlayerStateKey(
    types.BITMAP_PLAYER_GET_HIT
  )]: {
    row: 9,
    colCount: 4,
    width: 575,
    height: 523,
    staggerFrames: 5,
  },
});