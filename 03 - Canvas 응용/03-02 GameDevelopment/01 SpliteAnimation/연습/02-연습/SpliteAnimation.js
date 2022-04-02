// @ts-check

import Player from "./src/Player.js";

class SpliteAnimation {
  /** @type { HTMLCanvasElement } */
  canvas;

  /** @type { CanvasRenderingContext2D } */
  ctx;

  /** @type { Player } */
  player;

  /** @type { number } */
  frame = 0;

  /** @type { number } */
  animationFrameId;
  
  constructor(selector) {
    this.initCanvas(selector);
    this.resizeCanvas();

    this.initPlayer();

    this.startAnimation();
  }

  /** @param { string } selector */
  initCanvas(selector) {
    this.canvas = document.querySelector(selector);
    this.ctx = this.canvas.getContext("2d");
  }

  resizeCanvas() {
    const { canvas } = this;
    canvas.width = Math.min(window.innerWidth, 300);
    canvas.height = Math.min(window.innerHeight, 300);
  }

  initPlayer() {
    this.player = new Player(this.canvas);
  }

  async startAnimation() {
    const { player } = this;
    
    await Promise.all([
      player.loadingPromise,
    ]);

    this.loopAnimation();
  }

  loopAnimation() {
    const {
      ctx,
      canvas: {
        width, height,
      },
    } = this;

    ctx.save();
    ctx.clearRect(0, 0, width, height);

    this.drawScene();

    ctx.restore();

    this.animationFrameId = window.requestAnimationFrame(() => {
      this.frame++;

      if (this.frame >= Number.MAX_SAFE_INTEGER) this.frame = 0;
      
      this.loopAnimation();
    });
  }

  drawScene() {
    this.drawPlayer();
  }

  drawPlayer() {
    this.player.draw(this.frame);
  }
}

window.addEventListener(
  "DOMContentLoaded",
  () => {
    const spliteAnimation = new SpliteAnimation("#spliteAnimationCanvas");
  }
);