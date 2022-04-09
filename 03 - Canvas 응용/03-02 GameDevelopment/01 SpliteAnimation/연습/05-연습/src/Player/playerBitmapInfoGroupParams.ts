import { BitmapInfoGroupParams } from "@/BitmapInfo/BitmapInfoGroup";
import BitmapInfo from "@/BitmapInfo/BitmapInfo";
import * as types from "./playerBitmapInfoTypes";

const playerBitmapInfoGroupParams: BitmapInfoGroupParams = {
  [types.BITMAP_PLAYER_IDLE]: new BitmapInfo({
    row: 0,
    colCount: 7,
  }),

  [types.BITMAP_PLAYER_JUMP]: new BitmapInfo({
    row: 1,
    colCount: 7,
  }),

  [types.BITMAP_PLAYER_FALL]: new BitmapInfo({
    row: 2,
    colCount: 7,
  }),

  [types.BITMAP_PLAYER_RUN]: new BitmapInfo({
    row: 3,
    colCount: 9,
  }),

  [types.BITMAP_PLAYER_DIZZY]: new BitmapInfo({
    row: 4,
    colCount: 11,
  }),

  [types.BITMAP_PLAYER_SIT]: new BitmapInfo({
    row: 5,
    colCount: 5,
  }),

  [types.BITMAP_PLAYER_ROLL]: new BitmapInfo({
    row: 6,
    colCount: 7,
  }),

  [types.BITMAP_PLAYER_BITE]: new BitmapInfo({
    row: 7,
    colCount: 7,
  }),

  [types.BITMAP_PLAYER_KO]: new BitmapInfo({
    row: 8,
    colCount: 10,
  }),

  [types.BITMAP_PLAYER_GETHIT]: new BitmapInfo({
    row: 9,
    colCount: 4,
  }),
};

export default playerBitmapInfoGroupParams;
