/***
 * Basado en:
 * http://www.jlabstudio.com/webgl/2013/04/uso-practico-de-vectores-pong-y-un-poco-de-sonido/
 * Última modificación: 14/06/2015.
 */

/***
 * Encapsula un vector de dos dimensiones.
 * @param {Number} x Componente en el eje de las abscisas.
 * @param {Number} y Componente en el eje de las ordenadas.
 */
function Vector2D(x, y) {
	
	/***
	 * Obtiene el valor del componente en X.
	 * @return {Number} Valor de X. 
	 */
	
	this.getX = function() { return x; };
	/***
	 * Establece el valor del componente en X.
	 * @param {Number} newX Nuevo valor del componente en X.
	 */
	
	this.setX = function(newX) { x = newX; };
	/***
	 * Obtiene el valor del componente en Y.
	 * @return {Number} Valor de Y.
	 */
	
	this.getY = function() { return y; };
	/***
	 * Establece el valor del componente en Y.
	 * @param {Number} newY Nuevo valor del componente en Y.
	 */
	
	this.setY = function(newY) { y = newY; };
}

/***
 * Obtiene un Vector2D con la suma de los componentes de dos vectores.
 * @param {Vector2D} vector Vector a sumar.
 * @return {Vector2D} Vector resultante de la suma.
 */
Vector2D.prototype.add = function(vector) {
	return new Vector2D(this.getX() + vector.getX(), this.getY() + vector.getY());
};

/***
 * Obtiene el ángulo formado por el vector y el eje de las abscisas.
 * @return {Number} Valor del ángulo en grados.
 */
Vector2D.prototype.getAngle = function() {
	return Math.atan2(this.getY(), this.getX()) * 180 / Math.PI;
};

/***
 * Obtiene la longitud absoluta del Vector2D.
 * @return {Number} Longitud absoluta.
 */
Vector2D.prototype.getLength = function() {
	return (Math.sqrt(this.getX() * this.getX() + this.getY() * this.getY()));
};

/***
 * Multiplica cada componente por el mismo valor.
 * @param {Number} scalar Cualquier número real.
 */
Vector2D.prototype.multiplyByAScalar = function(scalar) {
	this.setX(this.getX() * scalar);
	this.setY(this.getY() * scalar);
};

/***
 * Convierte el vector en un vector unitario o vector de módulo uno.
 */
Vector2D.prototype.normalize = function() {
	if (this.getLength() != 0) {
		this.multiplyByAScalar(1 / this.getLength());
	}
	else {
		this.setX(0);
		this.setY(0);
	}
};

/***
 * Rota el vector en dirección contraria a las manecillas del reloj.
 * @param {Number} degrees Grados que debe girar el vector.
 */
Vector2D.prototype.rotate = function(degrees) {
	var radians = degrees * Math.PI / 180;
	var cos = Math.cos(radians);
	var sin = Math.sin(radians);
	var x = this.getX() * cos - this.getY() * sin;
	var y = this.getX() * sin + this.getY() * cos;
	x = Math.round(x * 100);
	if (x != 0) x /= 100;
	y = Math.round(y * 100);
	if (y != 0) y /= 100;
	this.setX(x);
	this.setY(y);
};