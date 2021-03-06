// @ts-check

class ParticleOptions {
  /** @type { number } */
  amount;

  /** @type { string } */
  color;

  /** @type { number } */
  defaultRadius;

  /** @type { number } */
  variantRadius;

  /** @type { number } */
  defaultSpeed;

  /** @type { number } */
  variantSpeed;

  /** @param { Partial<ParticleOptions> } [particleOptions = {}] */
  constructor({
    amount = 50,
    color = "rgb(255, 255, 255)",
    defaultRadius = 3,
    variantRadius = 10,
    defaultSpeed = 3, 
    variantSpeed = 3,
  } = {}) {
    this.amount = amount;
    this.color = color;
    this.defaultRadius = defaultRadius;
    this.variantRadius = variantRadius;
    this.defaultSpeed = defaultSpeed;
    this.variantSpeed = variantSpeed;
  }
}

class Particle {
  /** @type { HTMLCanvasElement } */
  canvas;

  /** @type { CanvasRenderingContext2D } */
  ctx;
  
  /** @type { string } */
  color;

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

  /** @type {{ x: number; y: number }} */
  vector;

  /**
   * @param { HTMLCanvasElement } canvas 
   * @param { ParticleOptions } particleOptions 
   */
  constructor(canvas, particleOptions) {
    this.initCanvas(canvas);

    this.initColor(particleOptions);
    this.initPosition();
    this.initRadius(particleOptions);
    this.initSpeed(particleOptions);
    this.initDirectionAngle();
    this.initVector();
  }

  /** @param { HTMLCanvasElement } canvas */
  initCanvas(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
  }

  /** @param { ParticleOptions } particleOptions */
  initColor(particleOptions) {
    this.color = particleOptions.color;
  }
  
  initPosition() {
    const { canvas: { width, height } } = this;

    this.x = width * Math.random();
    this.y = height* Math.random();
  }

  /** @param { ParticleOptions } particleOptions */
  initRadius(particleOptions) {
    const { defaultRadius, variantRadius } = particleOptions;

    this.radius = defaultRadius + variantRadius * Math.random();
  }
  
  /** @param { ParticleOptions } particleOptions */
  initSpeed(particleOptions) {
    const { defaultSpeed, variantSpeed } = particleOptions;

    this.speed = defaultSpeed + variantSpeed * Math.random();
  }
  
  initDirectionAngle() {
    this.directionAngle = Math.PI * 2 * Math.random();
  }
  
  initVector() {
    const { speed, directionAngle } = this;

    this.vector = {
      x: Math.cos(directionAngle) * speed,
      y: Math.sin(directionAngle) * speed,
    };
  }
  
  update() {
    const { vector } = this;

    this.x += vector.x;
    this.y += vector.y;

    this.applyWall();
  }

  applyWall() {
    const { x, y, vector, canvas: { width, height } } = this;

    if (x >= width || x <= 0) vector.x *= -1;

    if (y >= height || y <= 0) vector.y *= -1;
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

class LineHubOptions {
  /**
   * @type {{
   *  r: string;
   *  g: string;
   *  b: string;
   * }}
   */
  rgb;

  /** @type { number } */
  maxWidth;

  /**
   * @param { string } color 
   * @param { number } maxWidth 
   */
  constructor(color, maxWidth) {
    this.initRGB(color);
    this.initMaxWidth(maxWidth);
  }

  /** @param { string } color */
  initRGB(color) {
    const [ r, g, b ] = color.match(/\d+/g);
    this.rgb = { r, g, b };
  }

  /** @param { number } maxWidth */
  initMaxWidth(maxWidth) {
    this.maxWidth = maxWidth;
  }
}

class LineHub {
  /** @type { CanvasRenderingContext2D } */
  ctx;

  /**
   * @type {{
   *  r: string;
   *  g: string;
   *  b: string;
   * }}
   */
  rgb;

  /** @type { number } */
  maxWidth;

  /** @type { Particle[] } */
  particles;

  /**
   * @param { CanvasRenderingContext2D } ctx 
   * @param { Particle[] } particles 
   * @param { LineHubOptions } lineHubOptions 
   */
  constructor(ctx, particles, lineHubOptions) {
    this.initCtx(ctx);
    this.initParticles(particles);
    this.initOptions(lineHubOptions);

    console.log(this);
  }

  /** @param { CanvasRenderingContext2D } ctx */
  initCtx(ctx) {
    this.ctx = ctx;
  }

  /** @param { Particle[] } particles */
  initParticles(particles) {
    this.particles = particles;
  }

  /** @param { LineHubOptions } lineHubOptions */
  initOptions({ rgb, maxWidth }) {
    this.rgb = rgb;
    this.maxWidth = maxWidth;
  }

  draw() {
    this.particles.forEach(sour => this.drawLineToOthers(sour));
  }

  /** @param { Particle } sour */
  drawLineToOthers(sour) {
    this.particles.forEach(dest => this.drawLineToDest(sour, dest));
  }

  /**
   * @param { Particle } sour 
   * @param { Particle } dest 
   */
  drawLineToDest(sour, dest) {
    const { x: x1, y: y1 } = sour;
    const { x: x2, y: y2 } = dest;

    const distance = this.calcDistance({ x1, y1, x2, y2 });
    const opacity = this.calcOpacity(distance);

    if (opacity > 0) {
      const { ctx, rgb: { r, g, b } } = this;

      ctx.save();
      ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${opacity})`;

      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.closePath();
      ctx.stroke();

      ctx.restore();
    }
  }

  /**
   * @param {{
   *  x1: number;
   *  y1: number;
   *  x2: number;
   *  y2: number;
   * }} position
   */
  calcDistance({ x1, y1, x2, y2 }) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  }

  /** @param { number } distance */
  calcOpacity(distance) {
    return 1 - (distance / this.maxWidth);
  }
}

class ParticleNetworkCanvas {
  /** @type { HTMLCanvasElement } */
  canvas;

  /** @type { CanvasRenderingContext2D } */
  ctx;

  /** @type { ParticleOptions } */
  particleOptions;

  /** @type { Particle[] } */
  particles;

  /** @type { LineHubOptions } */
  lineHubOptions;

  /** @type { LineHub } */
  lineHub;
  
  /** @type { number } */
  animationId;
  
  /** @param { string } selector */
  constructor(selector) {
    this.initCanvas(selector);
    this.initCanvasSize();

    this.initParticleOptions();
    this.initParticles();

    this.initLineHubOptions();
    this.initLineHub();

    this.startAnimation();
  }

  /** @param { string } selector */
  initCanvas(selector) {
    this.canvas = document.querySelector(selector);

    if (!this.canvas) throw new Error("<canvas /> ????????? ?????? ??? ????????????.");

    this.ctx = this.canvas.getContext("2d");
  }

  initCanvasSize() {
    const { canvas } = this;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  initParticleOptions() {
    this.particleOptions = new ParticleOptions();
  }

  initParticles() {
    this.particles = Array.from(
      { length: this.particleOptions.amount },
      () => new Particle(this.canvas, this.particleOptions)
    );
  }

  initLineHubOptions() {
    this.lineHubOptions = new LineHubOptions("rgb(0, 181, 255)", 200);
  }

  initLineHub() {
    this.lineHub = new LineHub(this.ctx, this.particles, this.lineHubOptions);
  }
  
  startAnimation() {
    this.loopFrame();
  }

  loopFrame() {
    const { ctx, canvas: { width, height } } = this;

    ctx.clearRect(0, 0, width, height);

    this.drawScene();

    this.animationId = window.requestAnimationFrame(() => this.loopFrame());
  }

  drawScene() {
    this.particles.forEach(particle => {
      particle.update();
      particle.draw();
    });

    this.lineHub.draw();
  }
}

window.addEventListener(
  "DOMContentLoaded",
  () => new ParticleNetworkCanvas("#particleNetworkCanvas")
);