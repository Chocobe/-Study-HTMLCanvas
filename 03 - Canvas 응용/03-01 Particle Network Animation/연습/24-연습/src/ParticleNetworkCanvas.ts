import LineHub from "./LineHub";
import LineHubOptions from "./LineHubOptions";
import Particle from "./Particle";
import ParticleOptions from "./ParticleOptions";

export interface ParticleNetworkCanvasParams {
  selector: string;
}

export default class ParticleNetworkCanvas {
  // ``변수!`` 는 확정 할당 어설션 (Definite Assignment Assersions) 입니다.
  _canvas!: HTMLCanvasElement;
  _ctx!: CanvasRenderingContext2D;

  _particleOptions!: ParticleOptions;
  _particles!: Particle[];

  _lineHubOptions!: LineHubOptions;
  _lineHub!: LineHub;

  _animationFrameId?: number;

  constructor(params: ParticleNetworkCanvasParams) {
    this._initCanvas(params);
    this._resizeCanvas();

    this._initParticleOptions();
    this._initParticles();

    this._initLineHubOptions();
    this._initLineHub();

    this._startAnimation();
  }

  _initCanvas({ selector }: ParticleNetworkCanvasParams): void {
    const canvas = document.querySelector(selector);

    if (!(canvas instanceof HTMLCanvasElement)) {
      throw new Error(`<canvas id="${selector}" /> 를 찾지 못하였습니다.`);
    }

    this._canvas = canvas;
    this._ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
  }

  _resizeCanvas(): void {
    const { _canvas } = this;

    _canvas.width = window.innerWidth;
    _canvas.height = window.innerHeight;
  }

  _initParticleOptions(): void {
    this._particleOptions = new ParticleOptions();
  }

  _initParticles(): void {
    const { _canvas, _particleOptions } = this;
    const { amount } = _particleOptions.toJSON();

    this._particles = Array.from({ length: amount }, () => {
      return new Particle({
        canvas: _canvas,
        particleOptions: _particleOptions,
      });
    });
  }

  _initLineHubOptions(): void {
    this._lineHubOptions = new LineHubOptions();
  }

  _initLineHub(): void {
    const { _ctx, _lineHubOptions, _particles } = this;

    this._lineHub = new LineHub({
      ctx: _ctx,
      lineHubOptions: _lineHubOptions,
      particles: _particles,
    });
  }

  _startAnimation(): void {
    this._loopAnimationFrame();
  }

  _loopAnimationFrame(): void {
    const {
      _ctx,
      _canvas: { width, height },
    } = this;

    _ctx.clearRect(0, 0, width, height);

    this._draw();

    this._animationFrameId = window.requestAnimationFrame(() =>
      this._loopAnimationFrame(),
    );
  }

  _draw(): void {
    this._drawParticles();
    this._drawLineHub();
  }

  _drawParticles(): void {
    this._particles.forEach(particle => particle.draw());
  }

  _drawLineHub(): void {
    this._lineHub.draw();
  }
}
