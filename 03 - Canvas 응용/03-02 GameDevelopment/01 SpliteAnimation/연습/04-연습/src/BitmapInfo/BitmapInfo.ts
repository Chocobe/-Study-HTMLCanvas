export interface BitmapInfoParams {
  name: string;
  row: number;
  numOfColumn: number;
  width?: number;
  height?: number;
  staggerFrames?: number;
}

export default class BitmapInfo {
  name!: string;
  row!: number;
  numOfColumn!: number;
  width!: number;
  height!: number;
  staggerFrames!: number;

  constructor({
    name,
    row,
    numOfColumn,
    width = 575,
    height = 523,
    staggerFrames = 5,
  }: BitmapInfoParams) {
    this.name = name;
    this.row = row;
    this.numOfColumn = numOfColumn;
    this.width = width;
    this.height = height;
    this.staggerFrames = staggerFrames;
  }
}