const path = require("path");
var HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
    entry:path.resolve(__dirname,"./src/index.js"),
    output:{
        filename:"index.js",
        path:path.resolve(__dirname,"./dist")
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:"./src/index.html"
        }),
        new CleanWebpackPlugin()
    ],
    module:{
        rules:[
            {
                test: /\.js$/,
                use: ["babel-loader"]
            },
            {
                test:/\.scss$/,
                use:["style-loader","css-loader","sass-loader"]
            },
            {
                test:/\.html$/,
                use:["html-loader"]
            },
            {
                test:/\.(svg|png|jpg|gif)$/,
                use:{
                    loader: "file-loader",
                    options:{
                        name:"[name].[hash].[ext]",
                        outputPath:"images",
                        esModule: false,
                    }
                }
            }
        ]
    }
}