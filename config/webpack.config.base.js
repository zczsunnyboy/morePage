const path = require("path");
// 引入插件
const HTMLWebpackPlugin = require("html-webpack-plugin");
// 清理 dist 文件夹
const CleanWebpackPlugin = require("clean-webpack-plugin")
// 抽取 css
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const CopyWebpackPlugin = require('copy-webpack-plugin')
// 引入多页面文件列表
const config = require("./config");
// 通过 html-webpack-plugin 生成的 HTML 集合
let HTMLPlugins = [];
// 入口文件集合
let Entries = {}

function resolve (dir) {
    return path.join(__dirname, '..', dir)
}
const env = process.env.NODE_ENV.replace(/(\s*$)|(^\s*)/ig,"");

const extractLess = new ExtractTextPlugin({
  filename: "css/[name].less.css",
  disable: env=== "dev"
});
// 生成多页面的集合
config.HTMLDirs.forEach((page) => {
    const htmlPlugin = new HTMLWebpackPlugin({
        filename: env==='dev'?`${page}.html`:`html/${page}.html`,
        template: path.resolve(__dirname, `../app/html/${page}.html`),
        chunks: [page, 'commons'],
    });
    HTMLPlugins.push(htmlPlugin);
    Entries[page] = path.resolve(__dirname, `../app/js/${page}.js`);
})

module.exports = {
    entry:Entries,
    devtool:"cheap-module-source-map",
    output:{
        filename:"js/[name].bundle.[hash].js",
        path:path.resolve(__dirname,"../dist")
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '@': resolve('app')
        }
    },
    // 加载器
    module:{
        rules:[
            {
                test: path.resolve(__dirname, "../app/lib/miniui/miniui.js"),
                use: "imports-loader?this=>window"
            },
            {
              rules: [{
                test: /\.less$/,
                use: extractLess.extract({
                  use: [{
                    loader: "css-loader"
                  }, {
                    loader: "less-loader"
                  }],
                  // use style-loader in development
                  fallback: "style-loader"
                })
              }]
            },
            {
                // 对 css 后缀名进行处理
                test:/\.css$/,
                // 不处理 node_modules 文件中的 css 文件
                exclude: /node_modules/,
                // 抽取 css 文件到单独的文件夹
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    // 设置 css 的 publicPath
                    // publicPath: config.cssPublicPath,
                    use: [{
                        loader:"css-loader",
                        options:{
                            // 开启 css 压缩
                            minimize:true,
                        }
                    },
                        {
                            loader:"postcss-loader",
                        }
                    ]
                })
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    }
                }
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use:{
                    loader:"file-loader",
                    options:{
                        // 打包生成图片的名字
                        name:"[name].[ext]",
                        // 图片的生成路径
                        outputPath:config.imgOutputPath
                    }
                }
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use:["file-loader"]
            }
        ],
    },
    plugins:[
        new CopyWebpackPlugin([
          {
            from: path.resolve(__dirname, '../static'),
            to: config.assetsSubDirectory,
            ignore: ['.*']
          }
        ]),
        // 自动清理 dist 文件夹
        new CleanWebpackPlugin(['dist']),
        extractLess,
        // 自动生成 HTML 插件
        ...HTMLPlugins
    ],
}
