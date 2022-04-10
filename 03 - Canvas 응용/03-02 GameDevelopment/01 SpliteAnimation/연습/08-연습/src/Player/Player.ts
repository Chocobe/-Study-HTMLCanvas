import { BitmapInfoMap } from "@/bitmapInfoMap/bitmapInfoMap";
import { playerBitmapInfoMap } from "@/bitmapInfoMap/playerBitmapInfoMap";

export default class Player {
  $canvas!: HTMLCanvasElement;
  ctx!: CanvasRenderingContext2D;
  
  loadingPromise!: Promise<void>;
  $bitmap!: HTMLImageElement;

  state!: string;
  $selector!: HTMLSelectElement;

  bitmapInfoMap!: BitmapInfoMap;
  // bitmapInfoMap = {
  //   idle: {
  //     displayText: "Idle 🐫",

  //     row: 0,
  //     colCount: 7,
  //     width: 575,
  //     height: 523,
  //     staggerFrames: 5,
  //   },
  //   jump: {
  //     displayText: "Jump 😱",

  //     row: 1,
  //     colCount: 7,
  //     width: 575,
  //     height: 523,
  //     staggerFrames: 5,
  //   },
  // };

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
      const url = "../assets/shadow_dog.png";
      const $img = new Image();

      $img.onload = () => {
        this.$bitmap = $img;
        res();
      };

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

    if (!$selector) {
      throw new Error("class Player 의 initStateSelector() 에서 <select /> 요소를 찾지 못하였습니다.");
    }

    $selector.addEventListener(
      "change",
      () => {
        this.state = $selector.value;
      }
    );
    
    this.$selector = $selector;
  }

  initStateSelectorOptions() {
    const { bitmapInfoMap, $selector } = this;
    const $optionList: HTMLOptionElement[] = [];

    Object.entries(bitmapInfoMap).forEach(([state, info], idx) => {
      const $option = document.createElement("option");
      $option.value = state;
      $option.innerText = info.displayText;
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

  draw(frames: number) {
    const {
      ctx,
      state,
      $bitmap,
      $canvas: {
        width: canvasWidth,
        height: canvasHeight,
      },
    } = this;

    /**
     * TODO: 필요한 데이터
     *  - ctx.drawImage() 에 필요한 데이터가 됨
     *  1. 현재 이미지 x값 - column 번호도 필요함
     *  2. 현재 이미지 y값
     *  3. 현재 이미지 width 값
     *  4. 현재 이미지 height 값
     *  5. 현재 누적 frame 값 - Params 로 받기
     */

    const {
      row,
      colCount,
      width,
      height,
      staggerFrames,
    } = this.bitmapInfoMap[state as "idle" | "jump"];

    const col = Math.floor(frames / staggerFrames) % colCount;
    const bitmapX = col * width;
    const bitmapY = row * height;

    ctx.save();

    ctx.drawImage(
      $bitmap,
      bitmapX, bitmapY, width, height,
      0, 0, canvasWidth, canvasHeight
    );

    ctx.restore();
  }
}