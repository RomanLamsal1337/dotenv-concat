const path = require("path")

module.exports = {
    entry: {
        main: "./src/main.ts",
    },
    target: "node",
    mode: "production",
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
        ]
    },
    resolve: {
        extensions: [".ts", ".js"],
    },
    output: {
        filename: "[name].js",
        path: path.join(__dirname, "build")
    },
    optimization: {
        minimize: false
    }
}
