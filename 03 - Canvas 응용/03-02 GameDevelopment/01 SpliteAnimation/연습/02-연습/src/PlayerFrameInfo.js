// @ts-check

export default class PlayerFrameInfo {
  /**
   * Frame 명
   * @type { string }
   */
  name;

  /**
   * 1 Frame 에 대한 width
   * @type { number }
   */
  frameWidth;

  /**
   * 1 Frame 에 대한 height
   * @type { number }
   */
  frameHeight;

  /**
   * Frame 전환 단위값
   * @type { number }
   */
  staggerFrame;

  /**
   * Bitmap 상의 Row
   * @type { number }
   */
  frameRow;

  /**
   * Frame 총 개수
   * @type { number }
   */
  numOfFrames;

  /**
   * @param {{
   *  name: string;
   *  frameWidth?: number;
   *  frameHeight?: number;
   *  staggerFrame?: number;
   *  frameRow: number;
   *  numOfFrames: number;
   * }} params
   */
  constructor({
    name,
    frameWidth = 575,
    frameHeight = 523,
    staggerFrame = 5,
    frameRow,
    numOfFrames,
  }) {
    this.name = name;
    this.frameWidth = frameWidth;
    this.frameHeight = frameHeight;
    this.staggerFrame = staggerFrame;
    this.frameRow = frameRow;
    this.numOfFrames = numOfFrames;
  }
}

export const createPlayerFrameInfoList = () => {
  return [
    new PlayerFrameInfo({
      name: "idle",
      frameRow: 0,
      numOfFrames: 7,
    }),

    new PlayerFrameInfo({
      name: "jump",
      frameRow: 1,
      numOfFrames: 7,
      // staggerFrame: 10,
    }),

    new PlayerFrameInfo({
      name: "fall",
      frameRow: 2,
      numOfFrames: 7,
    }),

    new PlayerFrameInfo({
      name: "run",
      frameRow: 3,
      numOfFrames: 9,
      staggerFrame: 2,
    }),

    new PlayerFrameInfo({
      name: "dizzy",
      frameRow: 4,
      numOfFrames: 11,
    }),

    new PlayerFrameInfo({
      name: "sit",
      frameRow: 5,
      numOfFrames: 5,
    }),

    new PlayerFrameInfo({
      name: "roll",
      frameRow: 6,
      numOfFrames: 7,
    }),

    new PlayerFrameInfo({
      name: "bite",
      frameRow: 7,
      numOfFrames: 7,
    }),

    new PlayerFrameInfo({
      name: "ko",
      frameRow: 8,
      numOfFrames: 12,
      staggerFrame: 10,
    }),

    new PlayerFrameInfo({
      name: "gethit",
      frameRow: 9,
      numOfFrames: 4,
    }),
  ];
};