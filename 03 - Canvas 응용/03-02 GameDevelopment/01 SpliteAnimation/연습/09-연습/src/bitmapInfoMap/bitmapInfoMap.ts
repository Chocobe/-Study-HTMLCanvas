export type BitmapInfo = {
  displayText: string;

  row: number;
  numOfCols: number;
  staggerFrames: number;

  width: number;
  height: number;
};

export type BitmapInfoMap = {
  [state: string]: BitmapInfo;
};