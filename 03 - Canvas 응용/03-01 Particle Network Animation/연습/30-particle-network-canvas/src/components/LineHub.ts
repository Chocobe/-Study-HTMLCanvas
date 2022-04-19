import { RGB, LineHubOptions } from "@/components/types";
import Particle from "@/components/Particle";

export type LineHubConstructorParams = {
  ctx: CanvasRenderingContext2D;
  options: LineHubOptions;
  particles: Particle[];
};

export default class LineHub {
  ctx!: CanvasRenderingContext2D;

  lineRadius!: number;
  rgb!: RGB;

  particles!: Particle[];

  constructor({
    ctx,
    options,
    particles,
  }: LineHubConstructorParams) {
    this.initCtx(ctx);

    this.initLineRadius(options);
    this.initRGB(options);

    this.initParticles(particles);
  }

  initCtx(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
  }

  initLineRadius({ lineRadius }: LineHubOptions) {
    this.lineRadius = lineRadius;
  }

  initRGB({ color }: LineHubOptions) {
    const [r, g, b] = color.match(/\d+/g) as string[];

    this.rgb = { r, g, b };
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
    const distance = sour.calcDistance(dest);
    const opacity = this.calcOpacity(distance);

    if (opacity > 0) {
      const { position: {
        x: x1,
        y: y1,
      } } = sour;

      const { position: {
        x: x2,
        y: y2,
      } } = dest;

      const { ctx } = this;
      const { rgb: { r, g, b } } = this;

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