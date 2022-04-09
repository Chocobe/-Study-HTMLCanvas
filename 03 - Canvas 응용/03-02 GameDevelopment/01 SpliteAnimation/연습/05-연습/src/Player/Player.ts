import BitmapInfoGroup from "@/BitmapInfo/BitmapInfoGroup";
import playerBitmapInfoGroupParams from "./playerBitmapInfoGroupParams";

export default class Player {
  $bitmap!: HTMLImageElement;
  bitmapInfoGroup!: BitmapInfoGroup;

  $stateSelector!: HTMLSelectElement;

  // bitmapInfo!: {
  //   [key: string]: {
  //     row: number;
  //     colCount: number;

  //     width: number;
  //     height: number;
  //     staggerFrames: number;
  //   };
  // };

  // FIXME: type 으로 추출하기
  state!: string;

  loadingPromise!: Promise<boolean>;

  constructor() {
    this.initBitmap();
    this.initBitmapInfoGroup();
    this.initStateSelector();
  }

  initBitmap() {
    this.loadingPromise = new Promise(res => {
      this.$bitmap = new Image();

      const { $bitmap } = this;

      $bitmap.onload = () => {
        res(true);
      };

      $bitmap.src = "../assets/shadow_dog.png";
    });
  }

  initBitmapInfoGroup() {
    this.bitmapInfoGroup = new BitmapInfoGroup(playerBitmapInfoGroupParams);
  }

  initStateSelector() {
    this.$stateSelector = document.querySelector(
      ".spliteAnimation-controller-selector",
    ) as HTMLSelectElement;

    if (!this.$stateSelector) {
      throw new Error(
        "class Player 의 initStateSelector() 에서 <select /> 요소를 찾지 못하였습니다.",
      );
    }

    this.$stateSelector.addEventListener("change", e => {
      this.state = (e.target as HTMLSelectElement).value;
      this.$stateSelector.blur();
    });

    this.state = this.$stateSelector.value;
  }

  draw({
    canvas,
    ctx,
    frames,
  }: {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    frames: number;
  }) {
    const { $bitmap, state, bitmapInfoGroup } = this;
    const curBitmapInfo = bitmapInfoGroup.get(state);

    if (!curBitmapInfo) {
      throw new Error(`Palyer 상태값 ["${state}"] 은(는) 유효하지 않습니다.`);
    }

    const { width: canvasWidth, height: canvasHeight } = canvas;
    const { row, colCount, width, height, staggerFrames } = curBitmapInfo;

    const x = (Math.floor(frames / staggerFrames) % colCount) * width;
    const y = row * height;

    ctx.save();

    ctx.drawImage(
      $bitmap,

      // FIXME: 현재 frames 에 해당하는 값으로 바꾸기
      x,
      y,
      width,
      height,

      0,
      0,
      canvasWidth,
      canvasHeight,
    );

    ctx.restore();
  }
}
