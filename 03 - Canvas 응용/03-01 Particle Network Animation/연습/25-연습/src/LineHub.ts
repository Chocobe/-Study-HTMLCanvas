import RGB from "@/RGB";
import LineHubOptions from "@/LineHubOptions";
import Particle from "@/Particle";

export default class LineHub {
  private ctx!: CanvasRenderingContext2D;
  private rgb!: RGB;
  private lineRadius!: number;
  private particles!: Particle[];

  constructor(
    ctx: CanvasRenderingContext2D,
    { rgb, lineRadius }: LineHubOptions,
    particles: Particle[],
  ) {
    this.ctx = ctx;
    this.rgb = rgb;
    this.lineRadius = lineRadius;
    this.particles = particles;
  }

  draw() {
    this.particles.forEach(sour => this.lineToOthers(sour));
  }

  private lineToOthers(sour: Particle) {
    this.particles.forEach(dest => this.lineToDest(sour, dest));
  }

  private lineToDest(sour: Particle, dest: Particle) {
    const sourPosition = sour.getPosition();
    const destPosition = dest.getPosition();

    const distance = sourPosition.calcDistance(destPosition);
    const opacity = this.calcOpacity(distance);

    if (opacity > 0) {
      const {
        ctx,
        rgb: { r, g, b },
      } = this;
      const { x: x1, y: y1 } = sourPosition;
      const { x: x2, y: y2 } = destPosition;

      ctx.save();
      ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${opacity})`;

      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();

      ctx.restore();
    }
  }

  private calcOpacity(distance: number) {
    return 1 - distance / this.lineRadius;
  }
}
