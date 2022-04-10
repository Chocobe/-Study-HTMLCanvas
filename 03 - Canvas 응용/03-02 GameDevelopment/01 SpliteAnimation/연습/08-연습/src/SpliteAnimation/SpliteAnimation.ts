import Player from "@/Player/Player";

export default class SpliteAnimation {
  $canvas!: HTMLCanvasElement;
  ctx!: CanvasRenderingContext2D;

  player!: Player;

  frames = 0;
  animationFrameId!: number;
  
  constructor() {
    this.initCanvas();
    this.resizeCanvas();

    this.initPlayer();

    this.startAnimation();
  }

  initCanvas() {
    const $parent = document.querySelector(
      ".spliteAnimation-main-canvasWrapper"
    );

    if (!$parent)
      throw new Error("class SpliteAnimation 의 initCanvas() 에서 $parent 요소를 찾지 못하였습니다.");

    this.$canvas = document.createElement("canvas");
    this.$canvas.classList.add(
      "spliteAnimation-main-canvasWrapper-canvas"
    );
    
    this.ctx = this.$canvas.getContext("2d") as CanvasRenderingContext2D;

    $parent.replaceChildren(this.$canvas);
  }

  resizeCanvas() {
    const { $canvas } = this;
    const size = 400;

    $canvas.width = $canvas.height = size;
  }

  initPlayer() {
    this.player = new Player(this.$canvas);
  }

  async startAnimation() {
    await Promise.all([
      this.player.loadingPromise,
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

    this.animationFrameId = window.requestAnimationFrame(
      () => {
        this.frames++;

        if (this.frames >= Number.MAX_SAFE_INTEGER) {
          this.frames = 0;
        }

        this.loopAnimationFrames();
      }
    )
  }

  drawScene() {
    this.drawPlayer();
  }

  drawPlayer() {
    this.player.draw(this.frames);
  }
}