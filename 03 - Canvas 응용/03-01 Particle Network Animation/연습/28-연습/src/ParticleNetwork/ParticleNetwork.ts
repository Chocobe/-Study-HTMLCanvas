import ParticleOptions from "@/ParticleOptions/ParticleOptions";
import Particle from "@/Particle/Particle";
import LineHubOptions from "@/LineHubOptions/LineHubOptions";
import LineHub from "@/LineHub/LineHub";

export default class ParticleNetwork {
  canvas!: HTMLCanvasElement;
  ctx!: CanvasRenderingContext2D;

  particleOptions!: ParticleOptions;
  particles!: Particle[];

  lineHubOptions!: LineHubOptions;
  lineHub!: LineHub;
  
  animationFrameId?: number;
  
  constructor(parentSelector: string) {
    this.initCanvas(parentSelector);
    this.resizeCanvas();

    this.initParticleOptions();
    this.initParticles();

    this.initLineHubOptions();
    this.initLineHub();

    this.startAnimation();
  }

  initCanvas(parentSelector: string) {
    const $parent = document.querySelector(parentSelector);

    if (!$parent) {
      throw new Error(`선택자 [${parentSelector}] 요소를 찾을 수 없습니다.`);
    }

    this.canvas = document.createElement("canvas");
    this.canvas.classList.add("canvasWrapper-canvas");
    
    this.ctx = this.canvas.getContext("2d") as CanvasRenderingContext2D;

    $parent.appendChild(this.canvas);
  }

  resizeCanvas() {
    const { canvas } = this;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  initParticleOptions() {
    this.particleOptions = new ParticleOptions({
      amount: 50,
      color: "rgb(255, 255, 255)",
    });
  }

  initParticles() {
    const { canvas, particleOptions } = this;

    this.particles = Array.from(
      { length: particleOptions.amount },
      () => new Particle(canvas, particleOptions)
    );
  }

  initLineHubOptions() {
    this.lineHubOptions = new LineHubOptions();
  }

  initLineHub() {
    const { ctx, lineHubOptions, particles } = this;

    this.lineHub = new LineHub({
      ctx,
      lineHubOptions,
      particles,
    });
  }

  startAnimation() {
    this.loopAnimationFrames();
  }

  loopAnimationFrames() {
    const { ctx, canvas: { width, height } } = this;

    ctx.clearRect(0, 0, width, height);
    ctx.save();

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