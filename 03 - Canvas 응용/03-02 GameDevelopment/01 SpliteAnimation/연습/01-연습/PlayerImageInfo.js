// @ts-check

export default class PlayerImageInfo {
  /** @type { HTMLImageElement } */
  playerImage;
  
  /** @type { number } */
  staggerFrames;
  
  /** @type { number } */
  bitmapWidth;

  /** @type { number } */
  bitmapHeight;

  /** @type { number } */
  frameWidth = 575;

  /** @type { number } */
  frameHeight = 523;

  frameInfo = {
    idle: {
      row: 0,
      numOfFrames: 7,
    },

    jump: {
      row: 1,
      numOfFrames: 7,
    },

    fall: {
      row: 2,
      numOfFrames: 7,
    },

    run: {
      row: 3,
      numOfFrames: 9,
    },

    dizzy: {
      row: 4,
      numOfFrames: 11,
    },

    sit: {
      row: 5,
      numOfFrames: 5,
    },

    roll: {
      row: 6,
      numOfFrames: 7,
    },

    bite: {
      row: 7,
      numOfFrames: 7,
    },

    ko: {
      row: 8,
      numOfFrames: 12,
    },

    gethit: {
      row: 9,
      numOfFrames: 4,
    },
  };

  /** 
   * @param { HTMLImageElement } playerImage 
   * @param { number } staggerFrames
   */
  constructor(playerImage, staggerFrames) {
    this.playerImage = playerImage;
    this.staggerFrames = staggerFrames;

    this.initBitmapSize(playerImage);
  }

  /** @param { HTMLImageElement } playerImage */
  initBitmapSize({ width, height }) {
    this.bitmapWidth = width;
    this.bitmapHeight = height;
  }

  /**
   * @param { HTMLCanvasElement } canvas 
   * @param { number } frame 
   * @param { string } stateName 
   */
  draw(canvas, frame, stateName) {
    /** @type { CanvasRenderingContext2D } */
    const ctx = canvas.getContext("2d");
    const { width, height } = canvas;
    const { 
      playerImage, staggerFrames, frameInfo,
      frameWidth, frameHeight,
    } = this;

    const curFrameInfo = frameInfo[stateName];

    const col = Math.floor(frame / staggerFrames) % curFrameInfo.numOfFrames;

    ctx.drawImage(
      playerImage,
      col * frameWidth, curFrameInfo.row * frameHeight,
      frameWidth, frameHeight,
      0, 0,
      width, height
    )
  }
}