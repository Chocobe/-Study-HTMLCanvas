import { BitmapInfoMap } from "@/bitmapInfoMap/bitmapInfoMap";
import { playerBitmapInfoMap } from "./playerBitmapInfoMap";

export default class Player {
  $canvas!: HTMLCanvasElement;
  ctx!: CanvasRenderingContext2D;
  
  $bitmap!: HTMLImageElement;
  loadingPromise!: Promise<void>;
  bitmapInfoMap!: BitmapInfoMap;

  state!: string;
  $selector!: HTMLSelectElement;

  frames = 0;

  constructor($canvas: HTMLCanvasElement) {
    this.initCanvas($canvas);
    this.initBitmap();
    this.initBitmapInfoMap();

    this.initStateSelector();
    this.initStateSelectorOptions();
  }

  initCanvas($canvas: HTMLCanvasElement) {
    this.$canvas = $canvas;
    this.ctx = $canvas.getContext("2d") as CanvasRenderingContext2D;
  }

  initBitmap() {
    this.loadingPromise = new Promise(res => {
      const url = "../assets/shadow_dog.png";
      
      const $img = new Image();

      $img.onload = () => {
        this.$bitmap = $img;
        res();
      }

      $img.src = url;
    });
  }

  initBitmapInfoMap() {
    this.bitmapInfoMap = playerBitmapInfoMap;
  }
  
  initStateSelector() {
    const $selector = document.querySelector(
      ".spliteAnimation-main-controller-selector"
    ) as HTMLSelectElement;

    if (!$selector)
      throw new Error("Player State <select /> 요소를 찾을 수 없습니다.");

    $selector.addEventListener(
      "change",
      () => {
        this.frames = 0;
        this.state = $selector.value;
      }
    );

    this.$selector = $selector;
  }

  initStateSelectorOptions() {
    const { bitmapInfoMap, $selector } = this;

    const $optionList: HTMLOptionElement[] = [];

    Object.entries(bitmapInfoMap).forEach(([state, info], idx) => {
      const $option = document.createElement("option") as HTMLOptionElement;
      $option.innerHTML = info.displayText;
      $option.value = state;
      $option.classList.add(
        "spliteAnimation-main-controller-selector-option"
      );

      if (idx === 0) {
        $option.selected = true;
        this.state = state;
      }

      $optionList.push($option);
    });

    $selector.replaceChildren(...$optionList);
  }

  // 1. TODO: TODO: Params 로 받을 데이터
  // => 1. TODO: TODO: 내부 frames 로 변경
  draw() {
    const {
      ctx,
      $bitmap,
      state,
      bitmapInfoMap,
      frames,
      $canvas: {
        width: canvasWidth,
        height: canvasHeight,
      }
    } = this;

    /**
     * TODO: 필요한 데이터
     * - row
     * - col
     * - positionX
     * - positionY
     * - width
     * - height
     * - frames
     * - staggerFrames
     * - numOfCols
     * 
     * 1. TODO: TODO: Params 로 받을 데이터
     * - frames
     * 
     * 2. TODO: TODO: 고정값
     * - row
     * - width
     * - height
     * - staggerFrames
     * - numOfCols
     * 
     * 3. TODO: TODO: 여기서 가공해야 할 데이터
     * - col
     * - positionX
     * - positionY
     */

    // 2. TODO: TODO: TODO: 고정값
    // const fixedData = {
    //   row: 0,
    //   width: 575,
    //   height: 523,
    //   staggerFrames: 5,
    //   numOfCols: 7,
    // };

    const bitmapInfo = bitmapInfoMap[state];

    if (!bitmapInfo)
      throw new Error(`["${state}"] 은(는) Player State 에 유효하지 않습니다.`);

    const {
      row,
      numOfCols,
      staggerFrames,
      width: bitmapWidth,
      height: bitmapHeight,
    } = bitmapInfo;

    // 3. TODO: TODO: TODO: 여기서 가공해야 할 데이터
    const col = Math.floor(frames / staggerFrames) % numOfCols;
    
    const positionX = col * bitmapWidth;
    const positionY = row * bitmapHeight;

    ctx.save();
    
    ctx.drawImage(
      $bitmap,
      positionX, positionY, bitmapWidth, bitmapHeight,
      0, 0, canvasWidth, canvasHeight
    );

    ctx.restore();

    this.increaseFrames();
  }

  increaseFrames() {
    this.frames++;

    if (this.frames >= Number.MAX_SAFE_INTEGER) {
      this.frames = 0;
    }
  }
}