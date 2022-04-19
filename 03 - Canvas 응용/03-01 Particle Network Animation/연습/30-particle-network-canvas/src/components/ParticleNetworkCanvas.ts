import {
  ParticleOptions,
  LineHubOptions,
} from "@/components/types";

import Particle from "@/components/Particle";
import LineHub from "@/components/LineHub";

export default class ParticleNetworkCanvas {
  $wrapper!: HTMLElement;
  $canvas!: HTMLCanvasElement;
  ctx!: CanvasRenderingContext2D;

  particleOptions!: ParticleOptions;
  particles!: Particle[];

  lineHubOptions!: LineHubOptions;
  lineHub!: LineHub;
  
  animationFrameId?: number;
  
  constructor(wrapperSelector: string) {
    this.initCanvas(wrapperSelector);
    this.resizeCanvas();

    this.initParticleOptions();
    this.initParticles();

    this.initLineHubOptions();
    this.initLineHub();

    this.startAnimation();

    console.log(this);
  }

  initCanvas(wrapperSelector: string) {
    const $wrapper = 
      document.querySelector(wrapperSelector) as HTMLElement;

    if (!$wrapper) {
      throw new Error(`"${wrapperSelector}" 요소를 찾을 수 없습니다.`);
    }

    const $canvas = 
      document.createElement("canvas") as HTMLCanvasElement;

    $canvas.classList.add("particleNetwork-canvasWrapper-canvas");
    
    this.$wrapper = $wrapper;
    this.$canvas = $canvas;
    this.ctx = 
      $canvas.getContext("2d") as CanvasRenderingContext2D;

    $wrapper.replaceChildren(this.$canvas);
  }

  resizeCanvas() {
    const { $wrapper, $canvas } = this;

    const { width, height } = $wrapper.getBoundingClientRect();

    $canvas.width = width;
    $canvas.height = height;
  }
  
  initParticleOptions() {
    this.particleOptions = {
      amount: 30,
      color: "rgb(255, 255, 255)",
      defaultRadius: 5,
      variantRadius: 5,
      defaultSpeed: 3,
      variantSpeed: 5,
    };
  }

  initParticles() {
    const {
      $canvas,
      particleOptions,
    } = this;

    this.particles = Array.from(
      { length: particleOptions.amount },
      () => new Particle($canvas, particleOptions)
    );
  }

  initLineHubOptions() {
    this.lineHubOptions = {
      color: "rgb(0, 181, 255)",
      lineRadius: 200,
    };
  }
  
  initLineHub() {
    const { ctx, lineHubOptions, particles } = this;

    this.lineHub = new LineHub({
      ctx,
      options: lineHubOptions,
      particles,
    });
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