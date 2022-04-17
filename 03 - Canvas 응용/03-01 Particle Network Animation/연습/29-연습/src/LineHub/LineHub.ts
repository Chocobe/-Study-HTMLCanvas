import Particle from "@/Particle/Particle";

export type LineHubOptions = {
  rgb: {
    r: string;
    g: string;
    b: string;
  },

  lineRadius: number;
}

export default class LineHub {
  ctx!: CanvasRenderingContext2D;
  
  rgb!: {
    r: string;
    g: string;
    b: string;
  };

  lineRadius!: number;

  particles!: Particle[];

  constructor({
    ctx,
    options,
    particles,
  }: {
    ctx: CanvasRenderingContext2D;
    options: LineHubOptions;
    particles: Particle[];
  }) {
    this.initCtx(ctx);
    this.initOptions(options);
    this.initParticles(particles);
  }

  initCtx(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
  }

  initOptions({ rgb, lineRadius }: LineHubOptions) {
    this.rgb = rgb;
    this.lineRadius = lineRadius;
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
      const {
        ctx,
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
    return 1 - (distance / this.lineRadius);
  }
}