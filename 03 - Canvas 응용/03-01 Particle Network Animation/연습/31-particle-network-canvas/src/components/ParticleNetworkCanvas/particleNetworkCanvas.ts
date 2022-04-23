import Particle, {
  ParticleOptions,
} from "./Particle";

import LineHub, {
  LineHubOptions,
} from "./LineHub";

export type ParticleNetworkCanvasConstructor = ConstructorParameters<
  typeof ParticleNetworkCanvas
>[0];

export default class ParticleNetworkCanvas {
  $canvas!: HTMLCanvasElement;
  ctx!: CanvasRenderingContext2D;

  particleOptions!: ParticleOptions;
  particles!: Particle[];

  lineHubOptions!: LineHubOptions;
  lineHub!: LineHub;
  
  animationFrameId!: number;
  
  constructor({ $canvas, width, height }: {
    $canvas: HTMLCanvasElement,
    width: number,
    height: number,
  }) {
    this.initCanvas($canvas);
    this.resizeCanvas(width, height);

    this.initParticleOptions();
    this.initParticles();

    this.initLineHubOptions();
    this.initLineHub();

    this.startAnimation();

    console.log(this);
  }

  initCanvas($canvas: HTMLCanvasElement) {
    this.$canvas = $canvas;
    this.ctx = $canvas.getContext("2d") as CanvasRenderingContext2D;
  }

  resizeCanvas(width: number, height: number) {
    const { $canvas } = this;

    $canvas.width = width;
    $canvas.height = height;
  }

  initParticleOptions() {
    this.particleOptions = {
      amount: 30,
      color: "rgb(255, 255, 255)",
      defaultRadius: 5,
      variantRadius: 10,
      defaultSpeed: 3,
      variantSpeed: 5,
    };
  }

  initParticles() {
    const { $canvas, particleOptions } = this;

    this.particles = Array.from(
      { length: particleOptions.amount },
      () => new Particle({
        $canvas,
        options: particleOptions,
      })
    );
  }

  initLineHubOptions() {
    this.lineHubOptions = {
      color: "rgb(0, 181, 255)",
      lineRadius: 200,
      lineWidth: 4,
    };
  }

  initLineHub() {
    const { ctx, lineHubOptions, particles } = this;

    this.lineHub = new LineHub({
      ctx,
      options: lineHubOptions,
      particles,
    })
  }
  
  startAnimation() {
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

    this.animationFrameId = window.requestAnimationFrame(
      () => this.loopAnimationFrames()
    );
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