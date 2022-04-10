export type BitmapInfo = {
  displayText: string;

  row: number;
  colCount: number;
  width: number;
  height: number;
  staggerFrames: number;
};

export type BitmapInfoMap = {
  [state: string]: BitmapInfo;
};