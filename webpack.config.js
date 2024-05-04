const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  // src/index.js 파일을 dist/main.js로 번들링
  entry: "./src/index.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
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
    ],
  },
  plugins: [
    // HTML 파일 빌드 플러그인, 빌드된 JS를 자동으로 HTML에 삽입해줌
    new HtmlWebpackPlugin({
      template: "./index.html",
    }),
    // 빌드시 기존 빌드 파일 중 사용하지 않는 파일 자동 삭제
    new CleanWebpackPlugin()
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
