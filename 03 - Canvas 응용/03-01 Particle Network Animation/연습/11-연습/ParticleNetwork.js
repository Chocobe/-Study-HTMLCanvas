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

  /**
   * @param {{
   *  amount: number;
   *  color: string;
   *  defaultRadius: number;
   *  variantRadius: number;
   *  defaultSpeed: number;
   *  variantSpeed: number;
   * }}
   */
  constructor({
    amount = 50,
    color = "rgb(255, 255, 255)",
    defaultRadius = 5,
    variantRadius = 5,
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

  /**
   * @type {{
   *  x: number;
   *  y: number;
   * }}
   */
  vector;

  /**
   * @param { HTMLCanvasElement } canvas 
   * @param { ParticleOptions } options 
   */
  constructor(canvas, {
    color,
    defaultRadius,
    variantRadius,
    defaultSpeed,
    variantSpeed,
  }) {
    this.initCanvas(canvas);
    this.initColor(color);
    this.initPosition();
    this.initRadius(defaultRadius, variantRadius);
    this.initSpeed(defaultSpeed, variantSpeed);
    this.initDirectionAngle();
    this.initVector();
  }

  /** @param { HTMLCanvasElement } canvas */
  initCanvas(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
  }

  /** @param { string } color */
  initColor(color) {
    this.color = color;
  }
  
  initPosition() {
    const { canvas: { width, height } } = this;

    this.x = width * Math.random();
    this.y = height* Math.random();
  }

  /**
   * @param { number } defaultRadius 
   * @param { number } variantRadius 
   */
  initRadius(defaultRadius, variantRadius) {
    this.radius = defaultRadius + variantRadius * Math.random();
  }

  /**
   * @param { number } defaultSpeed 
   * @param { number } variantSpeed
   */
  initSpeed(defaultSpeed, variantSpeed) {
    this.speed = defaultSpeed + variantSpeed * Math.random();
  }

  initDirectionAngle() {
    this.directionAngle = Math.PI * 2 * Math.random();
  }

  initVector() {
    const { directionAngle, speed } = this;
    this.vector = {
      x: Math.cos(directionAngle) * speed,
      y: Math.sin(directionAngle) * speed,
    };
  }

  update() {
    const { vector } = this;

    this.x += vector.x;
    this.y += vector.y;

    this.applyBorder();
  }

  applyBorder() {
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
  /** @type { string } */
  color;

  /** @type { number } */
  maxDistance;

  constructor({
    color = "rgb(0, 181, 255)",
    maxDistance = 200,
  } = {}) {
    this.color = color;
    this.maxDistance = maxDistance;
  }
}

class LineHub {
  /** @type { CanvasRenderingContext2D } */
  ctx;

  /** @type { number } */
  maxDistance;

  /** @type { Particle[] } */
  particles;
  
  /**
   * @type {{
   *  r: string;
   *  g: string;
   *  b: string;
   * }}
   */
  rgb;

  /**
   * @param { CanvasRenderingContext2D } ctx 
   * @param { Particles[] } particles
   * @param { LineHubOptions }
   */
  constructor(ctx, particles, { maxDistance, color }) {
    this.ctx = ctx;
    this.maxDistance = maxDistance;
    this.particles = particles;
    
    const [r, g, b] = color.match(/\d+/g);
    this.rgb = { r, g, b };
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
    const opacity = 1 - distance / this.maxDistance;

    if (opacity > 0) {
      const { ctx, rgb: { r, g, b }} = this;

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

  calcDistance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
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

  /** @param { string } selector */
  initCanvas(selector) {
    this.canvas = document.querySelector(selector);

    if (!this.canvas) throw new Error("selector??? ???????????? <canvas />??? ?????? ??? ????????????.");

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
    this.lineHub = new LineHub(this.ctx, this.particles, this.lineHubOptions);
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
    })
  }

  drawLineHub() {
    this.lineHub.draw();
  }
}

window.addEventListener(
  "DOMContentLoaded",
  () => new ParticleNetworkCanvas("#particleNetworkCanvas")
);