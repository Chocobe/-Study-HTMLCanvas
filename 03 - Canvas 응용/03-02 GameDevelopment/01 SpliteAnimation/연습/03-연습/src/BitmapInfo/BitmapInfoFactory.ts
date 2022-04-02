import BitmapInfo, { BitmapInfoParams } from "./BitmapInfo";

export default class BitmapInfoFactory {
  static build(...bitmapInfoParams: BitmapInfoParams[]) {
    return bitmapInfoParams.map(params => {
      return new BitmapInfo(params);
    });
  }
}