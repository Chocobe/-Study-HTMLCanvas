import ParticleOptions from "@/ParticleOptions";
import Particle from "@/Particle";
import LineHubOptions from "@/LineHubOptions";
import LineHub from "@/LineHub";

export default class ParticleNetworkCanvas {
  canvas!: HTMLCanvasElement;
  ctx!: CanvasRenderingContext2D;

  particleOptions!: ParticleOptions;
  particles!: Particle[];

  lineHubOptions!: LineHubOptions;
  lineHub!: LineHub;

  animationFrameId?: number;

  constructor(selector: string) {
    this.initCanvas(selector);
    this.resizeCanvas();

    this.initParticleOptions();
    this.initParticles();

    this.initLineHubOptions();
    this.initLineHub();

    this.startAnimation();
  }

  initCanvas(selector: string) {
    this.canvas = document.querySelector(selector) as HTMLCanvasElement;

    if (!this.canvas || !(this.canvas instanceof HTMLCanvasElement))
      throw new Error(`${selector} <canvas />를 찾지 못하였습니다.`);

    this.ctx = this.canvas.getContext("2d") as CanvasRenderingContext2D;
  }

  resizeCanvas() {
    const { canvas } = this;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  initParticleOptions() {
    this.particleOptions = new ParticleOptions();
  }

  initParticles() {
    const { particleOptions, canvas } = this;

    this.particles = Array.from(
      { length: particleOptions.amount },
      () => new Particle(canvas, particleOptions),
    );
  }

  initLineHubOptions() {
    this.lineHubOptions = new LineHubOptions();
  }

  initLineHub() {
    this.lineHub = new LineHub(this.lineHubOptions, this.particles);
  }

  startAnimation() {
    this.loopAnimationFrame();
  }

  loopAnimationFrame() {
    const {
      ctx,
      canvas: { width, height },
    } = this;

    ctx.clearRect(0, 0, width, height);
    ctx.save();

    this.draw();

    this.animationFrameId = window.requestAnimationFrame(() =>
      this.loopAnimationFrame(),
    );
  }

  draw() {
    this.drawParticles();
    this.drawLineHub();
  }

  drawParticles() {
    const { particles, ctx } = this;

    particles.forEach(particle => particle.draw(ctx));
  }

  drawLineHub() {
    const { lineHub, ctx } = this;

    lineHub.draw(ctx);
  }
}
