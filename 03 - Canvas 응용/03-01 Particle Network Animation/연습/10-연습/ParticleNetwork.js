class ParticleOptions {
  /** @type { string } */
  color;

  /** @type { number } */
  amount;
  
  /** @type { number } */
  defaultRadius;

  /** @type { number } */
  variantRadius;

  /** @type { number } */
  defaultSpeed;

  /** @type { number } */
  variantSpeed;

  /** @param { ParticleOptions } options */
  constructor({
    color = "rgb(255, 255, 255)",
    amount = 50,
    defaultRadius = 5,
    variantRadius = 5,
    defaultSpeed = 2,
    variantSpeed = 2,
  } = {}) {
    this.color = color;
    this.amount = amount;
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

  /**
   * @type {{
   *  x: number
   *  y: number
   * }}
   */
  vector;

  constructor(canvas, particleOptions) {
    this.initCanvas(canvas);
    this.initOptions(particleOptions);
  }

  /** @param { HTMLCanvasElement } canvas */
  initCanvas(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
  }

  /** @param { ParticleOptions } options */
  initOptions({
    color,
    defaultRadius,
    variantRadius,
    defaultSpeed,
    variantSpeed,
  }) {
    const { canvas: { width, height } } = this;

    this.color = color;
    this.x = width * Math.random();
    this.y = height * Math.random();
    this.radius = defaultRadius + variantRadius * Math.random();
    this.speed = defaultSpeed + variantSpeed * Math.random();
    this.directionAngle = Math.floor(Math.PI * 2 * Math.random());
    this.vector = {
      x: Math.cos(this.directionAngle) * this.speed,
      y: Math.sin(this.directionAngle) * this.speed,
    };
  }

  update() {
    this.x += this.vector.x;
    this.y += this.vector.y;

    this.applyBorder();
  }

  applyBorder() {
    const { x, y, vector, canvas: { width, height } } = this;

    if (x >= width || x <= 0) vector.x *= -1;

    if (y >= height || y <= 0) vector.y *= -1;
  }
  
  draw() {
    const {
      ctx,
      color, x, y, radius
    } = this;

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
   *  r: string,
   *  g: string,
   *  b: string,
   * }}
   */
  rgb;

  /** @type { number } */
  maxDistance

  /**
   * @param { string } [color="rgb(0, 181, 255)"] 
   * @param { number } [maxDistance=200]
   */
  constructor(color = "rgb(0, 181, 255)", maxDistance = 200) {
    const [r, g, b] = color.match(/\d+/g);
    this.rgb = { r, g, b };
    this.maxDistance = maxDistance;
  }
}

class LineHub {
  /** @type { CanvasRenderingContext2D } */
  ctx;

  /**
   * @type {{
   *  r: string,
   *  g: string,
   *  b: string,
   * }}
   */
  rgb;

  /** @type { number } */
  maxDistance;

  /** @type { Particle[] } */
  particles;

  /**
   * @param { CanvasRenderingContext2D } ctx
   * @param { LineHubOptions } param0
   * @param { Particle[] } particles
   */
  constructor(ctx, { rgb, maxDistance }, particles) {
    this.ctx = ctx;
    
    this.rgb = rgb;
    this.maxDistance = maxDistance;

    this.particles = particles;

    console.log(this);
  }

  draw() {
    this.drawLines();
  }

  drawLines() {
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

    const distance = this.calcDistance(x1, y1, x2, y2);
    const opacity = 1 - (distance / this.maxDistance);
    
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
   * @param { number } x1 
   * @param { number } y1 
   * @param { number } x2 
   * @param { number } y2 
   * @returns { number }
   */
  calcDistance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  }
}

class ParticleNetwork {
  /** @type { HTMLCanvasElement } */
  canvas;

  /** @type { CanvasRenderingContext2D } */
  ctx;

  /** @type { ParticleOptions } */
  particleOptions;

  /** @type { Particle[] } */
  particles;

  /** @type { LineHubOptions } */
  lineOptionHub;

  /** @type { LineHub } */
  lineHub;

  /** @type { number } */
  animationFrameId;
  
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

  initCanvas(selector) {
    this.canvas = document.querySelector(selector);

    if (!this.canvas) throw new Error("해당 선택자 요소를 찾을 수 없습니다.");

    this.ctx = this.canvas.getContext("2d");
  }

  initCanvasSize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
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
    this.lineHubOptions = new LineHubOptions();
  }

  initLineHub() {
    this.lineHub = new LineHub(this.ctx, this.lineHubOptions, this.particles);
  }

  startAnimation() {
    this.loopFrame();
  }

  loopFrame() {
    const { ctx, canvas: { width, height } } = this;

    ctx.clearRect(0, 0, width, height);

    this.drawScene();

    this.animationFrameId = window.requestAnimationFrame(() => this.loopFrame());
  }

  drawScene() {
    this.drawParticles();
    this.drawLineHub();
  }

  drawParticles() {
    this.particles.forEach(particle => {
      particle.update();
      particle.draw();
    });
  }

  drawLineHub() {
    this.lineHub.draw();
  }
}

window.addEventListener(
  "DOMContentLoaded",
  () => new ParticleNetwork("#particleNetworkCanvas")
);