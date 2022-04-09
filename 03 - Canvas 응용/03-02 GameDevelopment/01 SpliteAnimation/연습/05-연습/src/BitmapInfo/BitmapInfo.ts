export type BitmapInfoParams = {
  row: number;
  colCount: number;

  width?: number;
  height?: number;
  staggerFrames?: number;
};

export default class BitmapInfo {
  row!: number;
  colCount!: number;

  width!: number;
  height!: number;
  staggerFrames!: number;

  constructor({
    row,
    colCount,

    width = 575,
    height = 523,
    staggerFrames = 5,
  }: BitmapInfoParams) {
    this.row = row;
    this.colCount = colCount;

    this.width = width;
    this.height = height;
    this.staggerFrames = staggerFrames;
  }
}
