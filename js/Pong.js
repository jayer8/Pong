/***
 * Basado en:
 * http://www.jlabstudio.com/webgl/2013/04/uso-practico-de-vectores-pong-y-un-poco-de-sonido/
 * Última modificación: 30/08/2015.
 */

/***
 * Gestiona una partida de Pong, entre un jugador y una inteligencia artificial.
 * genera un tablero de juego a partir de un elemento canvas del documento, las
 * palas y la bola. Admnistra las anotaciones de cada jugador.
 */
function Pong() {
	var ai,
		ball,
		canvas,
		controls,
		elapsedTime,
		paddles,
		score,
		sounds;

	canvas = document.getElementById("canvas");
	canvas.height = 500;
	canvas.width = 800;
	canvas.style.backgroundColor = "black";
	ball = new Ball(15, canvas.width, canvas.height);
	controls = new Controls();
	elapsedTime = Date.now();
	paddles = [new Paddle(80, 20, 30, canvas.height),
			new Paddle(80, 20, canvas.width - 30, canvas.height)];
	scores = [0, 0];
	sounds = [new Audio("sounds/beep.ogg"),
		new Audio("sounds/gol.ogg"),
		new Audio("sounds/plop.ogg")];
		
	/***
	 * Obtiene el valor de la bola del juego.
	 * @return {Ball} Bola del juego.
	 */
	this.getBall = function() { return ball; };
	/***
	 * Obtiene el valor del lienzo donde se dibujan los elementos.
	 * @return {Object} Lienzo.
	 */
	this.getCanvas = function() { return canvas; };
	/***
	 * Obtiene el valor de los controles del juego.
	 * @return {Controls} Configuración de los controles.
	 */
	this.getControls = function() { return controls; };
	/***
	 * Obtiene el tiempo transcurrido desde la invocación anterior
	 * a la función run del objeto.
	 * @return {Number} Tiempo transcurrido en ms.
	 */
	this.getElapsedTime = function() { return elapsedTime; };
	/***
	 * Obtiene una lista con las dos palas del juego de izquierda a derecha.
	 * @return {Paddle} Palas del juego.
	 */
	this.getPaddles = function() { return paddles; };
	/***
	 * Obtiene una lista con las anotaciones de cada jugador.
	 * @return {Object} Marcador.
	 */
	this.getScores = function() { return scores; };
	/***
	 * Obtiene una lista con los sonidos de la bola al impactar con 
	 * un objeto del escenario.
	 * @return {Object} Sonidos.
	 */
	this.getSounds = function() { return sounds; };
	/***
	 * Establece el tiempo transcurrido desde la invocación anterior
	 * a la función run del objeto.
	 * @param {Number} newElapsedTime Tiempo transcurrido en ms. 
	 */
	this.setElapsedTime = function(newElapsedTime) { elapsedTime = newElapsedTime; };
	
	this.run();
}

/***
 * Dibuja el objeto en el contexto indicado.
 * @param {Object} context Conexto de dibujo de un objeto Canvas.
 */
Pong.prototype.draw = function() {
	var half = Math.round(this.getCanvas().width / 2),
		pieces = 31,
		piece = Math.round(this.getCanvas().height / pieces);

	this.getCanvas().getContext("2d").lineWidth = 10;
	this.getCanvas().getContext("2d").strokeStyle = "white";

	for (var i = 0; i < pieces; i++) {
		if (i % 2 == 1) {
			continue;
		}
		this.getCanvas().getContext("2d").beginPath();
		this.getCanvas().getContext("2d").moveTo(half, piece * i);
		this.getCanvas().getContext("2d").lineTo(half, piece * (i + 1));
		this.getCanvas().getContext("2d").stroke();
	}

	// Scores
	this.getCanvas().getContext("2d").fillStyle = "white";
	this.getCanvas().getContext("2d").font = "bold 50px monospace";
	this.getCanvas().getContext("2d").fillText((this.getScores()[0] < 10 ? "0" : "") +
		"" + this.getScores()[0], this.getCanvas().width / 2 - 80, 40);
	this.getCanvas().getContext("2d").fillText((this.getScores()[1] < 10 ? "0" : "") +
		"" + this.getScores()[1], this.getCanvas().width / 2 + 20, 40);
};

/**
 * Actualiza la dirección del movimiento de la pala del jugador
 * cuando una tecla es pulsada.
 * @param {Object} e Tecla pulsada.
 */
Pong.prototype.keyPress = function(e) {
	e.preventDefault();
	switch (e.keyCode) {
		case 38 :
			this.getControls().setDirection(Direction.UP);
			break;
		case 40:
			this.getControls().setDirection(Direction.DOWN);
			break;
	}
};

/**
 * Ciclo principal del juego.
 */
Pong.prototype.run = function() {
	var delta = (Date.now() - this.getElapsedTime()) / 1000,
		directions = [Direction.NONE, Direction.NONE],
		quantum = Math.floor(delta / 0.005);
	this.setElapsedTime(Date.now());

	// Movimiento de las entidades.
	if (this.getControls().isUp()) {
		directions[0] = Direction.UP;
	}
	else if (this.getControls().isDown()) {
		directions[0] = Direction.DOWN;
	}

	if (this.getBall().getPosition().getY() - this.getBall().getSize() / 2 <=
		this.getPaddles()[1].getPosition().getY()) {
			directions[1] = Direction.UP;
	}
	if (this.getBall().getPosition().getY() + this.getBall().getSize() / 2 >=
		this.getPaddles()[1].getPosition().getY()) {
			directions[1] = Direction.DOWN;
	}

	this.getPaddles()[0].move(delta, directions[0]);
	this.getPaddles()[1].move(delta, directions[1]);

	for (var i = 0; i < quantum; i++) {
		switch (this.getBall().move(0.005, this.getPaddles())) {
			case "left" :
				scores[1]++;
				this.getBall().open(Direction.RIGHT);
				this.getSounds()[1].play();
				break;
			case "right" :
				scores[0]++;
				this.getBall().open(Direction.LEFT);
				this.getSounds()[1].play();
				break;
			case "up" :
			case "down" :
				this.getSounds()[2].play();
				break;
			case "paddle":
				this.getSounds()[0].play();
				break;
		}
	}
	quantum = delta - quantum * 0.005;
	switch (this.getBall().move(quantum, this.getPaddles())) {
			case "left" :
				scores[1]++;
				this.getBall().open(Direction.RIGHT);
				this.getSounds()[1].play();
				break;
			case "right" :
				scores[0]++;
				this.getBall().open(Direction.LEFT);
				this.getSounds()[1].play();
				break;
			case "up" :
			case "down" :
				this.getSounds()[2].play();
				break;
			case "paddle":
				this.getSounds()[0].play();
				break;
	}
	
	// Trazado de las entidades
	this.getCanvas().getContext("2d").clearRect(0, 0, 
		this.getCanvas().width, this.getCanvas().height);
	this.draw();
	this.getPaddles()[0].draw(this.getCanvas().getContext("2d"));
	this.getPaddles()[1].draw(this.getCanvas().getContext("2d"));
	this.getBall().draw(this.getCanvas().getContext("2d"));
	
	log("Velocidad: " + this.getBall().getSpeed() + 
		" // &Aacute;ngulo: " + this.getBall().getMovement().getAngle());
	var self = this;
	requestAnimationFrame(function() { self.run(); });
};