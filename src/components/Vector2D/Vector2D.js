/**
 * Encapsula un vector de dos dimensiones.
 *
 * @export
 * @class Vector2D
 */
export default class Vector2D {
  /**
   * Encapsula un vector de dos dimensiones.
   * @param {number} x Componente en el eje de las abscisas.
   * @param {number} y Componente en el eje de las ordenadas.
   */
  constructor (x, y) {
    /**
     * Valor del componente en X
     * @type {number}
     */
    this.x = x
    /**
     * Valor del componente en Y
     * @type {number}
     */
    this.y = y
  }

  /**
   * Obtiene un Vector2D con la suma de los componentes de dos vectores.
   * @param {Vector2D} vector Vector a sumar.
   * @return {Vector2D} Vector resultante de la suma.
   */
  add (vector) {
    return new Vector2D(this.x + vector.x, this.y + vector.y)
  }

  /**
   * Obtiene el ángulo formado por el vector y el eje de las abscisas.
   * @return {number} Valor del ángulo en grados.
   */
  getAngle () {
    return Math.atan2(this.y, this.x) * 180 / Math.PI
  }

  /**
   * Obtiene la longitud absoluta del Vector2D.
   * @return {number} Longitud absoluta.
   */
  getLength () {
    return Math.sqrt(this.x * this.x + this.y * this.y)
  }

  /**
   * Multiplica cada componente por el mismo valor.
   * @param {number} scalar Cualquier número real.
   */
  multiplyByAScalar (scalar) {
    this.x *= scalar
    this.y *= scalar
  }

  /***
   * Convierte el vector en un vector unitario o vector de módulo uno.
   */
  normalize () {
    if (this.getLength() !== 0) {
      this.multiplyByAScalar(1 / this.getLength())
    } else {
      this.x = 0
      this.y = 0
    }
  }

  /**
   * Rota el vector en dirección contraria a las manecillas del reloj.
   * @param {number} degrees Grados que debe girar el vector.
   */
  rotate (degrees) {
    const radians = degrees * Math.PI / 180
    const cos = Math.cos(radians)
    const sin = Math.sin(radians)
    let x = this.x * cos - this.y * sin
    let y = this.x * sin + this.y * cos
    x = Math.round(x * 100)
    if (x !== 0) x /= 100
    y = Math.round(y * 100)
    if (y !== 0) y /= 100
    this.x = x
    this.y = y
  }
}
