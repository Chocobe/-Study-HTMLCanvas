import { BitmapInfoParams } from "@/BitmapInfo/BitmapInfo";

export default [
  {
    name: "idle",
    row: 0,
    colCount: 7,
    staggerFrame: 2,
  },
  {
    name: "jump",
    row: 1,
    colCount: 7,
  },
  {
    name: "fall",
    row: 2,
    colCount: 7,
  },
  {
    name: "run",
    row: 3,
    colCount: 9,
  },
  {
    name: "dizzy",
    row: 4,
    colCount: 11,
  },
  {
    name: "sit",
    row: 5,
    colCount: 5,
  },
  {
    name: "roll",
    row: 6,
    colCount: 7,
  },
  {
    name: "bite",
    row: 7,
    colCount: 7,
  },
  {
    name: "ko",
    row: 8,
    colCount: 12,
    staggerFrame: 10,
  },
  {
    name: "gethit",
    row: 9,
    colCount: 4,
    staggerFrame: 10,
  },
] as BitmapInfoParams[];