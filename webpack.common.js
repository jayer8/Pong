const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.(ogg|mp3)$/,
        use: [
          'file-loader'
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      inject: false,
      template: require('html-webpack-template'),
      bodyHtmlSnippet: `<canvas id="canvas"> </canvas>
      <p>
        Basado en: 
        <a href="http://www.jlabstudio.com/webgl/2013/04/uso-practico-de-vectores-pong-y-un-poco-de-sonido/">
          Uso practico de vectores, pong y un poco de sonido
        </a>
      </p>`,
      scripts: [
        {
          src: 'bundle.js'
        }
      ],
      title: 'Pong Javascript'
    })
  ]
}
