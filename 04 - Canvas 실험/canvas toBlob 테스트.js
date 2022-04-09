// @ts-check

class MyCanvas {
  /** @type { HTMLCanvasElement } */
  canvas;

  /** @type { CanvasRenderingContext2D } */
  ctx;

  /** @type { HTMLImageElement } */
  $img;

  /** @param { string } selector */
  constructor(selector) {
    this.initCanvas(selector);
    this.resizeCanvas();
  }

  /** @param { string } selector */
  initCanvas(selector) {
    this.canvas = document.querySelector(selector);
    this.ctx = this.canvas.getContext("2d");

    console.log(this);
  }

  resizeCanvas() {
    const { canvas } = this;

    canvas.width = 400;
    canvas.height = 400;

    canvas.style.backgroundColor = "#ff1493";
  }

  /** @param { string | MyCanvas } src */
  drawImage(src) {
    if (typeof src === "string") {
      this.$img = document.createElement("img");
      
      this.$img.onload = () => {
        console.log("setImage 의 onload 호출");
        
        const { canvas, $img } = this;

        this.ctx.drawImage(
          $img,
          0, 0, $img.width, $img.height,
          0, 0, canvas.width, canvas.height
        );
      }

      this.$img.src = src;
    } else {
      const { canvas: destCanvas } = src;
      const { canvas } = this;
      
      this.ctx.drawImage(
        destCanvas,
        0, 0, destCanvas.width, destCanvas.height,
        0, 0, canvas.width, canvas.height
      );
    }
  }

  /**
   * @param { number } x 
   * @param { number } y 
   * @param { number } width 
   * @param { number } height 
   * @param { string } color 
   */
  drawRectangle(x, y, width, height, color) {
    const { ctx } = this;

    ctx.save();

    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);

    ctx.fillStyle = "#fff";
    ctx.font = "50px bold";
    ctx.fillText("Hello World", x, y);

    ctx.restore();
  }

  /**
   * @param { number } scaleX 
   * @param { number } skewY 
   * @param { number } skewX 
   * @param { number } scaleY 
   * @param { number } translateX 
   * @param { number } translateY 
   */
  translate(
    scaleX, skewY, skewX, scaleY, translateX, translateY
  ) {
    const { ctx } = this;

    ctx.transform(scaleX, skewY, skewX, scaleY, translateX, translateY);
  }

  createBlob() {
    return new Promise(res => {
      this.canvas.toBlob(blob => {
        res(blob);
      });
    });
  }
}

window.addEventListener(
  "DOMContentLoaded",
  async () => {
    const sourCanvas = new MyCanvas("#sourCanvas");
    const destCanvas = new MyCanvas("#destCanvas");

    const transform = {
      // scaleX: 2,
      // scaleY: 2,
      
      scaleX: 1,
      scaleY: 1,

      // skewX: Math.PI / 180 * 10,
      // skewY: Math.PI / 180 * -10,

      skewX: 0,
      skewY: 0,
      
      translateX: 0,
      translateY: 0,

      // translateX: -(100 - 0) / 1.5,
      // translateY: -(100 - 0) / 1.5,
    };

    await new Promise(res => {
      setTimeout(() => {
        sourCanvas.translate(
          transform.scaleX,
          transform.skewX,
          transform.skewY,
          transform.scaleY,
          transform.translateX,
          transform.translateY,
        );

        sourCanvas.drawImage("./assets/java_01.jpg");
        res();
      }, 500);
    });

    await new Promise(res => {
      setTimeout(() => {
        destCanvas.drawImage(sourCanvas);
        res();
      }, 500);
    });

    setTimeout(() => {
      destCanvas.translate(
        transform.scaleX,
        transform.skewX,
        transform.skewY,
        transform.scaleY,
        transform.translateX,
        transform.translateY,
      );

      destCanvas.drawRectangle(100, 100, 200, 200, "rgba(180, 50, 80, 0.5)");
    }, 500);
  }
);