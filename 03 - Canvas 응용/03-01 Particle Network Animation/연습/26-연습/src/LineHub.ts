import LineHubOptions from "@/LineHubOptions";
import Particle from "@/Particle";

export default class LineHub {
  lineRadius!: number;
  rgb!: {
    r: string;
    g: string;
    b: string;
  };
  particles!: Particle[];

  constructor(options: LineHubOptions, particles: Particle[]) {
    this.initOptions(options);
    this.initParticles(particles);
  }

  initOptions({ lineRadius, rgb }: LineHubOptions) {
    this.lineRadius = lineRadius;
    this.rgb = rgb;
  }

  initParticles(particles: Particle[]) {
    this.particles = particles;
  }

  draw(ctx: CanvasRenderingContext2D) {
    this.particles.forEach(sour => this.lineToOthers(ctx, sour));
  }

  lineToOthers(ctx: CanvasRenderingContext2D, sour: Particle) {
    this.particles.forEach(dest => this.lineToDest(ctx, sour, dest));
  }

  lineToDest(ctx: CanvasRenderingContext2D, sour: Particle, dest: Particle) {
    const distance = sour.calcDistance(dest);
    const opacity = this.calcOpacity(distance);

    if (opacity > 0) {
      const {
        rgb: { r, g, b },
      } = this;
      const { x: x1, y: y1 } = sour;
      const { x: x2, y: y2 } = dest;

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
    return 1 - distance / this.lineRadius;
  }
}
