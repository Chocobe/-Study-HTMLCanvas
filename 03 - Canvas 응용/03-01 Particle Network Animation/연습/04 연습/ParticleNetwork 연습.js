// @ts-check;

class ParticleNetworkOptions {
  /** @type { number } */
  particleAmount;

  /** @type { string } */
  particleColor;

  /** @type { number } */
  defaultRadius;

  /** @type { number } */
  variantRadius;

  /** @type { number } */
  defaultSpeed;

  /** @type { number } */
  variantSpeed;

  /** @type { number } */
  lineRadius;

  /** @type { string } */
  lineColor;

  /**
   * @param {{
   *  particleAmount: number
   *  particleColor: string
   *  defaultRadius: number
   *  variantRadius: number
   *  defaultSpeed: number
   *  variantSpeed: number
   *  lineRadius: number
   *  lineColor: string
   * }}
   */
  constructor({
    particleAmount,
    particleColor,
    defaultRadius,
    variantRadius,
    defaultSpeed,
    variantSpeed,
    lineRadius,
    lineColor,
  } = {}) {
    this.particleAmount = particleAmount ?? 30;
    this.particleColor = particleColor ?? "rgb(255, 255, 255)";
    this.defaultRadius = defaultRadius ?? 3;
    this.variantRadius = variantRadius ?? 3;
    this.defaultSpeed = defaultSpeed ?? 2;
    this.variantSpeed = variantSpeed ?? 2;
    this.lineRadius = lineRadius ?? 150;
    this.lineColor = lineColor ?? "rgb(0, 181, 255)";
  }
}

class ParticleNetworkCanvas {
  /** @type { HTMLCanvasElement } */
  canvas;

  /** @type { CanvasRenderingContext2D } */
  ctx;

  /** @type { number } */
  frameId;

  /** @type { ParticleNetworkOptions } */
  options;

  /** @type { Particle[] } */
  particles;

  /** @type { LineHub } */
  lineHub;

  /** @param { string } selector */
  constructor(selector) {
    this.initCanvas(selector);
    this.initCanvasSize();
    this.initOptions();

    this.initParticles();
    this.initLineHub();

    this.startAnimation();
  }

  /** @param { string } selector */
  initCanvas(selector) {
    this.canvas = document.querySelector(selector);
    this.ctx = this.canvas.getContext("2d");
  }

  initCanvasSize() {
    const { canvas } = this;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  
  initOptions() {
    this.options = new ParticleNetworkOptions();
  }

  initParticles() {
    const { options: { particleAmount } } = this;
    this.particles = Array.from(
      { length: particleAmount },
      () => new Particle(this.canvas, this.options),
    );
  }

  initLineHub() {
    this.lineHub = new LineHub(this.particles, this.ctx, this.options);
  }

  startAnimation() {
    this.animateFrame();
  }

  animateFrame() {
    const { canvas: { width, height }, ctx } = this;

    ctx.clearRect(0, 0, width, height);

    this.drawScene();

    this.frameId = requestAnimationFrame(() => this.animateFrame());
  }

  drawScene() {
    const { particles, lineHub } = this;

    particles.forEach(particle => {
      particle.update();
      particle.draw();
    })

    lineHub.draw();
  }
}

class ParticleVector {
  /** @type { number } */
  x;

  /** @type { number } */
  y;

  /**
   * @param { number } x 
   * @param { number } y 
   */
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  reverseX() {
    this.x *= -1;
  }

  reverseY() {
    this.y *= -1;
  }
}

class Particle {
  /** @type { number } */
  x;

  /** @type { number } */
  y;

  /** @type { string } */
  color;

  /** @type { number } */
  radius;

  /** @type { number } */
  speed;

  /** @type { number } */
  directionAngle;

  /** @type { ParticleVector } */
  vector;

  /** @type { HTMLCanvasElement } */
  canvas;

  /** @type { CanvasRenderingContext2D } */
  ctx;
  
  /**
   * @param { HTMLCanvasElement } canvas 
   * @param { ParticleNetworkOptions } options
   */
  constructor(canvas, options) {
    this.x = canvas.width * Math.random();
    this.y = canvas.height * Math.random();
    this.color = options.particleColor;
    this.radius = options.defaultRadius + options.variantRadius * Math.random();
    this.speed = options.defaultSpeed + options.variantSpeed * Math.random();
    this.directionAngle = Math.floor(Math.PI * 2 * Math.random());
    this.vector = new ParticleVector(
      Math.cos(this.directionAngle) * this.speed,
      Math.sin(this.directionAngle) * this.speed
    );
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
  }
  
  update() {
    const { vector } = this;

    this.applyBorder();

    this.x += vector.x;
    this.y += vector.y;
  }

  applyBorder() {
    const { canvas, x, y, vector } = this;
    const { width, height } = canvas;

    if (x >= width || x <= 0) vector.x *= -1;

    if (y >= height || y <= 0) vector.y *= -1;

    if (x > width) this.x = width;

    if (x < 0) this.x = 0;

    if (y > height) this.y = height;

    if (y < 0) this.y = 0;
  }
  
  draw() {
    const { ctx, x, y, color, radius } = this;

    ctx.save();
    ctx.fillStyle = color;

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();

    ctx.restore();
  }
}

/** 
 * @template {{ x: number, y: number }} T
 */
class LineHub {
  /** @type { T[] } */
  hub;

  /** @type { CanvasRenderingContext2D } */
  ctx;
  
  /**
   * @type {{
   *  r: string
   *  g: string
   *  b: string
   * }}
   */
  lineColor;

  /** @type { number } */
  lineRadius;
  
  /**
   * @param { T[] } hub 
   * @param { CanvasRenderingContext2D } ctx
   * @param {{ lineColor: string, lineRadius: number }} param1 
   */
  constructor(hub, ctx, { lineColor, lineRadius }) {
    this.hub = hub;
    this.ctx = ctx;
    this.lineRadius = lineRadius;

    const [r, g, b] = lineColor.match(/\d+/g);
    this.lineColor = { r, g, b };
  }

  draw() {
    this.drawLines();
  }

  drawLines() {
    this.hub.forEach(sour => this.linkToOthers(sour));
  }

  /** @param { T } sour */
  linkToOthers(sour) {
    this.hub.forEach(dest => {
      const distance = this.calcDistance(sour, dest);
      const opacity = 1 - distance / this.lineRadius;

      if (opacity > 0) {
        const { ctx, lineColor: { r, g, b } } = this;
        const { x: x1, y: y1 } = sour;
        const { x: x2, y: y2 } = dest;

        ctx.save();
        ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${opacity})`;

        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.closePath();
        ctx.stroke();

        ctx.restore();
      }
    });
  }

  /**
   * @param { T } sour
   * @param { T } dest
   */
  calcDistance(sour, dest) {
    const { x: x1, y: y1 } = sour;
    const { x: x2, y: y2 } = dest;

    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  }
}

document.addEventListener("DOMContentLoaded", () => new ParticleNetworkCanvas("#particleNetworkCanvas"));