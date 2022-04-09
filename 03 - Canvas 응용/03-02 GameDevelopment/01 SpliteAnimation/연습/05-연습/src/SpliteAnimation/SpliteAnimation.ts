import Player from "@/Player/Player";

export default class SpliteAnimation {
  static readonly CANVAS_WIDTH = 400;
  static readonly CANVAS_HEIGHT = 400;

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

  initCanvas(parentSelector: string) {
    const $parent = document.querySelector(parentSelector);

    if (!$parent) {
      throw new Error(
        `부모요소 선택자 [${parentSelector}] 가 유효하지 않습니다.`,
      );
    }

    const parentClassName = $parent.classList[0];

    this.canvas = document.createElement("canvas");
    this.canvas.classList.add(`${parentClassName}-canvas`);
    this.ctx = this.canvas.getContext("2d") as CanvasRenderingContext2D;

    $parent.appendChild(this.canvas);
  }

  resizeCanvas() {
    const { canvas } = this;

    canvas.width = SpliteAnimation.CANVAS_WIDTH;
    canvas.height = SpliteAnimation.CANVAS_HEIGHT;
  }

  initPlayer() {
    this.player = new Player();
  }

  startAnimation() {
    this.loopAnimationFrames();
  }

  loopAnimationFrames() {
    const {
      ctx,
      canvas: { width, height },
    } = this;

    ctx.save();
    ctx.clearRect(0, 0, width, height);

    this.drawScene();

    ctx.restore();

    this.animationFrameId = window.requestAnimationFrame(() => {
      this.frames++;
      this.loopAnimationFrames();
    });
  }

  drawScene() {
    this.drawPlayer();
  }

  drawPlayer() {
    const { canvas, ctx, frames } = this;

    this.player.draw({
      canvas,
      ctx,
      frames,
    });
  }
}
