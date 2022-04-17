import Particle, {
  ParticleOptions,
} from "@/Particle/Particle";

import LineHub, {
  LineHubOptions,
} from "@/LineHub/LineHub";

// TODO: Options 데이터는 JSON 으로 받아오기
import particleOptionsJSON from "@/Particle/particleOptions.json";
import lineHubOptionsJSON from "@/LineHub/lineHubOptions.json";

export default class ParticleNetwork {
  $canvas!: HTMLCanvasElement;
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
    const $wrapper = document.querySelector(parentSelector);

    if (!$wrapper) {
      throw new Error(`<canvas /> 의 부모요소를 찾지 못하였습니다.`);
    }

    const $canvas = document.createElement("canvas");
    $canvas.classList.add(
      `${parentSelector.replace(/^(\.|#)/, "")}-canvas`
    );


    this.$canvas = $canvas;
    this.ctx = $canvas.getContext("2d") as CanvasRenderingContext2D;

    $wrapper.replaceChildren(this.$canvas);
  }

  resizeCanvas() {
    const { $canvas } = this;

    $canvas.width = window.innerWidth;
    $canvas.height = window.innerHeight;
  }

  initParticleOptions() {
    this.particleOptions = particleOptionsJSON;

    // this.particleOptions = {
    //   amount: 50,
    //   color: "rgb(255, 255, 255)",
    //   defaultRadius: 5,
    //   variantRadius: 10,
    //   defaultSpeed: 3,
    //   variantSpeed: 5,
    // };
  }

  initParticles() {
    const { particleOptions, $canvas } = this;

    this.particles = Array.from(
      { length: particleOptions.amount },
      () => new Particle($canvas, particleOptions)
    );
  }

  initLineHubOptions() {
    this.lineHubOptions = lineHubOptionsJSON;
    
    // const color = "rgb(0, 181, 255)";
    // const [ r, g, b ] = color.match(/\d+/g) as string[];
    // const rgb = { r, g, b };

    // this.lineHubOptions = {
    //   rgb,
    //   lineRadius: 200,
    // };
  }

  initLineHub() {
    const {
      ctx,
      lineHubOptions: options,
      particles,
    } = this;

    this.lineHub = new LineHub({
      ctx,
      options,
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