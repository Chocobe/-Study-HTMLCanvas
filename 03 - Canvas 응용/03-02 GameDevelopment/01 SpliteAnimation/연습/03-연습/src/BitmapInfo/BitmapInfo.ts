export interface BitmapInfoParams {
  name: string;
  row: number;
  colCount: number;
  width?: number;
  height?: number;
  staggerFrame?: number;
}

export default class BitmapInfo {
  name!: string;
  
  row!: number;
  colCount!: number;

  width!: number;
  height!: number;

  staggerFrame!: number;

  constructor({
    name,
    row,
    colCount,
    width = 575,
    height = 523,
    staggerFrame = 5,
  }: BitmapInfoParams) {
    this.name = name;
    this.row = row;
    this.colCount = colCount;
    this.width = width;
    this.height = height;
    this.staggerFrame = staggerFrame;
  }
}
