import Ball from '../Ball/Ball'
import { Controls, Direction } from '../Controls/Controls'
import Paddle from '../Paddle/Paddle'

import beep from '../../../assets/beep.ogg'
import gol from '../../../assets/gol.ogg'
import plop from '../../../assets/plop.ogg'

/**
 * Gestiona una partida de Pong, entre un jugador y una inteligencia artificial.
 * genera un tablero de juego a partir de un elemento canvas del documento, las
 * palas y la bola. Admnistra las anotaciones de cada jugador.
 *
 * @export
 * @class Pong
 */
export default class Pong {
  /**
   * Gestiona una partida de Pong, entre un jugador y una inteligencia artificial.
   * genera un tablero de juego a partir de un elemento canvas del documento, las
   * palas y la bola. Admnistra las anotaciones de cada jugador.
   */
  constructor () {
    /**
     * Lienzo donde se dibujan los elementos
     * @type {HTMLCanvasElement}
     */
    this.canvas = document.getElementById('canvas')
    this.canvas.height = 500
    this.canvas.width = 800
    this.canvas.style.backgroundColor = 'black'
    /**
     * Bola del juego
     * @type {Ball}
     */
    this.ball = new Ball(15, this.canvas.width, this.canvas.height)
    /**
     * Configuración de los controles
     * @type {Controls}
     */
    this.controls = new Controls()
    /**
     * Tiempo transcurrido desde la invocación anterior a la función run del objeto
     * @type {number}
     */
    this.elapsedTime = Date.now()
    /**
     * Palas del juego
     * @type {Paddle}
     */
    this.paddles = [
      new Paddle(80, 20, 30, this.canvas.height),
      new Paddle(80, 20, this.canvas.width - 30, this.canvas.height)
    ]
    /**
     * Lista con las anotaciones de cada jugador
     * @type {Array}
     */
    this.scores = [0, 0]
    /**
     * Lista con los sonidos de la bola al impactar con un objeto del escenario
     * @type {Array}
     */
    this.sounds = [
      new Audio(beep),
      new Audio(gol),
      new Audio(plop)
    ]

    this.run()
  }

  /**
   * Dibuja el objeto en el contexto indicado.
   */
  draw () {
    const half = Math.round(this.canvas.width / 2)
    const pieces = 31
    const piece = Math.round(this.canvas.height / pieces)

    this.canvas.getContext('2d').lineWidth = 10
    this.canvas.getContext('2d').strokeStyle = 'white'

    for (let i = 0; i < pieces; i++) {
      if (i % 2 === 1) {
        continue
      }
      this.canvas.getContext('2d').beginPath()
      this.canvas.getContext('2d').moveTo(half, piece * i)
      this.canvas.getContext('2d').lineTo(half, piece * (i + 1))
      this.canvas.getContext('2d').stroke()
    }

    // Scores
    this.canvas.getContext('2d').fillStyle = 'white'
    this.canvas.getContext('2d').font = 'bold 50px monospace'
    this.canvas.getContext('2d').fillText((this.scores[0] < 10 ? '0' : '') +
    '' + this.scores[0], this.canvas.width / 2 - 80, 40)
    this.canvas.getContext('2d').fillText((this.scores[1] < 10 ? '0' : '') +
    '' + this.scores[1], this.canvas.width / 2 + 20, 40)
  }

  /**
   * Actualiza la dirección del movimiento de la pala del jugador
   * cuando una tecla es pulsada.
   * @param {Object} e Tecla pulsada.
   */
  keyPress (e) {
    e.preventDefault()
    switch (e.keyCode) {
      case 38 :
        this.controls.setDirection(Direction.UP)
        break
      case 40:
        this.controls.setDirection(Direction.DOWN)
        break
    }
  }

  /**
   * Ciclo principal del juego.
   */
  run () {
    const delta = (Date.now() - this.elapsedTime) / 1000
    const directions = [Direction.NONE, Direction.NONE]
    let quantum = Math.floor(delta / 0.005)
    this.elapsedTime = Date.now()

    // Movimiento de las entidades.
    if (this.controls.up) {
      directions[0] = Direction.UP
    } else if (this.controls.down) {
      directions[0] = Direction.DOWN
    }

    if (this.ball.position.y - this.ball.size / 2 <= this.paddles[1].position.y) {
      directions[1] = Direction.UP
    }
    if (this.ball.position.y + this.ball.size / 2 >= this.paddles[1].position.y) {
      directions[1] = Direction.DOWN
    }

    this.paddles[0].move(delta, directions[0])
    this.paddles[1].move(delta, directions[1])

    for (let i = 0; i < quantum; i++) {
      switch (this.ball.move(0.005, this.paddles)) {
        case 'left' :
          this.scores[1]++
          this.ball.open(Direction.RIGHT)
          this.sounds[1].play()
          break
        case 'right' :
          this.scores[0]++
          this.ball.open(Direction.LEFT)
          this.sounds[1].play()
          break
        case 'up' :
        case 'down' :
          this.sounds[2].play()
          break
        case 'paddle':
          this.sounds[0].play()
          break
      }
    }
    quantum = delta - quantum * 0.005
    switch (this.ball.move(quantum, this.paddles)) {
      case 'left' :
        this.scores[1]++
        this.ball.open(Direction.RIGHT)
        this.sounds[1].play()
        break
      case 'right' :
        this.scores[0]++
        this.ball.open(Direction.LEFT)
        this.sounds[1].play()
        break
      case 'up' :
      case 'down' :
        this.sounds[2].play()
        break
      case 'paddle':
        this.sounds[0].play()
        break
    }

    // Trazado de las entidades
    this.canvas.getContext('2d').clearRect(0, 0,
      this.canvas.width, this.canvas.height)
    this.draw()
    this.paddles[0].draw(this.canvas.getContext('2d'))
    this.paddles[1].draw(this.canvas.getContext('2d'))
    this.ball.draw(this.canvas.getContext('2d'))

    const self = this
    requestAnimationFrame(function () { self.run() })
  }
}
