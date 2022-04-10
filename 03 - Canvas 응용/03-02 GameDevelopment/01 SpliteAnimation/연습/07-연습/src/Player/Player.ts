import { BitmapInfoMap } from "@/BitmapInfoMap/BitmapInfoMap";
import playerBitmapInfoMap from "./playerBitmapInfoMap";

export default class Player {
  $canvas!: HTMLCanvasElement;
  ctx!: CanvasRenderingContext2D;
  
  $bitmap!: HTMLImageElement;
  loadingPromise!: Promise<void>;

  bitmapInfoMap!: BitmapInfoMap;

  $stateSelector!: HTMLSelectElement;
  state!: string;

  constructor(canvas: HTMLCanvasElement) {
    this.initCanvas(canvas);
    this.initBitmap();
    this.initBitmapInfoMap();

    this.initStateSelector();
    this.initStateSelectorOptions();
  }

  initCanvas(canvas: HTMLCanvasElement) {
    this.$canvas = canvas;
    this.ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
  }

  initBitmap() {
    this.loadingPromise = new Promise(res => {
      const bitmapURL = "../assets/shadow_dog.png";
      const $img = new Image();

      $img.onload = () => {
        this.$bitmap = $img;
        res();
      };

      $img.src = bitmapURL;
    });
  }

  initBitmapInfoMap() {
    this.bitmapInfoMap = playerBitmapInfoMap;
  }

  initStateSelector() {
    const $selector = document.querySelector(".spliteAnimation-controller-selector") as HTMLSelectElement;

    $selector.addEventListener(
      "change",
      () => (this.state = $selector.value)
    );

    this.$stateSelector = $selector;
  }

  initStateSelectorOptions() {
    const { bitmapInfoMap } = this;
    
    const $optionList: HTMLOptionElement[] = [];

    Object.entries(bitmapInfoMap).forEach(([key, info], idx) => {
      const $option = document.createElement("option");
      $option.value = key;
      $option.classList.add("spliteAnimation-controller-selector-option");
      $option.innerHTML = info.displayText;

      if (idx === 0) {
        $option.selected = true;
        this.state = $option.value;
      }

      $optionList.push($option);
    })

    this.$stateSelector.replaceChildren(...$optionList);
  }

  draw(frames: number) {
    const {
      ctx,
      state,
      bitmapInfoMap,
      $bitmap,
      $canvas: {
        width: canvasWidth,
        height: canvasHeight,
      },
    } = this;

    // TODO: 구해야 할 값들
    // const bitmapX
    // const bitmapY
    // const bitmapWidth
    // const bitmapHeight

    const bitmapInfo = bitmapInfoMap[state];

    if (!bitmapInfo) {
      throw new Error(`Player state ["${state}"] 는 유효하지 않습니다.`);
    }

    const {
      row,
      colCount,
      width: bitmapWidth,
      height: bitmapHeight,
      staggerFrames,
    } = bitmapInfo;

    const col = Math.floor(frames / staggerFrames) % colCount;
    const bitmapX = col * bitmapWidth;
    const bitmapY = row * bitmapHeight;

    ctx.save();
    
    ctx.drawImage(
      $bitmap,
      bitmapX, bitmapY, bitmapWidth, bitmapHeight,
      0, 0, canvasWidth, canvasHeight
    );

    ctx.restore();
  }
}