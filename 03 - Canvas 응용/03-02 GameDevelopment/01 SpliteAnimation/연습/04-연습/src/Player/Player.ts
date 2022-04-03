import PlayerBitmapInfoFactory from "./playerBitmapInfo";
import BitmapInfo from "@/BitmapInfo/BitmapInfo";

import bitmapFile from "../assets/shadow_dog.png";

export default class Player {
  canvas!: HTMLCanvasElement;
  ctx!: CanvasRenderingContext2D;

  $bitmap!: HTMLImageElement;
  loadingPromise!: Promise<HTMLImageElement>

  bitmapInfoList!: BitmapInfo[];
  state?: string;

  constructor(
    canvas: HTMLCanvasElement,
    stateDropdownSelector: string
  ) {
    this.initCanvas(canvas);

    this.initBitmap();
    this.initBitmapInfoList();

    this.initStateDropdown(stateDropdownSelector);
  }

  initCanvas(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
  }

  initBitmap() {
    this.$bitmap = document.createElement("img");

    this.loadingPromise = new Promise((res, rej) => {
      const $bitmap = this.$bitmap;

      $bitmap.addEventListener("load", () => {
        res($bitmap);
      });

      $bitmap.addEventListener("error", () => {
        rej(new Error("Player Bitmap 을 찾지 못하였습니다."));
      });
    });

    this.$bitmap.src = bitmapFile;
  }

  initBitmapInfoList() {
    this.bitmapInfoList = PlayerBitmapInfoFactory.create();
  }

  initStateDropdown(selector: string) {
    const $dropdown = document.querySelector(selector);

    if (!$dropdown || !($dropdown instanceof HTMLSelectElement))
      throw new Error(`[선택자: ${selector}] 에 해당하는 <select />를 찾지 못하였습니다.`);

    $dropdown.addEventListener(
      "change",
      () => {
        this.state = $dropdown.value;
        $dropdown.blur();
      }
    );

    this.state = $dropdown.value;
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

    if (!bitmapInfo) return;

    const {
      row,
      numOfColumn,
      width,
      height,
      staggerFrames,
    } = bitmapInfo;

    const sourceX = Math.floor(frame / staggerFrames) % numOfColumn * width;
    const sourceY = row * height;

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
    const { state } = this;
    const bitmapInfo = this.bitmapInfoList.find(info => info.name === state);

    if (!bitmapInfo)
      throw new Error(`[Player state: ${state}] 는 부적합한 Player.state 값 입니다.`);

    return bitmapInfo;
  }
}