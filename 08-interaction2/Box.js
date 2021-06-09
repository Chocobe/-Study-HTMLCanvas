class Box {
  constructor(id, x, y, speed) {
    this.id = id;

    this.x = x;
    this.y = y;

    this.width = 100;
    this.height = 100;

    this.speed = speed;

    this.draw();
  }

  draw() {
    context.fillStyle = "rgba(0, 0, 0, 0.5)";
    context.fillRect(this.x, this.y, this.width, this.height);

    context.fillStyle = "#fff";
    context.fillText(this.id, (this.x + 40), (this.y + 65));
  }
}