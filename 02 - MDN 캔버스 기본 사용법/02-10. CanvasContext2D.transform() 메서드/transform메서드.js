// @ts-check

class TransformCanvas {
  /** @type { HTMLCanvasElement } */
  canvas;

  /** @type { CanvasRenderingContext2D } */
  ctx;

  /** @type { HTMLImageElement } */
  imgElement;

  /** @type { Path2D } */
  path;
  
  /** @type { number } */
  animationFrameId;

  /**
   * @type {{
   *  $scaleHorizontalAdd: HTMLButtonElement;
   *  $scaleHorizontalSub: HTMLButtonElement;
   *  $skewVerticalAdd: HTMLButtonElement;
   *  $skewVerticalSub: HTMLButtonElement;
   *  $skewHorizontalAdd: HTMLButtonElement;
   *  $skewHorizontalSub: HTMLButtonElement;
   *  $scaleVerticalAdd: HTMLButtonElement;
   *  $scaleVerticalSub: HTMLButtonElement;
   *  $translateHorizontalAdd: HTMLButtonElement;
   *  $translateHorizontalSub: HTMLButtonElement;
   *  $translateVerticalAdd: HTMLButtonElement;
   *  $translateVerticalSub: HTMLButtonElement;
   * }}
   */
  controllerElements = {
    // 수평 Scale 버튼
    $scaleHorizontalAdd: undefined,
    $scaleHorizontalSub: undefined,
    
    // 수직 Skew 버튼
    $skewVerticalAdd: undefined,
    $skewVerticalSub: undefined,

    // 수직 Skew 버튼
    $skewHorizontalAdd: undefined,
    $skewHorizontalSub: undefined,

    // 수직 Scale 버튼
    $scaleVerticalAdd: undefined,
    $scaleVerticalSub: undefined,

    // 수평 Translate 버튼
    $translateHorizontalAdd: undefined,
    $translateHorizontalSub: undefined,

    // 수직 Translate 버튼
    $translateVerticalAdd: undefined,
    $translateVerticalSub: undefined,
  }

  transform = {
    horizontalScale: 1,
    verticalSkew: 0,
    horizontalSkew: 0,
    verticalScale: 1,
    horizontalTranslate: 0,
    verticalTranslate: 0,
  };
  
  /** @param { string } selector */
  constructor(selector) {
    this.initCanvas(selector);
    this.resizeCanvas();

    this.initControllerElements();
    this.initControllerEvents();

    this.initImageElement("./Kirby.png");
    this.initPath();
  }

  /** @param { string } selector */
  initCanvas(selector) {
    this.canvas = document.querySelector(selector);
    this.ctx = this.canvas.getContext("2d");
  }

  resizeCanvas() {
    const { canvas } = this;

    const $controllerWrapper = document.querySelector(".controllerWrapper");
    const { height } = $controllerWrapper.getBoundingClientRect()
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight - height;
  }

  initControllerElements() {
    this.controllerElements = {
      // 수평 Scale 버튼
      $scaleHorizontalAdd: document.querySelector(".controller-scale-horizontal-add"),
      $scaleHorizontalSub: document.querySelector(".controller-scale-horizontal-sub"),
      
      // 수직 Skew 버튼
      $skewVerticalAdd: document.querySelector(".controller-skew-vertical-add"),
      $skewVerticalSub: document.querySelector(".controller-skew-vertical-sub"),

      // 수평 Skew 버튼
      $skewHorizontalAdd: document.querySelector(".controller-skew-horizontal-add"),
      $skewHorizontalSub: document.querySelector(".controller-skew-horizontal-sub"),

      // 수직 Scale 버튼
      $scaleVerticalAdd: document.querySelector(".controller-scale-vertical-add"),
      $scaleVerticalSub: document.querySelector(".controller-scale-vertical-sub"),

      // 수평 Translate 버튼
      $translateHorizontalAdd: document.querySelector(".controller-translate-horizontal-add"),
      $translateHorizontalSub: document.querySelector(".controller-translate-horizontal-sub"),

      // 수직 Translate 버튼
      $translateVerticalAdd: document.querySelector(".controller-translate-vertical-add"),
      $translateVerticalSub: document.querySelector(".controller-translate-vertical-sub"),
    };
  }

  initControllerEvents() {
    this.initScaleButtonEvent();
    this.initSkewButtonEvent();
    this.initTranslateButtonEvent();
  }

  // Scale 버튼 이벤트 초기화 메서드
  initScaleButtonEvent() {
    const {
      transform,

      controllerElements: {
        $scaleHorizontalAdd,
        $scaleHorizontalSub,

        $scaleVerticalAdd,
        $scaleVerticalSub,
      },
    } = this;

    $scaleHorizontalAdd.addEventListener("click", () => {
      transform.horizontalScale += 0.2;
    });

    $scaleHorizontalSub.addEventListener("click", () => {
      transform.horizontalScale -= 0.2;
    });

    $scaleVerticalAdd.addEventListener("click", () => {
      transform.verticalScale += 0.2;
    });

    $scaleVerticalSub.addEventListener("click", () => {
      transform.verticalScale -= 0.2;
    });
  }

  // Skew 버튼 이벤트 초기화 메서드
  initSkewButtonEvent() {
    const {
      transform,

      controllerElements: {
        $skewVerticalAdd,
        $skewVerticalSub,

        $skewHorizontalAdd,
        $skewHorizontalSub,
      },
    } = this;

    $skewVerticalAdd.addEventListener("click", () => {
      transform.verticalSkew += 10 * (Math.PI / 180)
    });

    $skewVerticalSub.addEventListener("click", () => {
      transform.verticalSkew -= 10 * (Math.PI / 180);
    });

    $skewHorizontalAdd.addEventListener("click", () => {
      transform.horizontalSkew += 10 * (Math.PI / 180);
    });

    $skewHorizontalSub.addEventListener("click", () => {
      transform.horizontalSkew -= 10 * (Math.PI / 180);
    });
  }

  // Translate 버튼 이벤트 초기화 메서드
  initTranslateButtonEvent() {
    const {
      transform,

      controllerElements: {
        $translateHorizontalAdd,
        $translateHorizontalSub,

        $translateVerticalAdd,
        $translateVerticalSub,
      },
    } = this;

    $translateHorizontalAdd.addEventListener("click", () => {
      transform.horizontalTranslate += 50;
    });

    $translateHorizontalSub.addEventListener("click", () => {
      transform.horizontalTranslate -= 50;
    });

    $translateVerticalAdd.addEventListener("click", () => {
      transform.verticalTranslate += 50;
    });

    $translateVerticalSub.addEventListener("click", () => {
      transform.verticalTranslate -= 50;
    });
  }

  /** @param { string } src */
  initImageElement(src) {
    this.$imgElement = document.createElement("img");

    this.$imgElement.addEventListener("load", e => {
      console.log('Image load 완료')
      console.log(e)

      this.startAnimation();
    })
    
    this.$imgElement.src = src;
  }

  initPath() {
    this.path = new Path2D();

    const [x, y] = [50, 50];
    const radius = 50;
    this.path.arc(x, y, radius, 0, Math.PI * 2);
  }

  startAnimation() {
    this.loopAnimationFrame();
  }

  loopAnimationFrame() {
    const { ctx, canvas: { width, height } } = this;

    const [a, b, c, d, e, f] = Object.values(this.transform);

    ctx.clearRect(0, 0, width, height);
    ctx.save();
    ctx.transform(a, b, c, d, e, f);

    this.drawImg();
    this.drawPath();
    
    ctx.restore();

    this.animationFrameId = window.requestAnimationFrame(
      () => this.loopAnimationFrame()
    );
  }

  drawImg() {
    this.ctx.drawImage(this.$imgElement, 0, 0);
  }

  drawPath() {
    const { ctx, path } = this;
    ctx.save();

    ctx.fillStyle = "rgb(0, 181, 255)";
    ctx.translate(200, 20);
    ctx.fill(path);

    ctx.restore();
  }
}

window.addEventListener(
  "DOMContentLoaded",
  () => {
    const transformCanvas = new TransformCanvas("#transform-canvas");
    console.log(transformCanvas);
  }
);