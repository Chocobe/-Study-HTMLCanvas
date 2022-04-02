import playerBitmap from "../assets/shadow_dog.png";
import BitmapInfo from "@/BitmapInfo/BitmapInfo";
import BitmapInfoFactory from "@/BitmapInfo/BitmapInfoFactory";
import playerBitmapInfoParams from "./playerBitmapInfoParams";

export default class Player {
  canvas!: HTMLCanvasElement;
  ctx!: CanvasRenderingContext2D;

  $bitmap!: HTMLImageElement;
  bitmapInfoList!: BitmapInfo[];

  state!: string;

  loadingPromise!: Promise<HTMLImageElement>;

  constructor(
    canvas: HTMLCanvasElement, 
    stateDropdownSelector: string
  ) {
    this.initCanvas(canvas);
    this.initStateDropdown(stateDropdownSelector);

    this.initBitmap();
    this.initBitmapInfoList();
  }

  initCanvas(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
  }

  initStateDropdown(selector: string) {
    const $selector = document.querySelector(selector);

    if (!$selector || !($selector instanceof HTMLSelectElement)) 
      throw new Error(`[선택자: ${selector}] 에 해당하는 <select />를 찾지 못하였습니다.`);

    $selector.addEventListener("change", () => {
      this.state = $selector.value;
    });

    this.state = $selector.value;
  }

  initBitmap() {
    this.$bitmap = document.createElement("img");
    
    this.loadingPromise = new Promise((res, rej) => {
      const { $bitmap } = this;

      $bitmap.addEventListener("load", () => {
        console.log(this.$bitmap);
        res($bitmap);
      });

      $bitmap.addEventListener("error", () => {
        rej("Player bitmap 을 불러오지 못하였습니다.");
      });
    });

    this.$bitmap.src = playerBitmap;
  }

  initBitmapInfoList() {
    this.bitmapInfoList = BitmapInfoFactory.build(
      ...playerBitmapInfoParams,
    );
  }

  draw(frame: number) {
    const {
      ctx,
      canvas: {
        width: canvasWidth,
        height: canvasHeight,
      },
      $bitmap,
    } = this;

    const bitmapInfo = this.findBitmapInfo();

    if (!bitmapInfo) 
      throw new Error(`${this.state} 은(는) 부적합한 Player.state 입니다.`);

    const {
      row,
      colCount,
      width,
      height,
      staggerFrame,
    } = bitmapInfo;

    const col = Math.floor(frame / staggerFrame) % colCount;
    const sourceX = width * col;
    const sourceY = height* row;

    ctx.save();

    ctx.drawImage(
      $bitmap,
      sourceX, sourceY,
      width, height,
      0, 0,
      canvasWidth, canvasHeight
    );

    ctx.restore();
  }

  findBitmapInfo() {
    const { bitmapInfoList, state } = this;

    return bitmapInfoList.find(info => info.name === state);
  }
}