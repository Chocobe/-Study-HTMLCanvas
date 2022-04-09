import BitmapInfo from "./BitmapInfo";

export type BitmapInfoGroupParams = {
  [key: string]: BitmapInfo;
};

export default class BitmapInfoGroup {
  map!: {
    [key: string]: BitmapInfo;
  };

  constructor(params: BitmapInfoGroupParams = {}) {
    this.map = params;
  }

  add(bitmapInfo: BitmapInfoGroupParams) {
    Object.entries(bitmapInfo).forEach(([key, info]) => {
      this.map[key] = info;
    });
  }

  get(key: string) {
    return this.map[key];
  }
}
