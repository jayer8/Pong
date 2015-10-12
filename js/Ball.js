/***
 * Basado en:
 * http://www.jlabstudio.com/webgl/2013/04/uso-practico-de-vectores-pong-y-un-poco-de-sonido/
 * Última modificación: 30/08/2015.
 */

/***
 * Balón para jugar Pong.
 * @param {Number} size			   Diametro del balón en pixeles.
 * @param {Number} horizontalLimit Ancho del tablero de juego en pixeles.
 * @param {Number} verticalLimit   Largo del tablero de juego en pixeles.
 */
function Ball(size, horizontalLimit, verticalLimit) {
	var maximumOpening,
		movement,
		position,
		speed;
	
	maximumOpening = 60;
	movement = new Vector2D(0, 0);
	position = new Vector2D(horizontalLimit / 2, verticalLimit / 2);
	speed = 300;
		
	/***
	 * Obtiene el ancho del tablero.
	 * @return {Number} Ancho del tablero en pixeles.
	 */		
	this.getHorizontalLimit = function() { return horizontalLimit; };
	/***
	 * Obtiene el máximo ángulo de apertura del movimiento del balón.
	 * @return { Number} Ḿáximo ángulo de apertura en grados.
	 */
	this.getMaximumOpening = function() { return maximumOpening; };
	/***
	 * Obtiene un objeto Vector2D que representa la dirección y la velocidad del balón..
	 * @return {Vector2D} Movimiento del balón.
	 */
	this.getMovement = function() { return movement; };
	/***
	 * Obtiene un objeto Vector2D que representa las coordenadas actuales del balón.
	 * @return {Vector2D} Posición del balón.
	 */
	this.getPosition = function() { return position; };
	/***
	 * Establece un objeto Vector2D que representa las coordenadas actuales del balón.
	 * @return {Vector2D} newPosition Posición del balón.
	 */
	this.setPosition = function(newPosition) { position = newPosition; };
	/***
	 * Obtiene el diametro del balón.
	 * @return {Number} Diametro del balón.
	 */
	this.getSize = function() { return size; };
	/***
	 * Obtiene la velocidad del balón.
	 * @return {Number} Velocidad del balón en pixeles sobre segundo.
	 */
	this.getSpeed = function() { return speed; };
	/***
	 * Establece la velocidad del balón.
	 * @param {Number} newSpeed Velocidad del balón en pixeles sobre segundo.
	 */
	this.setSpeed = function(newSpeed) { speed = newSpeed; };
	/***
	 * Obtiene el largo del tablero.
	 * @return {Number} Largo del tablero en pixeles.
	 */
	this.getVerticalLimit = function() { return verticalLimit; };
	
	this.open(Direction.LEFT);
}

/***
 * Verifica si el balón ha chocado con una pala.
 * @param {Paddle} paddle Pala en el tablero de alguno de los jugadores.
 * @return {Boolean} Devuelve verdadero si existe una colisión y false si no.
 */
Ball.prototype.crash = function(paddle) {
	return (this.getPosition().getX() + this.getSize() / 2 > paddle.getPosition().getX() - paddle.getWidth() / 2
		&& this.getPosition().getY() + this.getSize() / 2 > paddle.getPosition().getY() - paddle.getHeight() / 2
		&& this.getPosition().getX() - this.getSize() / 2 < paddle.getPosition().getX() + paddle.getWidth() / 2
		&& this.getPosition().getY() - this.getSize() / 2 < paddle.getPosition().getY() + paddle.getHeight() / 2);
};

/***
 * Dibuja el objeto en el contexto indicado.
 * @param {Object} context Conexto de dibujo de un objeto Canvas.
 */
Ball.prototype.draw = function(context) {
	context.fillStyle = "white";
	context.fillRect(this.getPosition().getX() - this.getSize() / 2,
		this.getPosition().getY() - this.getSize() / 2,
		this.getSize(), this.getSize());
};

/***
 * Suma el argumento a la velocidad actual.
 * @param {Object} increase Incremento de velocidad.
 */
Ball.prototype.increaseSpeed = function(increase) {
	this.setSpeed(this.getSpeed() + increase);
	this.getMovement().normalize();
	this.getMovement().multiplyByAScalar(this.getSpeed());
};

/***
 * Actualiza la posición del balón de acuerdo al tiempo transcurrido y 
 * verifica si ha chocado con otro elemento del tablero.
 * @param {Object} delta   Tiempo transcurrido desde el último movimiento.
 * @param {Object} paddles Par de palas en el tablero pertenecientes a los jugadores.
 * @return {String} Indica si el balón chocó con un elemento en el tablero.
 * 					Los valores posibles son: "none" Si no hubo colisión.
 * 					"left", "right" Si el balón salió por los costados.
 * 					"up", "down" Si el balón chocó con el limite superior o inferior del tablero.
 * 					"paddle" Si el balón chocó con la pala de un jugador.
 */
Ball.prototype.move = function(delta, paddles) {	
	var angle,
		half = this.getSize() / 2,
		result = "none",
		temp = new Vector2D(this.getMovement().getX(), this.getMovement().getY());
			
	temp.multiplyByAScalar(delta);
	this.setPosition(this.getPosition().add(temp));
	
	if (this.getPosition().getX() - half < 0) {
		result = "left";
	}
	if (this.getPosition().getX() + half > this.getHorizontalLimit()) {
		result = "right";
	}
	if (this.getPosition().getY() - half < 0) {
		this.getPosition().setY(half);
		this.getMovement().setY(this.getMovement().getY() * -1);
		result = "up";
	}
	if (this.getPosition().getY() + half > this.getVerticalLimit()) {
		this.getPosition().setY(this.getVerticalLimit() - half);
		this.getMovement().setY(this.getMovement().getY() * -1);
		result = "down";
	}
	
	if (this.getMovement().getX() < 0 && this.crash(paddles[0])) {
		this.getMovement().setX(this.getMovement().getX() * -1);
		this.increaseSpeed(10);
		temp.setX(this.getMovement().getX());
		temp.setY(this.getMovement().getY());
		this.getMovement().rotate(this.getPosition().getY() - paddles[0].getPosition().getY());
		result = "paddle";
	}
	else if (this.getMovement().getX() > 0 && this.crash(paddles[1])) {
		this.getMovement().setX(this.getMovement().getX() * -1);
		this.increaseSpeed(10);
		temp.setX(this.getMovement().getX());
		temp.setY(this.getMovement().getY());
		this.getMovement().rotate(paddles[1].getPosition().getY() - this.getPosition().getY());
		result = "paddle";
	}
	
	angle = this.getMovement().getAngle(); 
	if (angle >= 180) angle -= 180;
    if (angle > 90) angle = 180 - angle;
    if (angle <= -180) angle += 180;
    if (angle < -90) angle = -180 - angle;
	
	if (angle > this.getMaximumOpening() || angle < -this.getMaximumOpening()) {
		this.getMovement().setX(temp.getX());
		this.getMovement().setY(temp.getY());			
	}
	return result;
};

/***
 * Coloca la posición en el centro del tablero e inicia un movimiento
 * en dirección contraria al jugador que anotó.
 * @param {Direction} direction Dirección de inicio.
 */
Ball.prototype.open = function(direction) {
	var side = 0;
	switch (direction) {
		case Direction.LEFT :
			side = -1;
			break;
		case Direction.RIGHT :
			side = 1;
			break;
	}
	this.getPosition().setX(this.getHorizontalLimit() / 2);
	this.getPosition().setY(this.getVerticalLimit() / 2);
	this.setSpeed(300);
	this.getMovement().setX(side * this.getSpeed());
	this.getMovement().setY(0);
};