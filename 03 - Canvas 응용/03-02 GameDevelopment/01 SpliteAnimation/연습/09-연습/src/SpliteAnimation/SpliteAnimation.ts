import Player from "@/Player/Player";

export default class SpliteAnimation {
  $canvas!: HTMLCanvasElement;
  ctx!: CanvasRenderingContext2D;

  player!: Player;

  animationFrameId!: number;

  constructor() {
    this.initCanvas();
    this.resizeCanvas();

    this.initPlayer();

    this.startAnimation();

    console.log(this);
  }

  initCanvas() {
    const $parent = document.querySelector(
      ".spliteAnimation-main-canvasWrapper"
    );

    if (!$parent)
      throw new Error("Canvas Wrapper 요소를 찾지 못하였습니다.");

    const $canvas = document.createElement("canvas");
    $canvas.classList.add(
      "spliteAnimation-main-canvasWrapper-canvas"
    );
    
    this.$canvas = $canvas;
    this.ctx = $canvas.getContext("2d") as CanvasRenderingContext2D;

    $parent.replaceChildren($canvas);
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
      $canvas: { width, height },
    } = this;

    ctx.save();
    ctx.clearRect(0, 0, width, height);

    this.drawScene();

    ctx.restore();

    this.animationFrameId = window.requestAnimationFrame(
      () => this.loopAnimationFrames()
    );
  }

  drawScene() {
    this.drawPlayer();
  }

  drawPlayer() {
    this.player.draw();
  }
}