export interface PositionParams {
  x: number;
  y: number;
}

export default class Position {
  _x!: number;
  _y!: number;

  constructor({ x, y }: PositionParams) {
    this._x = x;
    this._y = y;
  }

  setX(x: number): void {
    this._x = x;
  }

  setY(y: number): void {
    this._y = y;
  }

  calcDistance(dest: Position): number {
    const { _x: x1, _y: y1 } = this;
    const { _x: x2, _y: y2 } = dest;

    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  }

  toJSON() {
    const { _x, _y } = this;

    return { x: _x, y: _y };
  }
}
