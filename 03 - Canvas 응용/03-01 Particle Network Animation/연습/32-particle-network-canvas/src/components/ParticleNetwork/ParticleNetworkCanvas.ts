import Particle, {
  ParticleOptions,
} from "@/components/ParticleNetwork/Particle";

import LineHub, {
  LineHubOptions,
} from "@/components/LineHub/LineHub";

export type ParticleNetworkCanvasConstructorParams = ConstructorParameters<
  typeof ParticleNetworkCanvas
>[0];

export default class ParticleNetworkCanvas {
  $canvas!: HTMLCanvasElement;
  ctx!: CanvasRenderingContext2D;

  particleOptions!: ParticleOptions;
  particles!: Particle[];

  lineHubOptions!: LineHubOptions;
  lineHub!: LineHub;
  
  animationFrameId?: number;

  constructor({
    wrapperSelector,
    canvasStyleClass,
  }: {
    wrapperSelector: string;
    canvasStyleClass: string;
  }) {
    this.initCanvas(wrapperSelector, canvasStyleClass);
    this.resizeCanvas();

    this.initParticleOptions();
    this.initParticles();

    this.initLineHubOptions();
    this.initLineHub();

    this.startAnimation();

    console.log(this);
  }

  initCanvas(wrapperSelector: string, canvasStyleClass: string) {
    const $wrapper = document.querySelector(wrapperSelector);

    if (!$wrapper) {
      throw new Error(`"${wrapperSelector} 요소를 찾을 수 없습니다.`);
    }

    const $canvas = document.createElement("canvas") as HTMLCanvasElement;
    $canvas.classList.add(canvasStyleClass.replace(/^\./, ""));

    this.$canvas = $canvas;
    this.ctx = $canvas.getContext("2d") as CanvasRenderingContext2D;

    $wrapper.replaceChildren($canvas);
  }

  resizeCanvas() {
    const { $canvas } = this;
    const $parent = $canvas.parentElement as HTMLElement;
    const {
      width,
      height,
    } = $parent?.getBoundingClientRect();

    $canvas.width = width;
    $canvas.height = height;
  }

  initParticleOptions() {
    this.particleOptions = {
      amount: 50,
      color: "rgb(255, 255, 255)",
      defaultRadius: 5,
      variantRadius: 10,
      defaultSpeed: 3,
      variantSpeed: 5,
    }
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
      lineRadius: 250,
      lineWidth: 3,
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
      $canvas: {
        width, height,
      },
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