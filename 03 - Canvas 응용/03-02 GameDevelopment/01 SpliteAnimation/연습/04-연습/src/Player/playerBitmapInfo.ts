import BitmapInfo, { BitmapInfoParams } from "@/BitmapInfo/BitmapInfo";

const bitmapInfoList: BitmapInfoParams[] = [
  {
    name: "idle",
    row: 0,
    numOfColumn: 7,
  },
  {
    name: "jump",
    row: 1,
    numOfColumn: 7,
  },
  {
    name: "fall",
    row: 2,
    numOfColumn: 7,
  },
  {
    name: "run",
    row: 3,
    numOfColumn: 9,
  },
  {
    name: "dizzy",
    row: 4,
    numOfColumn: 11,
  },
  {
    name: "sit",
    row: 5,
    numOfColumn: 5,
  },
  {
    name: "roll",
    row: 6,
    numOfColumn: 7,
  },
  {
    name: "bite",
    row: 7,
    numOfColumn: 7,
  },
  {
    name: "ko",
    row: 8,
    numOfColumn: 10,
  },
  {
    name: "gethit",
    row: 9,
    numOfColumn: 4,
  },
];

export default class PlayerBitmapInfoFactory {
  static create() {
    return bitmapInfoList.map(info => {
      return new BitmapInfo(info);
    });
  }
}