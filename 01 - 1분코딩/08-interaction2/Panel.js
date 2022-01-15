class Panel {
  constructor() {
    this.scale = 0;
    this.angle = 0;
  }

  draw() {
    context.fillStyle = "rgba(255, 127, 0, 0.8)";

    context.resetTransform();
    context.translate(centerX, centerY);
    context.scale(this.scale, this.scale);
    context.rotate(canUtil.toRadian(this.angle));
    
    context.translate(-centerX, -centerY);
    context.fillRect(centerX - 150, centerY - 150, 300, 300);

    context.fillStyle = "#fff";
    
    // if(selectedBox) {
    //   context.fillText(selectedBox.id, centerX, centerY);
    // }
  }

  showContent() {
    context.fillStyle = "#fff";
    context.fillText(selectedBox.id, centerX, centerY);
  }
}