import BitmapInfoGroup from "@/BitmapInfoGroup/BitmapInfo";
import playerBitmapInfoGroup from "./playerBitmapInfoGroup";

export default class Player {
  canvas!: HTMLCanvasElement;
  ctx!: CanvasRenderingContext2D;
  
  $bitmap!: HTMLImageElement;
  loadingPromise!: Promise<void>;

  bitmapInfoGroup!: BitmapInfoGroup;

  $stateSelector!: HTMLSelectElement;
  state!: string;

  constructor(canvas: HTMLCanvasElement) {
    this.initCanvas(canvas);
    this.initBitmap();
    this.initBitmapInfoGroup();
    this.initStateSelectElement();
  }

  initCanvas(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
  }

  initBitmap() {
    this.loadingPromise = new Promise(res => {
      const $bitmap = new Image();

      $bitmap.onload = () => {
        this.$bitmap = $bitmap;
        res();
      };

      $bitmap.src = "../assets/shadow_dog.png";
    });
  }

  initBitmapInfoGroup() {
    this.bitmapInfoGroup = playerBitmapInfoGroup;
  }

  initStateSelectElement() {
    this.$stateSelector = document.querySelector(
      ".spliteAnimation-main-controller-selector"
    ) as HTMLSelectElement;

    if (!this.$stateSelector)
      throw new Error("class Player 의 $stateSelector 를 참조하지 못하였습니다.");

    this.$stateSelector.addEventListener(
      "change",
      () => this.state = this.$stateSelector.value
    );

    this.state = this.$stateSelector.value;
  }

  draw(frames: number) {
    const { 
      ctx,
      canvas,
      $bitmap,
      bitmapInfoGroup,
      state
    } = this;

    /**
     * TODO: 고정된 값들
     * 1. height
     * 2. width
     * 3. row
     * 4. colCount
     * 5. staggerFrames
     */
    const bitmapInfo = bitmapInfoGroup.get(state);

    if (!bitmapInfo) 
      throw new Error(`${state} 는 Player 에 유효하지 않은 state 입니다.`);

    const {
      row,
      colCount,
      width,
      height,
      staggerFrames,
    } = bitmapInfo;
    // const bitmapInfo = {
    //   width: 575,
    //   height: 523,
    //   row: 0,
    //   colCount: 7,
    //   staggerFrames: 5,
    // };

    /**
     * TODO: 여기서 계산할 값들
     * 1. col
     * 2. sceneX
     * 3. sceneY
     */
    const col = Math.floor(frames / staggerFrames) % colCount;

    const sceneX = col * bitmapInfo.width;
    const sceneY = bitmapInfo.row * bitmapInfo.height;

    ctx.save();

    ctx.drawImage(
      $bitmap,
      sceneX, sceneY, bitmapInfo.width, bitmapInfo.height,
      0, 0, canvas.width, canvas.height
    );

    ctx.restore();
  }
}