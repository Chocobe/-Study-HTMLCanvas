import Particle from "./Particle";

export type RGB = {
  r: string;
  g: string;
  b: string;
};

export type LineHubOptions = {
  rgb: RGB;
  lineRadius: number;
  lineWidth: number;
};

export default class LineHub {
  ctx!: CanvasRenderingContext2D;
  rgb!: RGB;

  lineRadius!: number;
  lineWidth!: number;

  particles!: Particle[];

  constructor({ ctx, options, particles }: {
    ctx: CanvasRenderingContext2D,
    options: LineHubOptions,
    particles: Particle[],
  }) {
    this.initCtx(ctx);
    this.initOptions(options);
    this.initParticles(particles);
  }

  initCtx(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
  }

  initOptions({ rgb, lineRadius, lineWidth }: LineHubOptions) {
    this.rgb = rgb;
    this.lineRadius = lineRadius;
    this.lineWidth = lineWidth;
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
      const { x: x1, y: y1 } = sour.position;
      const { x: x2, y: y2 } = dest.position;

      const {
        ctx,
        lineWidth,
        rgb: { r, g, b },
      } = this;

      ctx.save();
      ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${opacity})`;
      ctx.lineWidth = lineWidth;

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