import ParticleOptions from "@/ParticleOptions";
import Particle from "@/Particle";

import LineHubOptions from "@/LineHubOptions";
import LineHub from "@/LineHub";

export default class ParticleNetworkCanvas {
  private canvas!: HTMLCanvasElement;
  private ctx!: CanvasRenderingContext2D;

  private particleOptions!: ParticleOptions;
  private particles!: Particle[];

  private lineHubOptions!: LineHubOptions;
  private lineHub!: LineHub;

  private animationFrameId?: number;

  constructor(selector: string) {
    this.initCanvas(selector);
    this.resizeCanvas();

    this.initParticleOptions();
    this.initParticles();

    this.initLineHubOptions();
    this.initLineHub();

    this.startAnimation();
  }

  private initCanvas(selector: string) {
    this.canvas = document.querySelector(selector) as HTMLCanvasElement;

    if (!this.canvas)
      throw new Error(`${selector} 에 대한 <canvas />를 찾지 못하였습니다.`);

    this.ctx = this.canvas.getContext("2d") as CanvasRenderingContext2D;
  }

  resizeCanvas() {
    const { canvas } = this;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  private initParticleOptions() {
    this.particleOptions = new ParticleOptions();
  }

  private initParticles() {
    const { canvas, particleOptions } = this;

    this.particles = Array.from(
      { length: particleOptions.amount },
      () => new Particle(canvas, particleOptions),
    );
  }

  private initLineHubOptions() {
    this.lineHubOptions = new LineHubOptions();
  }

  private initLineHub() {
    const { ctx, lineHubOptions, particles } = this;

    this.lineHub = new LineHub(ctx, lineHubOptions, particles);
  }

  startAnimation() {
    this.loopAnimationFrame();
  }

  private loopAnimationFrame() {
    const {
      ctx,
      canvas: { width, height },
    } = this;

    ctx.clearRect(0, 0, width, height);

    this.drawScene();

    this.animationFrameId = window.requestAnimationFrame(() =>
      this.loopAnimationFrame(),
    );
  }

  private drawScene() {
    this.drawParticles();
    this.drawLineHub();
  }

  private drawParticles() {
    this.particles.forEach(particle => particle.draw());
  }

  private drawLineHub() {
    this.lineHub.draw();
  }
}
