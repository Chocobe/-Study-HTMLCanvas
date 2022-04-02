// @ts-check

import PlayerImageInfo from "./PlayerImageInfo.js";

export default class SpriteAnimation {
  /** @type { HTMLCanvasElement } */
  canvas;

  /** @type { CanvasRenderingContext2D } */
  ctx;
  
  /** @type { HTMLImageElement } */
  playerImage;

  /** @type { PlayerImageInfo } */
  playerImageInfo;

  /** @type { string } */
  playerState = "idle";

  /** @type { number } */
  animationFrameId;

  /** @type { number } */
  frame = 0;
  
  /** 
   * @param { string } selector
   * @param { string } playerImageSrc 
   */
  constructor(selector, playerImageSrc) {
    this.initCanvas(selector);
    this.resizeCanvas();
    this.initPlayerImage(playerImageSrc)
      .then(() => {
        this.initPlayerImageInfo();
        this.startAnimation();

        console.log(this);
      });
  }

  /** @param { string } selector */
  initCanvas(selector) {
    this.canvas = document.querySelector(selector);
    
    if (!this.canvas || !(this.canvas instanceof HTMLCanvasElement)) {
      throw new Error(`${selector} <canvas />를 찾지 못하였습니다.`);
    }

    this.ctx = this.canvas.getContext("2d");
  }

  resizeCanvas() {
    const { canvas } = this;
    canvas.width = 500;
    canvas.height = 500;
  }

  /** @param { string } playerImageSrc */
  initPlayerImage(playerImageSrc) {
    const $image = document.createElement("img");

    const imagePromise = new Promise((res, rej) => {
      $image.addEventListener("load", () => {
        this.playerImage = $image;

        console.log($image.width);
        console.log($image.height);
        
        return res($image);
      });
  
      $image.addEventListener("error", () => {
        return rej("Player 이미지를 찾지 못하였습니다.");
      });
    });

    $image.src = playerImageSrc;

    return imagePromise;
  }

  initPlayerImageInfo() {
    this.playerImageInfo = new PlayerImageInfo(this.playerImage, 5);
  }

  startAnimation() {
    console.log("startAnimation()");

    this.loopAnimationFrame();
  }

  loopAnimationFrame() {
    const { ctx, canvas: { width, height } } = this;

    ctx.clearRect(0, 0, width, height);
    ctx.save();

    this.drawPlayer();

    ctx.restore();

    this.animationFrameId = window.requestAnimationFrame(() => {
      this.frame++;
      this.loopAnimationFrame()
    });
  }

  drawPlayer() {
    this.playerImageInfo.draw(this.canvas, this.frame, this.playerState);
  }
}

window.addEventListener(
  "DOMContentLoaded",
  () => {
    const spriteAnimation = new SpriteAnimation("#spriteAnimation-canvas", "../../assets/shadow_dog.png");

    const selector = document.querySelector(".spriteAnimation-header-controller-selector");
    selector.addEventListener("change", e => {
      /** @type { any } */
      const target = e.target;

      /** @type { HTMLSelectElement } */
      const selector = target;

      spriteAnimation.playerState = selector.value;
    });
  }
)