export type BitmapInfo = {
  displayValue: string;
  posY: number;
  colCount: number;
  width: number;
  height: number;
  staggerFrames: number;
}

export type BitmapInfoMap = Record<string, BitmapInfo>;
