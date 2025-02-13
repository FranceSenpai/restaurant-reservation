const path = require("path");
const webpack = require("webpack");

module.exports = {
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js",
    },
    resolve: {
        fallback: {
            crypto: require.resolve("crypto-browserify"),
        },
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env.NODE_OPTIONS": JSON.stringify("--openssl-legacy-provider"),
        }),
    ],
};
