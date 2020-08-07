/**
 * Direcciones que puede tomar un objeto al moverse.
 */
export const Direction = {
  NONE: 0,
  DOWN: 1,
  LEFT: 2,
  RIGHT: 3,
  UP: 4
}

/**
 * Ajusta la dirección del movimiento de una Pala.
 */
export class Controls {
  /**
   * Ajusta la dirección del movimiento de una Pala.
   */
  constructor () {
    this.down = false
    this.up = false
  }

  /**
   * Establece la dirección del movimiento.
   * @param {Direction} Dirección del movimiento, limitada a dos valores: ARRIBA y ABAJO.
   */
  setDirection (direction) {
    switch (direction) {
      case Direction.DOWN :
        this.down = true
        this.up = false
        break
      case Direction.UP :
        this.down = false
        this.up = true
        break
    }
  }
}
