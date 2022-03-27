export default class Position {
  x!: number;
  y!: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  calcDistance(destPosition: Position) {
    const { x: x1, y: y1 } = this;
    const { x: x2, y: y2 } = destPosition;

    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  }
}
