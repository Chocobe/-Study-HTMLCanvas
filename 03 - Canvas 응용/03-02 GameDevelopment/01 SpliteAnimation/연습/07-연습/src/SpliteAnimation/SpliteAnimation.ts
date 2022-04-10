import Player from "@/Player/Player";

export default class SpliteAnimation {
  $canvas!: HTMLCanvasElement;
  ctx!: CanvasRenderingContext2D;
  
  player!: Player;
  
  frames = 0;
  animationFrameId?: number;
  
  constructor(canvasWrapperSelector: string) {
    this.initCanvas(canvasWrapperSelector);
    this.resizeCanvas();

    this.initPlayer();
    
    this.startAnimation();
  }

  initCanvas(wrapperSelector: string) {
    const $parent = document.querySelector(wrapperSelector);

    if (!$parent) {
      throw new Error(`Canvas Wrapper Element 선택자 ["${wrapperSelector}"] 가 유효하지 않습니다.`);
    }

    this.$canvas = document.createElement("canvas");
    this.$canvas.classList.add("spliteAnimation-canvasWrapper-canvas");
    
    this.ctx = this.$canvas.getContext("2d") as CanvasRenderingContext2D;

    $parent.appendChild(this.$canvas);
  }

  resizeCanvas() {
    const { $canvas } = this;

    $canvas.width = 400;
    $canvas.height = 400;
  }

  initPlayer() {
    this.player = new Player(this.$canvas);
  }

  async startAnimation() {
    const { player } = this;
    
    await Promise.all([
      player.loadingPromise,
    ]);

    this.loopAnimationFrames();
  }

  loopAnimationFrames() {
    const {
      ctx,
      $canvas: {
        width,
        height,
      },
    } = this;

    ctx.save();
    ctx.clearRect(0, 0, width, height);

    this.drawScene();

    ctx.restore();

    this.animationFrameId = window.requestAnimationFrame(() => {
      this.frames++;

      if (this.frames >= Number.MAX_SAFE_INTEGER) {
        this.frames = 0;
      }

      this.loopAnimationFrames();
    });
  }

  drawScene() {
    this.player.draw(this.frames);
  }
}