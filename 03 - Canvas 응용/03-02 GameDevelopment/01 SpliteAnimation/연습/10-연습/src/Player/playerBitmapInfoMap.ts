import {
  BitmapInfo,
  BitmapInfoMap,
} from "@/BitmapInfoMap/BitmapInfo";

export enum PlayerState {
  "WALKING-01" = "walking-01",
  "STATE-01" = "state-01",
  "FAT-01" = "fat-01",
  "FAT-02" = "fat-02",
  "WALKING-02" = "walking-02",
  "IDLE" = "idle",
};

const playerBitmapInfoMap: BitmapInfoMap = {
  [PlayerState["WALKING-01"]]: {
    displayValue: "걷기-01",
    posY: 0,
    colCount: 10,
    width: 29,
    height: 28,
    staggerFrames: 10,
  },

  [PlayerState["STATE-01"]]: {
    displayValue: "상태 01",
    posY: 29,
    colCount: 10,
    width: 30,
    height: 26,
    staggerFrames: 10,
  },

  [PlayerState["FAT-01"]]: {
    displayValue: "뚱뚱이 01",
    posY: 246,
    colCount: 6,
    width: 32,
    height: 30,
    staggerFrames: 5,
  },

  [PlayerState["FAT-02"]]: {
    displayValue: "뚱뚱이 02",
    posY: 281,
    colCount: 4,
    width: 32,
    height: 30,
    staggerFrames: 5,
  },

  [PlayerState["WALKING-02"]]: {
    displayValue: "걷기-02",
    posY: 389,
    colCount: 10,
    width: 24,
    height: 25,
    staggerFrames: 5,
  },

  [PlayerState["IDLE"]]: {
    displayValue: "대기",
    posY: 602,
    colCount: 3,
    width: 29,
    height: 28,
    staggerFrames: 10,
  },
};

export default playerBitmapInfoMap;