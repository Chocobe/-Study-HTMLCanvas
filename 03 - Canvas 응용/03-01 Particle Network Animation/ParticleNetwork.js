// 01
let w, h, loopId, id, canvas, ctx, particles;

// 02
const options = {
  particleColor: "rgba(255, 255, 255)",
  lineColor: "rgba(0, 181, 255)",
  particleAmount: 50,
  defaultRadius: 2,
  variantRadius: 2,
  defaultSpeed: 1,
  variantSpeed: 1,
  linkRadius: 150,
};

// 18-1
const rgb = options.lineColor.match(/\d+/g);

// 03
document.addEventListener("DOMContentLoaded", init);

// 04
function init() {
  canvas = document.querySelector("#particleNetworkCanvas");
  ctx = canvas.getContext("2d");
  resizeReset();
  initializeElements();

  // 09
  startAnimation();
}

// 05
function resizeReset() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
}

// 06
function initializeElements() {
  particles = [];

  for (let i = 0; i < options.particleAmount; i++) {
    particles.push(new Particle());
  }
}

// 07
function Particle() {
  const _this = this;

  _this.x = Math.random() * w;
  _this.y = Math.random() * h;
  _this.color = options.particleColor;
  _this.radius = options.defaultRadius * Math.random() * options.variantRadius
  _this.speed = options.defaultSpeed * Math.random() * options.variantSpeed;
  _this.directionAngle = Math.floor(Math.random() * Math.PI * 2);
  _this.vector = {
    x: Math.cos(_this.directionAngle) * _this.speed,
    y: Math.sin(_this.directionAngle * _this.speed),
  };

  // 07-01
  // 13
  _this.update = function() {
    _this.border();
    
    // 14-1
    _this.x += _this.vector.x;
    _this.y += _this.vector.y;
  }

  // 07-02
  // 14
  _this.border = function() {
    if (_this.x >= w || _this.x <= 0) {
      _this.vector.x *= -1;
    }

    if (_this.y >= h || _this.y <= 0) {
      _this.vector.y *= -1;
    }

    if (_this.x > w) {
      _this.x = w;
    }

    if (_this.x < 0) {
      _this.x = 0;
    }

    if (_this.y > h) {
      _this.y = h;
    }

    if (_this.y < 0) {
      _this.y = 0;
    }
  }

  // 07-03
  // 08
  _this.draw = function() {
    ctx.beginPath();
    ctx.arc(
      _this.x,
      _this.y,
      _this.radius,
      0,
      Math.PI * 2
    );
    ctx.closePath();
    ctx.fillStyle = _this.color;
    ctx.fill();
  }
}

// 09
function startAnimation() {
  loopId = requestAnimationFrame(animationLoop);
}

// 10
function animationLoop() {
  ctx.clearRect(0, 0, w, h);
  drawScene();

  // 14-3
  id = requestAnimationFrame(animationLoop);
}

// 11
function drawScene() {
  // 15
  drawLine();
  
  drawParticle();
}

// 12
// 정지된 별이 찍힘
function drawParticle() {
  for (let i = 0; i < particles.length; i++) {
    // 14-2
    particles[i].update();
    
    // 12-1
    particles[i].draw();
  }
}

// 15
function drawLine() {
  for (let i = 0; i < particles.length; i++) {
    linkPoints(particles[i], particles);
  }
}

// 16
function linkPoints(point, hubs) {
  for (let i = 0; i < hubs.length; i++) {
    const distance = checkDistance(point.x, point.y, hubs[i].x, hubs[i].y);

    // 18
    const opacity = 1 - distance / options.linkRadius;

    if (opacity > 0) {
      ctx.linkWidth = 0.5;
      ctx.strokeStyle = `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${opacity})`;
      ctx.beginPath();
      ctx.moveTo(point.x, point.y);
      ctx.lineTo(hubs[i].x, hubs[i].y);
      ctx.closePath();
      ctx.stroke();
    }
  }
}

// 17
function checkDistance(x1, y1, x2, y2) {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}