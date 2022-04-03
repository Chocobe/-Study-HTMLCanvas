import Player from "@/Player/Player";

export default class SpliteAnimation {
  canvas!: HTMLCanvasElement;
  ctx!: CanvasRenderingContext2D;

  player!: Player;

  animationFrameId?: number;

  frame: number = 0;
  
  constructor(canvasSelector: string) {
    this.initCanvas(canvasSelector);
    this.resizeCanvas();
    
    this.initPlayer();

    this.startAnimation();
  }

  initCanvas(selector: string) {
    this.canvas = document.querySelector(selector) as HTMLCanvasElement;

    if (!this.canvas || !(this.canvas instanceof HTMLCanvasElement)) 
      throw new Error(`[선택자: ${selector}] 에 해당하는 <canvas />를 찾지 못하였습니다.`);

    this.ctx = this.canvas.getContext("2d") as CanvasRenderingContext2D;
  }

  resizeCanvas() {
    const { canvas } = this;
    
    canvas.width = 500;
    canvas.height = 500;
  }
  
  initPlayer() {
    this.player = new Player(
      this.canvas,
      "#playerStateSelector"
    );

    console.log(this.player);
  }

  async startAnimation() {
    await Promise.all([
      this.player.loadingPromise,
    ]);

    this.loopAnimationFrame();
  }

  loopAnimationFrame() {
    const {
      ctx,
      canvas: {
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
        this.frame++;

        if (this.frame >= Number.MAX_SAFE_INTEGER) this.frame = 0;

        this.loopAnimationFrame();
      }
    )
  }

  drawScene() {
    this.drawPlayer();
  }

  drawPlayer() {
    this.player.draw(this.frame);
  }
}