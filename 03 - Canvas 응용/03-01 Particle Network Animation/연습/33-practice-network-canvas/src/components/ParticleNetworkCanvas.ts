import Particle, { 
  ParticleOptions
} from "./Particle";

import LineHub, {
  LineHubOptions,
} from "./LineHub";

export default class ParticleNetworkCanvas {
  $canvas!: HTMLCanvasElement;
  ctx!: CanvasRenderingContext2D;

  particleOptions!: ParticleOptions;
  particles!: Particle[];

  lineHubOptions!: LineHubOptions;
  lineHub!: LineHub;

  animationFrameId?: number;
  
  constructor($wrapper: HTMLElement) {
    this.initCanvas($wrapper);
    this.resizeCanvas();

    this.initParticleOptions();
    this.initParticles();

    this.initLineHubOptions();
    this.initLineHub();

    console.log(this);

    this.startAnimationFrame();
  }

  initCanvas($wrapper: HTMLElement) {
    const $canvas = document.createElement("canvas") as HTMLCanvasElement;
    const ctx = $canvas.getContext("2d") as CanvasRenderingContext2D;

    $canvas.classList.add("app-canvasWrapper-canvas");

    $wrapper?.replaceChildren($canvas);

    this.$canvas = $canvas;
    this.ctx = ctx;
  }

  resizeCanvas() {
    const { $canvas } = this;
    const $parent = $canvas.parentElement;

    $canvas.width = $parent?.clientWidth as number;
    $canvas.height = $parent?.clientHeight as number;
  }

  initParticleOptions() {
    this.particleOptions = {
      amount: 50,
      color: "rgb(255, 255, 255)",
      defaultRadius: 3,
      variantRadius: 10,
      defaultSpeed: 3,
      variantSpeed: 5,
    };
  }
  
  initParticles() {
    const {
      $canvas,
      ctx,
      particleOptions,
    } = this;
    
    this.particles = Array.from(
      { length: particleOptions.amount },
      () => new Particle({ $canvas, ctx, options: particleOptions })
    );
  }
  
  initLineHubOptions() {
    this.lineHubOptions = {
      rgb: {
        r: "0",
        g: "181",
        b: "255",
      },
      lineRadius: 200,
      lineWidth: 3,
    };
  }
  
  initLineHub() {
    const { ctx, lineHubOptions, particles } = this;

    this.lineHub = new LineHub({ ctx, options: lineHubOptions, particles });
  }
  
  startAnimationFrame() {
    this.loopAnimationFrames();
  }

  loopAnimationFrames() {
    const {
      ctx,
      $canvas: { width, height },
    } = this;

    ctx.save();
    ctx.clearRect(0, 0, width, height);
    
    this.drawScene();

    ctx.restore();

    this.animationFrameId = window.requestAnimationFrame(() => {
      this.loopAnimationFrames();
    });
  }

  drawScene() {
    this.drawParticles();
    this.drawLineHub();
  }

  drawParticles() {
    this.particles.forEach(particle => particle.draw());
  }

  drawLineHub() {
    this.lineHub.draw();
  }
}