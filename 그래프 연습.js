class GaugeChart {
  /** @enum { string } */
  static STEP = {
    INTRO: "intro",
    STAYING: "staying",
    ENDING: "ending",
    LOADING: "loading",
  }
  
  /** @type { HTMLCanvasElement } */
  canvas;

  /** @type { CanvasRenderingContext2D } */
  ctx;
  
  config;
  
  data;

  /** @type { number } */
  x;
  /** @type { number } */
  y;

  /** @type { STEP } */
  step;

  constructor(selector, config) {
    this.canvas = document.querySelector(selector);

    if (!this.canvas) throw new Error("잘못된 선택자 입니다.");
    
    this.ctx = this.canvas.getContext("2d");
    this.config = config;
    this.step = GaugeChart.STEP.INTRO;
  }

  setData(data) {
    this.data = data;
  }

  draw() {
    const { step } = this;

    new Promise(res => {
      switch(step) {
        case GaugeChart.STEP.INTRO: {
          this._drawIntro(res);
          break;
        }

        case GaugeChart.STEP.STAYING: {
          this._drawStaying(res);
          break;
        }

        case GaugeChart.STEP.ENDING: {
          this._drawEnding(res);
          break;
        }

        case GaugeChart.STEP.LOADING: {
          this._drawLoading(res);
          break;
        }
      }
    }).then(step => {
      setTimeout(() => {
        this.step = step
        this.draw();
      }, 1000);
    });
  }

  /** @param { () => void } res */
  _drawIntro(res) {
    console.log("intro 차트 렌더링");
    
    const { canvas, ctx } = this;
    const { width, height } = canvas;
    const radius = ((width > height ? height : width) - 20) / 2;
    ctx.save();

    ctx.strokeStyle = "#ff1493";
    ctx.lineWidth = 10;
    ctx.translate(
      Math.floor(canvas.width / 2) - 10,
      height - radius
    );

    ctx.beginPath();
    ctx.arc(
      0, 
      0, 
      radius, 
      Math.PI / 6 * 5,
      Math.PI / 6 * 13
    );

    ctx.stroke();
    res(GaugeChart.STEP.STAYING);
  }

  /** @param { () => void } res */
  _drawStaying(res) {
    console.log("staying 차트 렌더링");
  }

  /** @param { () => void } res */
  _drawEnding(res) {
    //
  }

  /** @param { () => void } res */
  _drawLoading(res) {
    //
  }
}

const gaugeChart = new GaugeChart("#myChart");
gaugeChart.draw();