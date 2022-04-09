export interface BitmapInfo {
  row: number;
  colCount: number;
  width: number;
  height: number;
  staggerFrames: number;
}

export interface BitmapInfoMap {
  [key: string]: BitmapInfo;
}

export default class BitmapInfoGroup {
  map!: BitmapInfoMap;

  constructor(bitmapInfoMap: BitmapInfoMap = {}) {
    this.map = bitmapInfoMap;
  }

  add(bitmapInfoMap: BitmapInfoMap) {
    Object.entries(bitmapInfoMap).forEach(([key, info]) => {
      this.map[key] = info;
    });
  }

  get(state: string) {
    return this.map[state];
  }
}