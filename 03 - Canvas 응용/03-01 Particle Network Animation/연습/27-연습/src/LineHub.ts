import LineHubOptions from "./LineHubOptions";
import Particle from "./Particle";

export default class LineHub {
  ctx!: CanvasRenderingContext2D;
  
  lineRadius!: number;
  rgb!: {
    r: string;
    g: string;
    b: string;
  };

  particles!: Particle[];
  
  constructor(
    ctx: CanvasRenderingContext2D,
    lineHubOptions: LineHubOptions,
    particles: Particle[]
  ) {
    this.initCtx(ctx);
    this.initOptions(lineHubOptions);
    this.initParticles(particles);
  }

  initCtx(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
  }

  initOptions({
    lineRadius,
    rgb,
  }: LineHubOptions) {
    this.lineRadius = lineRadius;
    this.rgb = rgb;
  }

  initParticles(particles: Particle[]) {
    this.particles = particles;
  }

  draw() {
    this.particles.forEach(sour => this.lineToOthers(sour));
  }

  lineToOthers(sour: Particle) {
    this.particles.forEach(dest => this.lineToDest(sour, dest));
  }

  lineToDest(sour: Particle, dest: Particle) {
    const distance = Math.abs(sour.calcDistance(dest));
    const opacity = this.calcOpacity(distance);

    if (opacity > 0) {
      const { x: x1, y: y1 } = sour;
      const { x: x2, y: y2 } = dest;

      const {
        ctx,
        rgb: { r, g, b },
      } = this;

      ctx.save();
      ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${opacity})`;

      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();

      ctx.restore();
    }
  }

  calcOpacity(distance: number) {
    return 1 - (distance / this.lineRadius);
  }
}