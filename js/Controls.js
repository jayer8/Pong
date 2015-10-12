/***
 * Basado en:
 * http://www.jlabstudio.com/webgl/2013/04/uso-practico-de-vectores-pong-y-un-poco-de-sonido/
 * Última modificación: 19/07/2015.
 */

/***
 * Direcciones que puede tomar un objeto al moverse.
 */
var Direction = {
	NONE  : 0,
	DOWN  : 1,
	LEFT  : 2,
	RIGHT : 3,
	UP    : 4
};

/***
 * Ajusta la dirección del movimiento de una Pala.
 */
function Controls() {
	var down,
		up;
	
	/***
	 * Obtiene el valor del campo down.
	 * @return {Boolean} Valor de down.
	 */
	this.isDown = function() { return down;	};
	/***
	 * Obtiene el valor del campo up.
	 * @return {Boolean} Valor de up.
	 */
	this.isUp = function() { return up; };
	/***
	 * Establece la dirección del movimiento.
	 * @param {Direction} Dirección del movimiento,
	 * 					  limitada a dos valores: ARRIBA y ABAJO.
	 */
	this.setDirection = function(direction) {
		switch(direction) {
			case Direction.DOWN :
				down = true;
				up = false;
				break;
			case Direction.UP :
				down = false;
				up = true;
				break;
		}
	};
	
	down = false;
	up = false;
}