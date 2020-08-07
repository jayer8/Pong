import Pong from './components/Pong/Pong'

/***
 * Invoca una función definida por el usuario cada (1000 / 60) ms.
 */
window.requestAnimationFrame = (function () {
  return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (callback) {
          window.setTimeout(callback, 1000 / 60)
        }
})()

/***
 * Crea una nueva instancia de la clase Pong y enlaza el evento
 * onkeydown al manejador del objeto Pong creado, cuando se carga
 * el documento en el navegador.
 */
window.onload = function () {
  const pong = new Pong()
  document.onkeydown = function (e) {
    pong.keyPress(e)
  }
}
