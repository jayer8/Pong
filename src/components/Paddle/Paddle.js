import { Direction } from '../Controls/Controls'
import Vector2D from '../Vector2D/Vector2D'

/**
 * Pala para jugar Pong.
 *
 * @export
 * @class Paddle
 */
export default class Paddle {
  /**
   * Pala para jugar Pong.
   * @param {number} height Altura de la pala en pixeles.
   * @param {number} width  Ancho de la pala en pixeles.
   * @param {number} x Punto inicial en el eje de las abscisas.
   * @param {number} verticalLimit Altura del tablero de juego.
   */
  constructor (height, width, x, verticalLimit) {
    /**
     * Altura de la pala en pixeles
     * @type {number}
     */
    this.height = height
    /**
     * Ancho de la pala en pixeles
     * @type {number}
     */
    this.width = width
    /**
     * Altura del tablero de juego en pixeles
     * @type {number}
     */
    this.verticalLimit = verticalLimit
    /**
     * Coordenadas del centro de la pala
     * @type {Vector2D}
     */
    this.position = new Vector2D(x, verticalLimit / 2)
    /**
     * Velocidad de la pala expresada en pixeles sobre segundo
     * @type {number}
     */
    this.speed = 200
  }

  /**
   * Dibuja el objeto en el contexto indicado.
   * @param {RenderingContext} context Conexto de dibujo de un objeto Canvas.
   */
  draw (context) {
    context.fillStyle = 'white'
    context.fillRect(this.position.x - this.width / 2,
      this.position.y - this.height / 2, this.width, this.height)
  }

  /**
   * Actualiza la posición de la pala según el tiempo transcurrido y la dirección indicada.
   * @param {number} delta Tiempo transucrrido en milisegundos desde el útimo movimiento.
   * @param {Direction} direction Enumerador que indica la dirección del movimiento.
   */
  move (delta, direction) {
    const distance = Math.round(delta * this.speed)
    switch (direction) {
      case Direction.DOWN :
        this.position.y += distance
        this.position.y = Math.min(this.verticalLimit - this.height / 2,
          this.position.y)
        break
      case Direction.UP :
        this.position.y -= distance
        this.position.y = Math.max(this.height / 2, this.position.y)
        break
    }
  }
}
