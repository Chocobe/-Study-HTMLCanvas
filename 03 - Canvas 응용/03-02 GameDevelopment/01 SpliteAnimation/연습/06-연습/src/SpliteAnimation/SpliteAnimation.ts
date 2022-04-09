import Player from "@/Player/Player";

export default class SpliteAnimation {
  canvas!: HTMLCanvasElement;
  ctx!: CanvasRenderingContext2D;

  player!: Player;
  
  frames = 0;
  animationFrameId?: number;
  
  constructor(parentSelector: string) {
    this.initCanvas(parentSelector);
    this.resizeCanvas();

    this.initPlayer();

    this.startAnimation();
  }

  initCanvas(selector: string) {
    const $parent = document.querySelector(selector);

    if (!$parent) 
      throw new Error("Canvas 부모 요소를 찾지 못하였습니다.");

    const canvas = document.createElement("canvas");
    canvas.classList.add("spliteAnimation-main-canvasWrapper-canvas");

    this.canvas = canvas;
    this.ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

    $parent.replaceChildren(canvas);
  }

  resizeCanvas() {
    const { canvas } = this;

    canvas.width = 400;
    canvas.height = 400;
  }

  initPlayer() {
    this.player = new Player(this.canvas);

    this.player.loadingPromise.then(() => {
      console.log("Player $bitmap 로딩 완료");
    });
  }

  async startAnimation() {
    await Promise.all([
      this.player.loadingPromise,
    ]);

    this.loopAnimationFrames();
  }

  loopAnimationFrames() {
    const { ctx, canvas: { width, height } } = this;

    ctx.save();
    ctx.clearRect(0, 0, width, height);

    this.drawScene();

    ctx.restore();

    this.animationFrameId = window.requestAnimationFrame(
      () => {
        this.frames++;
        this.loopAnimationFrames();

        if (this.frames >= Number.MAX_SAFE_INTEGER) {
          this.frames = 0;
        }
      }
    );
  }

  drawScene() {
    this.player.draw(this.frames);
  }
}