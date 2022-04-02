import Player from "@/Player/Player";

// ``file-loader`` 연습해봄
// import dog from "../../../../assets/shadow_dog.png";

export default class SpliteAnimation {
  canvas!: HTMLCanvasElement;
  ctx!: CanvasRenderingContext2D;

  player!: Player;
  
  animationFrameId?: number;
  frame: number = 0;

  constructor(selector: string) {
    this.initCanvas(selector);
    this.resizeCanvas();
    
    this.initAnimation();
  }

  initCanvas(selector: string) {
    this.canvas = document.querySelector(selector) as HTMLCanvasElement;

    if (!this.canvas || !(this.canvas instanceof HTMLCanvasElement)) {
      throw new Error(`[선택자: ${selector}] 에 해당하는 <canvas />를 찾을 수 없습니다.`);
    }

    this.ctx = this.canvas.getContext("2d") as CanvasRenderingContext2D;
  }

  resizeCanvas() {
    const { canvas } = this;

    canvas.width = 300;
    canvas.height = 300;
  }

  async initAnimation() {
    await Promise.all([
      this.initPlayer(),
    ]);

    this.startAnimation();
  }

  initPlayer() {
    this.player = new Player(this.canvas, "#playerStateSelector");
    
    return this.player.loadingPromise;
  }

  startAnimation() {
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

    this.animationFrameId = window.requestAnimationFrame(
      () => {
        this.frame++;
        this.loopAnimationFrame();

        if (this.frame >= Number.MAX_SAFE_INTEGER) this.frame = 0;
      }
    );

    ctx.restore();
  }

  drawScene() {
    this.drawPlayer();
  }

  drawPlayer() {
    this.player.draw(this.frame);
  }
}