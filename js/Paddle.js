/***
 * Basado en:
 * http://www.jlabstudio.com/webgl/2013/04/uso-practico-de-vectores-pong-y-un-poco-de-sonido/
 * Última modificación: 21/06/2015.
 */

/***
 * Pala para jugar Pong.
 * @param {Number} height Altura de la pala en pixeles.
 * @param {Number} width  Ancho de la pala en pixeles.
 * @param {Number} x	  Punto inicial en el eje de las abscisas.
 * @param {Number} verticalLimit Altura del tablero de juego.
 */
function Paddle(height, width, x, verticalLimit) {
	var position,
		speed;
	
	/***
	 * Obtiene la altura de la pala.
	 * @return Altura de la pala en pixeles.
	 */
	this.getHeight = function() { return height; };
	/***
	 * Establece la altura de la pala.
	 * @param {Number} newHeight Altura de la pala en pixeles.
	 */
	this.setHeight = function(newHeight) { height = newHeight; };
	/***
	 * Obtiene el ancho de la pala.
	 * @return Ancho de la pala en pixeles.
	 */
	this.getWidth = function() { return width; };
	/***
	 * Establece el ancho de la pala.
	 * @param {Number} newWidth Ancho de la pala en pixeles.
	 */
	this.setWidth = function(newWidth) { width = newWidth; };
	/***
	 * Obtiene las coordenadas del centro de la pala.
	 * @return Vector2D con las coordenadas del centro de la pala.
	 */
	this.getPosition = function() { return position; };
	/***
	 * Establece las coordenas del centro de la pala.
	 * @param {Vector2D} newPosition Coordenadas del centro de la pala.
	 */
	this.setPosition = function(newPosition) { position = newPosition; };
	/***
	 * Obtiene la velocidad a la que se desplaza la pala.
	 * @return Velocidad de la pala expresada en pixeles sobre segundo.
	 */
	this.getSpeed = function() { return speed; };
	/***
	 * Establece la velocidad a la que se desplaza la pala.
	 * @param {Number} newSpeed Velocidad de la pala expresada en pixeles sobre segundo.
	 */
	this.setSpeed = function(newSpeed) { speed = newSpeed; };
	/***
	 * Obtiene la altura del tablero de juego.
	 * @return Altura del tablero de juego en pixeles.
	 */
	this.getVerticalLimit = function() { return verticalLimit; };
	
	position = new Vector2D(x, verticalLimit / 2);
	speed = 200;
}

/***
 * Dibuja el objeto en el contexto indicado.
 * @param {Object} context Conexto de dibujo de un objeto Canvas.
 */
Paddle.prototype.draw = function(context) {
	context.fillStyle = "white";
	context.fillRect(this.getPosition().getX() - this.getWidth() / 2,
		this.getPosition().getY() - this.getHeight() / 2, this.getWidth(), this.getHeight());
};

/***
 * Actualiza la posición de la pala según el tiempo transcurrido y la dirección indicada.
 * @param {Number} delta Tiempo transucrrido en milisegundos desde el útimo movimiento.
 * @param {Direction} direction Enumerador que indica la dirección del movimiento.
 */
Paddle.prototype.move = function(delta, direction) {
	var distance = Math.round(delta * this.getSpeed());
	switch (direction) {
		case Direction.DOWN :
			this.getPosition().setY(this.getPosition().getY() + distance);
			this.getPosition().setY(Math.min(this.getVerticalLimit() - this.getHeight() / 2,
				this.getPosition().getY()));
			break;
		case Direction.UP :
			this.getPosition().setY(this.getPosition().getY() - distance);
			this.getPosition().setY(Math.max(this.getHeight() / 2, this.getPosition().getY()));
			break;
	}
};