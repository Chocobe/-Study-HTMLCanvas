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
  //     displayText: "Idle π«",

  //     row: 0,
  //     colCount: 7,
  //     width: 575,
  //     height: 523,
  //     staggerFrames: 5,
  //   },
  //   jump: {
  //     displayText: "Jump π±",

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
      throw new Error("class Player μ initStateSelector() μμ <select /> μμλ₯Ό μ°Ύμ§ λͺ»νμμ΅λλ€.");
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
     * TODO: νμν λ°μ΄ν°
     *  - ctx.drawImage() μ νμν λ°μ΄ν°κ° λ¨
     *  1. νμ¬ μ΄λ―Έμ§ xκ° - column λ²νΈλ νμν¨
     *  2. νμ¬ μ΄λ―Έμ§ yκ°
     *  3. νμ¬ μ΄λ―Έμ§ width κ°
     *  4. νμ¬ μ΄λ―Έμ§ height κ°
     *  5. νμ¬ λμ  frame κ° - Params λ‘ λ°κΈ°
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