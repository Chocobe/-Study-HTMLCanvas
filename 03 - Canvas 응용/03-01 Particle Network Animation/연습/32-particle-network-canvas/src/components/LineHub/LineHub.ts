import Particle from "@/components/ParticleNetwork/Particle";

export type LineHubOptions = {
  color: string;
  lineRadius: number;
  lineWidth: number;
};

export type RGB = {
  r: string;
  g: string;
  b: string;
};

export default class LineHub {
  ctx!: CanvasRenderingContext2D;

  rgb!: RGB;
  lineRadius!: number;
  lineWidth!: number;
  
  particles!: Particle[];

  constructor({
    ctx,
    options,
    particles,
  }: {
    ctx: CanvasRenderingContext2D,
    options: LineHubOptions,
    particles: Particle[],
  }) {
    this.initCtx(ctx);
    
    this.initRGB(options);
    this.initLineRadius(options);
    this.initLineWidth(options);
    
    this.initParticles(particles);
  }

  initCtx(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
  }

  initRGB({ color }: LineHubOptions) {
    const [r, g, b] = color.match(/\d+/g) as string[];

    this.rgb = { r, g, b };
  }

  initLineRadius({ lineRadius }: LineHubOptions) {
    this.lineRadius = lineRadius;
  }

  initLineWidth({ lineWidth }: LineHubOptions) {
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
      const { position: { x: x1, y: y1 } } = sour;
      const { position: { x: x2, y: y2 } } = dest;
      const {
        ctx,
        rgb: { r, g, b },
        lineWidth,
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