import LineHubOptions from "./LineHubOptions";
import Particle from "./Particle";
import RGB from "./RGB";

export interface LineHubParams {
  ctx: CanvasRenderingContext2D;
  lineHubOptions: LineHubOptions;
  particles: Particle[];
}

export default class LineHub {
  _ctx!: CanvasRenderingContext2D;
  _rgb!: RGB;
  _lineRadius!: number;
  _particles!: Particle[];

  constructor({ ctx, lineHubOptions, particles }: LineHubParams) {
    this._initCtx(ctx);
    this._initRGB(lineHubOptions);
    this._initLineRadius(lineHubOptions);
    this._initParticles(particles);
  }

  _initCtx(ctx: CanvasRenderingContext2D): void {
    this._ctx = ctx;
  }

  _initRGB(lineHubOptions: LineHubOptions): void {
    const { rgb } = lineHubOptions.toJSON();
    this._rgb = rgb;
  }

  _initLineRadius(lineHubOptions: LineHubOptions): void {
    const { lineRadius } = lineHubOptions.toJSON();
    this._lineRadius = lineRadius;
  }

  _initParticles(particles: Particle[]): void {
    this._particles = particles;
  }

  draw(): void {
    this._particles.forEach(sour => this._lineToOthers(sour));
  }

  _lineToOthers(sour: Particle): void {
    this._particles.forEach(dest => this._lineToDest(sour, dest));
  }

  _lineToDest(sour: Particle, dest: Particle): void {
    const sourPosition = sour.getPosition();
    const destPosition = dest.getPosition();

    const distance = Math.abs(sourPosition.calcDistance(destPosition));
    const opacity = this._calcOpacity(distance);

    if (opacity > 0) {
      const { _ctx, _rgb } = this;
      const { r, g, b } = _rgb.toJSON();

      const { x: x1, y: y1 } = sourPosition.toJSON();
      const { x: x2, y: y2 } = destPosition.toJSON();

      _ctx.save();
      _ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${opacity})`;

      _ctx.beginPath();
      _ctx.moveTo(x1, y1);
      _ctx.lineTo(x2, y2);
      _ctx.stroke();

      _ctx.restore();
    }
  }

  _calcOpacity(distance: number): number {
    return 1 - distance / this._lineRadius;
  }
}
