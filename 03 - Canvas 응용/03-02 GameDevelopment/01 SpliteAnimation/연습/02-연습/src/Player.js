// @ts-check

import PlayerFrameInfo, {
  createPlayerFrameInfoList,
} from "./PlayerFrameInfo.js";

export default class Player {
  /** @type { HTMLCanvasElement } */
  canvas;

  /** @type { CanvasRenderingContext2D } */
  ctx;
  
  /**
   * Player 이미지 경로
   * @type { string }
   */
  src = "../../assets/shadow_dog.png";

  /**
   * Player 비트맵 Element
   * @type { HTMLImageElement }
   */
  $bitmap;

  /**
   * Image 로딩 Promise - 로딩 완료 시, resolve() 호출됨
   * @type { Promise }
   */
  loadingPromise;

  /**
   * Player 비트맵 정보
   * @type { PlayerFrameInfo[] }
   */
  playerFrameInfoList;

  /** @type { string } */
  state;

  /** @type { HTMLSelectElement } */
  $stateSelector;

  /** @param { HTMLCanvasElement } canvas */
  constructor(canvas) {
    this.initCanvas(canvas);
    this.initStateSelector();
    this.initBitmap();
    this.initPlayerFrameInfoList();
  }

  /** @param { HTMLCanvasElement } canvas */
  initCanvas(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
  }

  initStateSelector() {
    this.$stateSelector = document.querySelector("#stateSelector");

    this.$stateSelector.addEventListener("change", () => {
      this.state = this.$stateSelector.value;
    });

    this.state = this.$stateSelector.value;
  }

  initBitmap() {
    this.$bitmap = document.createElement("img");

    this.loadingPromise = new Promise((res, rej) => {
      this.$bitmap.addEventListener("load", e => {
        res();
      });

      this.$bitmap.addEventListener("error", () => {
        rej("Player 이미지를 불러오지 못하였습니다.");
      });
    });

    this.$bitmap.src = this.src;
  }

  initPlayerFrameInfoList() {
    this.playerFrameInfoList = createPlayerFrameInfoList();
  }

  /**
   * @param { number } frame 
   */
  draw(frame) {
    const frameInfo = this.playerFrameInfoList
      .find(info => info.name === this.state);

    if (!frameInfo) throw new Error("Player 의 state 가 유효하지 않습니다.");

    const {
      frameRow,
      frameWidth,
      frameHeight,
      staggerFrame,
      numOfFrames,
    } = frameInfo;

    const {
      $bitmap,
      ctx,
      canvas: {
        width, height,
      },
    } = this;

    const frameCol = Math.floor(frame / staggerFrame) % numOfFrames;
    const sx = frameWidth * frameCol;
    const sy = frameHeight * frameRow;

    ctx.save();

    ctx.drawImage(
      $bitmap,
      sx, sy,
      frameWidth, frameHeight,
      0, 0,
      width, height
    );

    ctx.restore();
  }
}