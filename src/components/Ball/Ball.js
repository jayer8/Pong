import { Direction } from '../Controls/Controls'
import Vector2D from '../Vector2D/Vector2D'

/**
 * Balón para jugar Pong.
 *
 * @export
 * @class Ball
 */
export default class Ball {
  /**
   * Balón para jugar Pong.
   * @param {number} size            Diametro del balón en pixeles.
   * @param {number} horizontalLimit Ancho del tablero de juego en pixeles.
   * @param {number} verticalLimit   Largo del tablero de juego en pixeles.
   */
  constructor (size, horizontalLimit, verticalLimit) {
    /**
     * Diametro del balón en pixeles
     * @type {number}
     */
    this.size = size
    /**
     * Ancho del tablero de juego en pixeles
     * @type {number}
     */
    this.horizontalLimit = horizontalLimit
    /**
     * Largo del tablero de juego en pixeles
     * @type {number}
     */
    this.verticalLimit = verticalLimit
    /**
     * Ḿáximo ángulo de apertura en grados
     * @type {number}
     */
    this.maximumOpening = 60
    /**
     * Dirección y la velocidad del balón
     * @type {Vector2D}
     */
    this.movement = new Vector2D(0, 0)
    /**
     * Representa las coordenadas actuales del balón
     * @type {Vector2D}
     */
    this.position = new Vector2D(horizontalLimit / 2, verticalLimit / 2)
    /**
     * Velocidad del balón en pixeles sobre segundo
     * @type {number}
     */
    this.speed = 300

    this.open(Direction.LEFT)
  }

  /**
   * Verifica si el balón ha chocado con una pala.
   * @param {Paddle} paddle Pala en el tablero de alguno de los jugadores.
   * @return {boolean} Devuelve verdadero si existe una colisión y false si no.
   */
  crash (paddle) {
    return (this.position.x + this.size / 2 > paddle.position.x - paddle.width / 2 &&
      this.position.y + this.size / 2 > paddle.position.y - paddle.height / 2 &&
      this.position.x - this.size / 2 < paddle.position.x + paddle.width / 2 &&
      this.position.y - this.size / 2 < paddle.position.y + paddle.height / 2)
  }

  /**
   * Dibuja el objeto en el contexto indicado.
   * @param {RenderingContext} context Conexto de dibujo de un objeto Canvas.
   */
  draw (context) {
    context.fillStyle = 'white'
    context.fillRect(this.position.x - this.size / 2,
      this.position.y - this.size / 2,
      this.size, this.size)
  }

  /**
   * Suma el argumento a la velocidad actual.
   * @param {number} increase Incremento de velocidad.
   */
  increaseSpeed (increase) {
    this.speed += increase
    this.movement.normalize()
    this.movement.multiplyByAScalar(this.speed)
  }

  /**
   * Actualiza la posición del balón de acuerdo al tiempo transcurrido y
   * verifica si ha chocado con otro elemento del tablero.
   * @param {number} delta   Tiempo transcurrido desde el último movimiento.
   * @param {Array} paddles Par de palas en el tablero pertenecientes a los jugadores.
   * @return {string} Indica si el balón chocó con un elemento en el tablero.
   * Los valores posibles son: "none" Si no hubo colisión.
   * "left", "right" Si el balón salió por los costados.
   * "up", "down" Si el balón chocó con el limite superior o inferior del tablero.
   * "paddle" Si el balón chocó con la pala de un jugador.
   */
  move (delta, paddles) {
    let angle
    const half = this.size / 2
    let result = 'none'
    const temp = new Vector2D(this.movement.x, this.movement.y)

    temp.multiplyByAScalar(delta)
    this.position = this.position.add(temp)

    if (this.position.x - half < 0) {
      result = 'left'
    }
    if (this.position.x + half > this.horizontalLimit) {
      result = 'right'
    }
    if (this.position.y - half < 0) {
      this.position.y = half
      this.movement.y *= -1
      result = 'up'
    }
    if (this.position.y + half > this.verticalLimit) {
      this.position.y = this.verticalLimit - half
      this.movement.y *= -1
      result = 'down'
    }

    if (this.movement.x < 0 && this.crash(paddles[0])) {
      this.movement.x *= -1
      this.increaseSpeed(10)
      temp.x = this.movement.x
      temp.y = this.movement.y
      this.movement.rotate(this.position.y - paddles[0].position.y)
      result = 'paddle'
    } else if (this.movement.x > 0 && this.crash(paddles[1])) {
      this.movement.x *= -1
      this.increaseSpeed(10)
      temp.x = this.movement.x
      temp.y = this.movement.y
      this.movement.rotate(paddles[1].position.y - this.position.y)
      result = 'paddle'
    }

    angle = this.movement.getAngle()
    if (angle >= 180) angle -= 180
    if (angle > 90) angle = 180 - angle
    if (angle <= -180) angle += 180
    if (angle < -90) angle = -180 - angle

    if (angle > this.maximumOpening || angle < -this.maximumOpening) {
      this.movement.x = temp.x
      this.movement.y = temp.y
    }
    return result
  }

  /**
   * Coloca la posición en el centro del tablero e inicia un movimiento
   * en dirección contraria al jugador que anotó.
   * @param {Direction} direction Dirección de inicio.
   */
  open (direction) {
    let side = 0
    switch (direction) {
      case Direction.LEFT :
        side = -1
        break
      case Direction.RIGHT :
        side = 1
        break
    }
    this.position.x = this.horizontalLimit / 2
    this.position.y = this.verticalLimit / 2
    this.speed = 300
    this.movement.x = side * this.speed
    this.movement.y = 0
  }
}
