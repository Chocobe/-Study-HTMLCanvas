export default class SpriteAnimation {
  $canvas!: HTMLCanvasElement;
  ctx!: CanvasRenderingContext2D;

  $bitmap!: HTMLImageElement;

  frames = 0;
  animationFrameId!: number;

  constructor() {
    this.initCanvas();
    this.resizeCanvas();

    this.drawPlayer();
  }

  initCanvas() {
    const $parent = document.querySelector(".spriteAnimation-main-canvasWrapper");

    if (!$parent) {
      throw new Error("<canvas /> 의 부모요소를 찾지 못하였습니다.");
    }

    const $canvas = document.createElement("canvas");
    $canvas.classList.add("spriteAnimation-main-canvasWrapper-canvas");
    
    this.$canvas = $canvas;
    this.ctx = $canvas.getContext("2d") as CanvasRenderingContext2D;

    $parent.replaceChildren($canvas);
  }

  resizeCanvas() {
    const { $canvas } = this;

    $canvas.width = 200;
    $canvas.height = 200;
  }

  drawPlayer() {
    const $img = new Image();
    
    $img.onload = () => {
      this.$bitmap = $img;

      this.loopAnimationFrames();
    }

    $img.src = "../assets/kirby_sprite_sheet.png";
  }

  loopAnimationFrames() {
    const {
      ctx,
      $canvas: {
        width: canvasWidth,
        height: canvasHeight,
      },
      $bitmap,
      frames,
    } = this;

    const staggerFrames = 15;
    
    const row = 0;
    const col = Math.floor(frames / staggerFrames) % 10;

    const bitmapWidth = 29;
    const bitmapHeight = 25;

    const bitmapX = col * bitmapWidth;
    const bitmapY = row * bitmapHeight;

    ctx.save();
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    ctx.drawImage(
      $bitmap,
      bitmapX, bitmapY, bitmapWidth, bitmapHeight,
      0, 0, canvasWidth, canvasHeight
    );

    ctx.restore();

    this.animationFrameId = 
      window.requestAnimationFrame(() => {
        this.frames++;

        if (this.frames >= Number.MAX_SAFE_INTEGER) {
          this.frames = 0;
        }

        this.loopAnimationFrames();
      });
  }
}