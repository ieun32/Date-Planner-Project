const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "production",
  // src/index.js 파일을 dist/main.js로 번들링
  entry: path.resolve(__dirname, "src", "index.js"),
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  // CSS 로더
  // css-loader: CSS를 JS형태로 변환해 Webpack으로 불러옴
  // style-loader: JS형태로 변환된 CSS를 HTML 파일에 <script> 형태로 삽입
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(?:js|mjs|cjs)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [["@babel/preset-env", { targets: "ie 11" }]],
          },
        },
      },
    ],
  },
  plugins: [
    // HTML 파일 빌드 플러그인, 빌드된 JS를 자동으로 HTML에 삽입해줌
    new HtmlWebpackPlugin({
      template: "./index.html",
    }),
  ],
  // webpack-dev-server
  // 웹팩 빌드 명령어를 매번 치지 않고 실시간으로 변경 사항이 반영된 빌드 결과물을 볼 수 있음
  // 실제 빌드는 별도로 명령어로 수행해야 함
  devServer: {
    static: {
      directory: path.resolve(__dirname, "dist"),
    },
    port: 8080,
  },
};
