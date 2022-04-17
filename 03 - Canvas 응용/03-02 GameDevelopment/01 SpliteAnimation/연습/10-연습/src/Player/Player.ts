import { BitmapInfoMap } from "@/BitmapInfoMap/BitmapInfo";
import playerBitmapInfoMap, {
  PlayerState,
} from "./PlayerBitmapInfoMap";

export default class Player {
  $canvas!: HTMLCanvasElement;
  ctx!: CanvasRenderingContext2D;

  $selector!: HTMLSelectElement;

  loadingPromise!: Promise<void>;
  $bitmap!: HTMLImageElement;

  bitmapInfoMap!: BitmapInfoMap;
  state!: PlayerState;

  frames = 0;

  constructor($canvas: HTMLCanvasElement) {
    this.initCanvas($canvas);

    this.initBitmap();
    this.initBitmapInfoMap();

    this.initSelector();
    this.initSelectorOptions();
  }

  initCanvas($canvas: HTMLCanvasElement) {
    this.$canvas = $canvas;
    this.ctx = $canvas.getContext("2d") as CanvasRenderingContext2D;
  }

  initBitmap() {
    this.loadingPromise = new Promise(res => {
      const $img = new Image();

      $img.onload = () => {
        this.$bitmap = $img;
        res();
      }

      $img.src = "../assets/kirby_sprite_sheet.png"
    });
  }

  initBitmapInfoMap() {
    this.bitmapInfoMap = playerBitmapInfoMap;
    this.state = PlayerState["WALKING-01"];
  }

  initSelector() {
    const $selector = document.querySelector(
      ".spriteAnimation-main-controller-selector"
    ) as HTMLSelectElement;

    if (!$selector) {
      throw new Error("Player State <select /> 요소를 찾을 수 없습니다.");
    }

    $selector.addEventListener(
      "change",
      () => {
        this.state = $selector.value as PlayerState;
      }
    );

    this.$selector = $selector;
  }

  initSelectorOptions() {
    const $optionList: HTMLOptionElement[] = [];
    
    Object.entries(this.bitmapInfoMap).forEach(([state, info]) => {
      const $option = document.createElement("option");

      $option.classList.add("spriteAnimation-main-controller-option");
      $option.value = state;
      $option.innerHTML = info.displayValue;

      $optionList.push($option);
    })

    this.$selector.replaceChildren(...$optionList);
  }

  draw() {
    const {
      ctx,
      $canvas: {
        width: canvasWidth,
        height: canvasHeight,
      },
      $bitmap,
      bitmapInfoMap,
      state,
      frames,
    } = this;

    const {
      posY,
      colCount,

      width: bitmapWidth,
      height: bitmapHeight,

      staggerFrames,
    } = bitmapInfoMap[state];

    const col = Math.floor(frames / staggerFrames) % colCount;
    const posX = col * bitmapWidth;

    ctx.save();

    ctx.drawImage(
      $bitmap,
      posX, posY, bitmapWidth, bitmapHeight,
      0, 0, canvasWidth, canvasHeight
    );

    ctx.restore();

    this.frames ++;

    if (this.frames >= Number.MAX_SAFE_INTEGER) {
      this.frames = 0;
    }
  }
}