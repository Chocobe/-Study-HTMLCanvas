class ParticleNetworkOptions {
  /** @type { string } */
  particleColor;

  /** @type { number } */
  particleAmount;

  /** @type { number } */
  defaultRadius;

  /** @type { number } */
  variantRadius;

  /** @type { number } */
  defaultSpeed;

  /** @type { number } */
  variantSpeed;

  /** @type { string } */
  lineColor;

  /** @type { number } */
  lineRadius;

  /**
   * @param {{
   *  particleColor: string?
   *  particleAmount: number?
   *  defaultRadius: number?
   *  variantRadius: number?
   *  defaultSpeed: number?
   *  variantSpeed: number?
   *  lineColor: string?
   *  lineRadius: number?
   * }}
   */
  constructor({
    particleColor,
    particleAmount,
    defaultRadius,
    variantRadius,
    defaultSpeed,
    variantSpeed,
    lineColor,
    lineRadius,
  } = {}) {
    this.particleColor = particleColor ?? "#fff";
    this.particleAmount = particleAmount ?? 100;
    this.defaultRadius = defaultRadius ?? 3;
    this.variantRadius = variantRadius ?? 3;
    this.defaultSpeed = defaultSpeed ?? 2;
    this.variantSpeed = variantSpeed ?? 2;
    this.lineColor = lineColor ?? "rgb(0, 181, 255)";
    this.lineRadius = lineRadius ?? 150;
  }
}

class Particle {
  /** @type { HTMLCanvasElement } */
  canvas;

  /** @type { CanvasRenderingContext2D } */
  ctx;

  /** @type { number } */
  x;

  /** @type { number } */
  y;

  /** @type { number } */
  radius;

  /** @type { number } */
  speed;

  /** @type { number } */
  directionAngle;

  /** @type {{ x: number, y: number }} */
  vector;

  /** @type { string } */
  color;
  
  /**
   * @param { HTMLCanvasElement } canvas 
   * @param { CanvasRenderingContext2D } ctx 
   * @param { ParticleNetworkOptions } options 
   */
  constructor(canvas, ctx, options) {
    this.canvas = canvas;
    this.ctx = ctx;

    const { width, height } = canvas;

    const { 
      defaultRadius,
      variantRadius,
      defaultSpeed,
      variantSpeed,
      particleColor,
    } = options;

    this.x = width * Math.random();
    this.y = height * Math.random();
    this.radius = defaultRadius + variantRadius * Math.random();
    this.speed = defaultSpeed + variantSpeed * Math.random();
    this.directionAngle = Math.floor(Math.PI * 2 * Math.random());
    this.vector = {
      x: Math.cos(this.directionAngle) * this.speed,
      y: Math.sin(this.directionAngle) * this.speed,
    };
    this.color = particleColor;
  }

  update() {
    const { x, y, vector } = this;

    this.x += vector.x;
    this.y += vector.y;

    this.applyBorder();
  }

  applyBorder() {
    const { x, y, vector, canvas } = this;
    const { width, height } = canvas;

    if (x >= width || x <= 0) vector.x *= -1;

    if (y >= height || y <= 0) vector.y *= -1;

    if (x > width) this.x = width;

    if (x < 0) this.x = 0;

    if (y > height) this.y = height;

    if (y < 0) this.y = 0;
  }

  draw() {
    const { ctx, color, x, y, radius } = this;

    ctx.save();

    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }
}

class LineHub {
  /** @type { CanvasRenderingContext2D } */
  ctx
  
  /** @type { Particle[] } */
  particles;

  /** @type { number } */
  lineRadius;

  /** @type { string[] } */
  rgb;
  
  /** 
   * @param { CanvasRenderingContext2D } ctx
   * @param { Particle[] } particles 
   * @param { ParticleNetworkOptions } options
   */
  constructor(ctx, particles, options) {
    this.ctx = ctx;
    this.particles = particles;
    this.lineRadius = options.lineRadius;
    this.rgb = options.lineColor.match(/\d+/g).slice(0, 3);
  }

  draw() {
    this.drawLines();
  }

  drawLines() {
    this.particles.forEach(sour => this.linkToOthers(sour));
  }

  /** @param { Particle } sour */
  linkToOthers(sour) {
    this.particles.forEach(dest => this.linkToDest(sour, dest));
  }

  /**
   * @param { Particle } sour
   * @param { Particle } dest
   */
  linkToDest(sour, dest) {
    const distance = this.calcDistance(sour, dest);
    const opacity = 1 - distance / this.lineRadius;

    if (opacity > 0) {
      const { ctx, rgb: [r, g, b] } = this;
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

  /**
   * @param { Particle } sour 
   * @param { Particle } dest 
   * @returns { number }
   */
  calcDistance(sour, dest) {
    const { x: x1, y: y1 } = sour;
    const { x: x2, y: y2 } = dest;

    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  }
}

class ParticleNetworkCanvas {
  /** @type { HTMLCanvasElement} */
  canvas;

  /** @type { CanvasRenderingContext2D } */
  ctx;

  /** @type { ParticleNetworkOptions } */
  options;

  /** @type { Particle[] } */
  particles;

  /** @type { LineHub } */
  lineHub;

  /** @type { number } */
  frameId;

  /**
   * @param { string } selector 
   * @param { ParticleNetworkOptions } options 
   */
  constructor(selector, options) {
    this.initCanvas(selector);
    this.initOptions(options);

    this.resizeCanvas();
    
    this.initParticles();
    this.initLineHub();

    this.startAnimation();
  }

  /** @type { string } selector */
  initCanvas(selector) {
    this.canvas = document.querySelector(selector);
    
    if (!this.canvas) throw new Error("<canvas /> 의 선택자가 유효하지 않습니다.");

    this.ctx = this.canvas.getContext("2d");
  }

  /** @param { ParticleNetworkOptions } [options={}] */
  initOptions(options = {}) {
    this.options = new ParticleNetworkOptions(options);
  }

  resizeCanvas() {
    const { canvas } = this;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  initParticles() {
    const { canvas, ctx, options } = this;

    this.particles = Array.from(
      { length: options.particleAmount },
      () => new Particle(canvas, ctx, options)
    );
  }

  initLineHub() {
    const { ctx, particles, options } = this;
    this.lineHub = new LineHub(ctx, particles, options);
  }

  startAnimation() {
    this.loopFrame();
  }

  loopFrame() {
    const { ctx, canvas: { width, height } } = this;

    ctx.clearRect(0, 0, width, height);
    
    this.drawScene();

    this.frameId = requestAnimationFrame(() => this.loopFrame());
  }

  drawScene() {
    this.drawParticleScene();
    this.drawLineHubScene();
  }

  drawParticleScene() {
    this.particles.forEach(particle => {
      particle.update();
      particle.draw();
    });
  }

  drawLineHubScene() {
    this.lineHub.draw();
  }
}

window.addEventListener(
  "DOMContentLoaded", 
  () => new ParticleNetworkCanvas("#particleNetworkCanvas")
);