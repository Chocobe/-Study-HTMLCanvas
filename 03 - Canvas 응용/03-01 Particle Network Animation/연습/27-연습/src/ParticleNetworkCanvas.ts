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

  animationFrameId!: number;
  
  constructor(canvasSelector: string) {
    this.initCanvas(canvasSelector);
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
      throw new Error(`[선택자: ${selector}] 에 대한 <canvas />를 찾을 수 없습니다.`);

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
    const {
      canvas,
      particleOptions,
    } = this;

    this.particles = Array.from(
      { length: particleOptions.amount },
      () => new Particle(canvas, particleOptions)
    );
  }

  initLineHubOptions() {
    this.lineHubOptions = new LineHubOptions();
  }

  initLineHub() {
    const {
      ctx,
      lineHubOptions,
      particles,
    } = this;
    
    this.lineHub = new LineHub(
      ctx,
      lineHubOptions,
      particles
    );
  }

  startAnimation() {
    this.loopAnimationFrames();
  }

  loopAnimationFrames() {
    const {
      ctx,
      canvas: {
        width, 
        height,
      },
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